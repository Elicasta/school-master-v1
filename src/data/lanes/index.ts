import { DoctrineLane, FutureLane, LaneSlug } from "@/types";
import { oneGod } from "./one-god";
import { jesusGodRevealed } from "./jesus-god-revealed";
import { sonshipHumanity } from "./sonship-humanity";
import { fatherInChrist } from "./father-in-christ";
import { saviorName } from "./savior-name";
import { creationWord } from "./creation-word";
import { baptismJesusName } from "./baptism-jesus-name";
import { holyGhostSpirit } from "./holy-ghost-spirit";

export const LANES: Record<LaneSlug, DoctrineLane> = {
  "one-god": oneGod,
  "jesus-god-revealed": jesusGodRevealed,
  "sonship-humanity": sonshipHumanity,
  "father-in-christ": fatherInChrist,
  "savior-name": saviorName,
  "creation-word": creationWord,
  "baptism-jesus-name": baptismJesusName,
  "holy-ghost-spirit": holyGhostSpirit,
};

export const LANE_LIST: DoctrineLane[] = Object.values(LANES).sort((a, b) => a.order - b.order);

export function getLane(slug: string): DoctrineLane | undefined {
  return LANES[slug as LaneSlug];
}

// Expandable future lanes: structure exists now so Lake 3 can populate content
// without a schema or navigation change. Category groups them for the UI.
export const FUTURE_LANES: FutureLane[] = [
  { slug: "right-hand-of-god", title: "Right Hand of God", category: "Core Christology" },
  { slug: "mediator-high-priest", title: "Mediator / High Priest", category: "Core Christology" },
  { slug: "lamb-and-sacrifice", title: "Lamb and Sacrifice", category: "Core Christology" },
  { slug: "name-of-jesus", title: "Name of Jesus", category: "Core Christology" },
  { slug: "godhead", title: "Godhead", category: "Core Christology" },
  { slug: "incarnation", title: "Incarnation", category: "Core Christology" },
  { slug: "preexistence", title: "Preexistence", category: "Core Christology" },
  { slug: "father-son-language", title: "Father/Son Language", category: "Core Christology" },
  { slug: "spirit-of-christ", title: "Spirit of Christ", category: "Core Christology" },
  { slug: "worship-of-jesus", title: "Worship of Jesus", category: "Core Christology" },
  { slug: "judgment", title: "Judgment", category: "Core Christology" },
  { slug: "resurrection", title: "Resurrection", category: "Core Christology" },
  { slug: "subjection-of-the-son", title: "Subjection of the Son", category: "Core Christology" },
  { slug: "john-17", title: "John 17", category: "Key Texts" },
  { slug: "matthew-28-19", title: "Matthew 28:19", category: "Key Texts" },
  { slug: "acts-baptism-formula", title: "Acts Baptism Formula", category: "Key Texts" },
  { slug: "1-corinthians-8-6", title: "1 Corinthians 8:6", category: "Key Texts" },
  { slug: "philippians-2", title: "Philippians 2", category: "Key Texts" },
  { slug: "hebrews-1", title: "Hebrews 1", category: "Key Texts" },
  { slug: "revelation-throne-texts", title: "Revelation Throne Texts", category: "Key Texts" },
  { slug: "jewish-monotheism", title: "Jewish Monotheism", category: "History" },
  { slug: "church-fathers", title: "Church Fathers", category: "History" },
  { slug: "councils", title: "Councils", category: "History" },
  { slug: "trinity-formation", title: "Trinity Formation", category: "History" },
  { slug: "oneness-history", title: "Oneness History", category: "History" },
  { slug: "modalism-accusations", title: "Modalism Accusations", category: "History" },
  { slug: "arianism", title: "Arianism", category: "Comparative" },
  { slug: "socinianism", title: "Socinianism", category: "Comparative" },
  { slug: "jehovahs-witness-christology", title: "Jehovah's Witness Christology", category: "Comparative" },
  { slug: "mormon-doctrine", title: "Mormon Doctrine", category: "Comparative" },
  { slug: "islamic-tawhid-objections", title: "Islamic Tawhid Objections", category: "Comparative" },
];
