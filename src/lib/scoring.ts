import { LaneSlug, UserScores } from "@/types";

export function emptyScores(): UserScores {
  return {
    masteryOverall: 0,
    laneMastery: {
      "one-god": 0,
      "jesus-god-revealed": 0,
      "sonship-humanity": 0,
      "father-in-christ": 0,
      "savior-name": 0,
      "creation-word": 0,
      "baptism-jesus-name": 0,
      "holy-ghost-spirit": 0,
    },
    debateScore: 0,
    debateWins: 0,
    debateLosses: 0,
    memoryStreak: 0,
    weakVerseIds: [],
    weakObjectionIds: [],
    unlockedMixedLaneDebate: false,
    interleavingObjections: false,
  };
}

/**
 * Progression engine, section 10 of the build spec:
 * - score above 85% twice in a row -> increase difficulty (handled by caller bumping drill level)
 * - miss the same verse twice -> add to weak review
 * - fail an objection twice -> schedule for debate review
 * - master a lane (mastery >= 90) -> unlock mixed-lane debate
 * - master multiple lanes (>= 3 at 90+) -> start interleaving objections
 */
export function applyDrillResult(
  scores: UserScores,
  lane: LaneSlug,
  correct: boolean,
  recentScorePercent: number,
  recentPrevScorePercent: number | null,
): UserScores {
  const next = { ...scores, laneMastery: { ...scores.laneMastery } };

  // Update lane mastery with a simple exponential moving average toward the result
  const delta = correct ? 4 : -3;
  next.laneMastery[lane] = clamp(next.laneMastery[lane] + delta, 0, 100);

  const lanesMastered = Object.values(next.laneMastery).filter((m) => m >= 90).length;
  next.unlockedMixedLaneDebate = lanesMastered >= 1;
  next.interleavingObjections = lanesMastered >= 3;

  next.masteryOverall = Math.round(
    Object.values(next.laneMastery).reduce((a, b) => a + b, 0) / Object.values(next.laneMastery).length,
  );

  return next;
}

export function recordWeakVerse(scores: UserScores, verseId: string): UserScores {
  if (scores.weakVerseIds.includes(verseId)) return scores;
  return { ...scores, weakVerseIds: [...scores.weakVerseIds, verseId] };
}

export function recordWeakObjection(scores: UserScores, objectionId: string): UserScores {
  if (scores.weakObjectionIds.includes(objectionId)) return scores;
  return { ...scores, weakObjectionIds: [...scores.weakObjectionIds, objectionId] };
}

export function applyDebateResult(scores: UserScores, won: boolean): UserScores {
  return {
    ...scores,
    debateWins: scores.debateWins + (won ? 1 : 0),
    debateLosses: scores.debateLosses + (won ? 0 : 1),
    debateScore: clamp(scores.debateScore + (won ? 10 : -4), 0, 1000),
  };
}

export function bumpMemoryStreak(scores: UserScores, sessionCompleted: boolean): UserScores {
  return { ...scores, memoryStreak: sessionCompleted ? scores.memoryStreak + 1 : 0 };
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}
