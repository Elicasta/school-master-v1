import { DebateOpponent } from "@/types";

export const jewishMonotheist: DebateOpponent = {
  type: "jewish-monotheist",
  label: "Jewish Monotheist",
  description:
    "Argues the Messiah is not divine, from within Second Temple and rabbinic Jewish monotheism, the Shema as the non-negotiable center.",
  topics: [
    {
      slug: "messiah-not-god",
      title: "Messiah Not God",
      tree: {
        id: "jm-messiahnotgod-root",
        speaker: "opponent",
        statement:
          "The Messiah in Jewish expectation is a human king from David's line, an anointed deliverer, never God Himself. Conflating the Messiah with God is a category error the prophets never make.",
        verseRefs: ["Isaiah 9:6"],
        choices: [
          {
            key: "A",
            text: "Isaiah 9:6, written centuries before Jesus, already applies titles to the coming Davidic child that go beyond a merely human king: 'The mighty God, The everlasting Father,' in a book (Isaiah) that has spent chapters establishing YHWH's exclusive claim to those exact categories (Lane 1); this isn't Christians reading deity into a later text, the Hebrew prophetic tradition itself, in its own pre-Christian context, already describes the coming figure in terms exceeding ordinary humanity, which is precisely why the identification is being made from within the Hebrew Bible's own vocabulary, not imported from outside it.",
            correct: true,
            rubricNote: "Correct. Isaiah 9:6 predates Christianity and uses YHWH's own exclusive titles for the coming child, this is the strongest starting point since it comes from shared scripture.",
          },
          {
            key: "B",
            text: "Every rabbinic source throughout history has always agreed the Messiah is fully human with zero exceptions.",
            correct: false,
            rubricNote: "Overstated, some strands of Jewish messianic speculation (including certain readings of Daniel 7 and some later mystical texts) did entertain more-than-human categories, don't overclaim total uniformity.",
          },
          {
            key: "C",
            text: "Isaiah 9:6 isn't really about the Messiah at all.",
            correct: false,
            rubricNote: "This is a live scholarly question but conceding it entirely gives up your strongest text, engage its content instead of abandoning it.",
          },
          {
            key: "D",
            text: "The Messiah being divine is just a Christian invention with no root in Jewish scripture.",
            correct: false,
            rubricNote: "Isaiah 9:6's own vocabulary is the direct counter to this claim, don't concede it.",
          },
        ],
      },
    },
    {
      slug: "deuteronomy-6-4",
      title: "Deuteronomy 6:4",
      tree: {
        id: "jm-deut64-root",
        speaker: "opponent",
        statement:
          "The Shema, 'Hear O Israel, the LORD our God, the LORD is one,' is the absolute center of Jewish faith, recited daily for three thousand years. Any theology introducing a second or third divine figure alongside YHWH directly violates it.",
        verseRefs: ["Deuteronomy 6:4"],
        choices: [
          {
            key: "A",
            text: "This is the very foundation Lane 1 is built on, and it's shared ground, not contested ground: Oneness theology treats the Shema as absolute and non-negotiable too, with no second or third divine person introduced beside YHWH at all; the claim about Jesus isn't that a second being stands alongside the one LORD of the Shema, it's that the New Testament identifies Jesus as that one YHWH's own self-revelation in flesh (Lane 2, John 14:9, Colossians 2:9), which is a fundamentally different claim than the multi-person model the Shema is (correctly) being defended against.",
            correct: true,
            rubricNote: "Correct. Affirming the Shema fully, then distinguishing 'God revealed in flesh' from 'a second being beside God,' is the core move for every topic with this opponent.",
          },
          {
            key: "B",
            text: "The Shema doesn't really teach absolute monotheism.",
            correct: false,
            rubricNote: "Contradicts your own Lane 1 foundation, never concede this, the Shema is exactly what you're both standing on.",
          },
          {
            key: "C",
            text: "The Shema was written for a specific historical moment and doesn't apply universally.",
            correct: false,
            rubricNote: "Weakens the very text your own doctrine depends on, don't relativize it.",
          },
          {
            key: "D",
            text: "Christians don't really claim Jesus is a separate being anyway, so there's nothing to discuss.",
            correct: false,
            rubricNote: "Too dismissive, acknowledge that classical Trinitarianism does raise a real question here, then show why Oneness theology specifically doesn't.",
          },
        ],
      },
    },
    {
      slug: "numbers-23-19",
      title: "Numbers 23:19",
      tree: {
        id: "jm-num2319-root",
        speaker: "opponent",
        statement:
          "'God is not a man, that he should lie; neither the son of man, that he should repent.' God and man are categorically different kinds of being. The incarnation, God becoming a man, is a direct contradiction of this verse.",
        verseRefs: ["Numbers 23:19"],
        choices: [
          {
            key: "A",
            text: "Numbers 23:19 is addressing God's moral CHARACTER, His unshakeable truthfulness and reliability, in contrast to fickle, lying human beings, specifically in the context of Balaam's oracle about whether God would go back on His word to bless Israel, not a metaphysical claim that God could never, under any circumstances, take on human nature; the verse's own grammar ('that he SHOULD lie... that he SHOULD repent') is about behavior and trustworthiness, not ontology, and doesn't address or exclude the incarnation as a possibility any more than it excludes God appearing in human form in the many theophanies the Torah itself records (Genesis 18, Genesis 32).",
            correct: true,
            rubricNote: "Correct. Reading Numbers 23:19 in its actual context (God's trustworthiness, not a metaphysical ban on incarnation) plus citing Torah's own theophany precedents defeats the objection on its own textual ground.",
          },
          {
            key: "B",
            text: "God and man are exactly the same kind of being, so there's no tension here at all.",
            correct: false,
            rubricNote: "Erases the real, important distinction between Creator and creature, overcorrects past the actual answer.",
          },
          {
            key: "C",
            text: "This verse doesn't really exist in the original text.",
            correct: false,
            rubricNote: "False, well-attested, don't dispute the text, engage its actual context and meaning instead.",
          },
          {
            key: "D",
            text: "The incarnation really does contradict this verse, that's a fair point against it.",
            correct: false,
            rubricNote: "The context (God's trustworthiness in an oracle, not a ban on incarnation) directly answers this, don't concede.",
          },
        ],
      },
    },
    {
      slug: "no-divine-man",
      title: "No Divine Man",
      tree: {
        id: "jm-nodivineman-root",
        speaker: "opponent",
        statement:
          "The whole concept of a 'God-man,' a being who is simultaneously fully divine and fully human, has no precedent anywhere in the Hebrew Bible. It's a foreign, pagan-influenced idea grafted onto Jewish messianism, not something that grows out of it.",
        verseRefs: ["Isaiah 7:14", "Isaiah 9:6"],
        choices: [
          {
            key: "A",
            text: "The Hebrew Bible does contain building blocks for exactly this concept before any Greco-Roman contact: Isaiah 7:14's child named 'Immanuel,' God WITH us, and Isaiah 9:6's child given titles including 'The mighty God,' both written in a purely Israelite, pre-Hellenistic prophetic context centuries before any pagan philosophical influence could plausibly have shaped Israelite theology; the concept isn't grafted on from outside, it's assembled from Isaiah's own vocabulary, applied to a coming Davidic child, by Jewish prophets writing for a Jewish audience about Jewish messianic hope.",
            correct: true,
            rubricNote: "Correct. Isaiah 7:14 and 9:6 predate any Hellenistic contact and use purely Israelite prophetic vocabulary, defeating the 'foreign import' claim directly.",
          },
          {
            key: "B",
            text: "Greek philosophy definitely shaped the original composition of Isaiah.",
            correct: false,
            rubricNote: "Historically backwards, Isaiah predates significant Greek philosophical contact with Israel by centuries, don't concede an anachronism.",
          },
          {
            key: "C",
            text: "The concept of a God-man is common in many ancient religions, so it's not unusual.",
            correct: false,
            rubricNote: "This actually supports the 'pagan import' objection rather than answering it, avoid strengthening the opponent's framing.",
          },
          {
            key: "D",
            text: "There's no real precedent for this in the Hebrew Bible, fair point.",
            correct: false,
            rubricNote: "Isaiah 7:14 and 9:6 are real precedent, don't concede their absence.",
          },
        ],
      },
    },
    {
      slug: "suffering-servant",
      title: "Suffering Servant",
      tree: {
        id: "jm-sufferingservant-root",
        speaker: "opponent",
        statement:
          "Isaiah 53's suffering servant is best understood, as many Jewish commentators read it, as a symbol for the nation of Israel itself, suffering and eventually vindicated among the nations, not a prophecy about a single individual, let alone a divine one.",
        verseRefs: ["Isaiah 53:5-6"],
        choices: [
          {
            key: "A",
            text: "The collective-Israel reading runs into real grammatical trouble within Isaiah 53 itself: the servant is described as suffering 'for our transgressions... for our iniquities' (53:5), a substitutionary act done ON BEHALF OF a distinct 'we' or 'us' group, which reads oddly if the servant and the beneficiaries are the same collective entity (Israel suffering for Israel's own sins, in the same breath, as a distinct party); and 53:9's statement that he 'had done no violence, neither was any deceit in his mouth' sits awkwardly against Israel's own repeatedly confessed sinfulness throughout the rest of Isaiah, an individual, sinless, substitutionary reading fits the text's own internal logic more directly than a purely collective one.",
            correct: true,
            rubricNote: "Correct. The 'servant suffers FOR us' grammar plus the sinlessness claim in 53:9 (odd for collective, guilty Israel) is the strongest textual answer, argued from the passage's own internal logic.",
          },
          {
            key: "B",
            text: "No serious Jewish scholar has ever read Isaiah 53 as referring to Israel.",
            correct: false,
            rubricNote: "Factually inaccurate, the collective reading has real historical and scholarly standing within Jewish interpretation, don't misrepresent the opponent's tradition.",
          },
          {
            key: "C",
            text: "Isaiah 53 obviously and explicitly names Jesus by name.",
            correct: false,
            rubricNote: "It doesn't name anyone explicitly, overclaiming specificity weakens your credibility, argue from the internal grammar instead.",
          },
          {
            key: "D",
            text: "The collective-Israel reading is probably correct and there's no good response to it.",
            correct: false,
            rubricNote: "The 'suffers FOR us' grammar and the sinlessness claim in 53:9 directly answer this, don't concede.",
          },
        ],
      },
    },
    {
      slug: "isaiah-9-6",
      title: "Isaiah 9:6",
      tree: {
        id: "jm-isa96-root",
        speaker: "opponent",
        statement:
          "Isaiah 9:6's titles, 'Wonderful, Counsellor, The mighty God, The everlasting Father, The Prince of Peace,' are royal throne names, standard Ancient Near Eastern court language for a human king, similar to how Egyptian pharaohs took grand divine-sounding titles without literally being gods.",
        verseRefs: ["Isaiah 9:6"],
        choices: [
          {
            key: "A",
            text: "Royal throne names are a real ANE pattern, but Isaiah's own book undercuts a merely-honorific reading here: 'El Gibbor' (mighty God) is the exact same phrase Isaiah uses for YHWH Himself just one chapter later in Isaiah 10:21, 'the remnant shall return, even the remnant of Jacob, unto the mighty God,' applying the identical title to YHWH with unmistakably literal, non-honorific force; if Isaiah uses the same specific phrase for YHWH in one chapter and for the promised child in the next, treating one as literal and the other as empty court flattery requires a double standard the text itself doesn't support.",
            correct: true,
            rubricNote: "Correct. Isaiah 10:21's identical 'mighty God' (El Gibbor) applied literally to YHWH one chapter later is the decisive internal cross-reference that breaks the pure-honorific reading.",
          },
          {
            key: "B",
            text: "Ancient Near Eastern throne names never had any grand or exaggerated language at all.",
            correct: false,
            rubricNote: "Factually inaccurate about the ANE background, don't deny a real historical pattern, the Isaiah 10:21 cross-reference is the stronger, more precise answer.",
          },
          {
            key: "C",
            text: "This verse isn't really about a future king at all.",
            correct: false,
            rubricNote: "The context (a child born, a government upon his shoulder, the throne of David) is clearly royal/messianic, don't abandon your own strongest text.",
          },
          {
            key: "D",
            text: "It's probably just a throne name with no literal weight, hard to say.",
            correct: false,
            rubricNote: "Isaiah 10:21's identical phrase for YHWH settles this, don't hedge.",
          },
        ],
      },
    },
    {
      slug: "daniel-7",
      title: "Daniel 7",
      tree: {
        id: "jm-daniel7-root",
        speaker: "opponent",
        statement:
          "Daniel 7:13-14's 'one like the Son of man' coming to the 'Ancient of days' is clearly two distinct figures, one approaching the other to receive authority. That's a created being receiving delegated power from God, not God Himself.",
        verseRefs: ["Daniel 7:13-14"],
        choices: [
          {
            key: "A",
            text: "The vision does depict two distinct figures in the narrative frame, but what the 'Son of man' figure RECEIVES is striking for a merely created being: 'dominion, and glory, and a kingdom, that all people, nations, and languages, should serve him... an everlasting dominion' (7:14), language of universal, eternal WORSHIP-level service (the same Aramaic term used elsewhere for serving/worshiping God) given to a figure who approaches on the clouds, itself typically theophanic imagery (compare YHWH riding on clouds in Psalm 104:3, Isaiah 19:1); a two-natures reading, the eternal Word approaching the Father in His incarnate, exalted humanity, to be given what is already His own by nature, fits this scene without needing to make the Son of man a separate created being receiving power from outside.",
            correct: true,
            rubricNote: "Correct. The universal-service language given to the Son of man figure, plus cloud-riding as theophanic imagery elsewhere, are the two strongest textual details supporting a more-than-created reading.",
          },
          {
            key: "B",
            text: "The 'Son of man' and the 'Ancient of days' are actually the exact same figure with no distinction in the vision at all.",
            correct: false,
            rubricNote: "The text does depict them as distinct within the vision's narrative frame, don't flatten the actual imagery, the two-natures reading handles the distinction better than denying it.",
          },
          {
            key: "C",
            text: "Daniel 7 has nothing to do with the Messiah.",
            correct: false,
            rubricNote: "This is one of the strongest messianic texts available to you, don't abandon it.",
          },
          {
            key: "D",
            text: "This does show a created being receiving delegated power, no way around it.",
            correct: false,
            rubricNote: "The universal-worship-level service language given to the Son of man figure argues against a merely created, delegated-authority reading, don't concede.",
          },
        ],
      },
    },
    {
      slug: "psalm-110",
      title: "Psalm 110",
      tree: {
        id: "jm-psalm110-root",
        speaker: "opponent",
        statement:
          "Psalm 110:1, 'The LORD said unto my Lord, Sit thou at my right hand,' is David referring to a human king or future ruler with respect, calling him 'my lord' the way any subject would address royalty. It's not two divine figures in conversation.",
        verseRefs: ["Psalm 110:1"],
        choices: [
          {
            key: "A",
            text: "The puzzle Jesus Himself raises about this verse (Matthew 22:41-45) is exactly the right question: David, Israel's own king, calls this figure 'my Lord' (adoni), a term of address a king does not normally use for one of his own royal descendants or subjects, since a king outranks his own descendants and subjects by definition; the psalm has YHWH (the first 'LORD,' representing the Tetragrammaton in Hebrew) speaking to David's own social and covenantal superior, someone David, the king, defers to, which fits a messianic figure who is more than an ordinary human successor to David's throne, without requiring two separate deities, since the invitation is to sit at YHWH's right hand, a position of shared authority and honor, not equality-by-addition.",
            correct: true,
            rubricNote: "Correct. Uses Jesus' own argument from Matthew 22, David calling his own descendant 'my Lord' is the puzzle, and frames the answer around messianic exaltation rather than claiming two separate deities.",
          },
          {
            key: "B",
            text: "This verse definitely describes two separate, equal gods.",
            correct: false,
            rubricNote: "Overclaims a two-gods reading, which breaks your own Lane 1 monotheism, don't hand this over even while making a strong Christological point.",
          },
          {
            key: "C",
            text: "David wasn't the author of this Psalm, so the puzzle doesn't apply.",
            correct: false,
            rubricNote: "Both Jewish and Christian tradition have long attributed this psalm to David, and Jesus' own argument in Matthew 22 assumes Davidic authorship, don't undercut your own strongest reference point.",
          },
          {
            key: "D",
            text: "This is just an ordinary king being addressed respectfully, nothing more.",
            correct: false,
            rubricNote: "Doesn't engage why David, the king, would defer to one of his own descendants as a superior, the actual puzzle in the text.",
          },
        ],
      },
    },
  ],
};
