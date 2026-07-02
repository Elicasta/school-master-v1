import { MemoryCard, ReviewGrade } from "@/types";

/**
 * SM-2 spaced repetition, the same algorithm behind Anki/SuperMemo.
 * Grade scale: 0-2 = miss (card is reset), 3-5 = correct with increasing confidence.
 */
export function scheduleNextReview(card: MemoryCard, grade: ReviewGrade): MemoryCard {
  const now = new Date();
  let { difficulty, intervalDays, repetitions, correctCount, missCount } = card;

  // difficulty stored as ease factor * 100 (e.g. 250 = EF 2.5), min floor 130
  let ef = difficulty / 100;

  if (grade < 3) {
    // Miss: reset repetitions, short interval, drop ease slightly
    repetitions = 0;
    intervalDays = 1;
    missCount += 1;
  } else {
    correctCount += 1;
    repetitions += 1;
    if (repetitions === 1) intervalDays = 1;
    else if (repetitions === 2) intervalDays = 6;
    else intervalDays = Math.round(intervalDays * ef);
  }

  ef = ef + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  if (ef < 1.3) ef = 1.3;

  const nextReview = new Date(now);
  nextReview.setDate(nextReview.getDate() + intervalDays);

  return {
    ...card,
    difficulty: Math.round(ef * 100),
    intervalDays,
    repetitions,
    correctCount,
    missCount,
    lastReviewed: now.toISOString(),
    nextReview: nextReview.toISOString(),
  };
}

export function newMemoryCard(input: Omit<MemoryCard, "difficulty" | "intervalDays" | "repetitions" | "lastReviewed" | "nextReview" | "correctCount" | "missCount">): MemoryCard {
  return {
    ...input,
    difficulty: 250, // EF 2.5 default
    intervalDays: 0,
    repetitions: 0,
    lastReviewed: null,
    nextReview: new Date().toISOString(), // due immediately on creation
    correctCount: 0,
    missCount: 0,
  };
}

export function isDue(card: MemoryCard): boolean {
  return new Date(card.nextReview).getTime() <= Date.now();
}

export function sortByDue(cards: MemoryCard[]): MemoryCard[] {
  return [...cards].sort((a, b) => new Date(a.nextReview).getTime() - new Date(b.nextReview).getTime());
}
