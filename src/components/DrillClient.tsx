"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LANE_LIST, getLane } from "@/data/lanes";
import { DrillLevel, DrillQuestion, LaneSlug } from "@/types";
import { getScores, saveScores, logReviewEvent } from "@/lib/local-store";
import { applyDrillResult, recordWeakVerse } from "@/lib/scoring";
import { Check, X, Timer, ArrowRight } from "lucide-react";

export function DrillClient() {
  const params = useSearchParams();
  const initialLane = (params.get("lane") as LaneSlug) || LANE_LIST[0].slug;

  const [laneSlug, setLaneSlug] = useState<LaneSlug>(initialLane);
  const [level, setLevel] = useState<DrillLevel>(1);
  const [queue, setQueue] = useState<DrillQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false); // true once graded (MC: immediate, free-response: after self-grade)
  const [answerShown, setAnswerShown] = useState(false); // free-response only: model answer shown pre-grade
  const [userAnswer, setUserAnswer] = useState("");
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [missed, setMissed] = useState<DrillQuestion[]>([]);
  const [leveledUp, setLeveledUp] = useState(false);
  const autoAdvanceTimer = useRef<number | null>(null);

  const lane = getLane(laneSlug)!;

  useEffect(() => {
    if (autoAdvanceTimer.current !== null) {
      window.clearTimeout(autoAdvanceTimer.current);
      autoAdvanceTimer.current = null;
    }
    const qs = lane.drillQuestions.filter((q) => q.level === level);
    setQueue(qs.length > 0 ? qs : lane.drillQuestions.filter((q) => q.level === 1));
    setIndex(0);
    setRevealed(false);
    setAnswerShown(false);
    setUserAnswer("");
    setLeveledUp(false);
  }, [laneSlug, level]);

  const current = queue[index];

  function grade(correct: boolean) {
    setRevealed(true);
    const newTotal = sessionTotal + 1;
    const newCorrect = sessionCorrect + (correct ? 1 : 0);
    setSessionTotal(newTotal);
    if (correct) setSessionCorrect(newCorrect);
    else setMissed((m) => [...m, current]);

    const scores = getScores();
    const pct = Math.round((newCorrect / newTotal) * 100);
    let updatedScores = applyDrillResult(scores, laneSlug, correct, pct, null);
    if (!correct && current.verseId) updatedScores = recordWeakVerse(updatedScores, current.verseId);
    saveScores(updatedScores);
    logReviewEvent({
      id: `${current.id}-${Date.now()}`,
      kind: "drill",
      refId: current.id,
      laneSlug,
      correct,
      createdAt: new Date().toISOString(),
    });

    // Difficulty progression: two strong sessions (>=85%) bump the level
    const shouldLevelUp = correct && pct >= 85 && newTotal >= 4 && level < 7;
    if (shouldLevelUp) setLeveledUp(true);

    // Auto-advance to the next question after a short beat so the person can read
    // the feedback first. No manual click required to keep moving.
    autoAdvanceTimer.current = window.setTimeout(() => {
      goToNext(shouldLevelUp);
    }, 1100);
  }

  function goToNext(bumpLevel: boolean) {
    if (autoAdvanceTimer.current !== null) {
      window.clearTimeout(autoAdvanceTimer.current);
      autoAdvanceTimer.current = null;
    }
    setRevealed(false);
    setAnswerShown(false);
    setUserAnswer("");
    setLeveledUp(false);
    if (bumpLevel) {
      setLevel((l) => (Math.min(7, l + 1) as DrillLevel));
      return; // level change resets the queue via the effect above
    }
    setIndex((i) => (i + 1 < queue.length ? i + 1 : 0));
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
              disabled={answerShown}
              placeholder="Type your answer, then reveal to self-grade..."
              className="w-full text-sm border border-line rounded-xl px-4 py-3 bg-white min-h-[80px]"
            />
            {!answerShown ? (
              <button onClick={() => setAnswerShown(true)} className="btn-secondary text-sm">Reveal answer</button>
            ) : (
              <div className="paper-card p-4 bg-paper-dim">
                <p className="text-xs font-mono uppercase text-ink-faint mb-1">Model answer</p>
                <p className="text-sm">{current.answer}</p>
                {!revealed && (
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => grade(true)} className="btn-primary text-sm py-2 px-4"><Check size={14} /> I had it</button>
                    <button onClick={() => grade(false)} className="btn-secondary text-sm py-2 px-4"><X size={14} /> Missed it</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {revealed && (
        <button onClick={() => goToNext(leveledUp)} className="btn-primary w-full flex items-center justify-center gap-2">
          {leveledUp ? `Level up! Continue to Level ${Math.min(7, level + 1)}` : "Next question"} <ArrowRight size={14} />
        </button>
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
