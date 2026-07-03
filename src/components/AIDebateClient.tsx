"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Wifi, Save, Gavel, History, Eye, EyeOff, Brain, MonitorSmartphone, Download } from "lucide-react";
import { OPPONENT_LIST } from "@/data/debate";
import { OpponentType } from "@/types";
import { MarkdownLite } from "@/components/MarkdownLite";
import { AuthWidget } from "@/components/AuthWidget";
import { getDraft, saveDraft, clearDraft, DebateMessage, logReviewEvent } from "@/lib/local-store";
import { persistTranscript } from "@/lib/persist-transcript";
import { buildWeaknessPayload } from "@/lib/adaptive-engine";
import { buildDebateSystemPrompt, cleanAiError, splitDebateReply } from "@/lib/ai-prompts";
import { createLocalSession, getModelAvailability, hasPromptAPI, isChrome } from "@/lib/browser-ai";

const MAX_TURNS = 8;
const MODERATOR_PROMPT =
  "MODERATOR: Wrap up this debate now. Give a final verdict. In the opponent reply, stay concise. In coaching notes, score clarity, scripture use, logic, and fairness, then name the exact next drill.";

export function AIDebateClient() {
  const [opponentType, setOpponentType] = useState<OpponentType>("trinitarian");
  const [topic, setTopic] = useState("");
  const [messages, setMessages] = useState<DebateMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<string | null>(null);
  const [startedAt, setStartedAt] = useState(new Date().toISOString());
  const [elapsedSec, setElapsedSec] = useState(0);
  const [moderatorClosed, setModeratorClosed] = useState(false);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const [debateMode, setDebateMode] = useState<"moderated" | "infinite">("moderated");
  const [showCoaching, setShowCoaching] = useState(false);
  const [difficulty, setDifficulty] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [aiSource, setAiSource] = useState<"online" | "local">("local");
  const [localStatus, setLocalStatus] = useState<"idle" | "checking" | "downloadable" | "downloading" | "ready" | "unsupported" | "unavailable">("idle");
  const [localProgress, setLocalProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(crypto.randomUUID());
  const localSession = useRef<LanguageModelSession | null>(null);
  const localSessionKey = useRef<string>("");

  const userTurns = messages.filter((m) => m.role === "user").length;

  const trainingProfile = useMemo(() => buildWeaknessPayload(), [messages.length]);

  async function ensureLocalSession() {
    const key = JSON.stringify({ opponentType, topic, difficulty, trainingProfile });
    if (localSession.current && localSessionKey.current === key) return localSession.current;
    localSession.current?.destroy();
    localSession.current = null;
    if (!isChrome() || !hasPromptAPI()) {
      setLocalStatus("unsupported");
      throw new Error("Local AI needs Chrome with the built-in Prompt API enabled.");
    }
    setLocalStatus("checking");
    const availability = await getModelAvailability();
    if (availability === "unavailable") {
      setLocalStatus("unavailable");
      throw new Error("Local AI is unavailable on this device.");
    }
    if (availability === "downloadable" || availability === "downloading") setLocalStatus("downloading");
    const session = await createLocalSession(buildDebateSystemPrompt({
      opponentType,
      topic: topic || undefined,
      userProfile: trainingProfile,
      difficulty,
    }), setLocalProgress);
    localSession.current = session;
    localSessionKey.current = key;
    setLocalStatus("ready");
    return session;
  }

  useEffect(() => {
    if (aiSource !== "local") return;
    (async () => {
      if (!isChrome() || !hasPromptAPI()) { setLocalStatus("unsupported"); return; }
      setLocalStatus("checking");
      const availability = await getModelAvailability();
      if (availability === "available") setLocalStatus("ready");
      else if (availability === "downloadable") setLocalStatus("downloadable");
      else if (availability === "downloading") setLocalStatus("downloading");
      else setLocalStatus("unavailable");
    })();
  }, [aiSource]);

  useEffect(() => {
    return () => localSession.current?.destroy();
  }, []);

  useEffect(() => {
    const draft = getDraft("ai", opponentType);
    setMessages(draft);
    setModeratorClosed(false);
  }, [opponentType]);

  useEffect(() => {
    if (userTurns === 0) return;
    const timer = window.setInterval(() => setElapsedSec((s) => s + 1), 1000);
    return () => window.clearInterval(timer);
  }, [userTurns > 0]);

  useEffect(() => {
    saveDraft("ai", opponentType, messages);
  }, [messages, opponentType]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, showCoaching]);

  async function checkConnection() {
    setChecking(true);
    setCheckResult(null);
    try {
      if (aiSource === "local") {
        if (!isChrome() || !hasPromptAPI()) {
          setCheckResult("Local AI is not available. Use Chrome and enable the built-in Prompt API.");
        } else {
          const availability = await getModelAvailability();
          setLocalStatus(availability === "available" ? "ready" : availability === "downloadable" ? "downloadable" : availability === "downloading" ? "downloading" : "unavailable");
          setCheckResult(`Local AI status: ${availability}.`);
        }
      } else {
        const res = await fetch("/api/debate/gemini/status");
        const data = await res.json();
        setCheckResult(data.ok ? "Connected. Gemini responded correctly." : `Not working: ${data.reason}`);
      }
    } catch {
      setCheckResult(aiSource === "local" ? "Local AI check failed." : "Not working: network error reaching the status endpoint.");
    } finally {
      setChecking(false);
    }
  }

  async function sendMessage(text: string, isModerator = false) {
    if (!text.trim()) return;
    const userMsg: DebateMessage = { role: "user", content: text, createdAt: new Date().toISOString() };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      let data: { reply: string; coaching?: string };
      if (aiSource === "local") {
        const session = await ensureLocalSession();
        const visibleHistory = messages
          .filter((m) => m.role !== "coach")
          .map((m) => `${m.role === "user" ? "USER" : "OPPONENT"}: ${m.content}`)
          .join("\n");
        const raw = await session.prompt(`${visibleHistory ? `Conversation so far:\n${visibleHistory}\n\n` : ""}USER NEW MESSAGE:\n${userMsg.content}`);
        data = splitDebateReply(raw);
      } else {
        const res = await fetch("/api/debate/gemini", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            opponentType,
            topic: topic || undefined,
            history: messages,
            userMessage: userMsg.content,
            coachMode: showCoaching ? "visible" : "hidden",
            userProfile: trainingProfile,
            difficulty,
          }),
        });
        const payload = await res.json();
        if (!res.ok) throw new Error(payload.error ?? "AI Debate Mode failed.");
        data = payload;
      }
      const opponentMsg: DebateMessage = { role: "opponent", content: data.reply, createdAt: new Date().toISOString() };
      const coachMsg: DebateMessage = {
        role: "coach",
        content: data.coaching ?? "No coaching notes returned.",
        hidden: !showCoaching,
        createdAt: new Date().toISOString(),
      };
      setMessages([...nextMessages, opponentMsg, coachMsg]);
      logReviewEvent({
        id: `debate-${sessionId.current}-${Date.now()}`,
        kind: "debate",
        refId: opponentType,
        laneSlug: null,
        correct: true,
        responseMs: Date.now() - new Date(userMsg.createdAt || new Date().toISOString()).getTime(),
        mode: `${aiSource}-ai-level-${difficulty}`,
        createdAt: new Date().toISOString(),
      });
      if (isModerator) setModeratorClosed(true);
    } catch (err: any) {
      setError(cleanAiError(err?.message));
    } finally {
      setLoading(false);
    }
  }

  function send() {
    sendMessage(input);
  }

  function requestVerdict() {
    sendMessage(MODERATOR_PROMPT, true);
  }

  async function handleSave() {
    setSaveMsg("Saving...");
    const opponent = OPPONENT_LIST.find((o) => o.type === opponentType)!;
    const result = await persistTranscript({
      id: sessionId.current,
      mode: "ai",
      opponentType,
      opponentLabel: opponent.label,
      topic: topic || undefined,
      messages,
      startedAt,
    });
    setSaveMsg(result.syncedToCloud ? "Saved locally and synced to the cloud." : "Saved locally. Sign in above to sync to the cloud too.");
    clearDraft("ai", opponentType);
  }

  function newDebate() {
    setMessages([]);
    setModeratorClosed(false);
    setStartedAt(new Date().toISOString());
    setElapsedSec(0);
    sessionId.current = crypto.randomUUID();
    localSession.current?.destroy();
    localSession.current = null;
    localSessionKey.current = "";
    clearDraft("ai", opponentType);
  }

  const mins = Math.floor(elapsedSec / 60);
  const secs = elapsedSec % 60;
  const atCap = debateMode === "moderated" && userTurns >= MAX_TURNS;
  const visibleMessages = messages.filter((m) => m.role !== "coach" || showCoaching);

  return (
    <div className="px-4 py-6 md:px-10 md:py-10 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <Link href="/debate" className="inline-flex items-center gap-1.5 text-sm text-ink-faint hover:text-ink">
          <ArrowLeft size={14} /> Debate Mode
        </Link>
        <Link href="/debate/history" className="inline-flex items-center gap-1.5 text-xs text-ink-faint hover:text-ink">
          <History size={13} /> History
        </Link>
      </div>

      <div className="mb-4">
        <p className="eyebrow mb-1">AI Debate Coach &middot; {aiSource === "local" ? "Local" : "Online"}</p>
        <h1 className="font-display text-3xl mb-2">Sparring that adapts.</h1>
        <p className="text-sm text-ink-soft max-w-2xl">
          Pure debate stays clean. Coach notes are still saved for review, and they can be shown or hidden while you train.
        </p>
      </div>

      <div className="paper-card p-3 mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow mb-1">AI source</p>
          <p className="text-xs text-ink-faint">Same debate engine. Online uses Gemini API. Local uses Chrome on-device AI.</p>
        </div>
        <div className="flex gap-1.5">
          <button onClick={() => setAiSource("local")} className={`text-xs px-3 py-2 rounded-full border inline-flex items-center gap-1.5 ${aiSource === "local" ? "bg-ink text-paper border-ink" : "border-line text-ink-faint"}`}><MonitorSmartphone size={12} /> Local</button>
          <button onClick={() => setAiSource("online")} className={`text-xs px-3 py-2 rounded-full border inline-flex items-center gap-1.5 ${aiSource === "online" ? "bg-gold text-paper border-gold" : "border-line text-ink-faint"}`}><Wifi size={12} /> Online</button>
        </div>
        {aiSource === "local" && localStatus !== "ready" && (
          <p className="basis-full text-xs text-ink-faint inline-flex items-center gap-1.5">
            {localStatus === "downloading" ? <Download size={12} /> : <MonitorSmartphone size={12} />}
            Local AI status: {localStatus}{localStatus === "downloading" ? ` ${localProgress}%` : ""}. Send a message to initialize/download when needed.
          </p>
        )}
      </div>

      <div className="mb-4">
        <AuthWidget compact />
      </div>

      <div className="grid gap-3 mb-4 md:grid-cols-[1fr_1fr_auto]">
        <select value={opponentType} onChange={(e) => setOpponentType(e.target.value as OpponentType)} className="border border-line rounded-xl px-3 py-3 text-sm bg-surface">
          {OPPONENT_LIST.map((o) => <option key={o.type} value={o.type}>{o.label}</option>)}
        </select>
        <input placeholder="Topic lock, optional" value={topic} onChange={(e) => setTopic(e.target.value)} className="border border-line rounded-xl px-3 py-3 text-sm bg-surface" />
        <button onClick={checkConnection} disabled={checking} className="btn-secondary text-xs py-3 whitespace-nowrap">
          <Wifi size={13} /> {checking ? "Checking" : aiSource === "local" ? "Check Local" : "Check Online"}
        </button>
      </div>
      {checkResult && <p className={`text-xs mb-4 ${checkResult.startsWith("Connected") ? "text-slate" : "text-rose"}`}>{checkResult}</p>}

      <div className="paper-card p-3 mb-4 grid gap-3 sm:flex sm:items-center sm:justify-between">
        <div className="flex gap-1.5 flex-wrap">
          <button
            onClick={() => setDebateMode("moderated")}
            className={`text-xs px-3 py-2 rounded-full border ${debateMode === "moderated" ? "bg-ink text-paper border-ink" : "border-line text-ink-faint"}`}
          >
            Moderated
          </button>
          <button
            onClick={() => setDebateMode("infinite")}
            className={`text-xs px-3 py-2 rounded-full border ${debateMode === "infinite" ? "bg-ink text-paper border-ink" : "border-line text-ink-faint"}`}
          >
            Infinite
          </button>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value) as 1 | 2 | 3 | 4 | 5)}
            className="text-xs px-3 py-2 rounded-full border border-line bg-surface text-ink-faint"
          >
            <option value={1}>Level 1 friendly</option>
            <option value={2}>Level 2 pastor</option>
            <option value={3}>Level 3 apologist</option>
            <option value={4}>Level 4 hostile</option>
            <option value={5}>Level 5 cross-exam</option>
          </select>
          <button
            onClick={() => setShowCoaching((v) => !v)}
            className={`text-xs px-3 py-2 rounded-full border inline-flex items-center gap-1.5 ${showCoaching ? "bg-gold text-paper border-gold" : "border-line text-ink-faint"}`}
          >
            {showCoaching ? <Eye size={12} /> : <EyeOff size={12} />}
            {showCoaching ? "Coach on" : "Pure debate"}
          </button>
        </div>
        <div className="text-xs text-ink-faint font-mono sm:text-right">
          <div>Turn {userTurns}{debateMode === "moderated" ? ` / ${MAX_TURNS}` : ""}</div>
          <div>{mins}:{secs.toString().padStart(2, "0")} elapsed</div>
        </div>
      </div>

      <div ref={scrollRef} className="paper-card p-3 sm:p-4 min-h-[340px] max-h-[58vh] overflow-y-auto mb-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-sm text-ink-faint space-y-2">
            <p>Send an opening message to start. Best opening: state your thesis in two sentences, then ask one burden-of-proof question.</p>
            <p className="inline-flex items-center gap-1.5 text-xs"><Brain size={13} /> Adaptive mode will lean into your weak lanes and recent misses.</p>
          </div>
        )}
        {visibleMessages.map((m, i) => (
          <div
            key={i}
            className={`text-sm p-3 rounded-2xl max-w-[92%] sm:max-w-[85%] ${
              m.role === "user"
                ? "bg-ink text-paper ml-auto"
                : m.role === "coach"
                  ? "bg-gold-dim text-ink border border-gold-soft"
                  : "bg-paper-dim text-ink"
            }`}
          >
            {m.role === "coach" && <p className="eyebrow mb-2 text-gold">Coach notes</p>}
            <MarkdownLite text={m.content} />
          </div>
        ))}
        {loading && <p className="text-xs text-ink-faint">Opponent is composing a response...</p>}
      </div>

      {error && <div className="paper-card p-3 mb-4 bg-rose-dim text-sm text-rose">{error}</div>}

      {atCap && !moderatorClosed && (
        <div className="paper-card p-4 mb-4 bg-gold-dim grid gap-3 sm:flex sm:items-center sm:justify-between">
          <p className="text-sm text-ink">Turn cap reached. Get the verdict before the exchange sprawls.</p>
          <button onClick={requestVerdict} disabled={loading} className="btn-gold text-xs py-2 shrink-0"><Gavel size={13} /> Get verdict</button>
        </div>
      )}

      {moderatorClosed ? (
        <div className="grid grid-cols-2 gap-2">
          <button onClick={handleSave} className="btn-primary"><Save size={14} /> Save</button>
          <button onClick={newDebate} className="btn-secondary">New debate</button>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Your response..."
            disabled={loading}
            className="flex-1 min-w-0 border border-line rounded-xl px-4 py-3 text-sm bg-surface"
          />
          <button onClick={send} disabled={loading} className="btn-primary px-4"><Send size={15} /></button>
        </div>
      )}

      {messages.length > 0 && !moderatorClosed && (
        <div className="flex gap-4 mt-3 flex-wrap">
          <button onClick={handleSave} className="text-xs text-slate underline underline-offset-4">
            <Save size={11} className="inline -mt-0.5 mr-1" /> Save transcript now
          </button>
          <button onClick={requestVerdict} disabled={loading} className="text-xs text-gold underline underline-offset-4">
            <Gavel size={11} className="inline -mt-0.5 mr-1" /> Get verdict now
          </button>
        </div>
      )}
      {saveMsg && <p className="text-xs text-ink-faint mt-2">{saveMsg}</p>}
    </div>
  );
}
