"use client";

import { useEffect, useState } from "react";
import { MemoryCard, ReviewGrade } from "@/types";
import { getMemoryCards, saveMemoryCards, getScores, saveScores, logReviewEvent } from "@/lib/local-store";
import { scheduleNextReview, sortByDue } from "@/lib/spaced-repetition";
import { bumpMemoryStreak } from "@/lib/scoring";

type Mode = "reference-first" | "phrase-first" | "teach-back";

export function MemoryClient() {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [mode, setMode] = useState<Mode>("reference-first");
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [sessionDone, setSessionDone] = useState(0);

  useEffect(() => {
    const all = getMemoryCards();
    setCards(sortByDue(all).filter((c) => new Date(c.nextReview).getTime() <= Date.now()));
  }, []);

  const current = cards[index];

  function grade(g: ReviewGrade) {
    if (!current) return;
    const updated = scheduleNextReview(current, g);
    const all = getMemoryCards().map((c) => (c.id === updated.id ? updated : c));
    saveMemoryCards(all);
    logReviewEvent({
      id: `${current.id}-${Date.now()}`,
      kind: "memory",
      refId: current.verseId,
      laneSlug: current.laneSlug,
      correct: g >= 3,
      grade: g,
      createdAt: new Date().toISOString(),
    });
    setSessionDone((d) => d + 1);
    setRevealed(false);

    if (index + 1 < cards.length) {
      setIndex(index + 1);
    } else {
      const scores = getScores();
      saveScores(bumpMemoryStreak(scores, true));
      setCards([]);
    }
  }

  if (cards.length === 0) {
    return (
      <div className="px-5 py-8 md:px-10 md:py-10 max-w-xl mx-auto text-center">
        <p className="eyebrow mb-2">Memory Mode</p>
        <h1 className="font-display text-2xl mb-3">Queue clear.</h1>
        <p className="text-ink-soft">
          {sessionDone > 0
            ? `Reviewed ${sessionDone} card${sessionDone === 1 ? "" : "s"} this session. Nothing else is due right now.`
            : "No cards are due for review right now. Come back later, or drill a lane to build more cards."}
        </p>
      </div>
    );
  }

  return (
    <div className="px-5 py-8 md:px-10 md:py-10 max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="eyebrow mb-1">Memory Mode</p>
          <h1 className="font-display text-2xl">Spaced Repetition</h1>
        </div>
        <p className="text-xs text-ink-faint font-mono">{cards.length - index} left</p>
      </div>

      <div className="flex gap-2 mb-6">
        {(["reference-first", "phrase-first", "teach-back"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`text-xs px-3 py-1.5 rounded-full border ${mode === m ? "bg-ink text-paper border-ink" : "border-line text-ink-faint"}`}
          >
            {m.replace("-", " ")}
          </button>
        ))}
      </div>

      <div className="paper-card p-6 mb-5 min-h-[220px] flex flex-col justify-center">
        {mode === "reference-first" && (
          <>
            <p className="eyebrow mb-3">Reference</p>
            <p className="font-display text-2xl mb-4">{current.reference}</p>
            {revealed && <p className="text-sm text-ink-soft italic">&ldquo;{current.fullTextPlaceholder}&rdquo;</p>}
          </>
        )}
        {mode === "phrase-first" && (
          <>
            <p className="eyebrow mb-3">Phrase / function</p>
            <p className="text-lg mb-4">{current.function}</p>
            {revealed && <p className="font-display text-xl text-slate">{current.reference}</p>}
          </>
        )}
        {mode === "teach-back" && (
          <>
            <p className="eyebrow mb-3">Teach it back in 60 seconds</p>
            <p className="text-lg mb-4">Explain {current.reference} as if teaching someone new to the doctrine.</p>
            {revealed && (
              <div>
                <p className="text-sm text-ink-soft italic mb-2">&ldquo;{current.fullTextPlaceholder}&rdquo;</p>
                <p className="text-sm text-ink-faint">{current.function}</p>
              </div>
            )}
          </>
        )}
      </div>

      {!revealed ? (
        <button onClick={() => setRevealed(true)} className="btn-primary w-full">Reveal</button>
      ) : (
        <div>
          <p className="text-xs text-ink-faint mb-2 text-center">How well did you recall it?</p>
          <div className="grid grid-cols-4 gap-2">
            <button onClick={() => grade(1)} className="btn-secondary text-xs py-3">Missed</button>
            <button onClick={() => grade(3)} className="btn-secondary text-xs py-3">Hard</button>
            <button onClick={() => grade(4)} className="btn-secondary text-xs py-3">Good</button>
            <button onClick={() => grade(5)} className="btn-primary text-xs py-3">Easy</button>
          </div>
        </div>
      )}

      <div className="mt-6 text-xs text-ink-faint text-center font-mono">
        {current.correctCount} correct &middot; {current.missCount} missed &middot; interval {current.intervalDays}d
      </div>
    </div>
  );
}
