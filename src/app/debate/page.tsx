import Link from "next/link";
import { Sparkles, MonitorSmartphone } from "lucide-react";
import { OPPONENT_LIST } from "@/data/debate";

export default function DebateOpponentsPage() {
  return (
    <div className="px-5 py-8 md:px-10 md:py-10 max-w-4xl mx-auto">
      <p className="eyebrow mb-2">Debate Mode</p>
      <h1 className="font-display text-3xl md:text-4xl mb-2">Pick your opponent.</h1>
      <p className="text-ink-soft mb-6 max-w-xl">
        One opponent at a time, organized by topic so you're never debating everyone at once.
      </p>

      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        <Link href="/debate/ai" className="paper-card p-4 flex items-center gap-3 hover:bg-paper-dim transition-colors">
          <Sparkles size={18} className="text-gold shrink-0" />
          <div>
            <p className="font-display text-base">AI Debate Mode</p>
            <p className="text-xs text-ink-faint">Gemini, dynamic, needs GEMINI_API_KEY</p>
          </div>
        </Link>
        <Link href="/debate/browser-ai" className="paper-card p-4 flex items-center gap-3 hover:bg-paper-dim transition-colors">
          <MonitorSmartphone size={18} className="text-slate shrink-0" />
          <div>
            <p className="font-display text-base">Browser AI Mode</p>
            <p className="text-xs text-ink-faint">Chrome on-device, fully offline, no key needed</p>
          </div>
        </Link>
      </div>

      <p className="eyebrow mb-3">Offline Debate Mode &middot; stored argument trees</p>
      <div className="grid sm:grid-cols-2 gap-3">
        {OPPONENT_LIST.map((o) => (
          <Link
            key={o.type}
            href={`/debate/${o.type}`}
            className={`paper-card p-5 transition-colors ${o.topics.length > 0 ? "hover:bg-paper-dim" : "opacity-60"}`}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="font-display text-lg">{o.label}</p>
              {o.topics.length === 0 && (
                <span className="text-[10px] font-mono uppercase text-ink-faint border border-line rounded-full px-2 py-0.5">
                  Next pass
                </span>
              )}
            </div>
            <p className="text-sm text-ink-soft">{o.description}</p>
            {o.topics.length > 0 && (
              <p className="mt-3 text-xs text-gold font-mono">{o.topics.length} topics ready</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
