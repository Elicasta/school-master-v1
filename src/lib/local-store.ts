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
} as const;

export interface DebateMessage {
  role: "user" | "opponent";
  content: string;
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

// ---------- Debate transcripts ----------
// Always saved locally, zero setup required. Synced to Supabase in the background
// when the person is signed in (see saveTranscriptCloud in AuthWidget usage sites).

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
  write(KEYS.transcripts, all.slice(-100)); // cap local history at 100 transcripts
}

export function deleteTranscript(id: string) {
  const all = read<DebateTranscript[]>(KEYS.transcripts, []);
  write(KEYS.transcripts, all.filter((t) => t.id !== id));
}

// Draft key per mode+opponent, so a live in-progress chat survives navigating away
// and back (the "chat disappears" bug) without polluting the saved-transcript list
// until the person actually hits Save.
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
