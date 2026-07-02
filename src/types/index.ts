// ---------- Core content types ----------

// The original 8 lanes used a strict literal union. Lake 4 added 31 more lane
// slugs (expandable lanes), so this is now a plain string, still called LaneSlug
// for clarity at call sites, but no longer restricted to the original 8.
export type LaneSlug = string;

export type VerseRole = "anchor" | "variant";

export interface Verse {
  id: string; // e.g. "isa-43-11"
  reference: string; // "Isaiah 43:11"
  text: string; // KJV placeholder text (short, non-displacive paraphrase-safe placeholder)
  role: VerseRole;
  function: string; // one-line function of this verse in the lane's argument
}

export type DrillLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface DrillQuestion {
  id: string;
  level: DrillLevel;
  type:
    | "recognize"
    | "recall-reference"
    | "complete-phrase"
    | "explain-function"
    | "answer-objection"
    | "verse-chain"
    | "debate-response";
  prompt: string;
  answer: string;
  choices?: string[]; // for multiple choice / recognize levels
  verseId?: string;
}

export interface MemoryPrompt {
  id: string;
  kind: "reference-first" | "phrase-first" | "cloze" | "teach-back" | "chain";
  prompt: string;
  answer: string;
  verseId?: string;
}

export interface Objection {
  id: string;
  statement: string; // the challenge as an opponent would state it
  answerPath: string; // the apostolic response, in argument form
  keyVerseIds: string[];
}

export interface DoctrineLane {
  slug: LaneSlug;
  order: number;
  title: string;
  summary: string;
  goal: string;
  verses: Verse[];
  objections: Objection[];
  drillQuestions: DrillQuestion[];
  memoryPrompts: MemoryPrompt[];
  debatePrompts: string[];
  difficulty: 1 | 2 | 3;
  masteryPercent: number; // runtime, starts 0
}

// FutureLane was the Lake 1-3 placeholder shape for expandable lanes with no
// content yet. Lake 4 populated all of them as real DoctrineLane entries, so
// this type is no longer needed.

// ---------- Debate engine types ----------

export type OpponentType =
  | "trinitarian"
  | "apostolic-oneness"
  | "murray"
  | "jehovahs-witness"
  | "mormon"
  | "muslim"
  | "jewish-monotheist"
  | "secular-critic"
  | "modalism-accuser"
  | "church-history-challenger";

export interface DebateOpponent {
  type: OpponentType;
  label: string;
  description: string;
  topics: DebateTopic[];
}

export interface DebateTopic {
  slug: string;
  title: string;
  tree: DebateNode; // root node
}

export interface DebateChoice {
  key: "A" | "B" | "C" | "D";
  text: string;
  correct: boolean;
  next?: DebateNode; // pushback node if this branch continues
  rubricNote: string; // why this is right/wrong, shown after selection
}

export interface DebateNode {
  id: string;
  speaker: "opponent";
  statement: string;
  choices: DebateChoice[];
  verseRefs?: string[];
}

// ---------- Memory / spaced repetition ----------

export interface MemoryCard {
  id: string;
  laneSlug: LaneSlug;
  verseId: string;
  reference: string;
  phrase: string;
  fullTextPlaceholder: string;
  function: string;
  difficulty: number; // SM-2 ease factor scaled 130-350
  intervalDays: number;
  repetitions: number;
  lastReviewed: string | null; // ISO date
  nextReview: string; // ISO date
  correctCount: number;
  missCount: number;
}

export type ReviewGrade = 0 | 1 | 2 | 3 | 4 | 5; // SM-2 quality score

// ---------- Mind Palace ----------

export interface MindPalaceObject {
  id: string;
  order: number;
  objectName: string; // "Door", "Table", "Lamp"
  verseId: string;
  reference: string;
  phrase: string;
  function: string;
  notes?: string;
}

export interface MindPalaceRoute {
  id: string;
  title: string;
  laneSlug: LaneSlug | null;
  roomName: string;
  objects: MindPalaceObject[];
  debateUse: string;
  difficulty: 1 | 2 | 3;
  createdAt: string;
  lastReviewed: string | null;
  nextReview: string | null;
}

// ---------- Facts library ----------

export interface ChurchFather {
  id: string;
  name: string;
  dates: string;
  location: string;
  writings: string[];
  doctrineOfGod: string;
  doctrineOfChrist: string;
  trinitarianUse: string;
  onenessResponse: string;
  cautions: string;
}

export interface DoctrineComparison {
  id: string;
  name: string;
  viewOfGod: string;
  viewOfJesus: string;
  viewOfHolySpirit: string;
  viewOfSalvation: string;
  keyVerses: string[];
  mainWeakness: string;
  apostolicResponse: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  label: string;
  detail: string;
}

// ---------- Scoring ----------

export interface UserScores {
  masteryOverall: number;
  laneMastery: Record<LaneSlug, number>;
  debateScore: number;
  debateWins: number;
  debateLosses: number;
  memoryStreak: number;
  weakVerseIds: string[];
  weakObjectionIds: string[];
  unlockedMixedLaneDebate: boolean;
  interleavingObjections: boolean;
}

export interface ReviewEvent {
  id: string;
  kind: "drill" | "memory" | "debate" | "mind-palace";
  refId: string; // verseId, questionId, nodeId, etc.
  laneSlug: LaneSlug | null;
  correct: boolean;
  grade?: ReviewGrade;
  createdAt: string;
}
