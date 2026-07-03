import { LaneSlug } from "@/types";

export type ApostolicLogicMode =
  | "cadence"
  | "burden-shift"
  | "definition-control"
  | "cross-exam-ladder"
  | "overstatement-filter"
  | "opening-statement"
  | "recovery";

export interface ApostolicLogicPrinciple {
  id: string;
  label: string;
  target: string;
  weakVersion: string;
  strongVersion: string;
}

export interface ApostolicLogicRep {
  id: string;
  mode: ApostolicLogicMode;
  title: string;
  prompt: string;
  opponentLine?: string;
  targetShape: string[];
  idealAnswer: string;
  coaching: string;
  laneSlug?: LaneSlug;
}

export interface ApostolicLogicCritique {
  score: number;
  verdict: string;
  strengths: string[];
  fixes: string[];
  betterAnswer: string;
  drillToCreate: string;
  memoryPrompt: string;
  memoryAnswer: string;
  passed: boolean;
}

export const APOSTOLIC_LOGIC_PRINCIPLES: ApostolicLogicPrinciple[] = [
  {
    id: "define-locate-test",
    label: "Define · Locate · Test",
    target: "Force the claim into a clean definition, ask where the text says it, then test the consequence.",
    weakVersion: "Responding with a long verse dump before the claim is defined.",
    strongVersion: "When you say person, define that from the text. Then show where the apostles use that definition. Then we can test the consequence.",
  },
  {
    id: "mention-not-definition",
    label: "Mention is not definition",
    target: "Separate biblical words from later theological definitions.",
    weakVersion: "Denying Father, Son, and Spirit language because the opponent abuses it.",
    strongVersion: "Father, Son, and Spirit are biblical. Your definition of those terms is what I am asking you to prove.",
  },
  {
    id: "burden-on-claimant",
    label: "Burden stays with the claimant",
    target: "Do not accept their system as the default. Make them prove the added category.",
    weakVersion: "Trying to disprove every possible Trinitarian framework at once.",
    strongVersion: "I affirm the verse. I deny your imported category. Show me where the apostolic text teaches that category.",
  },
  {
    id: "real-distinctions-without-modalism",
    label: "Distinctions without modalism",
    target: "Affirm biblical distinctions while rejecting three eternal divine persons.",
    weakVersion: "Flattening Father, Son, and Spirit into titles only.",
    strongVersion: "The distinctions are real in revelation, incarnation, and operation. They do not require three co-equal, co-eternal divine persons.",
  },
  {
    id: "short-answer-first",
    label: "Short answer first",
    target: "Lead with a clean thesis, then use one verse/function, then ask one question.",
    weakVersion: "Starting with a full sermon because the objection feels loaded.",
    strongVersion: "That text shows distinction. It does not define three eternal persons. Where do the apostles make that move?",
  },
];

export const APOSTOLIC_LOGIC_MODES: { id: ApostolicLogicMode; label: string; description: string }[] = [
  { id: "cadence", label: "Cadence", description: "Short thesis, pause, one text, one question." },
  { id: "burden-shift", label: "Burden shift", description: "Refuse imported definitions without sounding evasive." },
  { id: "definition-control", label: "Definition control", description: "Make key terms clear before answering the wrong question." },
  { id: "cross-exam-ladder", label: "Question ladder", description: "Build 3 questions that tighten the debate." },
  { id: "overstatement-filter", label: "Overstatement filter", description: "Remove lines that give opponents easy wins." },
  { id: "opening-statement", label: "Opening", description: "Build a clean 30-second stance." },
  { id: "recovery", label: "Recovery", description: "Fix a messy answer without panic." },
];

