"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpenText, Compass, Search, Sparkles } from "lucide-react";
import { ATLAS_TOPICS } from "@/data/atlas";

export function AtlasExplorer() {
  const [selectedId, setSelectedId] = useState("isaiah-48-16");
  const [query, setQuery] = useState("");
  const matches = useMemo(() => ATLAS_TOPICS.filter((topic) =>
    [topic.title, topic.family, topic.summary].join(" ").toLowerCase().includes(query.toLowerCase().trim())
  ), [query]);
  const selected = ATLAS_TOPICS.find((topic) => topic.id === selectedId) || ATLAS_TOPICS[0];
  const matchIds = new Set(matches.map((topic) => topic.id));

  return (
    <main className="atlas-shell">
      <div className="atlas-heading">
        <div className="atlas-wordmark"><span className="atlas-star-symbol">✳</span> SCHOOLMASTER <span>/</span> EVIDENCE ATLAS</div>
        <span className="atlas-version">RESEARCH EDITION · V2</span>
      </div>
      <section className="atlas-intro">
        <p className="atlas-overline">SCRIPTURE. CONTEXT. CLAIMS. EVIDENCE.</p>
        <h1>Every argument has<br /><em>a point of origin.</em></h1>
        <p>Explore the passages behind major debates about the nature of God. Follow what the text says, where interpretations differ, and which conclusions require another step.</p>
      </section>
      <div className="atlas-stage">
        <div className="atlas-universe">
          <div className="atlas-space-grid" aria-hidden="true" />
          <div className="atlas-core-glow" aria-hidden="true" />
          <div className="atlas-core" aria-hidden="true"><div className="atlas-core-inner"><span>THE</span><strong>NATURE<br />OF GOD</strong><small>12 questions orbiting<br />one central inquiry</small></div></div>
          <svg className="atlas-connections" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <circle cx="50" cy="50" r="30" fill="none" stroke="#83b7d4" strokeOpacity=".11" strokeWidth=".15" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="#83b7d4" strokeOpacity=".07" strokeWidth=".13" />
            {ATLAS_TOPICS.map((topic) => (
              <line key={topic.id} x1="50" y1="50" x2={topic.x} y2={topic.y}
                stroke={topic.id === selectedId ? "#d8b68c" : "#7190b5"}
                strokeOpacity={topic.id === selectedId ? ".72" : ".24"}
                strokeWidth={topic.id === selectedId ? ".35" : ".14"} />
            ))}
          </svg>
          {ATLAS_TOPICS.map((topic) => (
            <button
              type="button"
              key={topic.id}
              className={"atlas-node " + (selectedId === topic.id ? "is-selected " : "") + (!matchIds.has(topic.id) ? "is-muted" : "")}
              style={{ left: topic.x + "%", top: topic.y + "%" }}
              aria-pressed={selectedId === topic.id}
              title={topic.family + ": " + topic.title}
              onClick={() => setSelectedId(topic.id)}
            >
              <span className="atlas-node-orbit" />
              <span className="atlas-node-dot" />
              <span className="atlas-node-label">{topic.family}</span>
            </button>
          ))}
          <div className="atlas-orbit-caption">SELECT A POINT TO EXAMINE ITS CLAIM</div>
        </div>
        <aside className="atlas-detail" aria-live="polite">
          <span className="atlas-detail-index">FOCUS / {String(ATLAS_TOPICS.findIndex((t) => t.id === selected.id) + 1).padStart(2, "0")}</span>
          <p className="atlas-detail-reference">{selected.family}</p>
          <h2>{selected.title}</h2>
          <p className="atlas-detail-desc">{selected.summary}</p>
          <div className="atlas-rule" />
          {selected.status === "case-draft" && selected.caseSlug ? (
            <>
              <span className="atlas-detail-status"><span className="atlas-status-dot" /> CASE STUDY AVAILABLE · RESEARCH DRAFT</span>
              <p className="atlas-detail-small">Read the full passage, compare the strongest interpretations, and inspect source documentation.</p>
              <Link className="atlas-link-primary" href={"/atlas/" + selected.caseSlug}>Enter the evidence <ArrowUpRight size={17} /></Link>
            </>
          ) : (
            <>
              <span className="atlas-detail-status"><span className="atlas-status-dot atlas-status-pending" /> ARGUMENT MAPPED · RESEARCH PENDING</span>
              <p className="atlas-detail-small">This topic is indexed for future research. No completed analysis or verdict is being claimed.</p>
              <Link className="atlas-link-subtle" href="/debate/trinitarian">Practice in Schoolmaster <ArrowRight size={16} /></Link>
            </>
          )}
          <div className="atlas-detail-foot">READ THE TEXT <span>→</span> IDENTIFY THE CLAIM <span>→</span> TEST THE INFERENCE</div>
        </aside>
      </div>
      <section className="atlas-index">
        <div className="atlas-index-top">
          <div><p className="atlas-overline">ARGUMENT INDEX</p><h2>Explore by passage.</h2></div>
          <label className="atlas-search"><Search size={17} /><span className="atlas-sr-only">Search arguments</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search passages and claims..." /></label>
        </div>
        <div className="atlas-index-grid">
          {matches.map((topic, index) => (
            <button key={topic.id} type="button" onClick={() => { setSelectedId(topic.id); document.getElementById("atlas-focus")?.scrollIntoView({ behavior: "smooth", block: "center" }); }}
              className={"atlas-index-item " + (selected.id === topic.id ? "is-active" : "")}>
              <span className="atlas-index-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="atlas-index-title"><strong>{topic.family}</strong><small>{topic.title}</small></span>
              <span className="atlas-index-state">{topic.status === "case-draft" ? "READ CASE" : "MAPPED"}</span>
              <ArrowUpRight size={16} />
            </button>
          ))}
          {matches.length === 0 && <p className="atlas-empty">No mapped argument matches that search.</p>}
        </div>
      </section>
      <div className="atlas-footer"><div><Compass size={19} /> THE ATLAS IS AN EVIDENCE GUIDE, NOT AN AUTOMATED VERDICT.</div><div><BookOpenText size={17} /> <Link href="/lanes">Doctrine curriculum</Link><span>·</span><Sparkles size={17} /><Link href="/debate">Debate practice</Link></div></div>
      <span id="atlas-focus" className="atlas-scroll-target" />
    </main>
  );
}
