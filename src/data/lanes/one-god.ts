import { DoctrineLane } from "@/types";

export const oneGod: DoctrineLane = {
  slug: "one-god",
  order: 1,
  title: "One God",
  summary:
    "Establishes strict, numerical monotheism from the Shema forward. This lane is the foundation every other lane stands on: whatever else is true about Jesus, it cannot break the fact that there is one God, not two, not three persons in the ontological sense of separate centers of consciousness.",
  goal: "Prove strict monotheism before any Christology is introduced.",
  difficulty: 1,
  masteryPercent: 0,
  verses: [
    {
      id: "deut-6-4",
      reference: "Deuteronomy 6:4",
      text: "Hear, O Israel: The LORD our God is one LORD.",
      role: "anchor",
      function: "The Shema. Foundational confession of Israel's monotheism, affirmed by Jesus Himself in Mark 12:29.",
    },
    {
      id: "isa-43-10-11",
      reference: "Isaiah 43:10-11",
      text: "Before me there was no God formed, neither shall there be after me. I, even I, am the LORD; and beside me there is no saviour.",
      role: "anchor",
      function: "No God before or after YHWH. Sets up the Savior lane later: God alone saves.",
    },
    {
      id: "isa-44-6",
      reference: "Isaiah 44:6",
      text: "I am the first, and I am the last; and beside me there is no God.",
      role: "anchor",
      function: "First and last language, later applied to Jesus in Revelation 1:17 and 22:13.",
    },
    {
      id: "isa-45-5",
      reference: "Isaiah 45:5",
      text: "I am the LORD, and there is none else, there is no God beside me.",
      role: "anchor",
      function: "Repeats the exclusivity formula. Rules out any secondary divine person alongside YHWH.",
    },
    {
      id: "mark-12-29",
      reference: "Mark 12:29",
      text: "The first of all the commandments is, Hear, O Israel; The Lord our God is one Lord.",
      role: "anchor",
      function: "Jesus quotes the Shema as the first commandment. He does not correct or complicate it.",
    },
    {
      id: "zech-14-9",
      reference: "Zechariah 14:9",
      text: "And the LORD shall be king over all the earth: in that day shall there be one LORD, and his name one.",
      role: "variant",
      function: "Eschatological confirmation: one LORD, one name, at the end of the age.",
    },
    {
      id: "james-2-19",
      reference: "James 2:19",
      text: "Thou believest that there is one God; thou doest well: the devils also believe, and tremble.",
      role: "variant",
      function: "New Testament reaffirmation that the number is one, not a plurality of persons.",
    },
  ],
  objections: [
    {
      id: "one-god-obj-1",
      statement:
        "The Shema says God is 'echad,' which means a compound unity, like a cluster of grapes. That allows for plurality within the one God.",
      answerPath:
        "Echad does describe compound unity in some contexts (Genesis 2:24, one flesh), but the passage that uses the strict singular 'yachid' for absolute oneness (Genesis 22:2) is never applied to God either, so the word study alone proves nothing about persons. The Shema's own context (Deuteronomy 6) is polemical against the plural gods of Canaan, not a hint at internal plurality. Isaiah 45:5 removes the ambiguity entirely: 'there is no God beside me,' a phrase that cannot describe three centers of consciousness sharing one being.",
      keyVerseIds: ["deut-6-4", "isa-45-5"],
    },
    {
      id: "one-god-obj-2",
      statement:
        "Genesis 1:26, 'Let us make man in our image,' shows plurality in the Godhead.",
      answerPath:
        "The plural is best read as a plural of majesty or God addressing the heavenly council/angels present at creation (compare Job 38:7, Isaiah 6:8 'who will go for us'), not a Trinity, since verse 27 immediately drops to the singular: 'God created man in his own image.' A plural pronoun in one verse cannot override forty explicit singular self-declarations of YHWH's exclusivity throughout the Old Testament.",
      keyVerseIds: ["isa-44-6", "isa-45-5"],
    },
  ],
  drillQuestions: [
    { id: "one-god-d1", level: 1, type: "recognize", prompt: "Which verse is the Shema?", answer: "Deuteronomy 6:4", choices: ["Deuteronomy 6:4", "Isaiah 44:6", "Mark 12:29", "Zechariah 14:9"] },
    { id: "one-god-d2", level: 2, type: "recall-reference", prompt: "Give the reference: 'I am the first, and I am the last; and beside me there is no God.'", answer: "Isaiah 44:6", verseId: "isa-44-6" },
    { id: "one-god-d3", level: 3, type: "complete-phrase", prompt: "Complete: 'Before me there was no God formed, neither shall there be _____.'", answer: "after me", verseId: "isa-43-10-11" },
    { id: "one-god-d4", level: 4, type: "explain-function", prompt: "What is the doctrinal function of Mark 12:29 in the One God lane?", answer: "Jesus affirms the Shema as the first commandment without correcting or redefining its numerical claim." },
    { id: "one-god-d5", level: 5, type: "answer-objection", prompt: "Answer: 'Echad means compound unity, so the Shema allows plurality.'", answer: "Isaiah 45:5 uses 'there is no God beside me,' a phrase that closes the door echad alone leaves open." },
    { id: "one-god-d6", level: 6, type: "verse-chain", prompt: "Build the One God chain from Deuteronomy 6:4 forward.", answer: "Deut 6:4 -> Isaiah 43:10-11 -> Isaiah 44:6 -> Isaiah 45:5 -> Mark 12:29" },
    { id: "one-god-d7", level: 7, type: "debate-response", prompt: "A Trinitarian opens with 'the Trinity does not deny one God, it defines what the one God is like.' Respond under pressure.", answer: "The question is not whether Trinitarians affirm monotheism verbally, it is whether three centers of consciousness sharing one essence matches 'there is no God beside me.' Isaiah 45:5 does not describe persons, it describes an exclusive singular subject speaking in first person throughout." },
  ],
  memoryPrompts: [
    { id: "one-god-m1", kind: "reference-first", prompt: "Deuteronomy 6:4 says what?", answer: "Hear, O Israel: The LORD our God is one LORD.", verseId: "deut-6-4" },
    { id: "one-god-m2", kind: "phrase-first", prompt: "'Beside me there is no saviour' is which reference?", answer: "Isaiah 43:11", verseId: "isa-43-10-11" },
    { id: "one-god-m3", kind: "cloze", prompt: "I am the LORD, and there is none else, there is no ___ beside me.", answer: "God", verseId: "isa-45-5" },
    { id: "one-god-m4", kind: "teach-back", prompt: "Explain the One God lane in under 60 seconds as if teaching a new believer.", answer: "Free response, graded against: Shema, exclusivity formulas, Jesus affirms it, no plurality claim." },
    { id: "one-god-m5", kind: "chain", prompt: "Walk the One God lane from memory, references only.", answer: "Deut 6:4, Isaiah 43:10-11, Isaiah 44:6, Isaiah 45:5, Mark 12:29" },
  ],
  debatePrompts: [
    "How does Deuteronomy 6:4 function as the opening move against any multi-person Godhead claim?",
    "Why does Genesis 1:26 fail as a proof-text for plurality once verse 27 is read?",
  ],
};
