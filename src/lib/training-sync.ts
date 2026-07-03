"use client";

import { createClient } from "@/lib/supabase/client";
import {
  dedupeMemoryCards,
  getMemoryCards,
  getReviewEvents,
  getScores,
  normalizeScores,
  saveMemoryCards,
  saveReviewEvents,
  saveScores,
  setLastSync,
} from "@/lib/local-store";
import { MemoryCard, ReviewEvent, UserScores } from "@/types";

function mergeScores(local: UserScores, cloud: any | null): UserScores {
  if (!cloud) return local;
  const remote = normalizeScores({
    masteryOverall: cloud.mastery_overall,
    laneMastery: cloud.lane_mastery ?? {},
    debateScore: cloud.debate_score,
    debateWins: cloud.debate_wins,
    debateLosses: cloud.debate_losses,
    memoryStreak: cloud.memory_streak,
    weakVerseIds: cloud.weak_verse_ids ?? [],
    weakObjectionIds: cloud.weak_objection_ids ?? [],
    unlockedMixedLaneDebate: cloud.unlocked_mixed_lane_debate,
    interleavingObjections: cloud.interleaving_objections,
  });

  const laneMastery: Record<string, number> = { ...local.laneMastery };
  for (const [lane, value] of Object.entries(remote.laneMastery)) {
    laneMastery[lane] = Math.max(laneMastery[lane] ?? 0, Number(value) || 0);
  }

  return normalizeScores({
    ...local,
    laneMastery,
    masteryOverall: Math.round(Object.values(laneMastery).reduce((a, b) => a + b, 0) / Object.values(laneMastery).length),
    debateScore: Math.max(local.debateScore, remote.debateScore),
    debateWins: Math.max(local.debateWins, remote.debateWins),
    debateLosses: Math.max(local.debateLosses, remote.debateLosses),
    memoryStreak: Math.max(local.memoryStreak, remote.memoryStreak),
    weakVerseIds: Array.from(new Set([...local.weakVerseIds, ...remote.weakVerseIds])),
    weakObjectionIds: Array.from(new Set([...local.weakObjectionIds, ...remote.weakObjectionIds])),
    unlockedMixedLaneDebate: local.unlockedMixedLaneDebate || remote.unlockedMixedLaneDebate,
    interleavingObjections: local.interleavingObjections || remote.interleavingObjections,
  });
}

function cloudCardToLocal(row: any): MemoryCard {
  return {
    id: row.client_id || row.id,
    laneSlug: row.lane_slug,
    verseId: row.verse_id || row.client_id || row.id,
    reference: row.reference,
    phrase: row.phrase,
    fullTextPlaceholder: row.full_text_placeholder ?? "",
    function: row.function ?? row.phrase,
    difficulty: row.difficulty ?? 250,
    intervalDays: row.interval_days ?? 0,
    repetitions: row.repetitions ?? 0,
    lastReviewed: row.last_reviewed,
    nextReview: row.next_review,
    correctCount: row.correct_count ?? 0,
    missCount: row.miss_count ?? 0,
  };
}

function cloudEventToLocal(row: any): ReviewEvent {
  return {
    id: row.client_id || row.id,
    kind: row.kind,
    refId: row.ref_id,
    laneSlug: row.lane_slug,
    correct: row.correct,
    grade: row.grade,
    createdAt: row.created_at,
  };
}

export async function syncTrainingState(): Promise<{ ok: boolean; message: string }> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, message: "Not signed in." };

  const localScores = getScores();
  const { data: cloudScores } = await supabase.from("user_scores").select("*").eq("user_id", user.id).maybeSingle();
  const scores = mergeScores(localScores, cloudScores);
  saveScores(scores);

  await supabase.from("user_scores").upsert({
    user_id: user.id,
    mastery_overall: scores.masteryOverall,
    lane_mastery: scores.laneMastery,
    debate_score: scores.debateScore,
    debate_wins: scores.debateWins,
    debate_losses: scores.debateLosses,
    memory_streak: scores.memoryStreak,
    weak_verse_ids: scores.weakVerseIds,
    weak_objection_ids: scores.weakObjectionIds,
    unlocked_mixed_lane_debate: scores.unlockedMixedLaneDebate,
    interleaving_objections: scores.interleavingObjections,
    updated_at: new Date().toISOString(),
  });

  const [{ data: cloudCards }, { data: cloudEvents }] = await Promise.all([
    supabase.from("memory_cards").select("*").eq("user_id", user.id),
    supabase.from("review_events").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(500),
  ]);

  const mergedCards = dedupeMemoryCards([
    ...getMemoryCards(),
    ...((cloudCards ?? []) as any[]).map(cloudCardToLocal),
  ]);
  saveMemoryCards(mergedCards);

  const localEvents = getReviewEvents();
  const mergedEvents = Array.from(
    new Map([...localEvents, ...((cloudEvents ?? []) as any[]).map(cloudEventToLocal)].map((e) => [e.id, e])).values(),
  ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).slice(-800);
  saveReviewEvents(mergedEvents);

  const cardRows = mergedCards.map((c) => ({
    user_id: user.id,
    client_id: c.id,
    lane_slug: c.laneSlug,
    verse_id: c.verseId,
    reference: c.reference,
    phrase: c.phrase,
    full_text_placeholder: c.fullTextPlaceholder,
    function: c.function,
    difficulty: c.difficulty,
    interval_days: c.intervalDays,
    repetitions: c.repetitions,
    last_reviewed: c.lastReviewed,
    next_review: c.nextReview,
    correct_count: c.correctCount,
    miss_count: c.missCount,
  }));

  const eventRows = mergedEvents.map((e) => ({
    user_id: user.id,
    client_id: e.id,
    kind: e.kind,
    ref_id: e.refId,
    lane_slug: e.laneSlug,
    correct: e.correct,
    grade: e.grade,
    created_at: e.createdAt,
  }));

  if (cardRows.length) await supabase.from("memory_cards").upsert(cardRows, { onConflict: "user_id,client_id" });
  if (eventRows.length) await supabase.from("review_events").upsert(eventRows, { onConflict: "user_id,client_id" });

  const syncedAt = new Date().toISOString();
  setLastSync(syncedAt);
  return { ok: true, message: `Synced ${mergedCards.length} cards and ${mergedEvents.length} events.` };
}
