import { DoctrineLane } from "@/types";

export const baptismJesusName: DoctrineLane = {
  slug: "baptism-jesus-name",
  order: 7,
  title: "Baptism in Jesus' Name",
  summary:
    "Moves from doctrine to practice: establishes the apostolic baptismal formula as the name of Jesus, and reconciles Matthew 28:19's 'name' (singular) with the apostles' consistent practice of invoking Jesus' name specifically.",
  goal: "Establish and defend the Acts baptismal pattern as apostolic practice, not a contradiction of Matthew 28:19.",
  difficulty: 2,
  masteryPercent: 0,
  verses: [
    {
      id: "matt-28-19",
      reference: "Matthew 28:19",
      text: "Baptizing them in the name of the Father, and of the Son, and of the Holy Ghost.",
      role: "anchor",
      function: "'Name' is singular, one name, covering Father, Son, and Holy Ghost, which the apostles identify as Jesus in practice.",
    },
    {
      id: "acts-2-38",
      reference: "Acts 2:38",
      text: "Repent, and be baptized every one of you in the name of Jesus Christ for the remission of sins.",
      role: "anchor",
      function: "Peter's own application of the Great Commission on the day the church begins.",
    },
    {
      id: "acts-8-16",
      reference: "Acts 8:16",
      text: "Only they were baptized in the name of the Lord Jesus.",
      role: "anchor",
      function: "Samaria's baptisms, explicitly in Jesus' name, no variation from the Acts 2:38 pattern.",
    },
    {
      id: "acts-10-48",
      reference: "Acts 10:48",
      text: "And he commanded them to be baptized in the name of the Lord.",
      role: "anchor",
      function: "Gentile household of Cornelius, Peter commands the same formula.",
    },
    {
      id: "acts-19-5",
      reference: "Acts 19:5",
      text: "When they heard this, they were baptized in the name of the Lord Jesus.",
      role: "anchor",
      function: "Ephesian disciples, over 20 years after the Great Commission, still baptized in Jesus' name only.",
    },
    {
      id: "col-3-17",
      reference: "Colossians 3:17",
      text: "And whatsoever ye do in word or deed, do all in the name of the Lord Jesus.",
      role: "variant",
      function: "General apostolic pattern: everything done in Jesus' name, including the baptismal command.",
    },
    {
      id: "acts-22-16",
      reference: "Acts 22:16",
      text: "Arise, and be baptized, and wash away thy sins, calling on the name of the Lord.",
      role: "variant",
      function: "Paul's own baptism, calling on the name of the Lord, same pattern applied to himself.",
    },
  ],
  objections: [
    {
      id: "bjn-obj-1",
      statement:
        "Matthew 28:19 gives the actual formula to say (Father, Son, Holy Ghost), Acts is just Luke summarizing 'they got baptized as Christians' without quoting an exact formula.",
      answerPath:
        "That reads a distinction into the text that isn't there: Luke records specific baptismal language four separate times across four separate contexts (Jerusalem, Samaria, Caesarea, Ephesus) with the same core phrase 'in the name of the Lord Jesus,' which is a remarkably consistent 'summary' if it isn't the actual formula. Meanwhile Matthew 28:19 never records anyone actually saying the words 'Father, Son, Holy Ghost' at a baptism anywhere in the entire New Testament, if it were the required verbal formula we would expect at least one recorded instance, and there is none.",
      keyVerseIds: ["matt-28-19", "acts-2-38"],
    },
    {
      id: "bjn-obj-2",
      statement:
        "'In the name of the Lord Jesus' could just mean 'by the authority of Jesus, using whatever formula He commanded,' not a verbal formula to be spoken.",
      answerPath:
        "That is possible for one isolated instance, but it strains credibility across four independent baptismal accounts (Acts 2, 8, 10, 19) spanning decades and different apostles, all consistently phrased around Jesus' name specifically rather than the triune formula, if authority alone were meant, we would expect at least occasional variation toward the Matthew 28:19 wording somewhere in Acts. The consistency itself is the argument: Jesus is the singular 'name' of Matthew 28:19, Father, Son, and Holy Ghost are titles/manifestations of that one name, not three separate names to recite.",
      keyVerseIds: ["acts-8-16", "acts-10-48", "acts-19-5"],
    },
  ],
  drillQuestions: [
    { id: "bjn-d1", level: 1, type: "recognize", prompt: "Which verse records Peter's baptismal command on the day of Pentecost?", answer: "Acts 2:38", choices: ["Acts 2:38", "Acts 8:16", "Acts 10:48", "Acts 19:5"] },
    { id: "bjn-d2", level: 2, type: "recall-reference", prompt: "Give the reference: 'they were baptized in the name of the Lord Jesus,' Ephesian disciples.", answer: "Acts 19:5", verseId: "acts-19-5" },
    { id: "bjn-d3", level: 3, type: "complete-phrase", prompt: "Complete Matthew 28:19: 'Baptizing them in the _____ of the Father, and of the Son, and of the Holy Ghost.'", answer: "name (singular)", verseId: "matt-28-19" },
    { id: "bjn-d4", level: 4, type: "explain-function", prompt: "Why does the singular word 'name' in Matthew 28:19 matter grammatically?", answer: "It signals one name covering all three titles, which the apostles then identify in practice as the name of Jesus." },
    { id: "bjn-d5", level: 5, type: "answer-objection", prompt: "Answer: 'Acts is just Luke summarizing, not quoting an actual formula.'", answer: "Four independent, consistent accounts across decades using nearly identical phrasing is a stronger case for an actual formula than a coincidence of summary language, especially since no NT baptism ever quotes the triune wording verbally." },
    { id: "bjn-d6", level: 6, type: "verse-chain", prompt: "Build the Baptism chain.", answer: "Matthew 28:19 -> Acts 2:38 -> Acts 8:16 -> Acts 10:48 -> Acts 19:5" },
    { id: "bjn-d7", level: 7, type: "debate-response", prompt: "Opponent: 'Every major denomination throughout church history has used the triune formula, that's 2000 years of consistent practice against your reading.' Respond.", answer: "Historical consensus describes what became widespread liturgical practice, it does not overturn the apostolic record itself; the earliest and closest-to-source evidence we have, the book of Acts, is unanimous in the opposite direction across four separate incidents, and later tradition shifting the practice doesn't rewrite what Luke recorded the apostles actually doing." },
  ],
  memoryPrompts: [
    { id: "bjn-m1", kind: "reference-first", prompt: "Acts 2:38 says what?", answer: "Repent, and be baptized every one of you in the name of Jesus Christ for the remission of sins.", verseId: "acts-2-38" },
    { id: "bjn-m2", kind: "phrase-first", prompt: "'Only they were baptized in the name of the Lord Jesus' is which reference?", answer: "Acts 8:16", verseId: "acts-8-16" },
    { id: "bjn-m3", kind: "cloze", prompt: "Baptizing them in the name of the Father, and of the Son, and of the ___ Ghost.", answer: "Holy", verseId: "matt-28-19" },
    { id: "bjn-m4", kind: "teach-back", prompt: "Explain in 60 seconds how Matthew 28:19 and Acts 2:38 fit together rather than contradict.", answer: "Free response, graded against: singular 'name,' four Acts examples, Jesus as the name behind all three titles." },
    { id: "bjn-m5", kind: "chain", prompt: "Walk the Baptism lane from memory: all four Acts locations.", answer: "Acts 2:38 (Jerusalem), Acts 8:16 (Samaria), Acts 10:48 (Caesarea/Gentiles), Acts 19:5 (Ephesus)" },
  ],
  debatePrompts: [
    "If someone was baptized using the triune formula in good faith, what does Acts 19:1-5 suggest should happen next?",
    "How do you answer 'the Didache already shows the triune formula in the first century, so Acts must be summary language'?",
  ],
};
