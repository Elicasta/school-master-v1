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
  transcripts: "sm_transcripts",
  lastSync: "sm_last_sync",
} as const;

export interface DebateMessage {
  role: "user" | "opponent" | "coach";
  content: string;
  hidden?: boolean;
  createdAt?: string;
}

export interface DebateTranscript {
  id: string;
  mode: "ai" | "browser-ai";
  opponentType: string;
  opponentLabel: string;
  topic?: string;
  messages: DebateMessage[];
  startedAt: string;
  updatedAt: string;
  syncedToCloud: boolean;
}

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
    // storage full or unavailable, fail silently; app still works for the session
  }
}

export function getScores(): UserScores {
  return normalizeScores(read(KEYS.scores, emptyScores()));
}

export function saveScores(scores: UserScores) {
  write(KEYS.scores, normalizeScores(scores));
}

export function normalizeScores(scores: Partial<UserScores> | null | undefined): UserScores {
  const base = emptyScores();
  const incoming = scores ?? {};
  return {
    ...base,
    ...incoming,
    laneMastery: { ...base.laneMastery, ...(incoming.laneMastery ?? {}) },
    weakVerseIds: incoming.weakVerseIds ?? [],
    weakObjectionIds: incoming.weakObjectionIds ?? [],
  };
}

export function getMemoryCards(): MemoryCard[] {
  const existing = read<MemoryCard[] | null>(KEYS.memoryCards, null);
  if (existing && existing.length > 0) return existing;

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
  write(KEYS.memoryCards, dedupeMemoryCards(cards));
}

export function addMemoryCard(card: MemoryCard): MemoryCard[] {
  const cards = dedupeMemoryCards([...getMemoryCards(), card]);
  saveMemoryCards(cards);
  return cards;
}

export function dedupeMemoryCards(cards: MemoryCard[]): MemoryCard[] {
  const seen = new Map<string, MemoryCard>();
  for (const card of cards) {
    const key = card.id || `${card.laneSlug}-${card.verseId}-${card.reference}-${card.function}`;
    const current = seen.get(key);
    if (!current) seen.set(key, card);
    else {
      seen.set(key, {
        ...current,
        ...card,
        correctCount: Math.max(current.correctCount ?? 0, card.correctCount ?? 0),
        missCount: Math.max(current.missCount ?? 0, card.missCount ?? 0),
        repetitions: Math.max(current.repetitions ?? 0, card.repetitions ?? 0),
        nextReview: earlierIso(current.nextReview, card.nextReview),
      });
    }
  }
  return Array.from(seen.values());
}

function earlierIso(a: string, b: string): string {
  return new Date(a).getTime() <= new Date(b).getTime() ? a : b;
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
  write(KEYS.events, events.slice(-800));
}

export function getReviewEvents(): ReviewEvent[] {
  return read<ReviewEvent[]>(KEYS.events, []);
}

export function saveReviewEvents(events: ReviewEvent[]) {
  write(KEYS.events, events.slice(-800));
}

export function getLastSync(): string | null {
  return read<string | null>(KEYS.lastSync, null);
}

export function setLastSync(value: string) {
  write(KEYS.lastSync, value);
}

export function getTranscripts(): DebateTranscript[] {
  return read<DebateTranscript[]>(KEYS.transcripts, []).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export function getTranscript(id: string): DebateTranscript | undefined {
  return getTranscripts().find((t) => t.id === id);
}

export function saveTranscript(t: DebateTranscript) {
  const all = read<DebateTranscript[]>(KEYS.transcripts, []);
  const idx = all.findIndex((x) => x.id === t.id);
  if (idx >= 0) all[idx] = t;
  else all.push(t);
  write(KEYS.transcripts, all.slice(-100));
}

export function deleteTranscript(id: string) {
  const all = read<DebateTranscript[]>(KEYS.transcripts, []);
  write(KEYS.transcripts, all.filter((t) => t.id !== id));
}

export function getDraftKey(mode: "ai" | "browser-ai", opponentType: string): string {
  return `sm_draft_${mode}_${opponentType}`;
}

export function getDraft(mode: "ai" | "browser-ai", opponentType: string): DebateMessage[] {
  return read<DebateMessage[]>(getDraftKey(mode, opponentType), []);
}

export function saveDraft(mode: "ai" | "browser-ai", opponentType: string, messages: DebateMessage[]) {
  write(getDraftKey(mode, opponentType), messages);
}

export function clearDraft(mode: "ai" | "browser-ai", opponentType: string) {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(getDraftKey(mode, opponentType));
}
