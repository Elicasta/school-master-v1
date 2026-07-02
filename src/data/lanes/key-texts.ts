import { DoctrineLane } from "@/types";

export const KEY_TEXTS_LANES: DoctrineLane[] = [
  {
    slug: "john-17", order: 22, difficulty: 2, masteryPercent: 0,
    title: "John 17",
    summary: "Jesus' high priestly prayer distinguishes 'the only true God' from Himself in address while praying for a oneness among believers that mirrors His own oneness with the Father.",
    goal: "Read John 17's Father/Son address through the incarnation, and its 'oneness' language as unity, not separate personhood.",
    verses: [
      { id: "john-17-3", reference: "John 17:3", text: "This is life eternal, that they might know thee the only true God, and Jesus Christ, whom thou hast sent.", role: "anchor", function: "Jesus prays to 'the only true God' while naming Himself as sent, incarnational address." },
      { id: "john-17-5-c", reference: "John 17:5", text: "Glorify thou me with thine own self, with the glory which I had with thee before the world was.", role: "anchor", function: "Preexistent glory sought again in incarnate form." },
      { id: "john-17-21-22", reference: "John 17:21-22", text: "That they all may be one; as thou, Father, art in me, and I in thee.", role: "variant", function: "Mutual indwelling as the pattern for believer unity, unity of purpose, not separate personhood." },
    ],
    objections: [{ id: "j17-obj-1", statement: "Praying to 'the only true God' proves Jesus is a distinct, lesser being from that God.", answerPath: "The prayer flows from the genuine human nature (Lane 3) addressing the fullness of deity indwelling Him (Lane 4), incarnational address, not a claim that the eternal Word is excluded from being that one true God Himself.", keyVerseIds: ["john-17-3"] }],
    drillQuestions: [
      { id: "j17-d1", level: 1, type: "recognize", prompt: "Which verse has Jesus pray to 'the only true God'?", answer: "John 17:3", choices: ["John 17:3", "John 17:5", "John 17:21", "John 14:9"] },
      { id: "j17-d3", level: 3, type: "complete-phrase", prompt: "Complete: 'as thou, Father, art in me, and I in _____.'", answer: "thee", verseId: "john-17-21-22" },
      { id: "j17-d5", level: 5, type: "answer-objection", prompt: "Answer: 'Praying to the only true God proves Jesus is a separate, lesser being.'", answer: "It's incarnational address, the human nature to the indwelling deity, not exclusion from being that God Himself." },
    ],
    memoryPrompts: [
      { id: "j17-m1", kind: "reference-first", prompt: "John 17:3 says what?", answer: "This is life eternal, that they might know thee the only true God, and Jesus Christ, whom thou hast sent.", verseId: "john-17-3" },
      { id: "j17-m2", kind: "phrase-first", prompt: "'The glory which I had with thee before the world was' is which reference?", answer: "John 17:5", verseId: "john-17-5-c" },
    ],
    debatePrompts: ["Why does John 17:21's 'oneness' pattern for believers actually argue against reading Father/Son oneness as separate personhood?"],
  },
  {
    slug: "matthew-28-19", order: 23, difficulty: 2, masteryPercent: 0,
    title: "Matthew 28:19",
    summary: "A focused drill lane on the Great Commission's baptismal formula and its singular 'name.'",
    goal: "Master the grammar and apostolic application of Matthew 28:19 specifically.",
    verses: [
      { id: "matt-28-19-b", reference: "Matthew 28:19", text: "Baptizing them in the name of the Father, and of the Son, and of the Holy Ghost.", role: "anchor", function: "Singular 'name' covering all three titles." },
      { id: "acts-2-38-b", reference: "Acts 2:38", text: "Be baptized every one of you in the name of Jesus Christ.", role: "anchor", function: "The apostles' own application of the Commission." },
      { id: "acts-19-5-b", reference: "Acts 19:5", text: "They were baptized in the name of the Lord Jesus.", role: "variant", function: "Consistent apostolic practice decades after the Commission." },
    ],
    objections: [{ id: "m2819-obj-1", statement: "Matthew 28:19 must be the literal words to be spoken at every baptism.", answerPath: "No baptism recorded anywhere in the New Testament actually quotes the words 'Father, Son, Holy Ghost' being spoken, while four separate accounts consistently use Jesus' name, the apostles' own application is our best evidence of what the command meant in practice.", keyVerseIds: ["matt-28-19-b", "acts-2-38-b"] }],
    drillQuestions: [
      { id: "m2819-d1", level: 1, type: "recognize", prompt: "How many separate baptisms 'in Jesus' name' are recorded in Acts?", answer: "Four", choices: ["Four", "One", "Two", "None"] },
      { id: "m2819-d3", level: 3, type: "complete-phrase", prompt: "Complete: 'Baptizing them in the _____ of the Father, and of the Son, and of the Holy Ghost.'", answer: "name (singular)", verseId: "matt-28-19-b" },
      { id: "m2819-d5", level: 5, type: "answer-objection", prompt: "Answer: 'Matthew 28:19 must be the exact words spoken.'", answer: "No NT baptism ever quotes that triune wording; four accounts consistently use Jesus' name instead." },
    ],
    memoryPrompts: [
      { id: "m2819-m1", kind: "reference-first", prompt: "Matthew 28:19 says what?", answer: "Baptizing them in the name of the Father, and of the Son, and of the Holy Ghost.", verseId: "matt-28-19-b" },
      { id: "m2819-m2", kind: "phrase-first", prompt: "'Baptized in the name of Jesus Christ' is which reference?", answer: "Acts 2:38", verseId: "acts-2-38-b" },
    ],
    debatePrompts: ["If Matthew 28:19 required a specific verbal formula, why does Acts never record anyone saying it?"],
  },
  {
    slug: "acts-baptism-formula", order: 24, difficulty: 2, masteryPercent: 0,
    title: "Acts Baptism Formula",
    summary: "All four recorded New Testament baptisms consistently use Jesus' name, the apostolic pattern across decades and locations.",
    goal: "Know all four Acts baptism accounts cold, as a chain.",
    verses: [
      { id: "acts-8-16-b", reference: "Acts 8:16", text: "Only they were baptized in the name of the Lord Jesus.", role: "anchor", function: "Samaria's baptisms." },
      { id: "acts-22-16-b", reference: "Acts 22:16", text: "Be baptized, and wash away thy sins, calling on the name of the Lord.", role: "anchor", function: "Paul's own baptism, same pattern applied to himself." },
      { id: "acts-10-48-b", reference: "Acts 10:48", text: "He commanded them to be baptized in the name of the Lord.", role: "variant", function: "Cornelius' Gentile household." },
    ],
    objections: [{ id: "abf-obj-1", statement: "These are just Luke's loose summaries, not exact formulas.", answerPath: "Four independent, consistent accounts across decades and locations is a stronger case for a real formula than a coincidence of summary phrasing, especially with zero surviving counter-example anywhere in the New Testament.", keyVerseIds: ["acts-8-16-b", "acts-22-16-b"] }],
    drillQuestions: [
      { id: "abf-d1", level: 1, type: "recognize", prompt: "Which verse records Samaria's baptism formula?", answer: "Acts 8:16", choices: ["Acts 8:16", "Acts 22:16", "Acts 10:48", "Acts 2:38"] },
      { id: "abf-d3", level: 3, type: "complete-phrase", prompt: "Complete: 'wash away thy sins, calling on the name of the _____.'", answer: "Lord", verseId: "acts-22-16-b" },
      { id: "abf-d5", level: 5, type: "answer-objection", prompt: "Answer: 'These are just loose summaries, not exact formulas.'", answer: "Four independent, consistent accounts across decades is stronger evidence of a real formula than coincidence." },
    ],
    memoryPrompts: [
      { id: "abf-m1", kind: "chain", prompt: "Walk all four Acts baptism locations from memory.", answer: "Acts 2:38 (Jerusalem), Acts 8:16 (Samaria), Acts 10:48 (Caesarea), Acts 19:5 (Ephesus)" },
      { id: "abf-m2", kind: "reference-first", prompt: "Acts 8:16 says what?", answer: "Only they were baptized in the name of the Lord Jesus.", verseId: "acts-8-16-b" },
    ],
    debatePrompts: ["Why does Paul's own baptism in Acts 22:16 matter as a data point alongside the other three?"],
  },
  {
    slug: "1-corinthians-8-6", order: 25, difficulty: 2, masteryPercent: 0,
    title: "1 Corinthians 8:6",
    summary: "Paul splits the Shema's two divine titles, God and LORD, across Father and Son to include both within Israel's one YHWH, not divide the one God into two beings.",
    goal: "Master the Shema-splitting reading of 1 Corinthians 8:6.",
    verses: [
      { id: "1cor-8-6", reference: "1 Corinthians 8:6", text: "To us there is but one God, the Father... and one Lord Jesus Christ.", role: "anchor", function: "Paul's own application of the Shema's two titles to Father and Son." },
      { id: "deut-6-4-b", reference: "Deuteronomy 6:4", text: "The LORD our God is one LORD.", role: "anchor", function: "The Shema Paul is drawing directly from." },
      { id: "mal-2-10-b", reference: "Malachi 2:10", text: "Have we not all one father? hath not one God created us?", role: "variant", function: "One God reaffirmed, foundational monotheism Paul assumes." },
    ],
    objections: [{ id: "1cor86-obj-1", statement: "Splitting 'God' onto the Father and 'Lord' onto Jesus proves they're two separate beings holding two separate titles.", answerPath: "Paul is deliberately splitting the Shema's own two divine names, God and LORD, across Father and Son to include both within the Shema's one YHWH, the same move Isaiah 44:6 and Revelation 22:13 make, inclusion within one identity, not division into two.", keyVerseIds: ["1cor-8-6", "deut-6-4-b"] }],
    drillQuestions: [
      { id: "1cor86-d1", level: 1, type: "recognize", prompt: "Which verse says 'one God, the Father... and one Lord Jesus Christ'?", answer: "1 Corinthians 8:6", choices: ["1 Corinthians 8:6", "Deuteronomy 6:4", "Malachi 2:10", "Ephesians 4:6"] },
      { id: "1cor86-d3", level: 3, type: "complete-phrase", prompt: "Complete: 'To us there is but one God, the _____.'", answer: "Father", verseId: "1cor-8-6" },
      { id: "1cor86-d5", level: 5, type: "answer-objection", prompt: "Answer: 'Splitting God/Lord across Father/Son proves two beings.'", answer: "Paul splits the Shema's own two titles to include both within one YHWH, not divide the one God into two." },
    ],
    memoryPrompts: [
      { id: "1cor86-m1", kind: "reference-first", prompt: "1 Corinthians 8:6 says what?", answer: "To us there is but one God, the Father... and one Lord Jesus Christ.", verseId: "1cor-8-6" },
      { id: "1cor86-m2", kind: "phrase-first", prompt: "'The LORD our God is one LORD' is which reference?", answer: "Deuteronomy 6:4", verseId: "deut-6-4-b" },
    ],
    debatePrompts: ["Why does 'Lord' (kyrios) carry the weight of YHWH itself, not a lesser title?"],
  },
  {
    slug: "philippians-2", order: 26, difficulty: 2, masteryPercent: 0,
    title: "Philippians 2",
    summary: "The kenosis hymn describes the eternal Word's self-emptying into human likeness, culminating in the exact YHWH-only confession language of Isaiah 45:23 applied to Jesus.",
    goal: "Master the kenosis hymn and its Isaiah 45:23 quotation.",
    verses: [
      { id: "phil-2-5-6", reference: "Philippians 2:5-6", text: "Who, being in the form of God, thought it not robbery to be equal with God.", role: "anchor", function: "Pre-incarnate status and rightful equality, not something reached for." },
      { id: "phil-2-9-11", reference: "Philippians 2:9-11", text: "That every tongue should confess that Jesus Christ is Lord, to the glory of God the Father.", role: "anchor", function: "Universal confession, echoing Isaiah 45:23's YHWH-only text." },
      { id: "isa-45-23", reference: "Isaiah 45:23", text: "Unto me every knee shall bow, every tongue shall swear.", role: "variant", function: "The original YHWH-exclusive confession text Paul applies to Jesus." },
    ],
    objections: [{ id: "phil2-obj-1", statement: "Equality with God being something Jesus didn't grasp at proves He wasn't equal to begin with.", answerPath: "'Thought it not robbery' means He didn't need to grasp for what was already rightfully His; the self-emptying that follows describes taking on human likeness, not surrendering deity, and the passage closes by applying Isaiah 45:23's exclusive YHWH confession directly to Jesus.", keyVerseIds: ["phil-2-5-6", "phil-2-9-11"] }],
    drillQuestions: [
      { id: "phil2-d1", level: 1, type: "recognize", prompt: "Which Old Testament verse does Philippians 2:10-11 echo?", answer: "Isaiah 45:23", choices: ["Isaiah 45:23", "Isaiah 43:11", "Deuteronomy 6:4", "Psalm 110:1"] },
      { id: "phil2-d3", level: 3, type: "complete-phrase", prompt: "Complete: 'thought it not robbery to be _____ with God.'", answer: "equal", verseId: "phil-2-5-6" },
      { id: "phil2-d5", level: 5, type: "answer-objection", prompt: "Answer: 'Not grasping at equality proves Jesus wasn't equal.'", answer: "It means equality was already rightfully His, not something to reach for; the passage applies Isaiah 45:23's YHWH-only text to Him." },
    ],
    memoryPrompts: [
      { id: "phil2-m1", kind: "reference-first", prompt: "Philippians 2:6 says what?", answer: "Who, being in the form of God, thought it not robbery to be equal with God.", verseId: "phil-2-5-6" },
      { id: "phil2-m2", kind: "phrase-first", prompt: "'Unto me every knee shall bow' is which reference?", answer: "Isaiah 45:23", verseId: "isa-45-23" },
    ],
    debatePrompts: ["Why does applying an exclusively-YHWH confession text to Jesus settle more than a general honor claim would?"],
  },
  {
    slug: "hebrews-1", order: 27, difficulty: 2, masteryPercent: 0,
    title: "Hebrews 1",
    summary: "Hebrews 1 calls the Son 'God' while also saying 'thy God' addresses Him, both true at once through the two-natures framework.",
    goal: "Master the Psalm 45 quotation and its two-natures resolution.",
    verses: [
      { id: "heb-1-3-b", reference: "Hebrews 1:3", text: "The brightness of his glory, and the express image of his person.", role: "anchor", function: "The Son as the exact representation of God's own glory." },
      { id: "heb-1-8", reference: "Hebrews 1:8", text: "Unto the Son he saith, Thy throne, O God, is for ever and ever.", role: "anchor", function: "The Son directly addressed as 'God' in a quoted royal psalm." },
      { id: "ps-45-6-7", reference: "Psalm 45:6-7", text: "Thy throne, O God, is for ever and ever... therefore God, thy God, hath anointed thee.", role: "variant", function: "The original royal psalm Hebrews 1:8-9 quotes." },
    ],
    objections: [{ id: "heb1-obj-1", statement: "Being addressed as both 'God' and having 'thy God' proves two distinct divine persons.", answerPath: "'O God' addresses the fullness of deity indwelling Christ (Colossians 2:9), while 'thy God' addresses His genuine human nature (Lane 3, compare John 20:17's 'my God and your God'), one person, two natures, both accurately addressed in the same royal psalm.", keyVerseIds: ["heb-1-8", "ps-45-6-7"] }],
    drillQuestions: [
      { id: "heb1-d1", level: 1, type: "recognize", prompt: "Which Old Testament psalm does Hebrews 1:8-9 quote?", answer: "Psalm 45", choices: ["Psalm 45", "Psalm 110", "Psalm 82", "Psalm 2"] },
      { id: "heb1-d3", level: 3, type: "complete-phrase", prompt: "Complete: 'the express image of his _____.'", answer: "person", verseId: "heb-1-3-b" },
      { id: "heb1-d5", level: 5, type: "answer-objection", prompt: "Answer: '\"O God\" and \"thy God\" in one passage proves two persons.'", answer: "One addresses the indwelling deity, the other the genuine human nature, one person, two natures." },
    ],
    memoryPrompts: [
      { id: "heb1-m1", kind: "reference-first", prompt: "Hebrews 1:8 says what?", answer: "Unto the Son he saith, Thy throne, O God, is for ever and ever.", verseId: "heb-1-8" },
      { id: "heb1-m2", kind: "phrase-first", prompt: "'The brightness of his glory' is which reference?", answer: "Hebrews 1:3", verseId: "heb-1-3-b" },
    ],
    debatePrompts: ["Why does quoting a royal psalm about a human Davidic king work as deity language for Christ?"],
  },
  {
    slug: "revelation-throne-texts", order: 28, difficulty: 2, masteryPercent: 0,
    title: "Revelation Throne Texts",
    summary: "Revelation applies YHWH's own exclusive titles, first and last, Alpha and Omega, directly to Jesus at the throne.",
    goal: "Master how Revelation's throne-room language identifies Jesus with YHWH.",
    verses: [
      { id: "rev-1-17-18", reference: "Revelation 1:17-18", text: "I am the first and the last: I am he that liveth, and was dead.", role: "anchor", function: "Jesus applies Isaiah 44:6's exclusive YHWH title to Himself." },
      { id: "rev-22-13", reference: "Revelation 22:13", text: "I am Alpha and Omega, the beginning and the end, the first and the last.", role: "anchor", function: "Same exclusive title repeated at the book's close." },
      { id: "rev-22-1", reference: "Revelation 22:1", text: "A pure river of water of life... proceeding out of the throne of God and of the Lamb.", role: "variant", function: "One throne shared by God and the Lamb, singular, not two thrones." },
    ],
    objections: [{ id: "rtt-obj-1", statement: "God and the Lamb being named together at the throne proves two separate beings sharing power.", answerPath: "Revelation 22:1 and 22:3 describe a single throne ('the throne of God and of the Lamb'), singular, not two adjacent thrones, and the same speaker takes YHWH's exclusive 'first and last' title in both Revelation 1:17 and 22:13, identifying rather than dividing.", keyVerseIds: ["rev-22-1", "rev-22-13"] }],
    drillQuestions: [
      { id: "rtt-d1", level: 1, type: "recognize", prompt: "Which verse has Jesus say 'I am the first and the last'?", answer: "Revelation 1:17-18", choices: ["Revelation 1:17-18", "Revelation 22:1", "Revelation 5:6", "Isaiah 44:6"] },
      { id: "rtt-d3", level: 3, type: "complete-phrase", prompt: "Complete: 'I am Alpha and Omega, the beginning and the _____.'", answer: "end", verseId: "rev-22-13" },
      { id: "rtt-d5", level: 5, type: "answer-objection", prompt: "Answer: 'God and the Lamb at the throne proves two separate beings.'", answer: "Revelation 22:1 describes one singular throne, and the same speaker takes YHWH's exclusive titles in both 1:17 and 22:13." },
    ],
    memoryPrompts: [
      { id: "rtt-m1", kind: "reference-first", prompt: "Revelation 22:13 says what?", answer: "I am Alpha and Omega, the beginning and the end, the first and the last.", verseId: "rev-22-13" },
      { id: "rtt-m2", kind: "phrase-first", prompt: "'The throne of God and of the Lamb' (singular throne) is which reference?", answer: "Revelation 22:1", verseId: "rev-22-1" },
    ],
    debatePrompts: ["Why does 'the throne of God and of the Lamb' being singular, not plural, matter for this argument?"],
  },
];
