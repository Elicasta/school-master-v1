import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { getLane } from "@/data/lanes";

export const runtime = "nodejs";
const MODEL = "gemini-flash-latest";

type Mode = "answer-20" | "one-verse" | "cross-exam" | "trap" | "rewrite" | "mixed";

interface CoachRequest {
  laneSlug: string;
  mode: Mode;
  profile?: any;
}

function parseJson(text: string): any | null {
  const cleaned = text.replace(/```json|```/g, "").trim();
  try { return JSON.parse(cleaned); } catch {}
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try { return JSON.parse(match[0]); } catch { return null; }
}

function modeInstruction(mode: Mode): string {
  switch (mode) {
    case "answer-20":
      return "Create a live timed objection the user should answer in 20 seconds. Grade target: short thesis, one verse/function, one burden question.";
    case "one-verse":
      return "Create a drill where the user must pick the best response using one verse only. Four choices. Similar length. Plausible wrong answers.";
    case "cross-exam":
      return "Create a cross-exam builder drill. The correct answer should be the best question to ask, not a speech.";
    case "trap":
      return "Create a trap drill. The user must identify the hidden assumption behind the opponent's statement.";
    case "rewrite":
      return "Create a rewrite drill. Give a raw messy answer and ask the user to rewrite it into measured debate cadence.";
    default:
      return "Create the best next adaptive drill for the user's weak lane. Prefer traps, cross-exam, or tight multiple choice over basic recall.";
  }
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "GEMINI_API_KEY is not set." }, { status: 503 });

  let body: CoachRequest;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Malformed request body." }, { status: 400 }); }

  const lane = getLane(body.laneSlug);
  if (!lane) return NextResponse.json({ error: "Unknown lane." }, { status: 400 });

  const source = {
    lane: { slug: lane.slug, title: lane.title, summary: lane.summary, goal: lane.goal },
    verses: lane.verses.map((v) => ({ id: v.id, reference: v.reference, function: v.function, text: v.text })),
    objections: lane.objections,
    profile: body.profile ?? {},
  };

  const prompt = `You are the adaptive debate coach for an Apostolic Scripture-first training app.

The user wants GodLogic-style pressure mechanics but their own measured Apostolic cadence: define the claim, locate the verse, test the consequence. Do not create childish questions. Do not make the correct answer obvious by length. Wrong options must sound plausible and expose real mistakes: overclaiming, dodging Matthew 28:19, sounding modalist, ignoring John 1:1, vague church language, missing burden of proof, or verse dumping.

Mode instruction: ${modeInstruction(body.mode)}

Return JSON only with this exact shape:
{
  "id": "short-id",
  "prompt": "the drill prompt",
  "choices": ["choice A", "choice B", "choice C", "choice D"],
  "answer": "exact correct choice or ideal short answer",
  "idealAnswer": "best polished answer in the user's cadence",
  "coaching": "why this trains the user's weakness and what to watch for",
  "verseId": "one supplied verse id or empty string",
  "reference": "one supplied verse reference or Adaptive review"
}

Rules:
- For cross-exam and rewrite modes, choices may be omitted, but answer and idealAnswer are required.
- Never invent Bible text. Use supplied verse functions and references only.
- Keep all choices similar length when choices are used.
- The best answer should be strong but fair.

Training data:
${JSON.stringify(source)}`;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const result = await ai.models.generateContent({ model: MODEL, contents: prompt });
    const parsed = parseJson(result.text ?? "");
    if (!parsed?.prompt || !parsed?.answer) return NextResponse.json({ error: "AI returned an invalid coach drill." }, { status: 502 });
    return NextResponse.json(parsed);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Coach generation failed." }, { status: 502 });
  }
}
