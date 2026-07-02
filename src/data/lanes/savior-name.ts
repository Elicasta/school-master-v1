import { DoctrineLane } from "@/types";

export const saviorName: DoctrineLane = {
  slug: "savior-name",
  order: 5,
  title: "Savior / Name",
  summary:
    "The signature lane, the one you build first because it's the argument in front of you most often: Isaiah 43:11 says beside YHWH there is no Savior, yet the New Testament repeatedly calls Jesus Savior. Resolution: one Savior, revealed in Jesus, not two saviors.",
  goal: "Prove there is one Savior, and Jesus is that Savior revealed, not a second, delegated one.",
  difficulty: 1,
  masteryPercent: 0,
  verses: [
    {
      id: "isa-43-11",
      reference: "Isaiah 43:11",
      text: "I, even I, am the LORD; and beside me there is no saviour.",
      role: "anchor",
      function: "The exclusivity claim: only YHWH saves. Sets the tension the lane resolves.",
    },
    {
      id: "matt-1-21",
      reference: "Matthew 1:21",
      text: "And she shall bring forth a son, and thou shalt call his name JESUS: for he shall save his people from their sins.",
      role: "anchor",
      function: "Jesus' name itself (Yahweh saves) and mission is saving from sin, matching the YHWH-only claim.",
    },
    {
      id: "acts-4-12",
      reference: "Acts 4:12",
      text: "Neither is there salvation in any other: for there is none other name under heaven given among men, whereby we must be saved.",
      role: "anchor",
      function: "One saving name. Peter, a strict Jewish monotheist, applies Isaiah 43:11's exclusivity to Jesus' name.",
    },
    {
      id: "1jn-4-14",
      reference: "1 John 4:14",
      text: "And we have seen and do testify that the Father sent the Son to be the Saviour of the world.",
      role: "anchor",
      function: "The Father sent the Son specifically to fill the Savior role, not to add a second savior.",
    },
    {
      id: "titus-3-4-6",
      reference: "Titus 3:4-6",
      text: "But after that the kindness and love of God our Saviour toward man appeared... which he shed on us abundantly through Jesus Christ our Saviour.",
      role: "anchor",
      function: "Both 'God our Saviour' and 'Jesus Christ our Saviour' in the same short passage, same referent.",
    },
    {
      id: "luke-2-11",
      reference: "Luke 2:11",
      text: "For unto you is born this day in the city of David a Saviour, which is Christ the Lord.",
      role: "variant",
      function: "Announced at birth as Savior and Lord, the exact titles Isaiah reserves for YHWH.",
    },
    {
      id: "john-4-42",
      reference: "John 4:42",
      text: "We know that this is indeed the Christ, the Saviour of the world.",
      role: "variant",
      function: "Samaritan confession: the Savior of the world, universal scope matching YHWH's exclusive claim.",
    },
  ],
  objections: [
    {
      id: "sn-obj-1",
      statement:
        "The Father is the ultimate Savior and the Son is the delegated Savior, that resolves the tension without collapsing them into one person.",
      answerPath:
        "Titus 3:4-6 destroys the delegation model in its own sentence structure: it calls the Father 'God our Saviour' and then, without any qualifier of 'lesser' or 'delegated,' calls Jesus 'our Saviour' using identical language. Isaiah 43:11 does not say 'beside me there is no ultimate saviour, but delegated saviours are fine,' it says 'beside me there is no saviour,' full stop. A delegated second savior is still a second savior, which the text rules out categorically.",
      keyVerseIds: ["isa-43-11", "titus-3-4-6"],
    },
    {
      id: "sn-obj-2",
      statement:
        "Acts 4:12 just means Jesus is the unique channel or agent of salvation, not that He IS YHWH the Savior of Isaiah 43:11.",
      answerPath:
        "Peter is a devout Jew steeped in Isaiah's exclusivity language, addressing a Jewish court that would immediately recognize an echo of 'beside me there is no saviour.' If Peter meant 'agent' he had agent vocabulary available (compare Moses as deliverer, never called the exclusive saviour). Instead he uses the identical exclusive, no-other-name framework Isaiah used for YHWH alone, on purpose, to make the identification, not merely the agency.",
      keyVerseIds: ["acts-4-12", "isa-43-11"],
    },
  ],
  drillQuestions: [
    { id: "sn-d1", level: 1, type: "recognize", prompt: "Which verse says 'beside me there is no saviour'?", answer: "Isaiah 43:11", choices: ["Isaiah 43:11", "Matthew 1:21", "Acts 4:12", "Luke 2:11"] },
    { id: "sn-d2", level: 2, type: "recall-reference", prompt: "Give the reference: 'Neither is there salvation in any other.'", answer: "Acts 4:12", verseId: "acts-4-12" },
    { id: "sn-d3", level: 3, type: "complete-phrase", prompt: "Complete: 'thou shalt call his name JESUS: for he shall _____.'", answer: "save his people from their sins", verseId: "matt-1-21" },
    { id: "sn-d4", level: 4, type: "explain-function", prompt: "Why is Titus 3:4-6 the strongest single verse-pair in this lane?", answer: "It names both the Father and Jesus 'Saviour' back to back with no distinction in kind, closing the delegation loophole." },
    { id: "sn-d5", level: 5, type: "answer-objection", prompt: "Answer: 'The Father is ultimate Savior, Jesus is delegated Savior.'", answer: "Isaiah 43:11 rules out any second savior, delegated or not, and Titus 3:4-6 applies identical unqualified language to both." },
    { id: "sn-d6", level: 6, type: "verse-chain", prompt: "Build the Savior lane chain.", answer: "Isaiah 43:11 -> 1 John 4:14 -> Titus 3:4-6 -> 2 Corinthians 5:19 -> Acts 4:12" },
    { id: "sn-d7", level: 7, type: "debate-response", prompt: "Opponent: 'Matthew 1:21 says HE shall save HIS people, third person, distinct from God who sent Him.' Respond.", answer: "Third-person grammar describing the incarnate Son's saving activity is expected whether you're Trinitarian or Oneness, since the Son is genuinely the acting human/divine person in narrative; the question is not grammatical person but whether a second exclusive Savior exists, and Isaiah 43:11 plus Acts 4:12's identical no-other-name language says no." },
  ],
  memoryPrompts: [
    { id: "sn-m1", kind: "reference-first", prompt: "Isaiah 43:11 says what?", answer: "I, even I, am the LORD; and beside me there is no saviour.", verseId: "isa-43-11" },
    { id: "sn-m2", kind: "phrase-first", prompt: "'No other name under heaven given among men' is which reference?", answer: "Acts 4:12", verseId: "acts-4-12" },
    { id: "sn-m3", kind: "cloze", prompt: "The Father sent the Son to be the ___ of the world.", answer: "Saviour", verseId: "1jn-4-14" },
    { id: "sn-m4", kind: "teach-back", prompt: "Explain the Savior lane in 60 seconds, this is your first sword.", answer: "Free response, graded against: Isaiah's exclusivity, Titus 3:4-6's parallel naming, Acts 4:12's exclusive-name echo." },
    { id: "sn-m5", kind: "chain", prompt: "Walk the Savior lane from memory, references only.", answer: "Isa 43:11, 1 Jn 4:14, Titus 3:4-6, 2 Cor 5:19, Acts 4:12" },
  ],
  debatePrompts: [
    "If Isaiah 43:11 excludes any other savior, how do you explain judges being called 'saviours' in Judges (e.g. Othniel)?",
    "How does Luke 2:11 pairing 'Saviour' and 'Christ the Lord' at the nativity set up the whole lane before Jesus does anything?",
  ],
};
