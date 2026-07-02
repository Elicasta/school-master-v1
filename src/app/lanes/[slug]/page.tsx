import Link from "next/link";
import { notFound } from "next/navigation";
import { getLane, LANE_LIST } from "@/data/lanes";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return LANE_LIST.map((l) => ({ slug: l.slug }));
}

export default function LaneDetailPage({ params }: { params: { slug: string } }) {
  const lane = getLane(params.slug);
  if (!lane) notFound();

  return (
    <div className="px-5 py-8 md:px-10 md:py-10 max-w-3xl mx-auto">
      <Link href="/lanes" className="inline-flex items-center gap-1.5 text-sm text-ink-faint mb-6 hover:text-ink">
        <ArrowLeft size={14} /> All lanes
      </Link>

      <p className="eyebrow mb-2">Lane {lane.order.toString().padStart(2, "0")}</p>
      <h1 className="font-display text-3xl md:text-4xl mb-3">{lane.title}</h1>
      <p className="text-ink-soft mb-2 leading-relaxed">{lane.summary}</p>
      <p className="text-sm font-mono text-gold mb-8">Goal: {lane.goal}</p>

      <div className="flex gap-3 mb-10">
        <Link href={`/drill?lane=${lane.slug}`} className="btn-primary">Drill this lane</Link>
        <Link href={`/memory?lane=${lane.slug}`} className="btn-secondary">Memory review</Link>
      </div>

      <section className="mb-10">
        <p className="eyebrow mb-3">Verses ({lane.verses.length})</p>
        <div className="space-y-3">
          {lane.verses.map((v) => (
            <div key={v.id} className="paper-card p-4">
              <div className="flex items-baseline justify-between gap-3 mb-1">
                <p className="font-display text-base">{v.reference}</p>
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${v.role === "anchor" ? "bg-gold-dim text-gold" : "bg-slate-dim text-slate"}`}>
                  {v.role}
                </span>
              </div>
              <p className="text-sm text-ink-soft italic mb-2">&ldquo;{v.text}&rdquo;</p>
              <p className="text-xs text-ink-faint">{v.function}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <p className="eyebrow mb-3">Objections &amp; answer paths</p>
        <div className="space-y-4">
          {lane.objections.map((o) => (
            <div key={o.id} className="paper-card p-4">
              <p className="text-sm mb-2"><span className="font-mono text-xs text-rose uppercase mr-2">Objection</span>{o.statement}</p>
              <p className="text-sm text-ink-soft"><span className="font-mono text-xs text-slate uppercase mr-2">Answer</span>{o.answerPath}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <p className="eyebrow mb-3">Debate prompts</p>
        <ul className="space-y-2">
          {lane.debatePrompts.map((p, i) => (
            <li key={i} className="text-sm text-ink-soft paper-card p-3">{p}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
