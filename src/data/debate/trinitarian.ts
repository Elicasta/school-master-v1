import { DebateOpponent } from "@/types";

export const trinitarian: DebateOpponent = {
  type: "trinitarian",
  label: "Trinitarian",
  description:
    "Argues classical Nicene Trinitarianism: one God eternally existing in three co-equal, co-eternal persons, Father, Son, and Holy Spirit.",
  topics: [
    {
      slug: "baptism-of-jesus",
      title: "Baptism of Jesus",
      tree: {
        id: "trin-baptism-root",
        speaker: "opponent",
        statement:
          "At Jesus' baptism, the Father speaks from heaven, the Son is in the water, and the Spirit descends as a dove. Three persons, visible at once, in one scene. How is that one person?",
        verseRefs: ["Matthew 3:16-17"],
        choices: [
          {
            key: "A",
            text: "It was a vision the crowd shared, not literal events.",
            correct: false,
            rubricNote: "Weak. The text presents this as a real historical event, denying it undercuts your own use of the Gospels elsewhere.",
          },
          {
            key: "B",
            text: "The Son's human nature stands in the water while the Spirit and the voice represent the fullness of deity manifesting in two forms at once, one person operating through distinct simultaneous manifestations, not three persons.",
            correct: true,
            rubricNote: "Correct. This keeps the incarnation's human/divine distinction intact without requiring three separate centers of consciousness.",
            next: {
              id: "trin-baptism-push",
              speaker: "opponent",
              statement:
                "But a voice, a dove, and a man in a river are three simultaneous, spatially distinct manifestations. Doesn't simultaneity require three persons, not one shifting between modes?",
              choices: [
                {
                  key: "A",
                  text: "God is not bound by space the way a human is; the incarnate body in the water is the localized human manifestation, while the voice and the Spirit-form are simultaneous non-bodily manifestations of the same one Spirit that fills that body, this is a single being manifesting in more than one perceivable form at once, not multiple persons.",
                  correct: true,
                  rubricNote: "Correct. This is the standard Oneness answer: manifestation is not limited to one location because God is Spirit (Lane 8), unlike the incarnate body.",
                },
                {
                  key: "B",
                  text: "It's a mystery we can't fully explain.",
                  correct: false,
                  rubricNote: "Avoid retreating to mystery when a textual answer exists, it concedes the point by default.",
                },
                {
                  key: "C",
                  text: "The dove wasn't really the Spirit, just a symbol.",
                  correct: false,
                  rubricNote: "Weakens your own case, the text explicitly says the Spirit descended like a dove.",
                },
                {
                  key: "D",
                  text: "This proves the Trinity, concede the point.",
                  correct: false,
                  rubricNote: "Do not concede when a coherent Oneness answer exists.",
                },
              ],
            },
          },
          {
            key: "C",
            text: "The Trinity is right, I have no answer for this one.",
            correct: false,
            rubricNote: "This scene is answerable, don't concede prematurely.",
          },
          {
            key: "D",
            text: "God the Father is a different God from Jesus.",
            correct: false,
            rubricNote: "This breaks Lane 1's monotheism and creates the two-gods problem you're trying to avoid.",
          },
        ],
      },
    },
    {
      slug: "john-1-1",
      title: "John 1:1",
      tree: {
        id: "trin-john11-root",
        speaker: "opponent",
        statement:
          "'The Word was WITH God, and the Word WAS God.' If the Word is with God, the Word must be a distinct person from God.",
        verseRefs: ["John 1:1"],
        choices: [
          {
            key: "A",
            text: "'With God' describes the Word's own self-existent relationship to God the way thought exists 'with' a mind before expression, and 'was God' identifies that Word as fully God Himself, not a second person; John is describing God's own self-expressive utterance, not introducing a second divine individual.",
            correct: true,
            rubricNote: "Correct. Keeps 'with God' and 'was God' in tension without splitting into two persons.",
            next: {
              id: "trin-john11-push",
              speaker: "opponent",
              statement:
                "But prepositions like 'with' (pros) in Greek describe face-to-face relationship between distinct entities elsewhere in the NT. Why read it differently here?",
              choices: [
                {
                  key: "A",
                  text: "Context governs word meaning, not a mechanical rule applied the same way everywhere; John immediately clarifies in verse 14 that this Word 'was made flesh,' the same subject becoming incarnate, and by John 10:30 and 14:9 the Gospel's own internal logic identifies the Word/Son with the Father's very presence, not a face-to-face second being.",
                  correct: true,
                  rubricNote: "Correct. Anchors the answer in the Gospel of John's own internal identity statements (Lane 2 and Lane 4), not an isolated grammar rule.",
                },
                {
                  key: "B",
                  text: "Pros never means face-to-face anywhere in Greek.",
                  correct: false,
                  rubricNote: "False claim, easily refuted, don't overstate a grammar point you can't fully defend.",
                },
                {
                  key: "C",
                  text: "I'll need to look that up.",
                  correct: false,
                  rubricNote: "Acceptable honesty in real conversation, but in drilled debate prep this counts as an unprepared answer.",
                },
                {
                  key: "D",
                  text: "That proves two persons, I concede.",
                  correct: false,
                  rubricNote: "Premature concession, the Gospel's own later statements resolve the tension.",
                },
              ],
            },
          },
          {
            key: "B",
            text: "The Word is just an impersonal force, not God at all.",
            correct: false,
            rubricNote: "Contradicts the text directly, 'the Word was God.'",
          },
          {
            key: "C",
            text: "John 1:1 is a mistranslation, it should say 'a god.'",
            correct: false,
            rubricNote: "See Lane 2's objection handling, this concedes ground you don't need to concede and invites a Colwell's Rule fight you'll likely lose on translation grounds alone.",
          },
          {
            key: "D",
            text: "There are two gods, a greater and a lesser.",
            correct: false,
            rubricNote: "Breaks strict monotheism from Lane 1.",
          },
        ],
      },
    },
    {
      slug: "john-17-5",
      title: "John 17:5",
      tree: {
        id: "trin-john175-root",
        speaker: "opponent",
        statement:
          "Jesus prays, 'Father, glorify me with the glory which I had with thee before the world was.' That's the Son recalling pre-incarnate personal fellowship with the Father, two persons, before creation.",
        verseRefs: ["John 17:5"],
        choices: [
          {
            key: "A",
            text: "The eternal Word (Lane 2, John 1:1) that would become the Son at the incarnation possessed glory in the divine plan and foreknowledge of God before the world existed; the human Jesus, praying from His genuine human nature (Lane 3), asks to be restored to the glory that belonged to Him as the Word, His own pre-incarnate self-existence as God, not a conversation between two separate persons.",
            correct: true,
            rubricNote: "Correct. Distinguishes the eternal Word's glory (which the incarnate Son now asks to be restored to) from a claim of two eternal persons.",
            next: {
              id: "trin-john175-push",
              speaker: "opponent",
              statement:
                "That still sounds like the Son is asking someone else, the Father, to give Him something. Doesn't asking require two distinct wills, at minimum, if not two persons?",
              choices: [
                {
                  key: "A",
                  text: "Two wills is exactly what the Sonship / Humanity lane (Lane 3) already establishes: full humanity means a real human will (Hebrews 4:15, Gethsemane's 'not my will'), submitting to the fullness of deity indwelling that one person (Lane 4, 'the Father dwelleth in me'); two wills in one person is coherent, two persons is the extra, unproven leap.",
                  correct: true,
                  rubricNote: "Correct. Two wills in one incarnate person is the standard, defensible Oneness Christological answer.",
                },
                {
                  key: "B",
                  text: "Jesus was just speaking poetically, He didn't mean it literally.",
                  correct: false,
                  rubricNote: "Weakens your credibility, treat the prayer as a real, meaningful statement.",
                },
                {
                  key: "C",
                  text: "The Father and Son are the same person with no distinction of any kind, including will.",
                  correct: false,
                  rubricNote: "Overcorrects into a denial of real human volition, which undermines Lane 3's real-humanity claim (avoid the modalism-without-nuance trap).",
                },
                {
                  key: "D",
                  text: "This is unanswerable, the Trinity wins here.",
                  correct: false,
                  rubricNote: "It is answerable through the two-natures framework already built in Lanes 3 and 4.",
                },
              ],
            },
          },
          {
            key: "B",
            text: "Jesus never actually existed before Bethlehem.",
            correct: false,
            rubricNote: "Contradicts Lane 6 (Creation/Word) and John 1:1's pre-incarnate Word.",
          },
          {
            key: "C",
            text: "This verse doesn't exist in the earliest manuscripts.",
            correct: false,
            rubricNote: "False, don't make textual-criticism claims you can't back up under pressure.",
          },
          {
            key: "D",
            text: "The Father is greater in rank only, so this is fine, no explanation needed.",
            correct: false,
            rubricNote: "Doesn't actually engage the two-persons claim being made.",
          },
        ],
      },
    },
    {
      slug: "matthew-28-19",
      title: "Matthew 28:19",
      tree: {
        id: "trin-matt2819-root",
        speaker: "opponent",
        statement:
          "'In the name of the Father, and of the Son, and of the Holy Ghost,' three distinct names listed side by side. That's a Trinity formula plain on its face.",
        verseRefs: ["Matthew 28:19"],
        choices: [
          {
            key: "A",
            text: "The verse says 'name,' singular, not 'names,' covering all three titles, and the apostles who received this exact commission consistently baptized specifically in the name of Jesus (Acts 2:38, 8:16, 10:48, 19:5, Lane 7), showing they understood 'the name' behind Father, Son, and Holy Ghost to be Jesus.",
            correct: true,
            rubricNote: "Correct. Grammar (singular 'name') plus apostolic practice (Lane 7) is the strongest combined answer.",
            next: {
              id: "trin-matt2819-push",
              speaker: "opponent",
              statement:
                "Singular 'name' could just be stylistic Greek, and maybe Acts is abbreviating the full Trinitarian formula for brevity in a summary narrative. Why prefer your reading?",
              choices: [
                {
                  key: "A",
                  text: "Four separate baptismal accounts, in four different cities, spanning at least two decades, recorded by the same author who also wrote the Gospel containing Matthew's parallel commission tradition (Luke, writing Acts), all independently converge on the same specific phrase; that consistency is a stronger textual signal than assuming abbreviation with zero surviving example of the alternative formula anywhere in the New Testament.",
                  correct: true,
                  rubricNote: "Correct. The absence of any recorded triune-formula baptism anywhere in Acts or the epistles is the decisive point.",
                },
                {
                  key: "B",
                  text: "Luke just made a stylistic choice with no theological significance.",
                  correct: false,
                  rubricNote: "Undercuts your own argument, if it's stylistically meaningless, it can't support your reading either.",
                },
                {
                  key: "C",
                  text: "Matthew 28:19 was added later by scribes and isn't original.",
                  correct: false,
                  rubricNote: "No strong manuscript basis for this claim, avoid it, it will be checked and lost.",
                },
                {
                  key: "D",
                  text: "I'll just agree both formulas are valid.",
                  correct: false,
                  rubricNote: "Doesn't resolve the doctrinal question the opponent raised, dodges rather than answers.",
                },
              ],
            },
          },
          {
            key: "B",
            text: "Matthew 28:19 isn't in the Bible at all.",
            correct: false,
            rubricNote: "False and easily disproven, damages credibility instantly.",
          },
          {
            key: "C",
            text: "There are three separate gods listed here.",
            correct: false,
            rubricNote: "Breaks Lane 1's monotheism outright.",
          },
          {
            key: "D",
            text: "The Holy Ghost isn't really God, just a force, so only two names count.",
            correct: false,
            rubricNote: "Contradicts Lane 8, the Holy Ghost is the Spirit of the one God.",
          },
        ],
      },
    },
    {
      slug: "2-corinthians-13-14",
      title: "2 Corinthians 13:14",
      tree: {
        id: "trin-2cor1314-root",
        speaker: "opponent",
        statement:
          "'The grace of the Lord Jesus Christ, and the love of God, and the communion of the Holy Ghost, be with you all.' Paul lists three distinct persons in a benediction. That's Trinitarian structure from an early, undisputed Pauline letter.",
        verseRefs: ["2 Corinthians 13:14"],
        choices: [
          {
            key: "A",
            text: "A benediction listing three titles of activity, grace through Jesus, love from God, communion of the Spirit, describes three ways the one God relates to believers, not a headcount of persons; compare how a person can be described by role, occupation, and relationship in one sentence without being three individuals.",
            correct: true,
            rubricNote: "Correct. Function/title lists are not automatically person lists, this is the core response pattern for all triadic NT texts.",
            next: {
              id: "trin-2cor1314-push",
              speaker: "opponent",
              statement:
                "But this isn't just any list, it's a formal, liturgical closing benediction. Doesn't the formality suggest a settled, structured understanding of three distinct persons behind it?",
              choices: [
                {
                  key: "A",
                  text: "Formality reflects how central these three titles were to describing God's saving activity toward the church, grace, love, and Spirit-communion, not necessarily a metaphysical headcount; Paul elsewhere uses similarly formal language identifying Christ directly as 'the Lord... that Spirit' (2 Corinthians 3:17, same letter, Lane 8), which would be an odd move if he held three eternally distinct persons in strict formal separation.",
                  correct: true,
                  rubricNote: "Correct. Using 2 Corinthians 3:17 from the very same epistle is the strongest move here, it shows Paul's own usage pattern.",
                },
                {
                  key: "B",
                  text: "Paul didn't really write this verse.",
                  correct: false,
                  rubricNote: "No textual basis, avoid manuscript claims you can't support.",
                },
                {
                  key: "C",
                  text: "It's just a coincidence that three things are listed.",
                  correct: false,
                  rubricNote: "Too dismissive, doesn't engage the structure being pointed out.",
                },
                {
                  key: "D",
                  text: "Fine, this proves three persons.",
                  correct: false,
                  rubricNote: "Premature concession when a same-letter cross-reference resolves it.",
                },
              ],
            },
          },
          {
            key: "B",
            text: "Only Jesus is mentioned, not the Father or Spirit.",
            correct: false,
            rubricNote: "Factually wrong, all three are named in this verse.",
          },
          {
            key: "C",
            text: "This verse is about angels, not God.",
            correct: false,
            rubricNote: "Misreads the text entirely.",
          },
          {
            key: "D",
            text: "Grace, love, and communion are three separate gods.",
            correct: false,
            rubricNote: "Breaks monotheism and misreads the grammar (all modify 'be with you').",
          },
        ],
      },
    },
    {
      slug: "father-sends-son",
      title: "Father Sends Son",
      tree: {
        id: "trin-fathersends-root",
        speaker: "opponent",
        statement:
          "Over forty times the New Testament says the Father 'sent' the Son. A sender and a sent one are, definitionally, two distinct persons.",
        verseRefs: ["1 John 4:14", "John 3:17"],
        choices: [
          {
            key: "A",
            text: "'Sent' language describes the incarnation event itself, the Word who was with the Father in eternity (Lane 6) coming into the world in human flesh (Lane 3, Galatians 4:4, 'sent forth his Son'), the sending describes movement from eternal Spirit-existence into human embodiment, not a transaction between two separate eternal persons.",
            correct: true,
            rubricNote: "Correct. Ties 'sending' to incarnation, not inter-person transaction.",
            next: {
              id: "trin-fathersends-push",
              speaker: "opponent",
              statement:
                "But sending language in the rest of Scripture (a king sending a servant, a father sending a messenger) always implies the sender stays where he is while the sent one goes somewhere else. Doesn't that pattern require the Father to remain distinct and 'elsewhere' from the incarnate Son?",
              choices: [
                {
                  key: "A",
                  text: "That pattern applies to sending a separate created being on an errand; the incarnation is described differently throughout the NT, not as dispatching an independent agent but as God's own Spirit taking on flesh (John 1:14, 1 Timothy 3:16, Lane 2) and remaining fully present within that flesh (John 14:10, Lane 4, 'the Father dwelleth in me'), which is the opposite of the sender staying elsewhere.",
                  correct: true,
                  rubricNote: "Correct. Directly rebuts the 'sender stays elsewhere' analogy using the indwelling texts from Lane 4.",
                },
                {
                  key: "B",
                  text: "Sending never implies distinct location anywhere in Scripture.",
                  correct: false,
                  rubricNote: "Overstated, easily countered with a normal human sending example.",
                },
                {
                  key: "C",
                  text: "The word 'sent' isn't in the original Greek.",
                  correct: false,
                  rubricNote: "False, apostello and pempo are well-attested and mean exactly 'sent.'",
                },
                {
                  key: "D",
                  text: "I don't have a good answer for this.",
                  correct: false,
                  rubricNote: "An answer exists in Lane 4's indwelling texts, use it.",
                },
              ],
            },
          },
          {
            key: "B",
            text: "The Son didn't really come from the Father, He was created independently.",
            correct: false,
            rubricNote: "Breaks Lane 6's Creation/Word doctrine.",
          },
          {
            key: "C",
            text: "Sending just means the Father gave Jesus a job, like any human boss.",
            correct: false,
            rubricNote: "Too reductive, ignores the incarnational weight of the language and will read as dodging.",
          },
          {
            key: "D",
            text: "This proves the Son pre-existed as a separate person, concede the point.",
            correct: false,
            rubricNote: "Premature concession, pre-existence as the eternal Word does not require a separate person.",
          },
        ],
      },
    },
    {
      slug: "son-prays-to-father",
      title: "Son Prays to Father",
      tree: {
        id: "trin-sonprays-root",
        speaker: "opponent",
        statement:
          "In Gethsemane, Jesus prays, 'not as I will, but as thou wilt.' If Jesus were the Father, He'd be praying to Himself, which is absurd. This alone proves two persons.",
        verseRefs: ["Matthew 26:39"],
        choices: [
          {
            key: "A",
            text: "The prayer flows from Jesus' genuine human will (Lane 3, Hebrews 4:15's real temptation, real human experience), submitting in the moment of greatest human dread to the fullness of deity that indwells Him (Lane 4, John 14:10), one person with a real human will communing with the divine nature that fills that same person, not two persons in dialogue.",
            correct: true,
            rubricNote: "Correct. Directly connects to the two-natures answer built across Lanes 3 and 4.",
            next: {
              id: "trin-sonprays-push",
              speaker: "opponent",
              statement:
                "That still means there are two wills, and wherever there are two wills there are, at minimum, two distinct willing subjects. How is 'two wills, one person' not just wordplay?",
              choices: [
                {
                  key: "A",
                  text: "Every human experiences internal will-conflict, wanting to avoid pain while also submitting to a greater commitment, without becoming two people; Jesus' case is the same structure raised to its highest pitch because one of those two wills belongs to the fullness of deity itself (Colossians 2:9, Lane 2) indwelling a genuinely human will (Lane 3), the two-natures framework describes exactly this: one person, two distinct wills in operation, not wordplay but the historic, coherent shape of the incarnation.",
                  correct: true,
                  rubricNote: "Correct. Human internal will-conflict as an analogy makes 'two wills, one person' intuitive rather than abstract.",
                },
                {
                  key: "B",
                  text: "Jesus didn't really have His own will, He just said the words.",
                  correct: false,
                  rubricNote: "Denies real humanity, breaks Lane 3.",
                },
                {
                  key: "C",
                  text: "This is a contradiction I can't resolve.",
                  correct: false,
                  rubricNote: "It resolves through the two-natures framework, don't concede.",
                },
                {
                  key: "D",
                  text: "Two wills always means two persons, full stop.",
                  correct: false,
                  rubricNote: "This concedes the opponent's core premise instead of challenging it.",
                },
              ],
            },
          },
          {
            key: "B",
            text: "The prayer was just for show, to teach the disciples how to pray.",
            correct: false,
            rubricNote: "Makes Jesus' anguish performative, theologically weak and pastorally troubling.",
          },
          {
            key: "C",
            text: "Jesus is a different, lesser God from the Father.",
            correct: false,
            rubricNote: "Breaks Lane 1 monotheism.",
          },
          {
            key: "D",
            text: "This is unanswerable, I concede two persons here.",
            correct: false,
            rubricNote: "The two-natures answer from Lanes 3-4 directly resolves this.",
          },
        ],
      },
    },
    {
      slug: "holy-spirit-speaks",
      title: "Holy Spirit Speaks",
      tree: {
        id: "trin-hsspeaks-root",
        speaker: "opponent",
        statement:
          "Acts 13:2, 'the Holy Ghost said, Separate me Barnabas and Saul.' The Spirit speaks in first person, with its own will and initiative, distinct from the Father and Son. That's personhood, distinct from the other two.",
        verseRefs: ["Acts 13:2"],
        choices: [
          {
            key: "A",
            text: "Personal speech and initiative describe the Spirit's genuine activity as God's own presence acting in the church, not a proof of a third separate center of consciousness; Romans 8:9 (Lane 8) uses 'Spirit of God' and 'Spirit of Christ' interchangeably in one sentence, which only makes sense if the speaking Spirit is the one Spirit of the one God, not an independent third party alongside Father and Son.",
            correct: true,
            rubricNote: "Correct. Personal activity does not equal a third person, use the Romans 8:9 interchangeability directly.",
            next: {
              id: "trin-hsspeaks-push",
              speaker: "opponent",
              statement:
                "But wisdom being personified as 'she' in Proverbs 8 is poetry, everyone agrees on that. Acts 13:2 is narrative history, a real recorded event of the Spirit giving a specific command. Doesn't narrative personhood carry more weight than poetic personification?",
              choices: [
                {
                  key: "A",
                  text: "Narrative can record real divine activity, real communication, real initiative, from the one Spirit of the one God without that activity requiring a second or third distinct person; the church already recognized prophetic speech, 'thus saith the Lord,' as God's own first-person communication through the Spirit long before this, in the Old Testament (Lane 1's God, Isaiah's 'I am the LORD' texts), without anyone concluding a new person had appeared each time God spoke that way.",
                  correct: true,
                  rubricNote: "Correct. Ties Spirit-speech in Acts to the OT pattern of first-person divine speech through prophets, which never implied a new person.",
                },
                {
                  key: "B",
                  text: "The Holy Spirit isn't really personal at all, just an impersonal force.",
                  correct: false,
                  rubricNote: "Overcorrects, contradicts the text's clear personal language and creates a new problem.",
                },
                {
                  key: "C",
                  text: "Acts 13:2 is a later scribal addition.",
                  correct: false,
                  rubricNote: "No manuscript basis, avoid.",
                },
                {
                  key: "D",
                  text: "This proves a third person, concede.",
                  correct: false,
                  rubricNote: "The OT prophetic-speech pattern answers this without conceding.",
                },
              ],
            },
          },
          {
            key: "B",
            text: "That verse doesn't mean the Spirit literally spoke, it's just a figure of speech with no content.",
            correct: false,
            rubricNote: "Undersells the text unnecessarily, the Spirit's activity can be affirmed as real without conceding a third person.",
          },
          {
            key: "C",
            text: "The Holy Spirit is a separate, lesser God.",
            correct: false,
            rubricNote: "Breaks Lane 1 monotheism.",
          },
          {
            key: "D",
            text: "Barnabas and Saul imagined this.",
            correct: false,
            rubricNote: "Undermines biblical authority you rely on elsewhere.",
          },
        ],
      },
    },
    {
      slug: "let-us-make-man",
      title: "Let Us Make Man",
      tree: {
        id: "trin-letusmake-root",
        speaker: "opponent",
        statement:
          "'Let us make man in our image, after our likeness.' Plural pronouns, God speaking to Himself in plural. That's intra-Trinitarian conversation before creation.",
        verseRefs: ["Genesis 1:26"],
        choices: [
          {
            key: "A",
            text: "The very next verse drops to the singular, 'So God created man in his own image,' which is the passage's own resolution: either a plural of majesty (a known ANE royal speech pattern) or God addressing the heavenly council/angels present at creation (compare Job 38:7's 'sons of God' shouting for joy at creation, and Isaiah 6:8's 'who will go for us'), not a hint of a Trinity that the singular verse 27 immediately contradicts if read as three persons.",
            correct: true,
            rubricNote: "Correct. Uses the text's own singular follow-through plus a real ANE/heavenly-council parallel.",
            next: {
              id: "trin-letusmake-push",
              speaker: "opponent",
              statement:
                "God wouldn't ask angels for help creating humanity, angels don't have creative power, and Scripture never has God consulting angels on creation decisions elsewhere. Doesn't that make the council reading unlikely?",
              choices: [
                {
                  key: "A",
                  text: "The text doesn't require angels to physically help create, only to be addressed as present observers or as the 'us' of shared image-bearing since angels are also spirit-beings who, like the intended humans, bear elements of God's image and moral agency, this is the same rhetorical 'us' pattern seen in Isaiah 6:8; either that or the plural of majesty, a well-documented feature of royal Hebrew speech, both readings avoid inserting a NT Trinity concept into a book written centuries before that concept existed.",
                  correct: true,
                  rubricNote: "Correct. Offers both standard alternative readings without needing certainty on which one, since either defeats the Trinity-proof-text reading.",
                },
                {
                  key: "B",
                  text: "Angels literally helped God create the universe.",
                  correct: false,
                  rubricNote: "Not supported by the text and creates new theological problems.",
                },
                {
                  key: "C",
                  text: "This is a mistranslation of the Hebrew.",
                  correct: false,
                  rubricNote: "The Hebrew plural is genuine, don't make a false grammar claim.",
                },
                {
                  key: "D",
                  text: "Fine, this proves plurality of persons.",
                  correct: false,
                  rubricNote: "Verse 27's singular resolution defeats this, don't concede.",
                },
              ],
            },
          },
          {
            key: "B",
            text: "God is talking to nothing, it's just an odd grammatical quirk with no meaning.",
            correct: false,
            rubricNote: "Dismissive, doesn't actually explain the plural, will read as evasive.",
          },
          {
            key: "C",
            text: "There are multiple gods creating together.",
            correct: false,
            rubricNote: "Breaks Lane 1 monotheism and contradicts Isaiah 44:24's 'by myself.'",
          },
          {
            key: "D",
            text: "I have no explanation for the plural pronoun.",
            correct: false,
            rubricNote: "An explanation exists (majesty plural / heavenly council), use it.",
          },
        ],
      },
    },
    {
      slug: "another-comforter",
      title: "Another Comforter",
      tree: {
        id: "trin-anothercomforter-root",
        speaker: "opponent",
        statement:
          "Jesus says the Father will send 'another Comforter.' 'Another' clearly means a different one from Jesus Himself, a third distinct person.",
        verseRefs: ["John 14:16"],
        choices: [
          {
            key: "A",
            text: "The Greek word is 'allos,' meaning another of the same kind, not 'heteros,' another of a different kind, and two verses later Jesus identifies the Comforter's arrival AS His own coming: 'I will not leave you comfortless: I will come to you' (John 14:18), the text interprets its own pronoun for us within the same paragraph.",
            correct: true,
            rubricNote: "Correct. This is the exact answer from Lane 8's objection handling, allos vs heteros plus the John 14:18 self-interpretation.",
            next: {
              id: "trin-anothercomforter-push",
              speaker: "opponent",
              statement:
                "Even granting allos means 'another of the same kind,' that still means a distinct individual of the same kind, like 'another apostle' means a different person who is also an apostle. Doesn't 'same kind' still require a different person?",
              choices: [
                {
                  key: "A",
                  text: "'Same kind' describes the mode or manner of comfort, in Jesus' bodily, physically-present-with-them form previously versus now in Spirit-form, indwelling rather than standing beside them, not necessarily a different individual; John 14:18's direct identification, 'I will come to you,' as the very next sentence describing the same event, settles which reading John intends for his own text, an intra-textual clue outweighing a general pattern drawn from unrelated uses of allos elsewhere.",
                  correct: true,
                  rubricNote: "Correct. Prioritizes the immediate context (14:18) over a general grammatical pattern from other NT uses of allos.",
                },
                {
                  key: "B",
                  text: "Allos never means anything close to 'a different individual' anywhere in Greek.",
                  correct: false,
                  rubricNote: "Overstated and false as a blanket claim, will be corrected on the spot.",
                },
                {
                  key: "C",
                  text: "John 14:18 is unrelated to verse 16.",
                  correct: false,
                  rubricNote: "They're two verses apart in the same discourse, clearly related.",
                },
                {
                  key: "D",
                  text: "Fine, 'another' proves a third person.",
                  correct: false,
                  rubricNote: "John 14:18 directly resolves this, don't concede.",
                },
              ],
            },
          },
          {
            key: "B",
            text: "The Comforter isn't the Holy Spirit at all.",
            correct: false,
            rubricNote: "Contradicts John 14:26 which names the Comforter as the Holy Ghost explicitly.",
          },
          {
            key: "C",
            text: "Jesus meant a human apostle would come.",
            correct: false,
            rubricNote: "Not supported by the passage, which explicitly ties this to the Spirit's indwelling.",
          },
          {
            key: "D",
            text: "This settles it, three persons confirmed.",
            correct: false,
            rubricNote: "Premature, John 14:18 answers this within the same passage.",
          },
        ],
      },
    },
    {
      slug: "hebrews-1",
      title: "Hebrews 1",
      tree: {
        id: "trin-heb1-root",
        speaker: "opponent",
        statement:
          "Hebrews 1:8-9 has the Father saying TO the Son, 'Thy throne, O God... therefore God, even thy God, hath anointed thee.' The Father calls the Son 'God' while also referring to 'thy God,' clearly two distinct divine persons in conversation.",
        verseRefs: ["Hebrews 1:8-9"],
        choices: [
          {
            key: "A",
            text: "The passage quotes Psalm 45, a royal psalm applied to the incarnate Son: 'God, even thy God' addresses the Son's genuine human nature (Lane 3, the man Christ Jesus who has a God, per Ephesians 1:17 and John 20:17's 'my God and your God') while 'thy throne, O God' addresses the fullness of deity that indwells that same person (Lane 2, Colossians 2:9); one person, two natures, both addressed accurately in the same royal psalm, not two persons in dialogue.",
            correct: true,
            rubricNote: "Correct. Splits the human-nature address ('thy God') from the deity address ('O God') within one person, the standard two-natures move.",
            next: {
              id: "trin-heb1-push",
              speaker: "opponent",
              statement:
                "That requires switching between 'the Son as God' and 'the Son as man' mid-sentence, which feels like special pleading invented just to avoid the plain reading. Why should anyone accept that move?",
              choices: [
                {
                  key: "A",
                  text: "It's not invented for this passage alone, it's the same distinction Paul makes explicitly in Romans 1:3-4 (Son 'according to the flesh' versus 'according to the spirit of holiness') and the same distinction John makes in John 1:14 (Word made flesh); the two-nature reading is a consistent, text-wide pattern used to explain multiple passages, not a one-off invention to dodge Hebrews 1 specifically.",
                  correct: true,
                  rubricNote: "Correct. Shows the two-natures reading is a recurring NT pattern (Romans 1:3-4, John 1:14), not special pleading invented for this one text.",
                },
                {
                  key: "B",
                  text: "The Son isn't really called 'God' in this passage at all.",
                  correct: false,
                  rubricNote: "The text plainly says 'thy throne, O God,' don't deny what's there.",
                },
                {
                  key: "C",
                  text: "Psalm 45 has nothing to do with Jesus.",
                  correct: false,
                  rubricNote: "Hebrews 1 explicitly applies it to the Son, contradicting this claim undermines your own citation.",
                },
                {
                  key: "D",
                  text: "This does prove two persons, no way around it.",
                  correct: false,
                  rubricNote: "The two-natures pattern (Romans 1:3-4, John 1:14) provides a way around it.",
                },
              ],
            },
          },
          {
            key: "B",
            text: "'O God' in verse 8 is a scribal error.",
            correct: false,
            rubricNote: "No manuscript support, avoid.",
          },
          {
            key: "C",
            text: "The Son is a lesser, created God, not the same God as the Father.",
            correct: false,
            rubricNote: "Breaks Lane 1 and Lane 6 (the Son as uncreated Creator).",
          },
          {
            key: "D",
            text: "I can't explain 'thy God' being said to someone also called 'God.'",
            correct: false,
            rubricNote: "The two-natures answer explains it, use it.",
          },
        ],
      },
    },
    {
      slug: "philippians-2",
      title: "Philippians 2",
      tree: {
        id: "trin-phil2-root",
        speaker: "opponent",
        statement:
          "Philippians 2:6, Christ existed 'in the form of God' and did not consider equality with God something to be grasped, then emptied Himself. That describes a pre-existent divine person choosing humility relative to another divine person, the Father.",
        verseRefs: ["Philippians 2:6-7"],
        choices: [
          {
            key: "A",
            text: "'Form of God' describes the pre-incarnate Word's own divine glory and status (Lane 6, the eternal Word who created all things), 'equality with God' names what was already, rightfully His, not something to grasp AT because it was already His own, and the self-emptying (kenosis) describes the Word taking on human form and limitation (Lane 3, Galatians 4:4), one divine Person emptying Himself into human likeness, not two persons negotiating relative status.",
            correct: true,
            rubricNote: "Correct. Reads 'equality with God' as already-possessed rather than something reached for, avoiding the two-persons implication.",
            next: {
              id: "trin-phil2-push",
              speaker: "opponent",
              statement:
                "If equality with God was already His own, why would Paul phrase it as something He chose NOT to grasp, as if grasping were even a live option? Doesn't that imply a distinct will relative to the Father's will, i.e., two persons capable of separate choices?",
              choices: [
                {
                  key: "A",
                  text: "The passage is making an ethical point for the Philippians about humility, not a metaphysical headcount: the Word, already fully possessing divine glory, chose the path of self-emptying into servanthood rather than clinging to the outward display of that glory, exactly as the Son's genuine human will (Lane 3) submitted to the divine nature indwelling Him (Lane 4) throughout His earthly life; 'choosing not to grasp' describes a real moral choice made by the incarnate Son's human will, operating in submission to the fullness of deity within Him, which is the two-natures framework again, not two separate persons with competing wills.",
                  correct: true,
                  rubricNote: "Correct. Frames the choice as the incarnate Son's human will submitting to indwelling deity, consistent with the Gethsemane answer.",
                },
                {
                  key: "B",
                  text: "Jesus never had any choice in the matter at all.",
                  correct: false,
                  rubricNote: "Denies real human agency, weakens Lane 3's real-humanity claim.",
                },
                {
                  key: "C",
                  text: "'Form of God' just means He looked impressive, nothing about deity.",
                  correct: false,
                  rubricNote: "Underreads the Greek 'morphe,' which denotes essential nature, not mere appearance; this concedes too much.",
                },
                {
                  key: "D",
                  text: "This does require two wills negotiating, so two persons, concede.",
                  correct: false,
                  rubricNote: "Two wills within one person (Lane 3/4 framework) already answers this without requiring two persons.",
                },
              ],
            },
          },
          {
            key: "B",
            text: "Christ didn't pre-exist at all before Bethlehem.",
            correct: false,
            rubricNote: "Contradicts 'form of God' and the whole pre-incarnate Word framework of Lane 6.",
          },
          {
            key: "C",
            text: "Equality with God means Jesus became fully equal only after the resurrection, not before.",
            correct: false,
            rubricNote: "Misreads the text's order, the passage describes pre-existent status, then emptying, then exaltation.",
          },
          {
            key: "D",
            text: "This is a later theological insertion into Paul's letter.",
            correct: false,
            rubricNote: "No manuscript basis, avoid textual-criticism claims you can't defend.",
          },
        ],
      },
    },
  ],
};
