"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Wifi } from "lucide-react";
import { OPPONENT_LIST } from "@/data/debate";
import { OpponentType } from "@/types";

interface Msg { role: "user" | "opponent"; content: string }

export function AIDebateClient() {
  const [opponentType, setOpponentType] = useState<OpponentType>("trinitarian");
  const [topic, setTopic] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<string | null>(null);

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

  async function send() {
    if (!input.trim()) return;
    const userMsg: Msg = { role: "user", content: input };
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
      }
    } catch {
      setError("Network error reaching AI Debate Mode. Offline Debate Mode still works.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-5 py-8 md:px-10 md:py-10 max-w-2xl mx-auto">
      <Link href="/debate" className="inline-flex items-center gap-1.5 text-sm text-ink-faint mb-6 hover:text-ink">
        <ArrowLeft size={14} /> Debate Mode
      </Link>

      <p className="eyebrow mb-1">AI Debate Mode &middot; Gemini</p>
      <h1 className="font-display text-3xl mb-3">Dynamic sparring.</h1>

      <div className="flex items-center gap-3 mb-6">
        <button onClick={checkConnection} disabled={checking} className="btn-secondary text-xs py-2">
          <Wifi size={13} /> {checking ? "Checking..." : "Check connection"}
        </button>
        {checkResult && (
          <p className={`text-xs ${checkResult.startsWith("Connected") ? "text-slate" : "text-rose"}`}>{checkResult}</p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        <select value={opponentType} onChange={(e) => setOpponentType(e.target.value as OpponentType)} className="border border-line rounded-lg px-3 py-2 text-sm bg-white">
          {OPPONENT_LIST.map((o) => <option key={o.type} value={o.type}>{o.label}</option>)}
        </select>
        <input placeholder="Topic lock (optional)" value={topic} onChange={(e) => setTopic(e.target.value)} className="border border-line rounded-lg px-3 py-2 text-sm bg-white" />
      </div>

      <div className="paper-card p-4 min-h-[300px] max-h-[440px] overflow-y-auto mb-4 space-y-3">
        {messages.length === 0 && <p className="text-sm text-ink-faint">Send an opening message to start the debate.</p>}
        {messages.map((m, i) => (
          <div key={i} className={`text-sm p-3 rounded-xl max-w-[85%] ${m.role === "user" ? "bg-ink text-paper ml-auto" : "bg-paper-dim text-ink"}`}>
            {m.content}
          </div>
        ))}
        {loading && <p className="text-xs text-ink-faint">Opponent is composing a response...</p>}
      </div>

      {error && <div className="paper-card p-3 mb-4 bg-rose-dim text-sm text-rose">{error}</div>}

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Your response..."
          className="flex-1 border border-line rounded-xl px-4 py-3 text-sm bg-white"
        />
        <button onClick={send} disabled={loading} className="btn-primary"><Send size={15} /></button>
      </div>
    </div>
  );
}
