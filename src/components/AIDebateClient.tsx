"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Wifi, Save, Gavel, History } from "lucide-react";
import { OPPONENT_LIST } from "@/data/debate";
import { OpponentType } from "@/types";
import { MarkdownLite } from "@/components/MarkdownLite";
import { AuthWidget } from "@/components/AuthWidget";
import { getDraft, saveDraft, clearDraft, DebateMessage } from "@/lib/local-store";
import { persistTranscript } from "@/lib/persist-transcript";

const MAX_TURNS = 8; // moderator steps in after this many user turns in Moderated mode
const MODERATOR_PROMPT =
  "MODERATOR: Wrap up this debate now. Give a final verdict: summarize the strongest point each side made, then score the user's overall performance on clarity, scripture use, logic, and fairness (1-5 each) with one sentence of coaching for next time.";

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(crypto.randomUUID());

  const userTurns = messages.filter((m) => m.role === "user").length;

  // Restore an in-progress draft when switching back to this opponent (fixes the
  // "chat disappears when I navigate away" problem).
  useEffect(() => {
    const draft = getDraft("ai", opponentType);
    setMessages(draft);
    setModeratorClosed(false);
  }, [opponentType]);

  // Elapsed timer only runs once the debate actually has a message, not from the
  // moment the page loads, that was the "timer starts automatically" bug.
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
  }, [messages]);

  async function checkConnection() {
    setChecking(true);
    setCheckResult(null);
    try {
      const res = await fetch("/api/debate/gemini/status");
      const data = await res.json();
      setCheckResult(data.ok ? "Connected. Gemini responded correctly." : `Not working: ${data.reason}`);
    } catch {
      setCheckResult("Not working: network error reaching the status endpoint.");
    } finally {
      setChecking(false);
    }
  }

  async function sendMessage(text: string, isModerator = false) {
    if (!text.trim()) return;
    const userMsg: DebateMessage = { role: "user", content: text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/debate/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          opponentType,
          topic: topic || undefined,
          history: messages,
          userMessage: userMsg.content,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "AI Debate Mode failed.");
      } else {
        setMessages([...nextMessages, { role: "opponent", content: data.reply }]);
        if (isModerator) setModeratorClosed(true);
      }
    } catch {
      setError("Network error reaching AI Debate Mode. Offline Debate Mode still works.");
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
    clearDraft("ai", opponentType);
  }

  const mins = Math.floor(elapsedSec / 60);
  const secs = elapsedSec % 60;
  const atCap = debateMode === "moderated" && userTurns >= MAX_TURNS;

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

      <p className="eyebrow mb-1">AI Debate Mode &middot; Gemini</p>
      <h1 className="font-display text-3xl mb-3">Dynamic sparring.</h1>

      <div className="mb-4">
        <AuthWidget compact />
      </div>

      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <button onClick={checkConnection} disabled={checking} className="btn-secondary text-xs py-2">
          <Wifi size={13} /> {checking ? "Checking..." : "Check connection"}
        </button>
        {checkResult && (
          <p className={`text-xs ${checkResult.startsWith("Connected") ? "text-slate" : "text-rose"}`}>{checkResult}</p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <select value={opponentType} onChange={(e) => setOpponentType(e.target.value as OpponentType)} className="border border-line rounded-lg px-3 py-2 text-sm bg-surface">
          {OPPONENT_LIST.map((o) => <option key={o.type} value={o.type}>{o.label}</option>)}
        </select>
        <input placeholder="Topic lock (optional)" value={topic} onChange={(e) => setTopic(e.target.value)} className="border border-line rounded-lg px-3 py-2 text-sm bg-surface" />
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-1.5">
          <button
            onClick={() => setDebateMode("moderated")}
            className={`text-xs px-3 py-1.5 rounded-full border ${debateMode === "moderated" ? "bg-ink text-paper border-ink" : "border-line text-ink-faint"}`}
          >
            Moderated
          </button>
          <button
            onClick={() => setDebateMode("infinite")}
            className={`text-xs px-3 py-1.5 rounded-full border ${debateMode === "infinite" ? "bg-ink text-paper border-ink" : "border-line text-ink-faint"}`}
          >
            Infinite
          </button>
        </div>
        <div className="text-xs text-ink-faint font-mono text-right">
          <div>Turn {userTurns}{debateMode === "moderated" ? ` / ${MAX_TURNS}` : ""}</div>
          <div>{mins}:{secs.toString().padStart(2, "0")} elapsed</div>
        </div>
      </div>

      <div ref={scrollRef} className="paper-card p-4 min-h-[300px] max-h-[440px] overflow-y-auto mb-4 space-y-3">
        {messages.length === 0 && <p className="text-sm text-ink-faint">Send an opening message to start the debate.</p>}
        {messages.map((m, i) => (
          <div key={i} className={`text-sm p-3 rounded-xl max-w-[85%] ${m.role === "user" ? "bg-ink text-paper ml-auto" : "bg-paper-dim text-ink"}`}>
            <MarkdownLite text={m.content} />
          </div>
        ))}
        {loading && <p className="text-xs text-ink-faint">Opponent is composing a response...</p>}
      </div>

      {error && <div className="paper-card p-3 mb-4 bg-rose-dim text-sm text-rose">{error}</div>}

      {atCap && !moderatorClosed && (
        <div className="paper-card p-4 mb-4 bg-gold-dim flex items-center justify-between gap-3">
          <p className="text-sm text-ink">Turn cap reached, this debate has run long enough to lose focus.</p>
          <button onClick={requestVerdict} disabled={loading} className="btn-gold text-xs py-2 shrink-0"><Gavel size={13} /> Get verdict</button>
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
            disabled={loading}
            className="flex-1 border border-line rounded-xl px-4 py-3 text-sm bg-surface"
          />
          <button onClick={send} disabled={loading} className="btn-primary"><Send size={15} /></button>
        </div>
      )}

      {messages.length > 0 && !moderatorClosed && (
        <div className="flex gap-4 mt-3">
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
