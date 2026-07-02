"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Download, ShieldCheck, MonitorX, Save, Gavel, History } from "lucide-react";
import { OPPONENT_LIST } from "@/data/debate";
import { OpponentType } from "@/types";
import { isChrome, getModelAvailability, createLocalSession } from "@/lib/browser-ai";
import { MarkdownLite } from "@/components/MarkdownLite";
import { AuthWidget } from "@/components/AuthWidget";
import { getDraft, saveDraft, clearDraft, DebateMessage } from "@/lib/local-store";
import { persistTranscript } from "@/lib/persist-transcript";

// "ready" covers both "model was already downloaded" and "just finished downloading",
// the previous version only handled "downloadable"/"downloading" and had no case at
// all for "already available", which is why the whole UI went blank on repeat visits.
type Status = "checking" | "not-chrome" | "unsupported" | "unavailable" | "downloadable" | "downloading" | "ready";

const MAX_TURNS = 8;
const MODERATOR_PROMPT =
  "MODERATOR: Wrap up this debate now. Give a final verdict: summarize the strongest point each side made, then score the user's overall performance on clarity, scripture use, logic, and fairness (1-5 each) with one sentence of coaching for next time.";

function systemPromptFor(opponentLabel: string, opponentDescription: string, topic: string) {
  return `You are simulating a debate opponent named "${opponentLabel}" in a Bible study app. ${opponentDescription}${topic ? ` Stay strictly inside the topic "${topic}".` : ""} Ask one challenge at a time, stay in character, keep responses under 5 sentences. This conversation runs entirely on the user's device, no data leaves their machine.`;
}

