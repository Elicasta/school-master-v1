import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { ApostolicLogicRep, localApostolicLogicCritique } from "@/lib/apostolic-logic-coach";
import { buildApostolicCritiquePrompt, parseJson } from "@/lib/ai-prompts";

export const runtime = "nodejs";
const MODEL = "gemini-flash-latest";

export async function POST(req: NextRequest) {
  let body: { rep: ApostolicLogicRep; response: string; profile?: any };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Malformed request body." }, { status: 400 }); }
  if (!body.rep || typeof body.response !== "string") return NextResponse.json({ error: "Missing rep or response." }, { status: 400 });

  const fallback = localApostolicLogicCritique(body.rep, body.response);
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return NextResponse.json({ ...fallback, aiUnavailable: true });

  try {
    const ai = new GoogleGenAI({ apiKey });
    const result = await ai.models.generateContent({ model: MODEL, contents: buildApostolicCritiquePrompt({ rep: body.rep, response: body.response, profile: body.profile ?? {} }) });
    const parsed = parseJson(result.text ?? "");
    if (!parsed?.betterAnswer || typeof parsed.score !== "number") return NextResponse.json(fallback);
    return NextResponse.json({ ...fallback, ...parsed, score: Math.max(0, Math.min(100, Math.round(parsed.score))) });
  } catch {
    return NextResponse.json({ ...fallback, aiUnavailable: true });
  }
}
