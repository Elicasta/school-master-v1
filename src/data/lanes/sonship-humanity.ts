import { DoctrineLane } from "@/types";

export const sonshipHumanity: DoctrineLane = {
  slug: "sonship-humanity",
  order: 3,
  title: "Sonship / Humanity",
  summary:
    "Keeps the humanity of Jesus real and full. The Son is not a divine person distinct from the Father, the Son is the human, incarnate side of who God became. Without this lane, Lane 2 collapses into either denying Christ's real humanity or accidentally teaching two persons.",
  goal: "Keep the Son real and human without inventing a second divine person.",
  difficulty: 1,
  masteryPercent: 0,
  verses: [
    {
      id: "luke-1-35",
      reference: "Luke 1:35",
      text: "The Holy Ghost shall come upon thee, and the power of the Highest shall overshadow thee: therefore also that holy thing which shall be born of thee shall be called the Son of God.",
      role: "anchor",
      function: "Sonship begins at the incarnation event, it is not eternal generation of a second person.",
    },
    {
      id: "gal-4-4",
      reference: "Galatians 4:4",
      text: "God sent forth his Son, made of a woman, made under the law.",
      role: "anchor",
      function: "The Son is the sent, made, born reality; the sender is God Himself, not another person.",
    },
    {
      id: "heb-10-5",
      reference: "Hebrews 10:5",
      text: "Wherefore when he cometh into the world, he saith, Sacrifice and offering thou wouldest not, but a body hast thou prepared me.",
      role: "anchor",
      function: "A body was prepared, at a point of entry into the world, for the incarnation.",
    },
    {
      id: "1tim-2-5",
      reference: "1 Timothy 2:5",
      text: "For there is one God, and one mediator between God and men, the man Christ Jesus.",
      role: "anchor",
      function: "The mediator is specifically identified as 'the man,' the human side of the incarnation.",
    },
    {
      id: "heb-4-15",
      reference: "Hebrews 4:15",
      text: "For we have not an high priest which cannot be touched with the feeling of our infirmities; but was in all points tempted like as we are, yet without sin.",
      role: "anchor",
      function: "Genuine human temptation and experience, real humanity, not a costume.",
    },
    {
      id: "luke-2-52",
      reference: "Luke 2:52",
      text: "And Jesus increased in wisdom and stature, and in favour with God and man.",
      role: "variant",
      function: "Human development over time, a real human growth process.",
    },
    {
      id: "phil-2-7",
      reference: "Philippians 2:7",
      text: "But made himself of no reputation, and took upon him the form of a servant, and was made in the likeness of men.",
      role: "variant",
      function: "Self-emptying into genuine human likeness, not appearance only (contra docetism).",
    },
  ],
  objections: [
    {
      id: "sh-obj-1",
      statement:
        "If the Son is only human, then Jesus is not really God, He's just a man God worked through, which is basically adoptionism.",
      answerPath:
        "Oneness theology does not say the Son is 'only' human, it says the Son is the fully human, fully divine incarnate reality: humanity is what the Son IS, deity is what dwells fully in Him (Colossians 2:9, Lane 2). The mediator title in 1 Timothy 2:5 names the human side specifically because mediation requires a genuine human party, but the very next lane (Father in Christ) shows the divine side was fully present too. This is hypostatic union without positing a second eternal person, not adoptionism, which would deny deity was present from conception. Luke 1:35 places full deity's overshadowing at the very start.",
      keyVerseIds: ["1tim-2-5", "luke-1-35", "col-2-9"],
    },
    {
      id: "sh-obj-2",
      statement:
        "Hebrews 10:5 shows the Son speaking to the Father before He 'comes into the world,' proving the Son pre-existed as a separate person.",
      answerPath:
        "The passage is a prophetic quotation from Psalm 40, placed in the Son's mouth as He enters the world, it is describing the incarnation event itself, not a pre-incarnate conversation between two persons. The 'body prepared' language is precisely the point: the preparation happens at entry into the world, matching Luke 1:35's overshadowing, not an eternal prior dialogue.",
      keyVerseIds: ["heb-10-5", "luke-1-35"],
    },
  ],
  drillQuestions: [
    { id: "sh-d1", level: 1, type: "recognize", prompt: "Which verse calls Christ 'the man' in a mediator role?", answer: "1 Timothy 2:5", choices: ["1 Timothy 2:5", "Luke 1:35", "Hebrews 4:15", "Galatians 4:4"] },
    { id: "sh-d2", level: 2, type: "recall-reference", prompt: "Give the reference: 'God sent forth his Son, made of a woman, made under the law.'", answer: "Galatians 4:4", verseId: "gal-4-4" },
    { id: "sh-d3", level: 3, type: "complete-phrase", prompt: "Complete: 'a body hast thou _____ me.'", answer: "prepared", verseId: "heb-10-5" },
    { id: "sh-d4", level: 4, type: "explain-function", prompt: "Why does Hebrews 4:15 matter for keeping the Son's humanity real?", answer: "It insists on genuine temptation and shared human experience, ruling out a docetic 'appeared human' reading." },
    { id: "sh-d5", level: 5, type: "answer-objection", prompt: "Answer: 'A human-only Son is adoptionism.'", answer: "Deity was present from conception per Luke 1:35 and Colossians 2:9, so this is hypostatic union, not adoption of a mere man later in life." },
    { id: "sh-d6", level: 6, type: "verse-chain", prompt: "Build the Sonship / Humanity chain.", answer: "Luke 1:35 -> Galatians 4:4 -> Hebrews 10:5 -> 1 Timothy 2:5 -> Hebrews 4:15" },
    { id: "sh-d7", level: 7, type: "debate-response", prompt: "Opponent: 'If the Son is just the human nature, prayer in Gethsemane is God talking to Himself, which is incoherent.' Respond.", answer: "The human will and consciousness of Jesus, fully real per Hebrews 4:15, genuinely submits to the fullness of deity indwelling Him, this is exactly what Philippians 2:7's self-emptying describes: one person, two natures in operation, not incoherence but the actual shape of the incarnation." },
  ],
  memoryPrompts: [
    { id: "sh-m1", kind: "reference-first", prompt: "Luke 1:35 says what?", answer: "The Holy Ghost shall come upon thee... that holy thing which shall be born of thee shall be called the Son of God.", verseId: "luke-1-35" },
    { id: "sh-m2", kind: "phrase-first", prompt: "'The man Christ Jesus' is which reference?", answer: "1 Timothy 2:5", verseId: "1tim-2-5" },
    { id: "sh-m3", kind: "cloze", prompt: "God sent forth his Son, made of a woman, made under the ___.", answer: "law", verseId: "gal-4-4" },
    { id: "sh-m4", kind: "teach-back", prompt: "Explain in 60 seconds why Sonship begins at the incarnation, not in eternity past.", answer: "Free response, graded against: Luke 1:35 overshadowing, Galatians 4:4 sent/made, no eternal generation claim." },
    { id: "sh-m5", kind: "chain", prompt: "Walk the Sonship / Humanity lane from memory.", answer: "Luke 1:35, Galatians 4:4, Hebrews 10:5, 1 Timothy 2:5, Hebrews 4:15" },
  ],
  debatePrompts: [
    "How do you answer someone who says denying an eternal Son denies the Trinity's core claim?",
    "What is the difference between hypostatic union and adoptionism, in one sentence?",
  ],
};
