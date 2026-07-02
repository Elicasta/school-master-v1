import { DoctrineLane } from "@/types";

export const HISTORY_LANES: DoctrineLane[] = [
  {
    slug: "jewish-monotheism", order: 29, difficulty: 2, masteryPercent: 0,
    title: "Jewish Monotheism",
    summary: "Second Temple Jewish monotheism, strict, numerical, and non-negotiable, is the actual soil the New Testament's Christology grows from, not a departure from it.",
    goal: "Know the Second Temple monotheistic background the apostles wrote within.",
    verses: [
      { id: "deut-6-4-c", reference: "Deuteronomy 6:4", text: "The LORD our God is one LORD.", role: "anchor", function: "The Shema, recited daily in Second Temple Judaism, the confession's absolute center." },
      { id: "zech-14-9-b", reference: "Zechariah 14:9", text: "In that day shall there be one LORD, and his name one.", role: "anchor", function: "Eschatological confirmation of strict, future oneness." },
      { id: "isa-45-21-22", reference: "Isaiah 45:21-22", text: "There is no God else beside me... look unto me, and be ye saved, all the ends of the earth.", role: "variant", function: "Universal, exclusive salvation belongs to the one God alone." },
    ],
    objections: [{ id: "jm-obj-1", statement: "Jewish monotheism is simply incompatible with any exalted view of a human Messiah.", answerPath: "Texts like Daniel 7:13-14 and Psalm 110:1 already circulated within Second Temple Judaism describing more-than-ordinary messianic figures, high Christology emerged from within, not against, this monotheistic framework.", keyVerseIds: ["deut-6-4-c"] }],
    drillQuestions: [
      { id: "jm-d1", level: 1, type: "recognize", prompt: "Which verse is the Shema, recited daily in Second Temple Judaism?", answer: "Deuteronomy 6:4", choices: ["Deuteronomy 6:4", "Zechariah 14:9", "Isaiah 45:21", "Exodus 20:3"] },
      { id: "jm-d3", level: 3, type: "complete-phrase", prompt: "Complete: 'In that day shall there be one LORD, and his name _____.'", answer: "one", verseId: "zech-14-9-b" },
      { id: "jm-d5", level: 5, type: "answer-objection", prompt: "Answer: 'Jewish monotheism can't fit an exalted Messiah.'", answer: "Daniel 7 and Psalm 110 already circulated more-than-ordinary messianic figures within Second Temple Judaism itself." },
    ],
    memoryPrompts: [
      { id: "jm-m1", kind: "reference-first", prompt: "Deuteronomy 6:4 says what?", answer: "The LORD our God is one LORD.", verseId: "deut-6-4-c" },
      { id: "jm-m2", kind: "phrase-first", prompt: "'One LORD, and his name one' is which reference?", answer: "Zechariah 14:9", verseId: "zech-14-9-b" },
    ],
    debatePrompts: ["How does Second Temple messianic speculation complicate the claim that high Christology is a late, foreign addition?"],
  },
  {
    slug: "church-fathers", order: 30, difficulty: 2, masteryPercent: 0,
    title: "Church Fathers",
    summary: "Early post-apostolic writers affirmed Christ's full deity in strong identification language, before the later technical vocabulary of persons and substance existed.",
    goal: "Know how the earliest fathers spoke of Christ's deity before Nicene categories formed.",
    verses: [
      { id: "john-1-1-c", reference: "John 1:1", text: "The Word was God.", role: "anchor", function: "The base text Ignatius echoes when calling Jesus 'our God' directly, around 35-108 AD." },
      { id: "1tim-3-16-c", reference: "1 Timothy 3:16", text: "God was manifest in the flesh.", role: "anchor", function: "The base text behind early strong-identification Christology." },
      { id: "col-2-9-c", reference: "Colossians 2:9", text: "In him dwelleth all the fulness of the Godhead bodily.", role: "variant", function: "Cited extensively by fathers on both later sides of the Trinity/Oneness divide." },
    ],
    objections: [{ id: "cf-obj-1", statement: "The earliest church fathers already taught the full, later Nicene Trinity.", answerPath: "Ignatius (d. c. 108) calls Jesus 'our God' directly with no developed three-person vocabulary at all; that language reads closer to strong identification than to a fully worked-out later system, the technical persons/substance framework is a fourth and fifth-century development, not present at the earliest layer.", keyVerseIds: ["john-1-1-c"] }],
    drillQuestions: [
      { id: "cf-d1", level: 1, type: "recognize", prompt: "Which early father called Jesus 'our God' directly, around 35-108 AD?", answer: "Ignatius of Antioch", choices: ["Ignatius of Antioch", "Tertullian", "Origen", "Justin Martyr"] },
      { id: "cf-d3", level: 3, type: "complete-phrase", prompt: "Complete: 'In him dwelleth all the fulness of the _____ bodily.'", answer: "Godhead", verseId: "col-2-9-c" },
      { id: "cf-d5", level: 5, type: "answer-objection", prompt: "Answer: 'The earliest fathers already taught the full Nicene Trinity.'", answer: "Ignatius's direct 'our God' language predates the persons/substance vocabulary by centuries." },
    ],
    memoryPrompts: [
      { id: "cf-m1", kind: "reference-first", prompt: "John 1:1 says what?", answer: "The Word was God.", verseId: "john-1-1-c" },
      { id: "cf-m2", kind: "teach-back", prompt: "Explain in 60 seconds why Ignatius's language doesn't map cleanly onto later Nicene categories.", answer: "Free response, graded against: direct 'our God' identification, absence of developed persons/substance vocabulary in his era." },
    ],
    debatePrompts: ["Why does the gap between Ignatius (d. c. 108) and Nicaea (325) matter for claims about 'the earliest church'?"],
  },
  {
    slug: "councils", order: 31, difficulty: 2, masteryPercent: 0,
    title: "Councils",
    summary: "Nicaea (325) targeted Arianism primarily; the fully three-person formula wasn't completed until Constantinople (381), showing real doctrinal development over decades.",
    goal: "Know what each major council actually targeted and settled.",
    verses: [
      { id: "john-1-1-d", reference: "John 1:1", text: "The Word was God.", role: "anchor", function: "Central to Nicaea's anti-Arian argument for the Son's uncreated deity." },
      { id: "john-10-30-c", reference: "John 10:30", text: "I and my Father are one.", role: "anchor", function: "Cited on multiple sides of the pre-Nicene debate over unity language." },
      { id: "titus-2-13-b", reference: "Titus 2:13", text: "The great God and our Saviour Jesus Christ.", role: "variant", function: "Grammatical unity of 'God' and 'Saviour Jesus Christ' cited in later Christological debates." },
    ],
    objections: [{ id: "cou-obj-1", statement: "Nicaea settled the Trinity vs Oneness question definitively in 325.", answerPath: "Nicaea's primary target was Arianism (the Son as a created being), not modalism; the specific three-co-equal-persons formulation, including the Spirit's full deity, wasn't completed until Constantinople in 381, fifty-six years later.", keyVerseIds: ["john-1-1-d"] }],
    drillQuestions: [
      { id: "cou-d1", level: 1, type: "recognize", prompt: "What was Nicaea's (325 AD) primary target?", answer: "Arianism", choices: ["Arianism", "Modalism", "Islam", "Gnosticism"] },
      { id: "cou-d3", level: 3, type: "complete-phrase", prompt: "Complete: 'the great God and our _____ Jesus Christ.'", answer: "Saviour", verseId: "titus-2-13-b" },
      { id: "cou-d5", level: 5, type: "answer-objection", prompt: "Answer: 'Nicaea settled Trinity vs Oneness in 325.'", answer: "Nicaea's target was Arianism; the three-persons formula wasn't completed until Constantinople in 381." },
    ],
    memoryPrompts: [
      { id: "cou-m1", kind: "reference-first", prompt: "John 10:30 says what?", answer: "I and my Father are one.", verseId: "john-10-30-c" },
      { id: "cou-m2", kind: "teach-back", prompt: "Explain the difference between what Nicaea (325) and Constantinople (381) each settled.", answer: "Free response, graded against: Nicaea vs Arianism, Constantinople completing the Spirit's deity and the three-person formula." },
    ],
    debatePrompts: ["Why does conflating Nicaea and Constantinople into one event weaken a church-history argument?"],
  },
  {
    slug: "trinity-formation", order: 32, difficulty: 2, masteryPercent: 0,
    title: "Trinity Formation",
    summary: "The technical vocabulary of 'Trinity,' 'persons,' and 'substance' developed gradually across the second through fifth centuries, not as a single, unchanging apostolic formula.",
    goal: "Trace how Trinity vocabulary developed rather than appeared complete.",
    verses: [
      { id: "matt-28-19-c", reference: "Matthew 28:19", text: "In the name of the Father, and of the Son, and of the Holy Ghost.", role: "anchor", function: "The threefold naming later formalized into the Trinity doctrine's structure." },
      { id: "1cor-8-6-b", reference: "1 Corinthians 8:6", text: "One God, the Father... and one Lord Jesus Christ.", role: "anchor", function: "Early apostolic language later drawn into Trinitarian argument." },
      { id: "2cor-13-14-b", reference: "2 Corinthians 13:14", text: "The grace of the Lord Jesus Christ, and the love of God, and the communion of the Holy Ghost.", role: "variant", function: "A triadic benediction later cited as early Trinitarian structure." },
    ],
    objections: [{ id: "tf-obj-1", statement: "The word 'Trinity' and its full technical meaning are found explicitly in the New Testament.", answerPath: "The term 'Trinity' (Latin trinitas) was first coined by Tertullian around 200 AD, and the fully precise 'one substance, three co-equal persons' formula wasn't finalized until the fourth and fifth centuries, the New Testament supplies the triadic texts later theologians built the vocabulary around, not the vocabulary itself.", keyVerseIds: ["matt-28-19-c"] }],
    drillQuestions: [
      { id: "tf-d1", level: 1, type: "recognize", prompt: "Who first coined the Latin term 'trinitas'?", answer: "Tertullian", choices: ["Tertullian", "Ignatius", "Paul", "Constantine"] },
      { id: "tf-d3", level: 3, type: "complete-phrase", prompt: "Complete: 'the communion of the Holy _____.'", answer: "Ghost", verseId: "2cor-13-14-b" },
      { id: "tf-d5", level: 5, type: "answer-objection", prompt: "Answer: '\"Trinity\" is an explicit New Testament word.'", answer: "The term was coined by Tertullian around 200 AD; the NT supplies triadic texts, not the later technical vocabulary." },
    ],
    memoryPrompts: [
      { id: "tf-m1", kind: "reference-first", prompt: "2 Corinthians 13:14 says what?", answer: "The grace of the Lord Jesus Christ, and the love of God, and the communion of the Holy Ghost.", verseId: "2cor-13-14-b" },
      { id: "tf-m2", kind: "teach-back", prompt: "Explain in 60 seconds the difference between triadic NT texts and the later technical Trinity vocabulary.", answer: "Free response, graded against: triadic texts present early, technical persons/substance vocabulary developed later." },
    ],
    debatePrompts: ["Why does a triadic benediction like 2 Corinthians 13:14 not automatically prove the later technical formula?"],
  },
  {
    slug: "oneness-history", order: 33, difficulty: 2, masteryPercent: 0,
    title: "Oneness History",
    summary: "Modern Oneness Pentecostalism emerged from a 1913-16 revival movement re-articulating ancient monotheistic and Jesus'-name texts, not inventing new scripture.",
    goal: "Know the historical emergence of the modern Oneness Pentecostal movement.",
    verses: [
      { id: "acts-2-38-c", reference: "Acts 2:38", text: "Be baptized every one of you in the name of Jesus Christ.", role: "anchor", function: "The central text behind the 1913 'New Issue' revival at Arroyo Seco, California." },
      { id: "isa-9-6-b", reference: "Isaiah 9:6", text: "The mighty God, The everlasting Father.", role: "anchor", function: "Central Oneness proof text for identifying the Son with the Father." },
      { id: "col-2-9-d", reference: "Colossians 2:9", text: "In him dwelleth all the fulness of the Godhead bodily.", role: "variant", function: "Central Oneness proof text for full deity in Christ." },
    ],
    objections: [{ id: "oh-obj-1", statement: "Oneness Pentecostalism is a brand-new twentieth-century invention with no historical roots.", answerPath: "The 1913-16 'New Issue' was a revival re-articulation of Jesus'-name baptism and strict monotheism using the same ancient texts (Acts 2:38, Isaiah 9:6) that existed the entire time; the movement's modern organizational form is recent, its scriptural basis is not.", keyVerseIds: ["acts-2-38-c"] }],
    drillQuestions: [
      { id: "oh-d1", level: 1, type: "recognize", prompt: "In what year did the 'New Issue' revival that shaped modern Oneness Pentecostalism begin?", answer: "1913", choices: ["1913", "1901", "1945", "1517"] },
      { id: "oh-d3", level: 3, type: "complete-phrase", prompt: "Complete: 'The mighty God, The everlasting _____.'", answer: "Father", verseId: "isa-9-6-b" },
      { id: "oh-d5", level: 5, type: "answer-objection", prompt: "Answer: 'Oneness Pentecostalism has no historical roots, it's brand new.'", answer: "It's a revival re-articulation of ancient texts (Acts 2:38, Isaiah 9:6), the movement's organizational form is recent, its scripture is not." },
    ],
    memoryPrompts: [
      { id: "oh-m1", kind: "reference-first", prompt: "Isaiah 9:6 names the child what, alongside 'The mighty God'?", answer: "The everlasting Father.", verseId: "isa-9-6-b" },
      { id: "oh-m2", kind: "teach-back", prompt: "Explain in 60 seconds the difference between the movement's modern form and its scriptural basis.", answer: "Free response, graded against: 1913-16 revival timing, ancient texts underlying the movement." },
    ],
    debatePrompts: ["Why doesn't a movement's recent organizational founding date settle whether its underlying textual claims are old or new?"],
  },
  {
    slug: "modalism-accusations", order: 34, difficulty: 2, masteryPercent: 0,
    title: "Modalism Accusations",
    summary: "The historic Sabellian modalism accusation targets sequential modes; historic Oneness theology teaches simultaneous indwelling, a real structural difference.",
    goal: "Master the sequential-vs-simultaneous distinction that answers this accusation.",
    verses: [
      { id: "john-10-30-d", reference: "John 10:30", text: "I and my Father are one.", role: "anchor", function: "Central unity text cited by both Sabellius's ancient opponents and modern accusers." },
      { id: "john-14-9-10", reference: "John 14:9-10", text: "He that hath seen me hath seen the Father... the Father that dwelleth in me.", role: "anchor", function: "Indwelling language central to the simultaneous, not sequential, Oneness model." },
      { id: "matt-3-16-17", reference: "Matthew 3:16-17", text: "The Spirit of God descending like a dove... a voice from heaven.", role: "variant", function: "The baptism scene, the key test case for sequential vs. simultaneous manifestation." },
    ],
    objections: [{ id: "macc-obj-1", statement: "Any 'one God revealed differently at different times' view is automatically Sabellian modalism.", answerPath: "Ancient sources describe Sabellius teaching sequential modes, the Father-mode ending before the Son-mode begins; historic Oneness theology teaches simultaneous indwelling, all three present and active at once (as at Jesus' baptism), which sequential modalism could not explain.", keyVerseIds: ["matt-3-16-17"] }],
    drillQuestions: [
      { id: "macc-d1", level: 1, type: "recognize", prompt: "What structure did ancient sources attribute to Sabellius's modalism?", answer: "Sequential modes", choices: ["Sequential modes", "Simultaneous indwelling", "Three eternal persons", "Two divine beings"] },
      { id: "macc-d3", level: 3, type: "complete-phrase", prompt: "Complete: 'the Father that dwelleth in _____.'", answer: "me", verseId: "john-14-9-10" },
      { id: "macc-d5", level: 5, type: "answer-objection", prompt: "Answer: 'Any one-God-revealed-differently view is automatically Sabellian.'", answer: "Sabellius taught sequential modes; historic Oneness teaches simultaneous indwelling, a real structural difference." },
    ],
    memoryPrompts: [
      { id: "macc-m1", kind: "reference-first", prompt: "John 14:10 says what?", answer: "The Father that dwelleth in me, he doeth the works.", verseId: "john-14-9-10" },
      { id: "macc-m2", kind: "teach-back", prompt: "Explain in 60 seconds why the baptism scene is the key test case for this whole topic.", answer: "Free response, graded against: simultaneous presence of voice, dove, and incarnate body, which sequential modalism can't explain." },
    ],
    debatePrompts: ["Why is the baptism-of-Jesus scene the single best test case for the sequential-vs-simultaneous distinction?"],
  },
];
