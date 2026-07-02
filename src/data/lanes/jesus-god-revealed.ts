import { DoctrineLane } from "@/types";

export const jesusGodRevealed: DoctrineLane = {
  slug: "jesus-god-revealed",
  order: 2,
  title: "Jesus is God Revealed",
  summary:
    "Moves from the fact of one God to the claim that Jesus is not excluded from that one God, but is that one God revealed in flesh. This lane is the hinge of the whole system: Lane 1 proves there is only one, this lane proves Jesus is that one, not a second one.",
  goal: "Prove Jesus is not excluded from the one God of Lane 1.",
  difficulty: 1,
  masteryPercent: 0,
  verses: [
    {
      id: "john-1-1",
      reference: "John 1:1",
      text: "In the beginning was the Word, and the Word was with God, and the Word was God.",
      role: "anchor",
      function: "The Word's identity is God, not merely with God. The Word is not a second god.",
    },
    {
      id: "john-1-14",
      reference: "John 1:14",
      text: "And the Word was made flesh, and dwelt among us.",
      role: "anchor",
      function: "The same Word of verse 1 becomes incarnate. Continuity of subject: God-Word to flesh.",
    },
    {
      id: "john-14-9",
      reference: "John 14:9",
      text: "He that hath seen me hath seen the Father.",
      role: "anchor",
      function: "Jesus' own claim: seeing Him is seeing the Father, not a separate divine person.",
    },
    {
      id: "col-2-9",
      reference: "Colossians 2:9",
      text: "For in him dwelleth all the fulness of the Godhead bodily.",
      role: "anchor",
      function: "Full deity, not partial or delegated, resides in Christ's body.",
    },
    {
      id: "1tim-3-16",
      reference: "1 Timothy 3:16",
      text: "God was manifest in the flesh.",
      role: "anchor",
      function: "Direct statement: God, not a demigod or lesser divine being, was manifest.",
    },
    {
      id: "john-10-33",
      reference: "John 10:33",
      text: "For a good work we stone thee not; but for blasphemy; and because that thou, being a man, makest thyself God.",
      role: "variant",
      function: "The Jewish hearers understood Jesus' claims as full deity claims, not lesser ones.",
    },
    {
      id: "titus-2-13",
      reference: "Titus 2:13",
      text: "Looking for that blessed hope, and the glorious appearing of the great God and our Saviour Jesus Christ.",
      role: "variant",
      function: "Grammatically identifies 'the great God' and 'our Saviour Jesus Christ' as one referent (Granville Sharp construction).",
    },
  ],
  objections: [
    {
      id: "jgr-obj-1",
      statement:
        "John 1:1 should be translated 'the Word was a god,' since there is no definite article before theos.",
      answerPath:
        "Greek does not require the article for a definite predicate nominative that precedes the verb, this is Colwell's Rule territory. If John meant 'a god' he had the vocabulary for it and the theological chaos of a second, lesser god would contradict verse 1's own 'with God' clause plus the whole Johannine argument that the Word is the one true God's self-expression, not a created secondary deity. John 20:28 removes any doubt: Thomas calls the risen Jesus 'my Lord and my God' and is not corrected.",
      keyVerseIds: ["john-1-1"],
    },
    {
      id: "jgr-obj-2",
      statement:
        "John 14:9 just means Jesus perfectly represents the Father's character, like a son resembles a father, not that He IS the Father.",
      answerPath:
        "Representation language is available in Greek and Jesus does not use it here. He says 'seen me... seen the Father,' identity language, then in the same breath (14:10) says 'the Father that dwelleth in me,' indwelling language, not representative language. Colossians 2:9 removes the resemblance reading entirely: 'all the fulness of the Godhead bodily' is not a metaphor for family resemblance.",
      keyVerseIds: ["john-14-9", "col-2-9"],
    },
  ],
  drillQuestions: [
    { id: "jgr-d1", level: 1, type: "recognize", prompt: "Which verse says 'the Word was God'?", answer: "John 1:1", choices: ["John 1:1", "John 1:14", "Colossians 2:9", "1 Timothy 3:16"] },
    { id: "jgr-d2", level: 2, type: "recall-reference", prompt: "Give the reference: 'For in him dwelleth all the fulness of the Godhead bodily.'", answer: "Colossians 2:9", verseId: "col-2-9" },
    { id: "jgr-d3", level: 3, type: "complete-phrase", prompt: "Complete: 'He that hath seen me hath seen _____.'", answer: "the Father", verseId: "john-14-9" },
    { id: "jgr-d4", level: 4, type: "explain-function", prompt: "What does 1 Timothy 3:16 add that John 1:14 alone does not make explicit?", answer: "It names the subject directly as 'God,' removing ambiguity about whether a lesser being was manifest." },
    { id: "jgr-d5", level: 5, type: "answer-objection", prompt: "Answer: 'John 1:1 should read a god, since theos lacks the article.'", answer: "Predicate nominatives before the verb regularly drop the article in Greek without becoming indefinite; John 20:28 confirms full deity is intended." },
    { id: "jgr-d6", level: 6, type: "verse-chain", prompt: "Build the Jesus is God Revealed chain.", answer: "John 1:1 -> John 1:14 -> John 14:9 -> Colossians 2:9 -> 1 Timothy 3:16" },
    { id: "jgr-d7", level: 7, type: "debate-response", prompt: "Opponent says: 'Colossians 2:9 just means God's fullness dwells IN Christ the way it dwells in the temple, not that Christ IS God.' Respond.", answer: "The temple analogy fails because the temple never claimed 'he that hath seen me hath seen the Father,' and the word 'bodily' (somatikos) specifically excludes a symbolic indwelling like the temple's, it locates the fullness in a physical body, uniquely." },
  ],
  memoryPrompts: [
    { id: "jgr-m1", kind: "reference-first", prompt: "John 1:1 says what?", answer: "In the beginning was the Word, and the Word was with God, and the Word was God.", verseId: "john-1-1" },
    { id: "jgr-m2", kind: "phrase-first", prompt: "'God was manifest in the flesh' is which reference?", answer: "1 Timothy 3:16", verseId: "1tim-3-16" },
    { id: "jgr-m3", kind: "cloze", prompt: "For in him dwelleth all the ___ of the Godhead bodily.", answer: "fulness", verseId: "col-2-9" },
    { id: "jgr-m4", kind: "teach-back", prompt: "Explain in 60 seconds why John 1:1 does not create a second God.", answer: "Free response, graded against: with God / was God distinction, Word as self-expression not separate being, John 20:28 confirmation." },
    { id: "jgr-m5", kind: "chain", prompt: "Walk the Jesus is God Revealed lane from memory.", answer: "John 1:1, John 1:14, John 14:9, Colossians 2:9, 1 Timothy 3:16" },
  ],
  debatePrompts: [
    "How do you hold John 1:1's 'with God' and 'was God' together without positing two persons?",
    "What does John 10:33 tell you about how Jesus' original hearers understood His claims?",
  ],
};
