import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not signed in. Scores are still saved locally on this device." }, { status: 401 });
  }

  const scores = await req.json();

  const { error } = await supabase.from("user_scores").upsert({
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

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  const { data, error } = await supabase.from("user_scores").select("*").eq("user_id", user.id).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
