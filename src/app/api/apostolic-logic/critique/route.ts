import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { ApostolicLogicRep, localApostolicLogicCritique } from "@/lib/apostolic-logic-coach";

export const runtime = "nodejs";
const MODEL = "gemini-flash-latest";

function parseJson(text: string): any | null {
  const cleaned = text.replace(/```json|```/g, "").trim();
  try { return JSON.parse(cleaned); } catch {}
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try { return JSON.parse(match[0]); } catch { return null; }
}

export async function POST(req: NextRequest) {
  let body: { rep: ApostolicLogicRep; response: string; profile?: any };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Malformed request body." }, { status: 400 }); }
  if (!body.rep || typeof body.response !== "string") return NextResponse.json({ error: "Missing rep or response." }, { status: 400 });

  const fallback = localApostolicLogicCritique(body.rep, body.response);
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return NextResponse.json({ ...fallback, aiUnavailable: true });

  const prompt = `You are the Apostolic Logic style coach. This is separate from the debate opponent engine.

The target style is adapted from high-pressure Christian apologetics mechanics, but it must sound like the user's own Apostolic profile: calm, pastoral, Scripture-first, short, definition-focused, burden-aware.

Profile rules:
- Define the claim.
- Locate the verse.
- Test the consequence.
- Affirm biblical language before rejecting imported definitions.
- Never sound anti-Bible, anti-history, bitter, or evasive.
- Do not call everything pagan or invented.
- Do not flatten Father, Son, and Spirit into mere labels.
- Avoid rambling. Prefer one thesis, one text move, one question.

Grade this user answer against the rep.

Return JSON only:
{
  "score": 0-100,
  "verdict": "blunt one sentence",
  "strengths": ["...", "..."],
  "fixes": ["...", "..."],
  "betterAnswer": "polished answer in Apostolic Logic cadence",
  "drillToCreate": "short name for a follow-up drill",
  "memoryPrompt": "flashcard prompt created from the weakness",
  "memoryAnswer": "flashcard answer",
  "passed": true/false
}

Rep:
${JSON.stringify(body.rep)}

User answer:
${body.response}

Training profile:
${JSON.stringify(body.profile ?? {})}`;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const result = await ai.models.generateContent({ model: MODEL, contents: prompt });
    const parsed = parseJson(result.text ?? "");
    if (!parsed?.betterAnswer || typeof parsed.score !== "number") return NextResponse.json(fallback);
    return NextResponse.json({ ...fallback, ...parsed, score: Math.max(0, Math.min(100, Math.round(parsed.score))) });
  } catch {
    return NextResponse.json({ ...fallback, aiUnavailable: true });
  }
}
