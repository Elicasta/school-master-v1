import { DoctrineLane } from "@/types";

export const fatherInChrist: DoctrineLane = {
  slug: "father-in-christ",
  order: 4,
  title: "Father in Christ",
  summary:
    "Explains the Father/Son language without positing two divine persons: the Father is the deity that indwells and works through the Son. This is the lane that answers most Trinitarian 'two persons talking' objections before they're raised.",
  goal: "Explain how the one God (the Father, as Spirit) is revealed and active in the Son.",
  difficulty: 2,
  masteryPercent: 0,
  verses: [
    {
      id: "john-14-10",
      reference: "John 14:10",
      text: "The Father that dwelleth in me, he doeth the works.",
      role: "anchor",
      function: "Indwelling language: the Father is IN the Son doing the works, not standing beside Him.",
    },
    {
      id: "2cor-5-19",
      reference: "2 Corinthians 5:19",
      text: "God was in Christ, reconciling the world unto himself.",
      role: "anchor",
      function: "God's location during the reconciling work: in Christ, not merely alongside Him.",
    },
    {
      id: "col-1-19",
      reference: "Colossians 1:19",
      text: "For it pleased the Father that in him should all fulness dwell.",
      role: "anchor",
      function: "The Father's own pleasure was that all fulness dwell IN the Son, matching Colossians 2:9.",
    },
    {
      id: "john-10-30",
      reference: "John 10:30",
      text: "I and my Father are one.",
      role: "anchor",
      function: "Oneness claim so strong the hearers pick up stones for blasphemy in the next verse.",
    },
    {
      id: "john-8-19",
      reference: "John 8:19",
      text: "Ye neither know me, nor my Father: if ye had known me, ye should have known my Father also.",
      role: "anchor",
      function: "Knowing Jesus is the only route to knowing the Father, identity-level access, not third-party introduction.",
    },
    {
      id: "john-17-21",
      reference: "John 17:21",
      text: "That they all may be one; as thou, Father, art in me, and I in thee.",
      role: "variant",
      function: "'In me, and I in thee' language describes mutual indwelling, the pattern for believer union too.",
    },
    {
      id: "isa-9-6",
      reference: "Isaiah 9:6",
      text: "For unto us a child is born... and his name shall be called... The mighty God, The everlasting Father.",
      role: "variant",
      function: "The child born is named 'The everlasting Father,' collapsing any hard person-distinction.",
    },
  ],
  objections: [
    {
      id: "fic-obj-1",
      statement:
        "John 14:10, 'the Father dwelleth in me,' is exactly how Trinitarians describe perichoresis, mutual indwelling of distinct persons, so this verse supports the Trinity too.",
      answerPath:
        "Perichoresis was invented centuries later precisely because 'the Father dwelleth in me' does not naturally describe two eternally distinct persons interpenetrating, it naturally describes one Spirit indwelling one incarnate body. John 10:30's 'I and my Father are one' triggered a blasphemy charge in verse 33 for 'making thyself God,' which only makes sense if the hearers understood a full identity claim, not a relational-unity-of-two-persons claim (which would not be blasphemy, Trinitarians make that claim about themselves and God today without being stoned).",
      keyVerseIds: ["john-14-10", "john-10-30"],
    },
    {
      id: "fic-obj-2",
      statement:
        "Jesus prayed to the Father, so the Father and Son must be distinct persons, otherwise He'd be praying to Himself, which is absurd.",
      answerPath:
        "The prayer comes from the genuine human nature and will established in the Sonship / Humanity lane (Hebrews 4:15, Philippians 2:7), submitting to the fullness of deity indwelling Him (John 14:10). One person, two natures, real human dependence expressed toward the divine nature that fills Him. This is not two persons in dialogue, it's the incarnate Son's human side communing with the Spirit that fills Him, exactly as Colossians 1:19 says pleased the Father.",
      keyVerseIds: ["john-14-10", "col-1-19"],
    },
  ],
  drillQuestions: [
    { id: "fic-d1", level: 1, type: "recognize", prompt: "Which verse says 'I and my Father are one'?", answer: "John 10:30", choices: ["John 10:30", "John 14:10", "Colossians 1:19", "John 8:19"] },
    { id: "fic-d2", level: 2, type: "recall-reference", prompt: "Give the reference: 'God was in Christ, reconciling the world unto himself.'", answer: "2 Corinthians 5:19", verseId: "2cor-5-19" },
    { id: "fic-d3", level: 3, type: "complete-phrase", prompt: "Complete: 'The Father that dwelleth in me, he _____.'", answer: "doeth the works", verseId: "john-14-10" },
    { id: "fic-d4", level: 4, type: "explain-function", prompt: "What does the reaction in John 10:31 tell you about how 'I and my Father are one' was understood?", answer: "The hearers picked up stones for blasphemy, showing they understood a full deity claim, not a relational-unity claim." },
    { id: "fic-d5", level: 5, type: "answer-objection", prompt: "Answer: 'Prayer to the Father proves two persons.'", answer: "The prayer flows from the real human nature (Hebrews 4:15) toward the fullness of deity indwelling that same person (John 14:10), one person, two natures, not two persons." },
    { id: "fic-d6", level: 6, type: "verse-chain", prompt: "Build the Father in Christ chain.", answer: "John 14:10 -> 2 Corinthians 5:19 -> Colossians 1:19 -> John 10:30 -> John 8:19" },
    { id: "fic-d7", level: 7, type: "debate-response", prompt: "Opponent: 'Isaiah 9:6 calling the child \"everlasting Father\" is just a throne name, ancient Near Eastern kings got grand titles, it doesn't mean literal Fatherhood.' Respond.", answer: "Throne names in the ANE were honorific, but this name-list also includes 'The mighty God' in the same breath, and Isaiah 9:6 sits inside a book that has already spent nine chapters establishing YHWH's exclusivity (Lane 1), so reading 'everlasting Father' as empty court flattery ignores the specific theological vocabulary Isaiah has been building the whole book." },
  ],
  memoryPrompts: [
    { id: "fic-m1", kind: "reference-first", prompt: "John 14:10 says what?", answer: "The Father that dwelleth in me, he doeth the works.", verseId: "john-14-10" },
    { id: "fic-m2", kind: "phrase-first", prompt: "'I and my Father are one' is which reference?", answer: "John 10:30", verseId: "john-10-30" },
    { id: "fic-m3", kind: "cloze", prompt: "For it pleased the Father that in him should all ___ dwell.", answer: "fulness", verseId: "col-1-19" },
    { id: "fic-m4", kind: "teach-back", prompt: "Explain in 60 seconds how the Father can be 'in' the Son without being a separate person beside Him.", answer: "Free response, graded against: indwelling language, John 10:30-31 blasphemy reaction, one Spirit filling one body." },
    { id: "fic-m5", kind: "chain", prompt: "Walk the Father in Christ lane from memory.", answer: "John 14:10, 2 Corinthians 5:19, Colossians 1:19, John 10:30, John 8:19" },
  ],
  debatePrompts: [
    "If the Father is fully in the Son, why does Jesus say 'my Father is greater than I' in John 14:28?",
    "How does John 8:19 shut down the idea that knowing the Father is a separate relational track from knowing Jesus?",
  ],
};
