import { DebateOpponent, OpponentType } from "@/types";
import { trinitarian } from "./trinitarian";
import { murray } from "./murray";
import { jehovahsWitness } from "./jehovahs-witness";
import { mormon } from "./mormon";
import { muslim } from "./muslim";
import { jewishMonotheist } from "./jewish-monotheist";
import { secularCritic } from "./secular-critic";
import { modalismAccuser } from "./modalism-accuser";
import { churchHistoryChallenger } from "./church-history-challenger";
import { apostolicOneness } from "./apostolic-oneness";

// Lake 1 shipped Trinitarian. Lake 2 added the five opponents whose topic lists
// were spelled out in the original spec. Lake 3 adds the remaining four, whose
// topic lists were never defined anywhere upstream, so they're this project's
// own design, built to the same one-level, four-choice, real-rubric standard
// as Lake 2 rather than left as placeholders. All ten opponents are now fully
// treed. Zero opponents remain in "next pass" status.
export const DEBATE_OPPONENTS: Record<OpponentType, DebateOpponent> = {
  trinitarian,
  murray,
  "jehovahs-witness": jehovahsWitness,
  mormon,
  muslim,
  "jewish-monotheist": jewishMonotheist,
  "secular-critic": secularCritic,
  "modalism-accuser": modalismAccuser,
  "church-history-challenger": churchHistoryChallenger,
  "apostolic-oneness": apostolicOneness,
};

export const OPPONENT_LIST: DebateOpponent[] = Object.values(DEBATE_OPPONENTS);

export function getOpponent(type: string): DebateOpponent | undefined {
  return DEBATE_OPPONENTS[type as OpponentType];
}
