"use client";

import { MemoryCard, MindPalaceRoute, ReviewEvent, UserScores } from "@/types";
import { emptyScores } from "./scoring";
import { LANE_LIST } from "@/data/lanes";
import { newMemoryCard } from "./spaced-repetition";
import { SEED_MIND_PALACE } from "@/data/mind-palace/seed";

const KEYS = {
  scores: "sm_scores",
  memoryCards: "sm_memory_cards",
  palaces: "sm_mind_palaces",
  events: "sm_review_events",
} as const;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or unavailable, fail silently, app still works in-memory for the session
  }
}

export function getScores(): UserScores {
  return read(KEYS.scores, emptyScores());
}

export function saveScores(scores: UserScores) {
  write(KEYS.scores, scores);
}

export function getMemoryCards(): MemoryCard[] {
  const existing = read<MemoryCard[] | null>(KEYS.memoryCards, null);
  if (existing && existing.length > 0) return existing;

  // First run: seed one memory card per anchor verse across all 8 lanes
  const seeded: MemoryCard[] = [];
  for (const lane of LANE_LIST) {
    for (const verse of lane.verses.filter((v) => v.role === "anchor")) {
      seeded.push(
        newMemoryCard({
          id: `${lane.slug}-${verse.id}`,
          laneSlug: lane.slug,
          verseId: verse.id,
          reference: verse.reference,
          phrase: verse.function,
          fullTextPlaceholder: verse.text,
          function: verse.function,
        }),
      );
    }
  }
  write(KEYS.memoryCards, seeded);
  return seeded;
}

export function saveMemoryCards(cards: MemoryCard[]) {
  write(KEYS.memoryCards, cards);
}

export function getMindPalaces(): MindPalaceRoute[] {
  const existing = read<MindPalaceRoute[] | null>(KEYS.palaces, null);
  if (existing) return existing;
  write(KEYS.palaces, [SEED_MIND_PALACE]);
  return [SEED_MIND_PALACE];
}

export function saveMindPalaces(routes: MindPalaceRoute[]) {
  write(KEYS.palaces, routes);
}

export function logReviewEvent(event: ReviewEvent) {
  const events = read<ReviewEvent[]>(KEYS.events, []);
  events.push(event);
  write(KEYS.events, events.slice(-500)); // cap history to last 500 events locally
}

export function getReviewEvents(): ReviewEvent[] {
  return read<ReviewEvent[]>(KEYS.events, []);
}
