"use client";

import { DebateMessage, DebateTranscript, saveTranscript } from "@/lib/local-store";
import { createClient } from "@/lib/supabase/client";

export async function persistTranscript(input: {
  id: string;
  mode: "ai" | "browser-ai";
  opponentType: string;
  opponentLabel: string;
  topic?: string;
  messages: DebateMessage[];
  startedAt: string;
}): Promise<{ savedLocally: boolean; syncedToCloud: boolean; cloudError?: string }> {
  let syncedToCloud = false;
  let cloudError: string | undefined;

  try {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      const res = await fetch("/api/debate/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          opponentType: input.opponentType,
          topic: input.topic,
          mode: input.mode,
          messages: input.messages,
        }),
      });
      if (res.ok) syncedToCloud = true;
      else cloudError = (await res.json())?.error;
    }
  } catch (err) {
    cloudError = "Network error reaching Supabase.";
  }

  const transcript: DebateTranscript = {
    id: input.id,
    mode: input.mode,
    opponentType: input.opponentType,
    opponentLabel: input.opponentLabel,
    topic: input.topic,
    messages: input.messages,
    startedAt: input.startedAt,
    updatedAt: new Date().toISOString(),
    syncedToCloud,
  };
  saveTranscript(transcript);

  return { savedLocally: true, syncedToCloud, cloudError };
}
