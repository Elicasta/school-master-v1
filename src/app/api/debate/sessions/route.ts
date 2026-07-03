import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

interface SaveSessionBody {
  opponentType: string;
  topic?: string;
  mode: "ai" | "browser-ai";
  messages: { role: "user" | "opponent" | "coach"; content: string }[];
}

// POST saves (or overwrites, keyed by clientId) a full debate transcript for the
// signed-in user: one row in ai_debate_sessions, one row per message in
// ai_debate_messages. GET lists the signed-in user's saved sessions, or fetches
// one session's full messages with ?id=.
export async function POST(req: NextRequest) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in to sync transcripts to the cloud. Saved locally regardless." }, { status: 401 });
  }

  const body: SaveSessionBody = await req.json();
  if (!body.messages?.length) {
    return NextResponse.json({ error: "Empty transcript." }, { status: 400 });
  }

  const { data: session, error: sessionError } = await supabase
    .from("ai_debate_sessions")
    .insert({
      user_id: user.id,
      opponent_type: body.opponentType,
      topic: body.topic ?? null,
      status: "completed",
      ended_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (sessionError || !session) {
    return NextResponse.json({ error: sessionError?.message ?? "Failed to create session." }, { status: 500 });
  }

  const rows = body.messages.map((m) => ({
    session_id: session.id,
    role: m.role === "coach" ? "coach" : m.role === "user" ? "user" : "opponent",
    content: m.content,
  }));

  const { error: messagesError } = await supabase.from("ai_debate_messages").insert(rows);
  if (messagesError) {
    return NextResponse.json({ error: messagesError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, sessionId: session.id });
}

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");

  if (id) {
    const { data: session, error: sErr } = await supabase.from("ai_debate_sessions").select("*").eq("id", id).eq("user_id", user.id).single();
    if (sErr || !session) return NextResponse.json({ error: "Session not found." }, { status: 404 });
    const { data: messages, error: mErr } = await supabase.from("ai_debate_messages").select("*").eq("session_id", id).order("created_at", { ascending: true });
    if (mErr) return NextResponse.json({ error: mErr.message }, { status: 500 });
    return NextResponse.json({ session, messages });
  }

  const { data: sessions, error } = await supabase
    .from("ai_debate_sessions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ sessions });
}
