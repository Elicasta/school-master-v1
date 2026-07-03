"use client";

import { LANE_LIST, getLane } from "@/data/lanes";
import { DrillQuestion, LaneSlug, MemoryCard, ReviewEvent, UserScores } from "@/types";
import { getMemoryCards, getReviewEvents, getScores } from "@/lib/local-store";
import { newMemoryCard } from "@/lib/spaced-repetition";

export type CoachMode =
  | "answer-20"
  | "one-verse"
  | "cross-exam"
  | "trap"
  | "rewrite"
  | "mixed";

export interface LaneSignal {
  slug: LaneSlug;
  title: string;
  mastery: number;
  misses: number;
  slow: number;
  attempts: number;
  priority: number;
}

export interface AdaptiveProfile {
  overallMastery: number;
  strongestLanes: LaneSignal[];
  weakestLanes: LaneSignal[];
  weakVerseIds: string[];
  weakObjectionIds: string[];
  hesitationRefs: string[];
  recentMissRefs: string[];
  dueCardCount: number;
  totalEvents: number;
  weekAccuracy: number;
  recommendedLane: LaneSignal | null;
  recommendedMode: CoachMode;
  summary: string;
}

const SLOW_MS = 14000;

export function buildAdaptiveProfile(
  scores: UserScores = getScores(),
  events: ReviewEvent[] = getReviewEvents(),
  cards: MemoryCard[] = getMemoryCards(),
): AdaptiveProfile {
  const now = Date.now();
  const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
  const weekEvents = events.filter((e) => new Date(e.createdAt).getTime() >= weekAgo);
  const weekScored = weekEvents.filter((e) => typeof e.correct === "boolean");
  const weekCorrect = weekScored.filter((e) => e.correct).length;

  const signals: LaneSignal[] = LANE_LIST.map((lane) => {
    const laneEvents = events.filter((e) => e.laneSlug === lane.slug);
    const misses = laneEvents.filter((e) => e.correct === false).length;
    const slow = laneEvents.filter((e: any) => Number(e.responseMs ?? 0) >= SLOW_MS).length;
    const attempts = laneEvents.length;
    const mastery = scores.laneMastery[lane.slug] ?? 0;
    const priority = Math.max(0, 100 - mastery) + misses * 6 + slow * 4 + (attempts === 0 ? 10 : 0);
    return { slug: lane.slug, title: lane.title, mastery, misses, slow, attempts, priority };
  }).sort((a, b) => b.priority - a.priority);

  const dueCardCount = cards.filter((c) => new Date(c.nextReview).getTime() <= now).length;
  const recentMissRefs = events.filter((e) => e.correct === false).slice(-12).map((e) => `${e.kind}:${e.refId}`);
  const hesitationRefs = events.filter((e: any) => Number(e.responseMs ?? 0) >= SLOW_MS).slice(-12).map((e) => `${e.kind}:${e.refId}`);
  const recommendedLane = signals[0] ?? null;
  const recommendedMode = pickRecommendedMode(events, recommendedLane);

  return {
    overallMastery: scores.masteryOverall,
    strongestLanes: [...signals].sort((a, b) => b.mastery - a.mastery).slice(0, 3),
    weakestLanes: signals.slice(0, 4),
    weakVerseIds: scores.weakVerseIds.slice(-16),
    weakObjectionIds: scores.weakObjectionIds.slice(-16),
    hesitationRefs,
    recentMissRefs,
    dueCardCount,
    totalEvents: events.length,
    weekAccuracy: weekScored.length ? Math.round((weekCorrect / weekScored.length) * 100) : 0,
    recommendedLane,
    recommendedMode,
    summary: buildProfileSummary(signals, recentMissRefs, hesitationRefs),
  };
}

