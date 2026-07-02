import { DoctrineLane } from "@/types";

export const COMPARATIVE_LANES: DoctrineLane[] = [
  {
    slug: "arianism", order: 35, difficulty: 2, masteryPercent: 0,
    title: "Arianism",
    summary: "Arianism holds the Son is God's first and greatest creation, not eternal; the New Testament excludes Him from the category of created things.",
    goal: "Master the standard texts for and against a created Christ.",
    verses: [
      { id: "prov-8-22-b", reference: "Proverbs 8:22", text: "The LORD possessed me in the beginning of his way.", role: "anchor", function: "Arian proof text, personified Wisdom's 'possession,' read literally of the Son." },
      { id: "col-1-15-b", reference: "Colossians 1:15", text: "The firstborn of every creature.", role: "anchor", function: "Arian proof text for the Son as first among created things." },
      { id: "col-1-16-b", reference: "Colossians 1:16", text: "By him were all things created.", role: "variant", function: "The passage's own resolution: the Son creates 'all things,' excluding Him from that category." },
    ],
    objections: [{ id: "ar-obj-1", statement: "'Firstborn of every creature' plainly means Jesus was the first thing created.", answerPath: "Firstborn (prototokos) is a rank title in Jewish usage (Psalm 89:27, David called 'firstborn' though not literally first-born), and the very next verse says 'by him were ALL things created,' which excludes Him from the category rather than placing Him in it.", keyVerseIds: ["col-1-15-b", "col-1-16-b"] }],
    drillQuestions: [
      { id: "ar-d1", level: 1, type: "recognize", prompt: "Which verse calls Christ 'the firstborn of every creature'?", answer: "Colossians 1:15", choices: ["Colossians 1:15", "Proverbs 8:22", "Colossians 1:16", "John 1:1"] },
      { id: "ar-d3", level: 3, type: "complete-phrase", prompt: "Complete: 'By him were _____ things created.'", answer: "all", verseId: "col-1-16-b" },
      { id: "ar-d5", level: 5, type: "answer-objection", prompt: "Answer: '\"Firstborn\" means first created.'", answer: "It's a rank title (Psalm 89:27); Colossians 1:16 excludes the Son from 'all things' created by Him." },
    ],
    memoryPrompts: [
      { id: "ar-m1", kind: "reference-first", prompt: "Colossians 1:16 says what?", answer: "By him were all things created.", verseId: "col-1-16-b" },
      { id: "ar-m2", kind: "phrase-first", prompt: "'The firstborn of every creature' is which reference?", answer: "Colossians 1:15", verseId: "col-1-15-b" },
    ],
    debatePrompts: ["Why does Psalm 89:27's use of 'firstborn' for David matter for reading Colossians 1:15?"],
  },
  {
    slug: "socinianism", order: 36, difficulty: 2, masteryPercent: 0,
    title: "Socinianism",
    summary: "Socinianism denies both the Trinity and Christ's preexistence, treating Jesus as fully human only, exalted but not eternally divine.",
    goal: "Answer the Unitarian denial of both preexistence and full deity.",
    verses: [
      { id: "john-1-1-e", reference: "John 1:1", text: "The Word was God.", role: "anchor", function: "Direct deity claim Socinianism must reinterpret or deny." },
      { id: "john-8-58-b", reference: "John 8:58", text: "Before Abraham was, I am.", role: "anchor", function: "Direct preexistence claim, echoing Exodus 3:14." },
      { id: "col-2-9-e", reference: "Colossians 2:9", text: "All the fulness of the Godhead bodily.", role: "variant", function: "Full, not partial, deity indwelling Christ." },
    ],
    objections: [{ id: "soc-c-obj-1", statement: "Jesus was simply an exalted human being, given divine authority and honor after His life, not eternally preexistent or divine in nature.", answerPath: "John 8:58's 'before Abraham was, I am' uses YHWH's own self-designation from Exodus 3:14, spoken by Jesus of Himself before His resurrection or exaltation, a direct preexistence and deity claim that an exalted-human-only view cannot account for.", keyVerseIds: ["john-8-58-b"] }],
    drillQuestions: [
      { id: "soc-c-d1", level: 1, type: "recognize", prompt: "Which verse has Jesus claim 'before Abraham was, I am'?", answer: "John 8:58", choices: ["John 8:58", "John 1:1", "Colossians 2:9", "Philippians 2:6"] },
      { id: "soc-c-d3", level: 3, type: "complete-phrase", prompt: "Complete: 'Before Abraham was, _____.'", answer: "I am", verseId: "john-8-58-b" },
      { id: "soc-c-d5", level: 5, type: "answer-objection", prompt: "Answer: 'Jesus was just an exalted human, honored after His life.'", answer: "John 8:58 has Jesus claim YHWH's own self-designation before His exaltation, a direct preexistence and deity claim." },
    ],
    memoryPrompts: [
      { id: "soc-c-m1", kind: "reference-first", prompt: "John 8:58 says what?", answer: "Before Abraham was, I am.", verseId: "john-8-58-b" },
      { id: "soc-c-m2", kind: "phrase-first", prompt: "'The Word was God' is which reference?", answer: "John 1:1", verseId: "john-1-1-e" },
    ],
    debatePrompts: ["Why does the Exodus 3:14 echo in John 8:58 matter more than a simple claim of old age or priority?"],
  },
  {
    slug: "jehovahs-witness-christology", order: 37, difficulty: 2, masteryPercent: 0,
    title: "Jehovah's Witness Christology",
    summary: "A companion study lane to the JW debate opponent, focused on the core texts: Jesus as Michael/first creation vs. Jesus as uncreated Creator.",
    goal: "Drill the core texts behind the created-Christ vs. uncreated-Creator dispute.",
    verses: [
      { id: "col-1-16-c", reference: "Colossians 1:16", text: "By him were all things created... all things were created by him, and for him.", role: "anchor", function: "Excludes the Son from the category of created things, including angels." },
      { id: "john-1-1-f", reference: "John 1:1", text: "The Word was God.", role: "anchor", function: "Central text behind the NWT's disputed 'a god' rendering." },
      { id: "heb-1-6", reference: "Hebrews 1:6", text: "Let all the angels of God worship him.", role: "variant", function: "Angels commanded to worship the Son, while forbidden from receiving that same worship themselves elsewhere." },
    ],
    objections: [{ id: "jwc-obj-1", statement: "Jesus is Michael the archangel, God's first creation, not the uncreated Creator.", answerPath: "Colossians 1:16's 'all things' created by Him would have to include Him if He were a created angelic being, which is self-contradictory; Hebrews 1:6 also has angels commanded to worship the Son, while Revelation 19:10 has an angel refuse that same worship for itself, a category difference between the Son and any angel including Michael.", keyVerseIds: ["col-1-16-c", "heb-1-6"] }],
    drillQuestions: [
      { id: "jwc-d1", level: 1, type: "recognize", prompt: "Which verse commands angels to worship the Son?", answer: "Hebrews 1:6", choices: ["Hebrews 1:6", "Colossians 1:16", "John 1:1", "Revelation 19:10"] },
      { id: "jwc-d3", level: 3, type: "complete-phrase", prompt: "Complete: 'Let all the angels of God _____ him.'", answer: "worship", verseId: "heb-1-6" },
      { id: "jwc-d5", level: 5, type: "answer-objection", prompt: "Answer: 'Jesus is Michael the archangel, a created being.'", answer: "Colossians 1:16 excludes Him from created things; angels are commanded to worship Him, a category angels don't receive themselves." },
    ],
    memoryPrompts: [
      { id: "jwc-m1", kind: "reference-first", prompt: "Colossians 1:16 says what?", answer: "By him were all things created... all things were created by him, and for him.", verseId: "col-1-16-c" },
      { id: "jwc-m2", kind: "phrase-first", prompt: "'Let all the angels of God worship him' is which reference?", answer: "Hebrews 1:6", verseId: "heb-1-6" },
    ],
    debatePrompts: ["Why does an angel refusing worship in Revelation 19:10 matter for the Hebrews 1:6 command?"],
  },
  {
    slug: "mormon-doctrine", order: 38, difficulty: 2, masteryPercent: 0,
    title: "Mormon Doctrine",
    summary: "A companion study lane to the Mormon debate opponent, focused on eternal progression and God's unchanging nature.",
    goal: "Drill the core texts behind the eternal-progression vs. unchanging-God dispute.",
    verses: [
      { id: "mal-3-6-b", reference: "Malachi 3:6", text: "I am the LORD, I change not.", role: "anchor", function: "Direct denial of a God who progressed or changed into deity." },
      { id: "isa-43-10-b", reference: "Isaiah 43:10", text: "Before me there was no God formed, neither shall there be after me.", role: "anchor", function: "Rules out any prior state from which God progressed." },
      { id: "ps-82-6-7", reference: "Psalm 82:6-7", text: "I have said, Ye are gods... but ye shall die like men.", role: "variant", function: "Human 'gods' language applied to judges, immediately followed by mortality, not exaltation." },
    ],
    objections: [{ id: "md-obj-1", statement: "'As man is, God once was; as God is, man may become' is supported by Psalm 82's 'ye are gods.'", answerPath: "Psalm 82 addresses human judges ironically, calling them 'gods' precisely because they abused delegated authority, and the very next verse sentences them to death like ordinary men, undercutting any exaltation reading; Malachi 3:6's 'I change not' directly denies a God who progressed into deity.", keyVerseIds: ["ps-82-6-7", "mal-3-6-b"] }],
    drillQuestions: [
      { id: "md-d1", level: 1, type: "recognize", prompt: "Which verse says 'I am the LORD, I change not'?", answer: "Malachi 3:6", choices: ["Malachi 3:6", "Isaiah 43:10", "Psalm 82:6", "Psalm 90:2"] },
      { id: "md-d3", level: 3, type: "complete-phrase", prompt: "Complete: 'Ye are gods... but ye shall die like _____.'", answer: "men", verseId: "ps-82-6-7" },
      { id: "md-d5", level: 5, type: "answer-objection", prompt: "Answer: 'Psalm 82 supports humans becoming gods.'", answer: "The very next verse sentences the 'gods' to death like ordinary men, undercutting an exaltation reading." },
    ],
    memoryPrompts: [
      { id: "md-m1", kind: "reference-first", prompt: "Malachi 3:6 says what?", answer: "I am the LORD, I change not.", verseId: "mal-3-6-b" },
      { id: "md-m2", kind: "phrase-first", prompt: "'Before me there was no God formed' is which reference?", answer: "Isaiah 43:10", verseId: "isa-43-10-b" },
    ],
    debatePrompts: ["Why does Psalm 82:7's 'die like men' undercut an exaltation reading of verse 6?"],
  },
  {
    slug: "islamic-tawhid-objections", order: 39, difficulty: 2, masteryPercent: 0,
    title: "Islamic Tawhid Objections",
    summary: "A companion study lane to the Muslim debate opponent, focused on shared strict monotheism as common ground.",
    goal: "Drill how Oneness monotheism engages tawhid on genuinely shared ground.",
    verses: [
      { id: "deut-6-4-d", reference: "Deuteronomy 6:4", text: "The LORD our God is one LORD.", role: "anchor", function: "Strict, absolute monotheism shared as common ground with tawhid." },
      { id: "luke-1-35-b", reference: "Luke 1:35", text: "The Holy Ghost shall come upon thee... that holy thing which shall be born of thee shall be called the Son of God.", role: "anchor", function: "Non-physical, Spirit-overshadowing conception, distinct from pagan god-siring mythology." },
      { id: "john-1-14-c", reference: "John 1:14", text: "The Word was made flesh, and dwelt among us.", role: "variant", function: "Incarnation as God's Spirit taking flesh, not literal begetting." },
    ],
    objections: [{ id: "ito-obj-1", statement: "Any claim that Jesus is 'Son of God' violates tawhid's absolute rejection of partners with God.", answerPath: "Luke 1:35 describes a miraculous, non-physical overshadowing by the Holy Ghost, not the pagan god-siring-children mythology tawhid correctly rejects; Oneness theology's strict monotheism (Deuteronomy 6:4, no plurality of persons at all) is structurally closer to tawhid's actual concern than a multi-person model would be.", keyVerseIds: ["luke-1-35-b", "deut-6-4-d"] }],
    drillQuestions: [
      { id: "ito-d1", level: 1, type: "recognize", prompt: "Which verse describes the conception as the Holy Ghost 'overshadowing' Mary?", answer: "Luke 1:35", choices: ["Luke 1:35", "John 1:14", "Deuteronomy 6:4", "Matthew 1:18"] },
      { id: "ito-d3", level: 3, type: "complete-phrase", prompt: "Complete: 'that holy thing which shall be born of thee shall be called the _____.'", answer: "Son of God", verseId: "luke-1-35-b" },
      { id: "ito-d5", level: 5, type: "answer-objection", prompt: "Answer: '\"Son of God\" violates tawhid's rejection of partners with God.'", answer: "Luke 1:35 describes a non-physical Spirit-overshadowing, not the pagan mythology tawhid rejects; Oneness monotheism itself affirms strict oneness." },
    ],
    memoryPrompts: [
      { id: "ito-m1", kind: "reference-first", prompt: "Luke 1:35 says what?", answer: "The Holy Ghost shall come upon thee... that holy thing which shall be born of thee shall be called the Son of God.", verseId: "luke-1-35-b" },
      { id: "ito-m2", kind: "phrase-first", prompt: "'The LORD our God is one LORD' is which reference?", answer: "Deuteronomy 6:4", verseId: "deut-6-4-d" },
    ],
    debatePrompts: ["Why is Oneness theology's monotheism a stronger starting point than Trinitarianism's when engaging tawhid specifically?"],
  },
];
