import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { getLane } from "@/data/lanes";
import { buildCoachGenerationPrompt, cleanAiError, parseJson } from "@/lib/ai-prompts";

export const runtime = "nodejs";
const MODEL = "gemini-flash-latest";

type Mode = "answer-20" | "one-verse" | "cross-exam" | "trap" | "rewrite" | "mixed";

interface CoachRequest {
  laneSlug: string;
  mode: Mode;
  profile?: any;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "GEMINI_API_KEY is not set. Switch AI source to Local or add the server key." }, { status: 503 });

  let body: CoachRequest;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Malformed request body." }, { status: 400 }); }

  const lane = getLane(body.laneSlug);
  if (!lane) return NextResponse.json({ error: "Unknown lane." }, { status: 400 });

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = buildCoachGenerationPrompt({ laneSlug: body.laneSlug, mode: body.mode, profile: body.profile ?? {} });
    const result = await ai.models.generateContent({ model: MODEL, contents: prompt });
    const parsed = parseJson(result.text ?? "");
    if (!parsed?.prompt || !parsed?.answer) return NextResponse.json({ error: "AI returned an invalid coach drill." }, { status: 502 });
    return NextResponse.json(parsed);
  } catch (err: any) {
    return NextResponse.json({ error: cleanAiError(err?.message) }, { status: err?.message?.includes("429") ? 429 : 502 });
  }
}
