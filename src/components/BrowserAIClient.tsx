"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Download, ShieldCheck, MonitorX } from "lucide-react";
import { OPPONENT_LIST } from "@/data/debate";
import { OpponentType } from "@/types";
import { isChrome, getModelAvailability, createLocalSession } from "@/lib/browser-ai";

type Status = "checking" | "not-chrome" | "unsupported" | "unavailable" | "downloadable" | "downloading" | "available" | "session-ready";

interface Msg { role: "user" | "opponent"; content: string }

export function BrowserAIClient() {
  const [status, setStatus] = useState<Status>("checking");
  const [progress, setProgress] = useState(0);
  const [opponentType, setOpponentType] = useState<OpponentType>("trinitarian");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const sessionRef = useRef<LanguageModelSession | null>(null);

  useEffect(() => {
    (async () => {
      if (!isChrome()) {
        setStatus("not-chrome");
        return;
      }
      const availability = await getModelAvailability();
      setStatus(availability === "unsupported" ? "unsupported" : availability);
    })();

    return () => {
      sessionRef.current?.destroy();
    };
  }, []);

  async function startDownloadAndSession() {
    const opponent = OPPONENT_LIST.find((o) => o.type === opponentType)!;
    setStatus("downloading");
    try {
      const session = await createLocalSession(
        `You are simulating a debate opponent named "${opponent.label}" in a Bible study app. ${opponent.description} Ask one challenge at a time, stay in character, keep responses under 5 sentences. This conversation runs entirely on the user's device, no data leaves their machine.`,
        (pct) => setProgress(pct),
      );
      sessionRef.current = session;
      setStatus("session-ready");
    } catch (err) {
      console.error(err);
      setStatus("unavailable");
    }
  }

  async function send() {
    if (!input.trim() || !sessionRef.current) return;
    const userMsg: Msg = { role: "user", content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setThinking(true);
    try {
      const reply = await sessionRef.current.prompt(input);
      setMessages((m) => [...m, { role: "opponent", content: reply }]);
    } catch {
      setMessages((m) => [...m, { role: "opponent", content: "Local model error, try rephrasing or restart the session." }]);
    } finally {
      setThinking(false);
    }
  }

  return (
    <div className="px-5 py-8 md:px-10 md:py-10 max-w-2xl mx-auto">
      <Link href="/debate" className="inline-flex items-center gap-1.5 text-sm text-ink-faint mb-6 hover:text-ink">
        <ArrowLeft size={14} /> Debate Mode
      </Link>

      <p className="eyebrow mb-1">Browser AI Mode &middot; on-device</p>
      <h1 className="font-display text-3xl mb-2">Chrome's local model.</h1>
      <p className="text-ink-soft mb-6 max-w-md text-sm">
        Runs on Gemini Nano, built into Chrome. Nothing you type leaves your device, and once
        downloaded it works with no internet connection at all.
      </p>

      {status === "checking" && <p className="text-sm text-ink-faint">Checking this browser...</p>}

      {status === "not-chrome" && (
        <StatusCard icon={MonitorX} tone="rose" title="Not running in Chrome">
          This mode needs desktop Chrome, it's the only browser that ships Gemini Nano on-device.
          Everything else in School Master (Offline Debate Mode, Drill, Memory) works fine here,
          this one feature is Chrome-only. Open this page in Chrome to use it.
        </StatusCard>
      )}

      {status === "unsupported" && (
        <StatusCard icon={MonitorX} tone="rose" title="Prompt API not available">
          This Chrome build doesn't expose the on-device model yet. Update Chrome to the latest
          version, and if it's still missing, enable{" "}
          <code className="font-mono text-xs bg-paper-dim px-1 py-0.5 rounded">chrome://flags/#prompt-api-for-gemini-nano</code>{" "}
          and relaunch.
        </StatusCard>
      )}

      {status === "unavailable" && (
        <StatusCard icon={MonitorX} tone="rose" title="Model unavailable on this device">
          Chrome's on-device AI needs roughly 22GB of free disk space and a capable GPU or CPU.
          Free up space or try on another machine. Offline Debate Mode works regardless.
        </StatusCard>
      )}

      {(status === "downloadable" || status === "downloading") && (
        <div className="paper-card p-6">
          <p className="eyebrow mb-3">Opponent for this session</p>
          <select
            value={opponentType}
            onChange={(e) => setOpponentType(e.target.value as OpponentType)}
            className="border border-line rounded-lg px-3 py-2 text-sm bg-white w-full mb-4"
            disabled={status === "downloading"}
          >
            {OPPONENT_LIST.map((o) => <option key={o.type} value={o.type}>{o.label}</option>)}
          </select>

          {status === "downloadable" && (
            <button onClick={startDownloadAndSession} className="btn-primary w-full">
              <Download size={15} /> Download local AI (one-time, a few GB)
            </button>
          )}

          {status === "downloading" && (
            <div>
              <p className="text-sm text-ink-soft mb-2">Downloading Gemini Nano... {progress}%</p>
              <div className="h-1.5 w-full rounded-full bg-paper-dim overflow-hidden">
                <div className="h-full bg-gold rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-xs text-ink-faint mt-2">Needs an unmetered connection the first time. After this, no network required.</p>
            </div>
          )}
        </div>
      )}

      {status === "session-ready" && (
        <div>
          <div className="flex items-center gap-2 mb-4 text-xs text-slate">
            <ShieldCheck size={14} /> Running locally, on-device, offline capable.
          </div>

          <div className="paper-card p-4 min-h-[300px] max-h-[440px] overflow-y-auto mb-4 space-y-3">
            {messages.length === 0 && <p className="text-sm text-ink-faint">Send an opening message to start the debate.</p>}
            {messages.map((m, i) => (
              <div key={i} className={`text-sm p-3 rounded-xl max-w-[85%] ${m.role === "user" ? "bg-ink text-paper ml-auto" : "bg-paper-dim text-ink"}`}>
                {m.content}
              </div>
            ))}
            {thinking && <p className="text-xs text-ink-faint">Local model is thinking...</p>}
          </div>

          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Your response..."
              className="flex-1 border border-line rounded-xl px-4 py-3 text-sm bg-white"
            />
            <button onClick={send} disabled={thinking} className="btn-primary"><Send size={15} /></button>
          </div>
        </div>
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
