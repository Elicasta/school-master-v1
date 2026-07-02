import Link from "next/link";
import { LANE_LIST, FUTURE_LANES } from "@/data/lanes";

export default function LanesPage() {
  const categories = Array.from(new Set(FUTURE_LANES.map((l) => l.category)));

  return (
    <div className="px-5 py-8 md:px-10 md:py-10 max-w-6xl mx-auto">
      <p className="eyebrow mb-2">Doctrine Lanes</p>
      <h1 className="font-display text-3xl md:text-4xl mb-2">The first eight.</h1>
      <p className="text-ink-soft mb-8 max-w-xl">
        Command of the battlefield starts here. Each lane is a route, not a pile of verses: anchor
        verses, objections, an answer path, and drills across seven levels.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
        {LANE_LIST.map((lane) => (
          <Link key={lane.slug} href={`/lanes/${lane.slug}`} className="paper-card p-5 hover:bg-paper-dim transition-colors">
            <p className="font-mono text-xs text-ink-faint mb-2">Lane {lane.order.toString().padStart(2, "0")}</p>
            <p className="font-display text-xl mb-2">{lane.title}</p>
            <p className="text-sm text-ink-soft line-clamp-3">{lane.summary}</p>
            <p className="mt-3 text-xs text-ink-faint font-mono">{lane.verses.length} verses &middot; {lane.drillQuestions.length} drills</p>
          </Link>
        ))}
      </div>

      <p className="eyebrow mb-3">Expandable lanes</p>
      <p className="text-sm text-ink-faint mb-6 max-w-xl">
        These unlock as your mastery grows. Structure is in place now, full content ships in the next pass.
      </p>
      {categories.map((cat) => (
        <div key={cat} className="mb-6">
          <p className="text-xs font-mono uppercase tracking-wide text-ink-faint mb-2">{cat}</p>
          <div className="flex flex-wrap gap-2">
            {FUTURE_LANES.filter((l) => l.category === cat).map((l) => (
              <span key={l.slug} className="text-xs px-3 py-1.5 rounded-full border border-line text-ink-faint bg-white/50">
                {l.title}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
