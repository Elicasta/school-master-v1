import { DoctrineLane } from "@/types";

export const holyGhostSpirit: DoctrineLane = {
  slug: "holy-ghost-spirit",
  order: 8,
  title: "Holy Ghost / Spirit",
  summary:
    "Closes the eight-lane foundation: the Holy Ghost is the Spirit of God, the same Spirit that is now also called the Spirit of Christ, not a third distinct divine person alongside the Father and Son of the prior lanes.",
  goal: "Prove the Holy Ghost is the Spirit of the one God, not a third person.",
  difficulty: 2,
  masteryPercent: 0,
  verses: [
    {
      id: "john-4-24",
      reference: "John 4:24",
      text: "God is a Spirit: and they that worship him must worship him in spirit and in truth.",
      role: "anchor",
      function: "God's essential nature is Spirit. The Holy Ghost is not a separate being from this Spirit.",
    },
    {
      id: "acts-2-4",
      reference: "Acts 2:4",
      text: "And they were all filled with the Holy Ghost.",
      role: "anchor",
      function: "The fulfillment of the promise, the Spirit poured out at Pentecost.",
    },
    {
      id: "acts-2-33",
      reference: "Acts 2:33",
      text: "Therefore being by the right hand of God exalted, and having received of the Father the promise of the Holy Ghost, he hath shed forth this, which ye now see and hear.",
      role: "anchor",
      function: "Jesus Himself receives and pours out the Spirit, showing the Spirit is His own, not a separate person acting independently.",
    },
    {
      id: "rom-8-9",
      reference: "Romans 8:9",
      text: "Now if any man have not the Spirit of Christ, he is none of his.",
      role: "anchor",
      function: "'Spirit of God' and 'Spirit of Christ' used interchangeably in the same verse, identifying them as one and the same Spirit.",
    },
    {
      id: "1cor-12-13",
      reference: "1 Corinthians 12:13",
      text: "For by one Spirit are we all baptized into one body.",
      role: "anchor",
      function: "One Spirit, matching the one God, one Lord, one baptism pattern of Ephesians 4:4-6.",
    },
    {
      id: "2cor-3-17",
      reference: "2 Corinthians 3:17",
      text: "Now the Lord is that Spirit: and where the Spirit of the Lord is, there is liberty.",
      role: "variant",
      function: "Direct identity statement: the Lord (Jesus, per context) IS that Spirit.",
    },
    {
      id: "john-14-18",
      reference: "John 14:18",
      text: "I will not leave you comfortless: I will come to you.",
      role: "variant",
      function: "Jesus promises His own coming via the Comforter, not the arrival of a different, third person.",
    },
  ],
  objections: [
    {
      id: "hgs-obj-1",
      statement:
        "John 14:16-17 says Jesus will ask the Father to send 'another Comforter,' which implies a third distinct person from both Father and Son.",
      answerPath:
        "'Another' (allos) in Greek means another of the same kind, not another distinct person category, Jesus is saying the Spirit will comfort 'another' way, in addition to how He Himself comforted them in the flesh, which is confirmed two verses later at John 14:18: 'I will not leave you comfortless: I will come to you.' The very next verse identifies the Comforter's coming AS Jesus' own coming, not the arrival of a separate individual.",
      keyVerseIds: ["john-14-18"],
    },
    {
      id: "hgs-obj-2",
      statement:
        "The Spirit is called 'he' throughout John 14-16 and does things like speak, teach, and intercede, which requires personhood distinct from the Father and Son.",
      answerPath:
        "Personal pronouns and personal actions describe the Spirit's activity, not a third center of consciousness, in the same way wisdom is personified as 'she' in Proverbs 8 without becoming a fourth divine person. Romans 8:9 uses 'Spirit of God' and 'Spirit of Christ' as direct synonyms in one sentence, which would be bizarre if the Spirit were a third person distinct from both, that phrasing only works if the Spirit is the one Spirit belonging equally to the one God, active as the Father's Spirit and now, since the resurrection, also called Christ's Spirit.",
      keyVerseIds: ["rom-8-9", "2cor-3-17"],
    },
  ],
  drillQuestions: [
    { id: "hgs-d1", level: 1, type: "recognize", prompt: "Which verse says 'God is a Spirit'?", answer: "John 4:24", choices: ["John 4:24", "Acts 2:4", "Romans 8:9", "1 Corinthians 12:13"] },
    { id: "hgs-d2", level: 2, type: "recall-reference", prompt: "Give the reference: 'Now the Lord is that Spirit.'", answer: "2 Corinthians 3:17", verseId: "2cor-3-17" },
    { id: "hgs-d3", level: 3, type: "complete-phrase", prompt: "Complete: 'if any man have not the Spirit of Christ, he is _____.'", answer: "none of his", verseId: "rom-8-9" },
    { id: "hgs-d4", level: 4, type: "explain-function", prompt: "How does Acts 2:33 show the Spirit belongs to Jesus rather than acting as an independent third person?", answer: "Jesus Himself receives the Spirit from the Father and pours it out, positioning Him as the source of the outpouring, not a bystander to a third person's independent action." },
    { id: "hgs-d5", level: 5, type: "answer-objection", prompt: "Answer: 'Another Comforter in John 14:16 proves a third person.'", answer: "Allos means another of the same kind, and John 14:18 identifies the Comforter's coming as Jesus' own coming: 'I will come to you.'" },
    { id: "hgs-d6", level: 6, type: "verse-chain", prompt: "Build the Holy Ghost / Spirit chain.", answer: "John 4:24 -> Acts 2:4 -> Acts 2:33 -> Romans 8:9 -> 1 Corinthians 12:13" },
    { id: "hgs-d7", level: 7, type: "debate-response", prompt: "Opponent: 'The Spirit intercedes for us with the Father in Romans 8:26-27, which requires three distinct parties: Spirit, believer, Father.' Respond.", answer: "Intercession language describes function within the believer's experience of God's activity, not a headcount of divine persons; the same chapter, four verses earlier, calls that Spirit 'the Spirit of Christ' interchangeably with 'Spirit of God,' so the interceding Spirit is the one Spirit of the one God working in and through the believer, not a third independent will negotiating with a second." },
  ],
  memoryPrompts: [
    { id: "hgs-m1", kind: "reference-first", prompt: "John 4:24 says what?", answer: "God is a Spirit: and they that worship him must worship him in spirit and in truth.", verseId: "john-4-24" },
    { id: "hgs-m2", kind: "phrase-first", prompt: "'They were all filled with the Holy Ghost' is which reference?", answer: "Acts 2:4", verseId: "acts-2-4" },
    { id: "hgs-m3", kind: "cloze", prompt: "For by one ___ are we all baptized into one body.", answer: "Spirit", verseId: "1cor-12-13" },
    { id: "hgs-m4", kind: "teach-back", prompt: "Explain in 60 seconds why the Holy Ghost is not a third person alongside the Father and Son.", answer: "Free response, graded against: John 4:24 God is Spirit, Romans 8:9 Spirit of God = Spirit of Christ, Acts 2:33 Jesus pours out the Spirit." },
    { id: "hgs-m5", kind: "chain", prompt: "Walk the Holy Ghost / Spirit lane from memory.", answer: "John 4:24, Acts 2:4, Acts 2:33, Romans 8:9, 1 Corinthians 12:13" },
  ],
  debatePrompts: [
    "How do you answer the claim that the Spirit's distinct activity in Acts (e.g., speaking in Acts 13:2) proves personhood distinct from the Father?",
    "What does 2 Corinthians 3:17 do to any argument that treats 'the Lord' and 'the Spirit' as separate persons?",
  ],
};
