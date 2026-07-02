"use client";

import { createClient } from "./supabase/client";
import { ChatMsg } from "./debate-session-store";

export async function getCurrentUserId(): Promise<string | null> {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}

export async function createDebateSession(
  opponentType: string,
  topic: string | null,
): Promise<string | null> {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;

  const { data, error } = await supabase
    .from("ai_debate_sessions")
    .insert({ user_id: userData.user.id, opponent_type: opponentType, topic })
    .select("id")
    .single();

  if (error) {
    console.error("createDebateSession failed:", error.message);
    return null;
  }
  return data.id as string;
}

export async function appendDebateMessage(sessionId: string, role: ChatMsg["role"], content: string) {
  const supabase = createClient();
  const { error } = await supabase.from("ai_debate_messages").insert({ session_id: sessionId, role, content });
  if (error) console.error("appendDebateMessage failed:", error.message);
}

export interface SavedSession {
  id: string;
  opponent_type: string;
  topic: string | null;
  status: string;
  score: number | null;
  created_at: string;
  ended_at: string | null;
}

export async function listDebateSessions(): Promise<SavedSession[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("ai_debate_sessions")
    .select("id, opponent_type, topic, status, score, created_at, ended_at")
    .order("created_at", { ascending: false })
    .limit(20);
  if (error) {
    console.error("listDebateSessions failed:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getSessionMessages(sessionId: string): Promise<ChatMsg[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("ai_debate_messages")
    .select("role, content")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true });
  if (error) {
    console.error("getSessionMessages failed:", error.message);
    return [];
  }
  return (data ?? []) as ChatMsg[];
}

export async function endDebateSession(sessionId: string, score?: number) {
  const supabase = createClient();
  const { error } = await supabase
    .from("ai_debate_sessions")
    .update({ status: "completed", ended_at: new Date().toISOString(), score: score ?? null })
    .eq("id", sessionId);
  if (error) console.error("endDebateSession failed:", error.message);
}