export function BrowserAIClient() {
  const [status, setStatus] = useState<Status>("checking");
  const [progress, setProgress] = useState(0);
  const [opponentType, setOpponentType] = useState<OpponentType>("trinitarian");
  const [topic, setTopic] = useState("");
  const [messages, setMessages] = useState<DebateMessage[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [startedAt, setStartedAt] = useState(new Date().toISOString());
  const [elapsedSec, setElapsedSec] = useState(0);
  const [moderatorClosed, setModeratorClosed] = useState(false);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const sessionRef = useRef<LanguageModelSession | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(crypto.randomUUID());

  const userTurns = messages.filter((m) => m.role === "user").length;

  async function initSession(forOpponent: OpponentType, withProgress: boolean) {
    const opponent = OPPONENT_LIST.find((o) => o.type === forOpponent)!;
    if (withProgress) setStatus("downloading");
    try {
      sessionRef.current?.destroy();
      const session = await createLocalSession(systemPromptFor(opponent.label, opponent.description, topic), setProgress);
      sessionRef.current = session;
      const draft = getDraft("browser-ai", forOpponent);
      setMessages(draft);
      setModeratorClosed(false);
      setStatus("ready");
    } catch (err) {
      console.error(err);
      setStatus("unavailable");
    }
  }

  // Browser + model support check, runs once. "available" auto-creates the session
  // immediately since no download is needed, "downloadable" waits for a click so we
  // don't burn someone's data plan without asking.
  useEffect(() => {
    (async () => {
      if (!isChrome()) {
        setStatus("not-chrome");
        return;
      }
      const availability = await getModelAvailability();
      if (availability === "unsupported") setStatus("unsupported");
      else if (availability === "unavailable") setStatus("unavailable");
      else if (availability === "downloadable") setStatus("downloadable");
      else if (availability === "available") initSession(opponentType, false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Switching opponents mid-session recreates the session with the new system
  // prompt and restores that opponent's own draft, so context isn't mixed.
  const prevOpponent = useRef(opponentType);
  useEffect(() => {
    if (prevOpponent.current === opponentType) return;
    prevOpponent.current = opponentType;
    if (status === "ready") initSession(opponentType, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opponentType]);

  useEffect(() => {
    if (status !== "ready") return;
    saveDraft("browser-ai", opponentType, messages);
  }, [messages, opponentType, status]);

  useEffect(() => {
    if (status !== "ready") return;
    const timer = window.setInterval(() => setElapsedSec((s) => s + 1), 1000);
    return () => window.clearInterval(timer);
  }, [status]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    return () => {
      sessionRef.current?.destroy();
    };
  }, []);

  async function send(overrideText?: string, isModerator = false) {
    const text = overrideText ?? input;
    if (!text.trim() || !sessionRef.current) return;
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setThinking(true);
    try {
      const reply = await sessionRef.current.prompt(text);
      setMessages((m) => [...m, { role: "opponent", content: reply }]);
      if (isModerator) setModeratorClosed(true);
    } catch {
      setMessages((m) => [...m, { role: "opponent", content: "Local model error, try rephrasing or restart the session." }]);
    } finally {
      setThinking(false);
    }
  }

  async function handleSave() {
    setSaveMsg("Saving...");
    const opponent = OPPONENT_LIST.find((o) => o.type === opponentType)!;
    const result = await persistTranscript({
      id: sessionId.current,
      mode: "browser-ai",
      opponentType,
      opponentLabel: opponent.label,
      topic: topic || undefined,
      messages,
      startedAt,
    });
    setSaveMsg(result.syncedToCloud ? "Saved locally and synced to the cloud." : "Saved locally. Sign in above to sync to the cloud too.");
    clearDraft("browser-ai", opponentType);
  }

  function newDebate() {
    setMessages([]);
    setModeratorClosed(false);
    setStartedAt(new Date().toISOString());
    setElapsedSec(0);
    sessionId.current = crypto.randomUUID();
    clearDraft("browser-ai", opponentType);
  }

  const mins = Math.floor(elapsedSec / 60);
  const secs = elapsedSec % 60;
  const atCap = userTurns >= MAX_TURNS;

  return (
    <div className="px-5 py-8 md:px-10 md:py-10 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Link href="/debate" className="inline-flex items-center gap-1.5 text-sm text-ink-faint hover:text-ink">
          <ArrowLeft size={14} /> Debate Mode
        </Link>
        <Link href="/debate/history" className="inline-flex items-center gap-1.5 text-xs text-ink-faint hover:text-ink">
          <History size={13} /> History
        </Link>
      </div>

      <p className="eyebrow mb-1">Browser AI Mode &middot; on-device</p>
      <h1 className="font-display text-3xl mb-3">Chrome's local model.</h1>
      <p className="text-ink-soft mb-4 max-w-md text-sm">
        Runs on Gemini Nano, built into Chrome. Nothing you type leaves your device, and once
        downloaded it works with no internet connection at all.
      </p>

      <div className="mb-4">
        <AuthWidget compact />
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <select
          value={opponentType}
          onChange={(e) => setOpponentType(e.target.value as OpponentType)}
          className="border border-line rounded-lg px-3 py-2 text-sm bg-white"
          disabled={status === "downloading"}
        >
          {OPPONENT_LIST.map((o) => <option key={o.type} value={o.type}>{o.label}</option>)}
        </select>
        <input
          placeholder="Topic lock (optional)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          disabled={status === "ready" || status === "downloading"}
          className="border border-line rounded-lg px-3 py-2 text-sm bg-white disabled:opacity-60"
        />
      </div>

      {status === "checking" && <p className="text-sm text-ink-faint">Checking this browser...</p>}

      {status === "not-chrome" && (
        <StatusCard icon={MonitorX} tone="rose" title="Not running in Chrome">
          This mode needs desktop Chrome, it's the only browser that ships Gemini Nano on-device.
          Everything else in School Master works fine here, this one feature is Chrome-only.
        </StatusCard>
      )}

      {status === "unsupported" && (
        <StatusCard icon={MonitorX} tone="rose" title="Prompt API not available">
          Update Chrome to the latest version. If it's still missing, enable{" "}
          <code className="font-mono text-xs bg-paper-dim px-1 py-0.5 rounded">chrome://flags/#prompt-api-for-gemini-nano</code>{" "}
          and relaunch.
        </StatusCard>
      )}

      {status === "unavailable" && (
        <StatusCard icon={MonitorX} tone="rose" title="Model unavailable on this device">
          Needs roughly 22GB of free disk space and a capable GPU or CPU. Offline Debate Mode works regardless.
        </StatusCard>
      )}

      {status === "downloadable" && (
        <button onClick={() => initSession(opponentType, true)} className="btn-primary w-full mb-4">
          <Download size={15} /> Download local AI (one-time, a few GB)
        </button>
      )}

      {status === "downloading" && (
        <div className="paper-card p-6 mb-4">
          <p className="text-sm text-ink-soft mb-2">Downloading Gemini Nano... {progress}%</p>
          <div className="h-1.5 w-full rounded-full bg-paper-dim overflow-hidden">
            <div className="h-full bg-gold rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-ink-faint mt-2">Needs an unmetered connection the first time. After this, no network required.</p>
        </div>
      )}

      {status === "ready" && (
        <>
          <div className="flex items-center justify-between mb-3 text-xs text-ink-faint font-mono">
            <span className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-slate" /> on-device &middot; Turn {userTurns} / {MAX_TURNS}</span>
            <span>{mins}:{secs.toString().padStart(2, "0")} elapsed</span>
          </div>

          <div ref={scrollRef} className="paper-card p-4 min-h-[300px] max-h-[440px] overflow-y-auto mb-4 space-y-3">
            {messages.length === 0 && <p className="text-sm text-ink-faint">Send an opening message to start the debate.</p>}
            {messages.map((m, i) => (
              <div key={i} className={`text-sm p-3 rounded-xl max-w-[85%] ${m.role === "user" ? "bg-ink text-paper ml-auto" : "bg-paper-dim text-ink"}`}>
                <MarkdownLite text={m.content} />
              </div>
            ))}
            {thinking && <p className="text-xs text-ink-faint">Local model is thinking...</p>}
          </div>

          {atCap && !moderatorClosed && (
            <div className="paper-card p-4 mb-4 bg-gold-dim flex items-center justify-between gap-3">
              <p className="text-sm text-ink">Turn cap reached, this debate has run long enough to lose focus.</p>
              <button onClick={() => send(MODERATOR_PROMPT, true)} disabled={thinking} className="btn-gold text-xs py-2 shrink-0"><Gavel size={13} /> Get verdict</button>
            </div>
          )}

          {moderatorClosed ? (
            <div className="flex gap-2">
              <button onClick={handleSave} className="btn-primary flex-1"><Save size={14} /> Save transcript</button>
              <button onClick={newDebate} className="btn-secondary flex-1">New debate</button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Your response..."
                disabled={thinking}
                className="flex-1 border border-line rounded-xl px-4 py-3 text-sm bg-white"
              />
              <button onClick={() => send()} disabled={thinking} className="btn-primary"><Send size={15} /></button>
            </div>
          )}

          {messages.length > 0 && !moderatorClosed && (
            <button onClick={handleSave} className="text-xs text-slate underline underline-offset-4 mt-3">
              <Save size={11} className="inline -mt-0.5 mr-1" /> Save transcript now
            </button>
          )}
          {saveMsg && <p className="text-xs text-ink-faint mt-2">{saveMsg}</p>}
        </>
      )}
    </div>
  );
}

function StatusCard({ icon: Icon, title, tone, children }: { icon: any; title: string; tone: "rose" | "gold"; children: React.ReactNode }) {
  return (
    <div className={`paper-card p-5 ${tone === "rose" ? "bg-rose-dim" : "bg-gold-dim"}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon size={16} className={tone === "rose" ? "text-rose" : "text-gold"} />
        <p className="font-display text-base">{title}</p>
      </div>
      <p className="text-sm text-ink-soft">{children}</p>
    </div>
  );
}
