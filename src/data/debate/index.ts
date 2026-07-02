import { DebateOpponent, OpponentType } from "@/types";
import { trinitarian } from "./trinitarian";
import { murray } from "./murray";
import { jehovahsWitness } from "./jehovahs-witness";
import { mormon } from "./mormon";
import { muslim } from "./muslim";
import { jewishMonotheist } from "./jewish-monotheist";

// Lake 1 shipped Trinitarian. Lake 2 adds the five opponents whose topic lists were
// spelled out in the original spec (Murray, JW, Mormon, Muslim, Jewish Monotheist),
// each with a real, graded argument for every named topic. The remaining three
// (Secular Critic, Modalism Accuser, Church History Challenger) plus the Apostolic
// Oneness practice mode never had topic lists defined in the spec, so their trees
// stay empty and honestly labeled "next pass" rather than improvised.
export const DEBATE_OPPONENTS: Record<OpponentType, DebateOpponent> = {
  trinitarian,
  murray,
  "jehovahs-witness": jehovahsWitness,
  mormon,
  muslim,
  "jewish-monotheist": jewishMonotheist,
  "apostolic-oneness": {
    type: "apostolic-oneness",
    label: "Apostolic Oneness",
    description: "Practice mode: argue the Oneness position against a peer for sharpening, not correction.",
    topics: [],
  },
  "secular-critic": {
    type: "secular-critic",
    label: "Secular Critic",
    description: "Argues from historical-critical method, textual variants, and comparative religion.",
    topics: [],
  },
  "modalism-accuser": {
    type: "modalism-accuser",
    label: "Modalism Accuser",
    description: "Argues Oneness theology is the ancient heresy of Sabellian modalism, condemned at Nicaea.",
    topics: [],
  },
  "church-history-challenger": {
    type: "church-history-challenger",
    label: "Church History Challenger",
    description: "Argues from the early creeds and councils that Trinitarianism is the historic, continuous position.",
    topics: [],
  },
};

export const OPPONENT_LIST: DebateOpponent[] = Object.values(DEBATE_OPPONENTS);

export function getOpponent(type: string): DebateOpponent | undefined {
  return DEBATE_OPPONENTS[type as OpponentType];
}