const REPS: ApostolicLogicRep[] = [
  {
    id: "cadence-matt-2819",
    mode: "cadence",
    title: "Matthew 28:19 cadence rep",
    opponentLine: "Matthew 28:19 plainly teaches the Trinity because Father, Son, and Holy Spirit are listed together.",
    prompt: "Answer in the Apostolic Logic cadence. Do not give a sermon. Short thesis, one text move, one burden question.",
    targetShape: ["Affirm the verse", "Separate mention from definition", "Use Acts as apostolic application", "Ask for their definition from the text"],
    idealAnswer: "I affirm Matthew 28:19. The issue is not whether Father, Son, and Holy Spirit are biblical terms. The issue is whether that verse defines God as three co-equal, co-eternal persons. Acts shows the apostles applied the command in the name of Jesus. So where does the apostolic text define the three as eternal divine persons?",
    coaching: "This trains restraint. The trap is to attack Matthew 28:19 instead of asking whether the opponent has proven their definition.",
    laneSlug: "baptism-jesus-name",
  },
  {
    id: "burden-john-1",
    mode: "burden-shift",
    title: "John 1 burden rep",
    opponentLine: "John 1:1 says the Word was with God, so the Word has to be a second divine person.",
    prompt: "Shift the burden without denying John 1:1. Keep it fair.",
    targetShape: ["Affirm the text", "Deny the assumed category", "Ask where John defines personhood", "Point to Word made flesh"],
    idealAnswer: "I affirm John 1:1. The Word was with God and was God. What I am asking you to prove is the category you are adding: that Word means a second eternal divine person. John says the Word was made flesh. Where does John define the Word as a separate co-equal person beside God?",
    coaching: "This keeps you from sounding scared of John 1. You win by affirming the verse and challenging the imported category.",
    laneSlug: "creation-word",
  },
  {
    id: "define-person",
    mode: "definition-control",
    title: "Define person rep",
    opponentLine: "The Father is not the Son, and the Son is not the Spirit. That is three persons.",
    prompt: "Make them define person biblically before you answer their system.",
    targetShape: ["Affirm distinction", "Ask for definition", "Reject automatic leap", "Keep tone calm"],
    idealAnswer: "I agree the Bible gives distinctions. Now define person from the text. If by person you mean a distinct center of consciousness inside the Godhead, show me where the apostles teach that. Mentioning Father, Son, and Spirit is not the same as defining three eternal persons.",
    coaching: "This protects you from modalism accusations. You are not denying distinction. You are challenging the definition of person.",
    laneSlug: "one-god",
  },
  {
    id: "ladder-prayer",
    mode: "cross-exam-ladder",
    title: "Prayer of Jesus ladder",
    opponentLine: "If Jesus prays to the Father, He cannot be the Father. He must be another divine person.",
    prompt: "Write a 3-question ladder. Each question should be shorter and tighter than the last.",
    targetShape: ["Question 1: expose assumption", "Question 2: bring in humanity of Son", "Question 3: force apostolic definition"],
    idealAnswer: "1. Are you assuming prayer can only happen between two divine persons?\n2. Could the real humanity of the Son pray to God without creating a second God?\n3. Where do the apostles explain Jesus praying as proof of a second eternal person?",
    coaching: "A ladder is not a speech. It moves from assumption to biblical category to burden of proof.",
    laneSlug: "sonship-humanity",
  },
  {
    id: "filter-trinity-not-bible",
    mode: "overstatement-filter",
    title: "Clean the overstatement",
    opponentLine: "The Trinity is clearly biblical. You just reject historic Christianity.",
    prompt: "Rewrite the weak line: 'The Trinity is not in the Bible and was invented by men.' Make it stronger and harder to attack.",
    targetShape: ["Do not sound anti-history", "Distinguish terms from doctrine", "Return to apostles", "No inflammatory claim"],
    idealAnswer: "The issue is not whether later Christians used the word Trinity. The issue is whether the doctrine as later defined is the way the apostles taught God. I am asking for the apostolic text, not just later theological language.",
    coaching: "This removes the cheap counterattack that you are ignorant of history. It keeps the standard on apostolic teaching.",
    laneSlug: "history",
  },
  {
    id: "opening-core",
    mode: "opening-statement",
    title: "30-second Apostolic Logic opening",
    prompt: "Give a 30-second opening statement for your debate stance. It must be calm, Scripture-first, and not sound bitter toward church history.",
    targetShape: ["Identify as Apostolic Christian", "Affirm biblical terms", "Reject later definition", "Demand apostolic proof"],
    idealAnswer: "I am an Apostolic Christian. I believe there is one God and that one God revealed Himself fully in Jesus Christ. I affirm Father, Son, and Holy Spirit because the Bible says those words. What I reject is the claim that the apostles defined God as three co-equal, co-eternal divine persons. My standard is simple: show me the apostolic text.",
    coaching: "This is your profile in public form. It should sound clear, not defensive.",
  },
  {
    id: "recovery-modalism",
    mode: "recovery",
    title: "Recover from modalism accusation",
    opponentLine: "So you are just a modalist. You think God wears masks.",
    prompt: "Recover without getting emotional. Correct the strawman and return to the burden.",
    targetShape: ["Reject strawman", "State what you affirm", "State what you deny", "Ask for apostolic proof"],
    idealAnswer: "No. That is not my position. I do not believe God is wearing masks or pretending. I affirm the Bible's real distinctions in revelation, incarnation, and operation. I deny that those distinctions require three eternal divine persons. Now show me where the apostles define the one God that way.",
    coaching: "This keeps you calm when they label you. You answer the label once, then move back to proof.",
    laneSlug: "one-god",
  },
];

