"use client";

import { useSyncExternalStore } from "react";

export interface ChatMsg {
  role: "user" | "opponent" | "coach";
  content: string;
}

interface GeminiDebateState {
  opponentType: string;
  topic: string;
  messages: ChatMsg[];
  sessionId: string | null;
  startedAt: number | null;
  turnCount: number;
  ended: boolean;
}

interface BrowserAIState {
  opponentType: string;
  topic: string;
  status: "checking" | "not-chrome" | "unsupported" | "unavailable" | "downloadable" | "downloading" | "session-ready";
  progress: number;
  messages: ChatMsg[];
  sessionId: string | null;
  startedAt: number | null;
  turnCount: number;
  ended: boolean;
  savedToAccount: boolean;
}

// Module-level singletons. These survive client-side (SPA) navigation between
// routes because the JS module stays loaded, only a full page reload or tab
// close clears them. That's what fixes "the chat disappears when I go back to
// it," the previous version kept this in component-local useState, which resets
// on every unmount/remount.
let geminiState: GeminiDebateState = {
  opponentType: "trinitarian",
  topic: "",
  messages: [],
  sessionId: null,
  startedAt: null,
  turnCount: 0,
  ended: false,
};

let browserState: BrowserAIState = {
  opponentType: "trinitarian",
  topic: "",
  status: "checking",
  progress: 0,
  messages: [],
  sessionId: null,
  startedAt: null,
  turnCount: 0,
  ended: false,
  savedToAccount: false,
};

// The actual LanguageModel session object isn't serializable and isn't render
// state, held separately from the reactive store, same survive-navigation logic
// applies.
let browserSessionHandle: LanguageModelSession | null = null;

const geminiListeners = new Set<() => void>();
const browserListeners = new Set<() => void>();

export function getGeminiState() {
  return geminiState;
}
export function setGeminiState(patch: Partial<GeminiDebateState>) {
  geminiState = { ...geminiState, ...patch };
  geminiListeners.forEach((l) => l());
}
function subscribeGemini(cb: () => void) {
  geminiListeners.add(cb);
  return () => geminiListeners.delete(cb);
}
export function useGeminiDebateState() {
  return useSyncExternalStore(subscribeGemini, getGeminiState, getGeminiState);
}
export function resetGeminiState() {
  geminiState = {
    opponentType: geminiState.opponentType,
    topic: "",
    messages: [],
    sessionId: null,
    startedAt: null,
    turnCount: 0,
    ended: false,
  };
  geminiListeners.forEach((l) => l());
}

export function getBrowserState() {
  return browserState;
}
export function setBrowserState(patch: Partial<BrowserAIState>) {
  browserState = { ...browserState, ...patch };
  browserListeners.forEach((l) => l());
}
function subscribeBrowser(cb: () => void) {
  browserListeners.add(cb);
  return () => browserListeners.delete(cb);
}
export function useBrowserAIState() {
  return useSyncExternalStore(subscribeBrowser, getBrowserState, getBrowserState);
}
export function getBrowserSessionHandle() {
  return browserSessionHandle;
}
export function setBrowserSessionHandle(s: LanguageModelSession | null) {
  browserSessionHandle = s;
}
export function resetBrowserState() {
  browserSessionHandle?.destroy();
  browserSessionHandle = null;
  browserState = {
    opponentType: browserState.opponentType,
    topic: "",
    status: browserState.status === "session-ready" ? "downloadable" : browserState.status,
    progress: 0,
    messages: [],
    sessionId: null,
    startedAt: null,
    turnCount: 0,
    ended: false,
    savedToAccount: false,
  };
  browserListeners.forEach((l) => l());
}