function pickRecommendedMode(events: ReviewEvent[], lane: LaneSignal | null): CoachMode {
  if (!lane) return "mixed";
  const recent = events.slice(-20);
  const debateMisses = recent.filter((e) => e.kind === "debate" && e.correct === false).length;
  const slowCount = recent.filter((e: any) => Number(e.responseMs ?? 0) >= SLOW_MS).length;
  if (slowCount >= 3) return "answer-20";
  if (debateMisses >= 2) return "cross-exam";
  if (lane.misses >= 3) return "trap";
  if (lane.mastery < 45) return "one-verse";
  return "mixed";
}

function buildProfileSummary(signals: LaneSignal[], misses: string[], hesitations: string[]): string {
  const weakest = signals[0];
  if (!weakest) return "No training signal yet. Start with one timed objection and one memory review.";
  const parts = [`Weakest lane: ${weakest.title} (${weakest.mastery}%).`];
  if (hesitations.length) parts.push(`Hesitation is showing up on ${hesitations.length} recent item${hesitations.length === 1 ? "" : "s"}.`);
  if (misses.length) parts.push(`Recent misses: ${misses.slice(-3).join(", ")}.`);
  return parts.join(" ");
}

export function buildWeaknessPayload() {
  const profile = buildAdaptiveProfile();
  return {
    summary: profile.summary,
    weakLanes: profile.weakestLanes.map((l) => `${l.title} (${l.mastery}%, misses ${l.misses}, slow ${l.slow})`),
    strongLanes: profile.strongestLanes.map((l) => `${l.title} (${l.mastery}%)`),
    weakVerseIds: profile.weakVerseIds,
    weakObjectionIds: profile.weakObjectionIds,
    recentMisses: profile.recentMissRefs,
    hesitationRefs: profile.hesitationRefs,
    recommendedMode: profile.recommendedMode,
  };
}

export function localAdaptiveFallback(laneSlug: LaneSlug, mode: CoachMode = "trap"): DrillQuestion {
  const lane = getLane(laneSlug) ?? LANE_LIST[0];
  const objection = lane.objections[0];
  const verse = lane.verses[0];
  const answer = `Expose the assumption, return to ${verse.reference}, and make them prove their definition from the apostolic text.`;
  const promptByMode: Record<CoachMode, string> = {
    "answer-20": `Answer in 20 seconds: ${objection?.statement ?? `Defend ${lane.title} without rambling.`}`,
    "one-verse": `Use one verse only. Which response best handles ${lane.title} without overclaiming?`,
    "cross-exam": `Choose the best cross-exam question against this claim: ${objection?.statement ?? lane.goal}`,
    trap: `Spot the hidden assumption: ${objection?.statement ?? lane.summary}`,
    rewrite: `Which rewrite is the cleanest version of the Apostolic response to ${lane.title}?`,
    mixed: `Best response under pressure: ${objection?.statement ?? lane.goal}`,
  };

  return {
    id: `local-adaptive-${mode}-${lane.slug}-${Date.now()}`,
    level: 4,
    type: "answer-objection",
    prompt: promptByMode[mode],
    answer,
    verseId: verse.id,
    choices: [
      answer,
      `Say the opponent is using tradition and move on without defining the term.`,
      `Argue that all distinctions are only titles and avoid the incarnation issue.`,
      `Quote many verses quickly without forcing the burden of proof.`,
    ],
  };
}

export function memoryCardFromWeakness(input: {
  laneSlug: LaneSlug;
  id: string;
  prompt: string;
  answer: string;
  reference?: string;
  verseId?: string;
  type?: string;
}): MemoryCard {
  return newMemoryCard({
    id: `weak-${input.laneSlug}-${input.id}`,
    laneSlug: input.laneSlug,
    verseId: input.verseId || input.id,
    reference: input.reference || "Adaptive weakness",
    phrase: input.prompt.slice(0, 150),
    fullTextPlaceholder: input.answer.slice(0, 500),
    function: input.type ? `${input.type}: ${input.answer.slice(0, 180)}` : input.answer.slice(0, 220),
  });
}
