import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { getLane } from "@/data/lanes";

export const runtime = "nodejs";
const MODEL = "gemini-flash-latest";

interface AdaptiveDrillRequest {
  laneSlug: string;
  level: number;
  recentMisses: string[];
  weakVerseIds: string[];
  weakObjectionIds: string[];
}

function parseJson(text: string): any | null {
  const cleaned = text.replace(/```json|```/g, "").trim();
  try { return JSON.parse(cleaned); } catch {}
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try { return JSON.parse(match[0]); } catch { return null; }
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "GEMINI_API_KEY is not set." }, { status: 503 });

  let body: AdaptiveDrillRequest;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Malformed request body." }, { status: 400 }); }

  const lane = getLane(body.laneSlug);
  if (!lane) return NextResponse.json({ error: "Unknown lane." }, { status: 400 });

  const source = {
    title: lane.title,
    summary: lane.summary,
    goal: lane.goal,
    verses: lane.verses.map((v) => ({ id: v.id, reference: v.reference, function: v.function, text: v.text })),
    objections: lane.objections,
    recentMisses: body.recentMisses,
    weakVerseIds: body.weakVerseIds,
    weakObjectionIds: body.weakObjectionIds,
  };

  const prompt = `Generate one adaptive multiple-choice drill for this doctrine lane.

The user asked for harder choices, not obvious long-answer giveaways. Create four options that are similar length and plausible. The wrong answers should expose common hesitation patterns: smuggled Trinitarian assumptions, overclaiming, modalism accusation confusion, vague church language, or missing burden-of-proof language.

Use only the supplied lane data. Do not invent Bible text. Keep KJV references, but do not quote long passages.

Return only JSON with this exact shape:
{
  "id": "adaptive-short-id",
  "level": ${Math.min(7, Math.max(1, Number(body.level) || 1))},
  "type": "answer-objection",
  "prompt": "question text",
  "choices": ["A choice", "B choice", "C choice", "D choice"],
  "answer": "exact correct choice",
  "verseId": "one supplied verse id or empty string",
  "memoryCard": {
    "reference": "reference to review",
    "phrase": "short retrieval cue",
    "function": "what this card trains",
    "fullTextPlaceholder": "short text/paraphrase from supplied data only"
  }
}

Lane data:
${JSON.stringify(source)}`;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const result = await ai.models.generateContent({ model: MODEL, contents: prompt });
    const parsed = parseJson(result.text ?? "");
    if (!parsed?.prompt || !Array.isArray(parsed.choices) || !parsed.answer) {
      return NextResponse.json({ error: "AI returned an invalid drill." }, { status: 502 });
    }
    return NextResponse.json(parsed);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Adaptive drill failed." }, { status: 502 });
  }
}
