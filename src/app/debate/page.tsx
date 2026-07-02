import Link from "next/link";
import { OPPONENT_LIST } from "@/data/debate";

export default function DebateOpponentsPage() {
  return (
    <div className="px-5 py-8 md:px-10 md:py-10 max-w-4xl mx-auto">
      <p className="eyebrow mb-2">Debate Mode</p>
      <h1 className="font-display text-3xl md:text-4xl mb-2">Pick your opponent.</h1>
      <p className="text-ink-soft mb-8 max-w-xl">
        One opponent at a time, organized by topic so you're never debating everyone at once.
      </p>

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
