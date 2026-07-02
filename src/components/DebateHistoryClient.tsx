"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2, Cloud, HardDrive } from "lucide-react";
import { DebateTranscript, getTranscripts, deleteTranscript } from "@/lib/local-store";
import { MarkdownLite } from "@/components/MarkdownLite";
import { AuthWidget } from "@/components/AuthWidget";
import { createClient } from "@/lib/supabase/client";

interface CloudSession {
  id: string;
  opponent_type: string;
  topic: string | null;
  created_at: string;
}

export function DebateHistoryClient() {
  const [local, setLocal] = useState<DebateTranscript[]>([]);
  const [cloud, setCloud] = useState<CloudSession[]>([]);
  const [signedIn, setSignedIn] = useState(false);
  const [active, setActive] = useState<{ kind: "local"; t: DebateTranscript } | { kind: "cloud"; id: string; messages: { role: string; content: string }[] } | null>(null);

  useEffect(() => {
    setLocal(getTranscripts());
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      setSignedIn(true);
      const res = await fetch("/api/debate/sessions");
      if (res.ok) {
        const json = await res.json();
        setCloud(json.sessions ?? []);
      }
    });
  }, []);

  async function openCloud(id: string) {
    const res = await fetch(`/api/debate/sessions?id=${id}`);
    if (res.ok) {
      const json = await res.json();
      setActive({ kind: "cloud", id, messages: json.messages });
    }
  }

  function removeLocal(id: string) {
    deleteTranscript(id);
    setLocal(getTranscripts());
    if (active?.kind === "local" && active.t.id === id) setActive(null);
  }

  return (
    <div className="px-5 py-8 md:px-10 md:py-10 max-w-4xl mx-auto">
      <Link href="/debate" className="inline-flex items-center gap-1.5 text-sm text-ink-faint mb-6 hover:text-ink">
        <ArrowLeft size={14} /> Debate Mode
      </Link>

      <p className="eyebrow mb-2">Debate History</p>
      <h1 className="font-display text-3xl mb-4">Saved transcripts.</h1>

      <div className="mb-8"><AuthWidget /></div>

      <div className="grid md:grid-cols-[280px_1fr] gap-6">
        <div className="space-y-4">
          {local.length === 0 && cloud.length === 0 && (
            <p className="text-sm text-ink-faint">No saved transcripts yet. Hit "Save transcript" during a debate.</p>
          )}

          {local.length > 0 && (
            <div>
              <p className="text-xs font-mono uppercase text-ink-faint mb-2 flex items-center gap-1.5"><HardDrive size={12} /> On this device</p>
              <div className="space-y-2">
                {local.map((t) => (
                  <div key={t.id} className="paper-card p-3 flex items-center justify-between gap-2">
                    <button onClick={() => setActive({ kind: "local", t })} className="text-left flex-1 min-w-0">
                      <p className="text-sm truncate">{t.opponentLabel}</p>
                      <p className="text-xs text-ink-faint">{new Date(t.updatedAt).toLocaleDateString()} &middot; {t.messages.length} msgs</p>
                    </button>
                    <button onClick={() => removeLocal(t.id)} className="text-ink-faint hover:text-rose shrink-0"><Trash2 size={13} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {signedIn && cloud.length > 0 && (
            <div>
              <p className="text-xs font-mono uppercase text-ink-faint mb-2 flex items-center gap-1.5"><Cloud size={12} /> Synced</p>
              <div className="space-y-2">
                {cloud.map((s) => (
                  <button key={s.id} onClick={() => openCloud(s.id)} className="paper-card p-3 text-left w-full">
                    <p className="text-sm truncate">{s.opponent_type}</p>
                    <p className="text-xs text-ink-faint">{new Date(s.created_at).toLocaleDateString()}{s.topic ? ` \u00b7 ${s.topic}` : ""}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="paper-card p-5 min-h-[300px]">
          {!active && <p className="text-sm text-ink-faint">Select a transcript to read it.</p>}
          {active?.kind === "local" && (
            <div className="space-y-3">
              {active.t.messages.map((m, i) => (
                <div key={i} className={`text-sm p-3 rounded-xl max-w-[85%] ${m.role === "user" ? "bg-ink text-paper ml-auto" : "bg-paper-dim text-ink"}`}>
                  <MarkdownLite text={m.content} />
                </div>
              ))}
            </div>
          )}
          {active?.kind === "cloud" && (
            <div className="space-y-3">
              {active.messages.map((m, i) => (
                <div key={i} className={`text-sm p-3 rounded-xl max-w-[85%] ${m.role === "user" ? "bg-ink text-paper ml-auto" : "bg-paper-dim text-ink"}`}>
                  <MarkdownLite text={m.content} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
