export type TopicStatus = "case-draft" | "mapped";
export type EvidenceLevel = "text" | "interpretation" | "inference";
export type SourceKind = "scripture" | "translation-notes" | "scholarship";

export interface AtlasTopic {
  id: string;
  title: string;
  family: string;
  summary: string;
  x: number;
  y: number;
  status: TopicStatus;
  caseSlug?: string;
}

export interface VerseEntry {
  number: number;
  text: string;
  readingNote: string;
}

export interface EvidenceSource {
  id: string;
  title: string;
  publisher: string;
  kind: SourceKind;
  url: string;
  context: string;
}

export interface EvidencePoint {
  id: string;
  label: string;
  level: EvidenceLevel;
  observation: string;
  question: string;
  sourceIds: string[];
}

export interface Interpretation {
  id: string;
  name: string;
  viewpoint: string;
  thesis: string;
  argument: string;
  challenge: string;
  sourceIds: string[];
}

export interface EvidenceCase {
  slug: string;
  title: string;
  subtitle: string;
  passage: string;
  status: "working-draft" | "reviewed";
  translation: string;
  verses: VerseEntry[];
  centralQuestion: string;
  framing: string;
  points: EvidencePoint[];
  interpretations: Interpretation[];
  finding: string;
  unresolved: string[];
  sources: EvidenceSource[];
}

export function validateEvidenceCase(item: EvidenceCase): string[] {
  const problems: string[] = [];
  const ids = new Set<string>();
  const sources = new Set(item.sources.map((s) => s.id));
  if (!item.slug || !item.title || !item.centralQuestion) problems.push("Missing required case identity");
  if (item.status === "reviewed") problems.push("Reviewed status requires a documented editorial sign-off");
  if (new Set(item.verses.map((v) => v.number)).size !== item.verses.length) problems.push("Duplicate verse number");
  for (const source of item.sources) {
    if (ids.has(source.id)) problems.push("Duplicate source ID: " + source.id);
    ids.add(source.id);
    try {
      if (new URL(source.url).protocol !== "https:") problems.push("Insecure source URL: " + source.id);
    } catch {
      problems.push("Invalid source URL: " + source.id);
    }
  }
  for (const entry of [...item.points, ...item.interpretations]) {
    if (!entry.sourceIds.length) problems.push("Missing source attribution: " + entry.id);
    for (const id of entry.sourceIds) if (!sources.has(id)) problems.push("Broken source reference: " + id);
  }
  if (item.interpretations.length < 2) problems.push("Present at least two serious interpretations");
  return problems;
}
