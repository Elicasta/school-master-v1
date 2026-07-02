import { DoctrineLane, LaneSlug } from "@/types";
import { oneGod } from "./one-god";
import { jesusGodRevealed } from "./jesus-god-revealed";
import { sonshipHumanity } from "./sonship-humanity";
import { fatherInChrist } from "./father-in-christ";
import { saviorName } from "./savior-name";
import { creationWord } from "./creation-word";
import { baptismJesusName } from "./baptism-jesus-name";
import { holyGhostSpirit } from "./holy-ghost-spirit";
import { CORE_CHRISTOLOGY_LANES } from "./core-christology";
import { KEY_TEXTS_LANES } from "./key-texts";
import { HISTORY_LANES } from "./history";
import { COMPARATIVE_LANES } from "./comparative";

// The original 8 "primary" lanes: full depth (7 verses, 2 objections, all 7 drill
// levels). These are the only lanes wired into Drill Mode's lane picker and
// Memory Mode's seed deck, they're the intended daily-study core.
export const PRIMARY_LANES: Record<string, DoctrineLane> = {
  "one-god": oneGod,
  "jesus-god-revealed": jesusGodRevealed,
  "sonship-humanity": sonshipHumanity,
  "father-in-christ": fatherInChrist,
  "savior-name": saviorName,
  "creation-word": creationWord,
  "baptism-jesus-name": baptismJesusName,
  "holy-ghost-spirit": holyGhostSpirit,
};

// Lake 4: the 31 expandable lanes, scoped to 3 verses / 1 objection / 3 drill
// levels each rather than the primary lanes' full depth, real content
// throughout, no placeholders, browsable and drillable via their own /lanes/:slug
// pages, just not mixed into the primary 8's daily-rotation pickers.
export const EXPANDABLE_LANES: DoctrineLane[] = [
  ...CORE_CHRISTOLOGY_LANES,
  ...KEY_TEXTS_LANES,
  ...HISTORY_LANES,
  ...COMPARATIVE_LANES,
];

export const LANES: Record<string, DoctrineLane> = {
  ...PRIMARY_LANES,
  ...Object.fromEntries(EXPANDABLE_LANES.map((l) => [l.slug, l])),
};

export const LANE_LIST: DoctrineLane[] = Object.values(PRIMARY_LANES).sort((a, b) => a.order - b.order);

export const ALL_LANES_LIST: DoctrineLane[] = Object.values(LANES).sort((a, b) => a.order - b.order);

export function getLane(slug: string): DoctrineLane | undefined {
  return LANES[slug as LaneSlug];
}

export interface LaneCategoryGroup {
  category: string;
  lanes: DoctrineLane[];
}

export const EXPANDABLE_LANE_GROUPS: LaneCategoryGroup[] = [
  { category: "Core Christology", lanes: CORE_CHRISTOLOGY_LANES },
  { category: "Key Texts", lanes: KEY_TEXTS_LANES },
  { category: "History", lanes: HISTORY_LANES },
  { category: "Comparative", lanes: COMPARATIVE_LANES },
];
