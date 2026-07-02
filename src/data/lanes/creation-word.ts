import { DoctrineLane } from "@/types";

export const creationWord: DoctrineLane = {
  slug: "creation-word",
  order: 6,
  title: "Creation / Word",
  summary:
    "Establishes one Creator, and that the Word who created is the same Word made flesh in Lane 2. This lane closes off any 'Jesus is a created being' reading (Arian, JW) before it starts.",
  goal: "Prove one Creator, and that the Word/Son is that Creator, not a first creation.",
  difficulty: 2,
  masteryPercent: 0,
  verses: [
    {
      id: "gen-1-1",
      reference: "Genesis 1:1",
      text: "In the beginning God created the heaven and the earth.",
      role: "anchor",
      function: "Establishes the single Creator subject before any other creation text is read.",
    },
    {
      id: "mal-2-10",
      reference: "Malachi 2:10",
      text: "Have we not all one father? hath not one God created us?",
      role: "anchor",
      function: "One God, one Creator, reaffirmed on the far side of the Old Testament.",
    },
    {
      id: "john-1-3",
      reference: "John 1:3",
      text: "All things were made by him; and without him was not any thing made that was made.",
      role: "anchor",
      function: "The Word of John 1:1 is the agent of all creation, with zero exceptions, ruling out 'Jesus was the first created thing.'",
    },
    {
      id: "col-1-16",
      reference: "Colossians 1:16",
      text: "For by him were all things created, that are in heaven, and that are in earth, visible and invisible... all things were created by him, and for him.",
      role: "anchor",
      function: "By Him AND for Him, creation's source and goal, language reserved for God alone.",
    },
    {
      id: "rev-22-16",
      reference: "Revelation 22:16",
      text: "I Jesus... I am the root and the offspring of David, and the bright and morning star.",
      role: "anchor",
      function: "Jesus is both David's root (source, pre-existent) and offspring (descendant), a paradox that only works if He is the eternal Word who also became David's son.",
    },
    {
      id: "heb-1-2",
      reference: "Hebrews 1:2",
      text: "By whom also he made the worlds.",
      role: "variant",
      function: "Reinforces the Son as creation's agent, in the same book that argues His superiority to angels.",
    },
    {
      id: "isa-44-24",
      reference: "Isaiah 44:24",
      text: "I am the LORD that maketh all things; that stretcheth forth the heavens alone; that spreadeth abroad the earth by myself.",
      role: "variant",
      function: "YHWH creates alone, by Himself, no junior partner, no created intermediary.",
    },
  ],
  objections: [
    {
      id: "cw-obj-1",
      statement:
        "Colossians 1:15, 'the firstborn of all creation,' means Jesus was the first thing God created, so He cannot be the eternal Creator of verse 16.",
      answerPath:
        "'Firstborn' (prototokos) in Jewish usage is a rank/inheritance title, not a birth-order claim, the clearest proof is Psalm 89:27 where David is called God's 'firstborn' though David was not the first human born. The very next verse, Colossians 1:16, defines the term for us: 'for by him were ALL things created,' which would be self-contradictory nonsense if Jesus were included in 'all things.' The passage interprets itself against the created-being reading.",
      keyVerseIds: ["col-1-16"],
    },
    {
      id: "cw-obj-2",
      statement:
        "Revelation 3:14 calls Jesus 'the beginning of the creation of God,' meaning He is the first created being.",
      answerPath:
        "'Beginning' (arche) is used elsewhere by John to mean source/origin, not first-in-a-series, compare John 1:1's 'in the beginning' describing the Word's role as origin point, not a created member of the timeline. Revelation 22:13 has the same speaker call Himself 'the beginning and the ending... the first and the last,' directly borrowing Isaiah 44:6's exclusive YHWH language from Lane 1, which cannot describe a created being.",
      keyVerseIds: ["rev-22-16"],
    },
  ],
  drillQuestions: [
    { id: "cw-d1", level: 1, type: "recognize", prompt: "Which verse says 'all things were made by him'?", answer: "John 1:3", choices: ["John 1:3", "Genesis 1:1", "Malachi 2:10", "Hebrews 1:2"] },
    { id: "cw-d2", level: 2, type: "recall-reference", prompt: "Give the reference: 'all things were created by him, and for him.'", answer: "Colossians 1:16", verseId: "col-1-16" },
    { id: "cw-d3", level: 3, type: "complete-phrase", prompt: "Complete: 'without him was not any thing made that _____.'", answer: "was made", verseId: "john-1-3" },
    { id: "cw-d4", level: 4, type: "explain-function", prompt: "What paradox does Revelation 22:16 hold together, and why does it matter?", answer: "Jesus is both the root (source) and offspring (descendant) of David, which only coheres if He is the eternal Word who also became David's human descendant." },
    { id: "cw-d5", level: 5, type: "answer-objection", prompt: "Answer: 'Firstborn of all creation means Jesus was created first.'", answer: "Firstborn is a rank title (Psalm 89:27, David as firstborn though not first human), and Colossians 1:16 immediately says ALL things were created by Him, excluding Him from 'all things.'" },
    { id: "cw-d6", level: 6, type: "verse-chain", prompt: "Build the Creation / Word chain.", answer: "Genesis 1:1 -> Malachi 2:10 -> John 1:3 -> Colossians 1:16 -> Revelation 22:16" },
    { id: "cw-d7", level: 7, type: "debate-response", prompt: "A Jehovah's Witness opens with: 'John 1:3 says all things were made BY him, meaning he's an instrument God used, not the Creator Himself.' Respond.", answer: "Instrumentality language (by him) is fully compatible with full deity, since Isaiah 44:24 has YHWH creating 'by myself,' and John deliberately uses the same Word who 'was God' in 1:1 as the agent in 1:3, the text is showing one Creator acting through His own self-expression, not two beings, a maker and an instrument." },
  ],
  memoryPrompts: [
    { id: "cw-m1", kind: "reference-first", prompt: "John 1:3 says what?", answer: "All things were made by him; and without him was not any thing made that was made.", verseId: "john-1-3" },
    { id: "cw-m2", kind: "phrase-first", prompt: "'The root and the offspring of David' is which reference?", answer: "Revelation 22:16", verseId: "rev-22-16" },
    { id: "cw-m3", kind: "cloze", prompt: "For by him were ___ things created.", answer: "all", verseId: "col-1-16" },
    { id: "cw-m4", kind: "teach-back", prompt: "Explain in 60 seconds why 'firstborn of creation' does not make Jesus a created being.", answer: "Free response, graded against: firstborn as rank title, Colossians 1:16's 'all things by him,' Psalm 89:27 parallel." },
    { id: "cw-m5", kind: "chain", prompt: "Walk the Creation / Word lane from memory.", answer: "Genesis 1:1, Malachi 2:10, John 1:3, Colossians 1:16, Revelation 22:16" },
  ],
  debatePrompts: [
    "How do you use Isaiah 44:24 ('by myself') against a created-agent reading of John 1:3?",
    "Why does Hebrews 1:2 placing the Son as creation's agent matter in a book arguing His superiority to angels?",
  ],
};
