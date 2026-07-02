"use client";

import { useEffect, useState } from "react";

const NUDGE_AFTER_TURNS = 6;
const NUDGE_AFTER_MS = 8 * 60 * 1000; // 8 minutes

export function useDebateModerator(startedAt: number | null, turnCount: number) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!startedAt) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [startedAt]);

  const elapsedMs = startedAt ? now - startedAt : 0;
  const totalSeconds = Math.floor(elapsedMs / 1000);
  const mm = Math.floor(totalSeconds / 60);
  const ss = totalSeconds % 60;
  const elapsedLabel = startedAt ? `${mm}:${ss.toString().padStart(2, "0")}` : "0:00";

  const shouldNudge = turnCount >= NUDGE_AFTER_TURNS || elapsedMs >= NUDGE_AFTER_MS;

  return { elapsedLabel, shouldNudge, turnCount };
}

export const WRAP_UP_PROMPT =
  "Moderator: this exchange has run long. Please give a final summary, the strongest point each side made, then close with your scores for clarity, scripture use, logic, and fairness across the whole conversation.";