export function getApostolicLogicRep(mode: ApostolicLogicMode, seed = Date.now()): ApostolicLogicRep {
  const pool = REPS.filter((rep) => rep.mode === mode);
  const source = pool.length ? pool : REPS;
  const index = Math.abs(seed) % source.length;
  return { ...source[index], id: `${source[index].id}-${seed}` };
}

export function localApostolicLogicCritique(rep: ApostolicLogicRep, response: string): ApostolicLogicCritique {
  const text = response.trim();
  const lower = text.toLowerCase();
  const hasQuestion = text.includes("?");
  const tooLong = text.split(/\s+/).filter(Boolean).length > 130;
  const tooShort = text.split(/\s+/).filter(Boolean).length < 22;
  const hasBurden = ["show me", "where", "prove", "define", "text", "apostles", "apostolic"].some((x) => lower.includes(x));
  const hasFairness = ["affirm", "agree", "biblical", "the issue", "not denying"].some((x) => lower.includes(x));
  const risky = ["pagan", "invented", "fake", "no distinction", "just titles", "doesn't matter"].filter((x) => lower.includes(x));

  let score = 42;
  if (hasQuestion) score += 14;
  if (hasBurden) score += 18;
  if (hasFairness) score += 14;
  if (!tooLong && !tooShort) score += 8;
  if (risky.length) score -= 18;
  if (tooLong) score -= 10;
  if (tooShort) score -= 8;
  score = Math.max(5, Math.min(95, score));

  const fixes: string[] = [];
  if (!hasFairness) fixes.push("Start by affirming the biblical text or the real distinction before challenging the opponent's definition.");
  if (!hasBurden) fixes.push("Add a burden line: ask them where the apostolic text defines their category.");
  if (!hasQuestion) fixes.push("End with one clean question. Your cadence needs a pressure point.");
  if (tooLong) fixes.push("Cut it down. One thesis, one text move, one question.");
  if (tooShort) fixes.push("Give enough substance to show you are not dodging.");
  if (risky.length) fixes.push(`Remove risky wording: ${risky.join(", ")}. It gives the opponent an easy side argument.`);

  return {
    score,
    verdict: score >= 78 ? "Strong rep. This fits the Apostolic Logic profile." : score >= 62 ? "Usable, but it needs tighter burden control." : "Weak rep. It either rambles, overstates, or fails to force the burden.",
    strengths: [
      hasQuestion ? "You used a question to create pressure." : "You attempted to answer the objection directly.",
      hasFairness ? "You did not sound scared of the biblical language." : "The answer has room to add fair framing.",
    ],
    fixes: fixes.length ? fixes : ["Keep the same shape. Make the final question even shorter."],
    betterAnswer: rep.idealAnswer,
    drillToCreate: rep.title,
    memoryPrompt: `Apostolic Logic: ${rep.prompt}`,
    memoryAnswer: rep.idealAnswer,
    passed: score >= 72,
  };
}
