import { MindPalaceRoute } from "@/types";

export const SEED_MIND_PALACE: MindPalaceRoute = {
  id: "savior-hall",
  title: "Savior Hall",
  laneSlug: "savior-name",
  roomName: "Savior Hall",
  debateUse: "Use this route when an opponent claims the Father is the only Savior and Jesus is merely delegated. Walk the hall in order.",
  difficulty: 1,
  createdAt: new Date().toISOString(),
  lastReviewed: null,
  nextReview: null,
  objects: [
    { id: "sh-1", order: 1, objectName: "Door", verseId: "isa-43-11", reference: "Isaiah 43:11", phrase: "Beside me there is no saviour.", function: "Sets the exclusivity claim you walk through." },
    { id: "sh-2", order: 2, objectName: "Table", verseId: "1jn-4-14", reference: "1 John 4:14", phrase: "The Father sent the Son to be the Saviour.", function: "The Father's own sending of the Son into the Savior role." },
    { id: "sh-3", order: 3, objectName: "Lamp", verseId: "titus-3-4-6", reference: "Titus 3:4-6", phrase: "God our Saviour... Jesus Christ our Saviour.", function: "Both named Saviour, same light, same source." },
    { id: "sh-4", order: 4, objectName: "Window", verseId: "2cor-5-19", reference: "2 Corinthians 5:19", phrase: "God was in Christ, reconciling.", function: "Look through the window: God's location during the saving work." },
    { id: "sh-5", order: 5, objectName: "Sword", verseId: "acts-4-12", reference: "Acts 4:12", phrase: "None other name whereby we must be saved.", function: "The sword you leave the hall carrying: the exclusive name." },
  ],
};
