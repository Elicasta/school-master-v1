import { DebateOpponent, OpponentType } from "@/types";
import { trinitarian } from "./trinitarian";

// Lake 1 ships one opponent with a complete, real argument tree: Trinitarian.
// The other nine are registered now (so nav, routing, and the DB schema never
// need to change) but their .topics arrays are empty until Lake 2 builds real
// trees for each. The UI must show "Coming in the next pass" rather than fake
// placeholder debate content, per the no-stub rule.
export const DEBATE_OPPONENTS: Record<OpponentType, DebateOpponent> = {
  trinitarian,
  "apostolic-oneness": {
    type: "apostolic-oneness",
    label: "Apostolic Oneness",
    description: "Practice mode: argue the Oneness position against a peer for sharpening, not correction.",
    topics: [],
  },
  murray: {
    type: "murray",
    label: "Murray / Doctrine of Christ",
    description: "Distinguishes Father and Son as two eternal, separate divine beings sharing one purpose, not one being.",
    topics: [],
  },
  "jehovahs-witness": {
    type: "jehovahs-witness",
    label: "Jehovah's Witness",
    description: "Argues Jesus is Michael the archangel, God's first creation, not co-eternal deity.",
    topics: [],
  },
  mormon: {
    type: "mormon",
    label: "Mormon",
    description: "Argues God was once a man, exaltation theology, and Jesus and Lucifer as spirit brothers.",
    topics: [],
  },
  muslim: {
    type: "muslim",
    label: "Muslim",
    description: "Argues strict tawhid, Jesus as prophet only, and rejects the crucifixion and Trinity.",
    topics: [],
  },
  "jewish-monotheist": {
    type: "jewish-monotheist",
    label: "Jewish Monotheist",
    description: "Argues the Messiah is not divine, from within Second Temple and rabbinic monotheism.",
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
