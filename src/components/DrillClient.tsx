"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LANE_LIST, getLane } from "@/data/lanes";
import { DrillLevel, DrillQuestion, LaneSlug } from "@/types";
import { getScores, saveScores, logReviewEvent } from "@/lib/local-store";
import { applyDrillResult, recordWeakVerse } from "@/lib/scoring";
import { Check, X, Timer } from "lucide-react";

export function DrillClient() {
  const params = useSearchParams();
  const initialLane = (params.get("lane") as LaneSlug) || LANE_LIST[0].slug;

  const [laneSlug, setLaneSlug] = useState<LaneSlug>(initialLane);
  const [level, setLevel] = useState<DrillLevel>(1);
  const [queue, setQueue] = useState<DrillQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [missed, setMissed] = useState<DrillQuestion[]>([]);

  const lane = getLane(laneSlug)!;

  useEffect(() => {
    const qs = lane.drillQuestions.filter((q) => q.level === level);
    setQueue(qs.length > 0 ? qs : lane.drillQuestions.filter((q) => q.level === 1));
    setIndex(0);
    setRevealed(false);
    setUserAnswer("");
  }, [laneSlug, level]);

  const current = queue[index];

  function grade(correct: boolean) {
    setRevealed(true);
    setSessionTotal((t) => t + 1);
    if (correct) setSessionCorrect((c) => c + 1);
    else setMissed((m) => [...m, current]);

    const scores = getScores();
    const pct = sessionTotal > 0 ? Math.round(((sessionCorrect + (correct ? 1 : 0)) / (sessionTotal + 1)) * 100) : 100;
    let next = applyDrillResult(scores, laneSlug, correct, pct, null);
    if (!correct && current.verseId) next = recordWeakVerse(next, current.verseId);
    saveScores(next);
    logReviewEvent({
      id: `${current.id}-${Date.now()}`,
      kind: "drill",
      refId: current.id,
      laneSlug,
      correct,
      createdAt: new Date().toISOString(),
    });

    // Difficulty progression: two strong sessions (>=85%) bump the level
    if (correct && pct >= 85 && sessionTotal >= 4 && level < 7) {
      setTimeout(() => setLevel((l) => (Math.min(7, l + 1) as DrillLevel)), 600);
    }
  }

  function next() {
    setRevealed(false);
    setUserAnswer("");
    if (index + 1 < queue.length) setIndex(index + 1);
    else setIndex(0);
  }

  if (!current) {
    return <div className="p-8 text-ink-faint">No drill questions at this level yet for this lane.</div>;
  }

  return (
    <div className="px-5 py-8 md:px-10 md:py-10 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="eyebrow mb-1">Drill Mode</p>
          <h1 className="font-display text-2xl">{lane.title}</h1>
        </div>
        <div className="text-right">
          <p className="text-xs text-ink-faint font-mono">Level {level} / 7</p>
          <p className="text-xs text-ink-faint font-mono">{sessionCorrect}/{sessionTotal} correct</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        <select
          value={laneSlug}
          onChange={(e) => setLaneSlug(e.target.value as LaneSlug)}
          className="text-sm border border-line rounded-lg px-3 py-2 bg-white"
        >
          {LANE_LIST.map((l) => (
            <option key={l.slug} value={l.slug}>{l.title}</option>
          ))}
        </select>
        <select
          value={level}
          onChange={(e) => setLevel(Number(e.target.value) as DrillLevel)}
          className="text-sm border border-line rounded-lg px-3 py-2 bg-white"
        >
          {[1, 2, 3, 4, 5, 6, 7].map((l) => (
            <option key={l} value={l}>Level {l}</option>
          ))}
        </select>
      </div>

      <div className="paper-card p-6 mb-5">
        <p className="text-xs font-mono uppercase text-ink-faint mb-3">{current.type.replace("-", " ")}</p>
        <p className="font-display text-lg mb-5 leading-snug">{current.prompt}</p>

        {current.choices ? (
          <div className="grid gap-2">
            {current.choices.map((choice) => (
              <button
                key={choice}
                disabled={revealed}
                onClick={() => grade(choice === current.answer)}
                className={`text-left text-sm px-4 py-3 rounded-xl border transition-colors ${
                  revealed && choice === current.answer
                    ? "border-slate bg-slate-dim"
                    : "border-line bg-white hover:bg-paper-dim"
                }`}
              >
                {choice}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={revealed}
              placeholder="Type your answer, then reveal to self-grade..."
              className="w-full text-sm border border-line rounded-xl px-4 py-3 bg-white min-h-[80px]"
            />
            {!revealed ? (
              <button onClick={() => setRevealed(true)} className="btn-secondary text-sm">Reveal answer</button>
            ) : (
              <div className="paper-card p-4 bg-paper-dim">
                <p className="text-xs font-mono uppercase text-ink-faint mb-1">Model answer</p>
                <p className="text-sm">{current.answer}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => grade(true)} className="btn-primary text-sm py-2 px-4"><Check size={14} /> I had it</button>
                  <button onClick={() => grade(false)} className="btn-secondary text-sm py-2 px-4"><X size={14} /> Missed it</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {revealed && (
        <button onClick={next} className="btn-primary w-full">Next question</button>
      )}

      {missed.length > 0 && (
        <div className="mt-8">
          <p className="eyebrow mb-2 flex items-center gap-1.5"><Timer size={12} /> Wrong-answer review</p>
          <div className="space-y-2">
            {missed.map((m) => (
              <div key={m.id} className="text-sm text-ink-soft paper-card p-3">{m.prompt}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
