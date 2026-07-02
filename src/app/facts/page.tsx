"use client";

import { useState } from "react";
import { CHURCH_FATHERS } from "@/data/facts/church-fathers";
import { DOCTRINE_COMPARISONS, TIMELINE } from "@/data/facts/doctrine-comparisons";

type Tab = "timeline" | "fathers" | "comparisons";

export default function FactsPage() {
  const [tab, setTab] = useState<Tab>("timeline");

  return (
    <div className="px-5 py-8 md:px-10 md:py-10 max-w-4xl mx-auto">
      <p className="eyebrow mb-2">Facts Library</p>
      <h1 className="font-display text-3xl md:text-4xl mb-6">Reference, not opinion.</h1>

      <div className="flex gap-2 mb-8">
        {(["timeline", "fathers", "comparisons"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`text-sm px-4 py-2 rounded-full border ${tab === t ? "bg-ink text-paper border-ink" : "border-line text-ink-soft"}`}
          >
            {t === "timeline" ? "Timeline" : t === "fathers" ? "Church Fathers" : "Doctrine Comparison"}
          </button>
        ))}
      </div>

      {tab === "timeline" && (
        <div className="space-y-0">
          {TIMELINE.map((e, i) => (
            <div key={e.id} className="flex gap-4 pb-6 relative">
              <div className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-gold shrink-0 mt-1.5" />
                {i < TIMELINE.length - 1 && <div className="w-px bg-line flex-1 mt-1" />}
              </div>
              <div className="pb-1">
                <p className="font-mono text-xs text-ink-faint">{e.year}</p>
                <p className="font-display text-base mb-1">{e.label}</p>
                <p className="text-sm text-ink-soft">{e.detail}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "fathers" && (
        <div className="space-y-4">
          {CHURCH_FATHERS.map((f) => (
            <details key={f.id} className="paper-card p-5 group">
              <summary className="cursor-pointer list-none flex items-center justify-between">
                <div>
                  <p className="font-display text-lg">{f.name}</p>
                  <p className="text-xs text-ink-faint font-mono">{f.dates} &middot; {f.location}</p>
                </div>
                <span className="text-ink-faint text-sm group-open:rotate-180 transition-transform">&#9662;</span>
              </summary>
              <div className="mt-4 space-y-3 text-sm">
                <Field label="Writings" value={f.writings.join(", ")} />
                <Field label="Doctrine of God" value={f.doctrineOfGod} />
                <Field label="Doctrine of Christ" value={f.doctrineOfChrist} />
                <Field label="How Trinitarians use him" value={f.trinitarianUse} />
                <Field label="Oneness response" value={f.onenessResponse} />
                <Field label="Cautions" value={f.cautions} accent />
              </div>
            </details>
          ))}
        </div>
      )}

      {tab === "comparisons" && (
        <div className="grid md:grid-cols-2 gap-4">
          {DOCTRINE_COMPARISONS.map((c) => (
            <div key={c.id} className="paper-card p-5">
              <p className="font-display text-lg mb-3">{c.name}</p>
              <div className="space-y-2 text-sm">
                <Field label="View of God" value={c.viewOfGod} compact />
                <Field label="View of Jesus" value={c.viewOfJesus} compact />
                <Field label="View of Holy Spirit" value={c.viewOfHolySpirit} compact />
                <Field label="View of Salvation" value={c.viewOfSalvation} compact />
                <Field label="Key verses" value={c.keyVerses.join(", ")} compact />
                <Field label="Main weakness" value={c.mainWeakness} compact accent />
                <Field label="Apostolic response" value={c.apostolicResponse} compact accent />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({ label, value, accent, compact }: { label: string; value: string; accent?: boolean; compact?: boolean }) {
  return (
    <div>
      <p className={`text-xs font-mono uppercase mb-0.5 ${accent ? "text-gold" : "text-ink-faint"}`}>{label}</p>
      <p className={compact ? "text-xs text-ink-soft" : "text-sm text-ink-soft"}>{value}</p>
    </div>
  );
}
