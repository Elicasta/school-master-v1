import Link from "next/link";
import { LANE_LIST, EXPANDABLE_LANE_GROUPS } from "@/data/lanes";

export default function LanesPage() {
  return (
    <div className="px-5 py-8 md:px-10 md:py-10 max-w-6xl mx-auto">
      <p className="eyebrow mb-2">Doctrine Lanes</p>
      <h1 className="font-display text-3xl md:text-4xl mb-2">The first eight, plus 31 more.</h1>
      <p className="text-ink-soft mb-8 max-w-xl">
        Command of the battlefield starts here. Each lane is a route, not a pile of verses: anchor
        verses, objections, an answer path, and drills. The first 8 below are the daily-study
        core, full depth, seven drill levels. The 31 expandable lanes past them are real content
        too, scoped a bit lighter, not placeholders.
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
        Real verses, an objection with an answer path, and drills for each, not yet wired into the
        Drill Mode lane picker or the Memory Mode daily deck, but fully browsable and studyable
        here.
      </p>
      {EXPANDABLE_LANE_GROUPS.map((group) => (
        <div key={group.category} className="mb-8">
          <p className="text-xs font-mono uppercase tracking-wide text-ink-faint mb-3">{group.category}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {group.lanes.map((lane) => (
              <Link key={lane.slug} href={`/lanes/${lane.slug}`} className="paper-card p-4 hover:bg-paper-dim transition-colors">
                <p className="font-display text-base mb-1">{lane.title}</p>
                <p className="text-xs text-ink-soft line-clamp-2">{lane.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
