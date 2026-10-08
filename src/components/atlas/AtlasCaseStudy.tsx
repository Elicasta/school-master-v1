"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BookMarked, ExternalLink, Scale, ScrollText } from "lucide-react";
import { isaiah4816 } from "@/data/atlas/cases";

type Panel = "passage" | "evidence" | "interpretations" | "sources";
const panels: Array<{ id: Panel; label: string }> = [
  { id: "passage", label: "01 / Passage" },
  { id: "evidence", label: "02 / Evidence" },
  { id: "interpretations", label: "03 / Readings" },
  { id: "sources", label: "04 / Sources" },
];

export function AtlasCaseStudy() {
  const study = isaiah4816;
  const [panel, setPanel] = useState<Panel>("passage");
  const [verse, setVerse] = useState(16);
  const activeVerse = study.verses.find((item) => item.number === verse)!;
  const sourceById = new Map(study.sources.map((source) => [source.id, source]));

  function sourceLinks(ids: string[]) {
    return <div className="atlas-citations">{ids.map((id) => {
      const source = sourceById.get(id);
      return source ? <a key={id} href={source.url} target="_blank" rel="noopener noreferrer" title={source.title}>
        {source.publisher} <ExternalLink size={12} />
      </a> : null;
    })}</div>;
  }

  return (
    <main className="atlas-shell atlas-case-page">
      <div className="atlas-case-top">
        <Link href="/atlas" className="atlas-back"><ArrowLeft size={16} /> Back to the atlas</Link>
        <span className="atlas-version">CASE 001 / RESEARCH DRAFT</span>
      </div>
      <header className="atlas-case-hero">
        <div className="atlas-case-mark" aria-hidden="true"><span>48</span><small>16</small></div>
        <p className="atlas-overline">IDENTITY · SENDING · SPIRIT</p>
        <h1>{study.title}</h1>
        <p>{study.subtitle}</p>
        <div className="atlas-case-meta"><span><BookMarked size={15} /> {study.passage} · KJV</span><span><Scale size={15} /> Competing interpretations included</span><span><ScrollText size={15} /> {study.sources.length} primary / research sources</span></div>
      </header>
      <div className="atlas-case-question">
        <span>THE QUESTION</span><p>{study.centralQuestion}</p>
      </div>
      <nav className="atlas-case-tabs" aria-label="Case sections">
        {panels.map((item) => <button key={item.id} type="button" onClick={() => setPanel(item.id)}
          aria-pressed={panel === item.id} className={panel === item.id ? "is-active" : ""}>{item.label}</button>)}
      </nav>
      <div className="atlas-case-body">
        {panel === "passage" && (
          <div className="atlas-reading-layout">
            <section className="atlas-scripture">
              <div className="atlas-section-label">THE TEXT / {study.translation}</div>
              <h2>Read the whole movement.</h2>
              <p className="atlas-body-lede">{study.framing}</p>
              <div className="atlas-verse-list">
                {study.verses.map((item) => <button key={item.number} type="button" onClick={() => setVerse(item.number)} aria-pressed={verse === item.number} className={"atlas-verse " + (verse === item.number ? "is-active" : "")}>
                  <span>{item.number}</span><p>{item.text}</p>
                </button>)}
              </div>
              <a className="atlas-source-action" href={study.sources[0].url} target="_blank" rel="noopener noreferrer">Check the primary passage <ExternalLink size={15} /></a>
            </section>
            <aside className="atlas-reader-note">
              <div className="atlas-section-label">ACTIVE VERSE / {verse}</div><h3>Follow the speaker.</h3><p>{activeVerse.readingNote}</p><div className="atlas-reader-rule" /><small>Select any verse to see its interpretive question. Verse 16 is not isolated from the surrounding chapter.</small>
            </aside>
          </div>
        )}
        {panel === "evidence" && (
          <section className="atlas-evidence-panel">
            <div className="atlas-section-label">OBSERVATION → INTERPRETATION → INFERENCE</div>
            <h2>Where does the conclusion come from?</h2>
            <p className="atlas-body-lede">Textual observations, interpretations, and theological inferences are different kinds of claims. They should not be treated as interchangeable.</p>
            <div className="atlas-evidence-steps">{study.points.map((point, index) => (
              <article key={point.id} className="atlas-evidence-step">
                <div className="atlas-evidence-step-num">{String(index + 1).padStart(2, "0")}</div>
                <div><span className={"atlas-level atlas-level-" + point.level}>{point.level}</span><h3>{point.label}</h3><p>{point.observation}</p><strong>Question to test</strong><p className="atlas-evidence-question">{point.question}</p>{sourceLinks(point.sourceIds)}</div>
              </article>
            ))}</div>
          </section>
        )}
        {panel === "interpretations" && (
          <section className="atlas-interpretations-panel">
            <div className="atlas-section-label">THREE RELEVANT READINGS</div>
            <h2>Represent the other side accurately.</h2>
            <p className="atlas-body-lede">The readings below are competing interpretations, not three statements that all scholars endorse. Each receives its strongest case and an unresolved difficulty.</p>
            <div className="atlas-readings-grid">{study.interpretations.map((reading, index) => (
              <article key={reading.id} className="atlas-reading-card">
                <span className="atlas-reading-num">READING {String(index + 1).padStart(2, "0")}</span>
                <h3>{reading.name}</h3><small>{reading.viewpoint}</small>
                <h4>The claim</h4><p>{reading.thesis}</p>
                <h4>The reasoning</h4><p>{reading.argument}</p>
                <h4>The challenge</h4><p>{reading.challenge}</p>
                {sourceLinks(reading.sourceIds)}
              </article>
            ))}</div>
          </section>
        )}
        {panel === "sources" && (
          <section className="atlas-sources-panel">
            <div className="atlas-section-label">TRACEABLE EVIDENCE</div><h2>Read the sources yourself.</h2><p className="atlas-body-lede">A claim without a source is not ready for the public evidence library. Open each resource and inspect it in context.</p>
            <div className="atlas-sources-list">{study.sources.map((source, index) => (
              <a key={source.id} href={source.url} target="_blank" rel="noopener noreferrer" className="atlas-source-card">
                <span>{String(index + 1).padStart(2, "0")} / {source.kind.replace("-", " ")}</span><h3>{source.title}</h3><p>{source.context}</p><small>{source.publisher} <ArrowUpRight size={14} /></small>
              </a>
            ))}</div>
          </section>
        )}
      </div>
      <footer className="atlas-case-conclusion">
        <div><span className="atlas-section-label">CURRENT ASSESSMENT · DRAFT, NOT A VERDICT</span><h2>What does this establish?</h2><p>{study.finding}</p></div>
        <div><span className="atlas-section-label">QUESTIONS STILL OPEN</span><ul>{study.unresolved.map((question) => <li key={question}>{question}</li>)}</ul></div>
      </footer>
      <div className="atlas-case-bottom"><Link href="/atlas"><ArrowLeft size={16} /> All arguments</Link><Link href="/debate/trinitarian">Practice the discussion <ArrowUpRight size={17} /></Link></div>
    </main>
  );
}
