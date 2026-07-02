import { DebateOpponent } from "@/types";

export const jehovahsWitness: DebateOpponent = {
  type: "jehovahs-witness",
  label: "Jehovah's Witness",
  description:
    "Argues Jesus is Michael the archangel, God's first and greatest creation, not co-eternal, uncreated deity.",
  topics: [
    {
      slug: "jesus-as-firstborn",
      title: "Jesus as Firstborn",
      tree: {
        id: "jw-firstborn-root",
        speaker: "opponent",
        statement:
          "Colossians 1:15 calls Jesus 'the firstborn of every creature.' That plainly means He was the first thing God created, before anything else existed.",
        verseRefs: ["Colossians 1:15"],
        choices: [
          {
            key: "A",
            text: "'Firstborn' (prototokos) is a rank and inheritance title in Jewish usage, not a birth-order claim, clearest proof is Psalm 89:27, where God calls David His 'firstborn' though David was born many generations after Adam; the very next verse, Colossians 1:16, defines the term in context: 'for by him were ALL things created,' which would be self-contradictory if Jesus were included in 'all things,' the passage interprets its own vocabulary against a created-being reading.",
            correct: true,
            rubricNote: "Correct. Psalm 89:27's non-literal 'firstborn' plus Colossians 1:16's immediate self-definition is the strongest combined answer.",
          },
          {
            key: "B",
            text: "The word 'firstborn' isn't actually in the Greek text.",
            correct: false,
            rubricNote: "False, prototokos is well-attested in the manuscripts, don't dispute the word itself.",
          },
          {
            key: "C",
            text: "Firstborn just means Jesus is important, nothing about origin or rank at all.",
            correct: false,
            rubricNote: "Too vague, doesn't engage the actual rank-title argument that does the real work here.",
          },
          {
            key: "D",
            text: "I can't explain 'firstborn of every creature.'",
            correct: false,
            rubricNote: "Psalm 89:27 and Colossians 1:16 both explain it, use them.",
          },
        ],
      },
    },
    {
      slug: "michael-the-archangel",
      title: "Michael the Archangel",
      tree: {
        id: "jw-michael-root",
        speaker: "opponent",
        statement:
          "1 Thessalonians 4:16 says the Lord will descend 'with the voice of the archangel.' Jesus IS Michael the archangel, God's first creation and chief spirit-son, that's who returns at the resurrection.",
        verseRefs: ["1 Thessalonians 4:16"],
        choices: [
          {
            key: "A",
            text: "The verse says the Lord descends WITH the archangel's voice accompanying Him, a description of accompanying sound at His return, not an identity statement equating the Lord with the archangel; nowhere does Scripture explicitly say 'Jesus is Michael,' that identification has to be imported into the text, while John 1:3 and Colossians 1:16 explicitly exclude Jesus from the category of created things, including angels, since 'all things' were made by Him, angels included.",
            correct: true,
            rubricNote: "Correct. The grammar (accompanying voice, not identity) plus Colossians 1:16 excluding Jesus from 'all things' created (which includes angels) together defeat the Michael identification.",
          },
          {
            key: "B",
            text: "Michael isn't a real figure in the Bible at all.",
            correct: false,
            rubricNote: "False, Michael appears in Daniel, Jude, and Revelation, don't deny the text.",
          },
          {
            key: "C",
            text: "Angels don't have voices, so this can't refer to a real archangel.",
            correct: false,
            rubricNote: "Doesn't engage the actual identification claim being made.",
          },
          {
            key: "D",
            text: "This proves Jesus is an angel, no way to answer it.",
            correct: false,
            rubricNote: "The accompanying-voice grammar plus Colossians 1:16 answers this directly.",
          },
        ],
      },
    },
    {
      slug: "john-1-1-a-god",
      title: "John 1:1 'A God'",
      tree: {
        id: "jw-john11-root",
        speaker: "opponent",
        statement:
          "The New World Translation correctly renders John 1:1 as 'the Word was a god,' a lesser, created divine being, not Almighty God Himself. The Greek lacks the definite article before theos, so it should be indefinite.",
        verseRefs: ["John 1:1"],
        choices: [
          {
            key: "A",
            text: "Greek regularly drops the article on a definite predicate nominative that precedes its verb, a well-documented pattern (Colwell's construction), so the absence of the article doesn't make theos indefinite here; if John meant a secondary, lesser god, he had the vocabulary to say so clearly, and John 20:28 removes any doubt about John's own intent when Thomas calls the risen Jesus 'my Lord and my God' and is commended, not corrected, for a supposedly polytheistic statement.",
            correct: true,
            rubricNote: "Correct. Colwell's construction plus John 20:28's uncorrected worship-confession together defeat the 'a god' translation.",
          },
          {
            key: "B",
            text: "All Bible translations besides the NWT are corrupted by Trinitarian bias.",
            correct: false,
            rubricNote: "An unfalsifiable claim about every other translation tradition, weak footing in a debate, avoid it.",
          },
          {
            key: "C",
            text: "Theos always means the one true God with no exceptions anywhere in the NT.",
            correct: false,
            rubricNote: "Overstated, theos is applied to false gods and even rulers in some NT contexts, the grammar argument is stronger than a blanket vocabulary claim.",
          },
          {
            key: "D",
            text: "The Greek grammar is too complicated to settle, I'll just move on.",
            correct: false,
            rubricNote: "Colwell's Rule plus John 20:28 does settle it, don't dodge.",
          },
        ],
      },
    },
    {
      slug: "proverbs-8",
      title: "Proverbs 8",
      tree: {
        id: "jw-prov8-root",
        speaker: "opponent",
        statement:
          "Proverbs 8:22 has Wisdom saying 'The LORD possessed me in the beginning of his way, before his works of old.' This is Jesus as Wisdom, describing His own creation before anything else existed.",
        verseRefs: ["Proverbs 8:22"],
        choices: [
          {
            key: "A",
            text: "Proverbs 8 is Hebrew wisdom poetry personifying an attribute of God, 'Wisdom,' as a speaking figure, the same literary device that has Wisdom 'crying in the streets' (Proverbs 1:20) and building a house with seven pillars (Proverbs 9:1), nobody reads those as literal claims either; even granting a Christological reading as a type, applying a poem about personified Wisdom's origin to establish a literal ontological fact about the eternal Word overreads a genre built on metaphor, especially against John 1:3's direct, non-poetic statement that 'without him was not any thing made that was made.'",
            correct: true,
            rubricNote: "Correct. Names the genre (personification poetry) and contrasts it with John 1:3's direct prose statement, which should control over an admittedly poetic text.",
          },
          {
            key: "B",
            text: "Proverbs 8 has nothing to do with Jesus at all, any connection is invalid.",
            correct: false,
            rubricNote: "Too absolute, many traditions do see a legitimate typological connection, the genre point is the stronger, more precise answer.",
          },
          {
            key: "C",
            text: "The word 'possessed' actually means something else in Hebrew, it's a mistranslation.",
            correct: false,
            rubricNote: "Getting into a Hebrew lexical dispute here is a weaker path than the genre argument, which sidesteps the translation fight entirely.",
          },
          {
            key: "D",
            text: "This proves Jesus was created, I concede.",
            correct: false,
            rubricNote: "The poetry-genre argument answers this without conceding a literal creation claim.",
          },
        ],
      },
    },
    {
      slug: "colossians-1",
      title: "Colossians 1",
      tree: {
        id: "jw-col1-root",
        speaker: "opponent",
        statement:
          "The NWT renders Colossians 1:16, 'by means of him all [other] things were created,' the bracketed 'other' shows Jesus is included among created things, just first and greatest among them.",
        verseRefs: ["Colossians 1:16"],
        choices: [
          {
            key: "A",
            text: "The word 'other' does not appear in the Greek text at all, it is an interpretive insertion unique to the NWT, added specifically to make the verse compatible with a prior belief that Jesus is created, rather than translated from anything in the manuscript; every major translation without that theological commitment renders it simply 'all things,' with no qualifier, matching the passage's own totalizing language two verses earlier and later ('all things were created by him, and for him... he is before all things').",
            correct: true,
            rubricNote: "Correct. Naming the inserted word 'other' as absent from the Greek is the single strongest, most checkable fact in this entire topic.",
          },
          {
            key: "B",
            text: "The NWT is not a real translation at all.",
            correct: false,
            rubricNote: "Too sweeping a dismissal, stick to the specific, verifiable insertion of 'other,' which is the stronger, narrower claim.",
          },
          {
            key: "C",
            text: "Colossians 1:16 doesn't really include angels or thrones or powers.",
            correct: false,
            rubricNote: "The verse explicitly lists 'thrones, or dominions, or principalities, or powers,' don't contradict the text.",
          },
          {
            key: "D",
            text: "Maybe 'other' is a fair translation choice, hard to say.",
            correct: false,
            rubricNote: "It is not a fair choice, the word simply isn't in the Greek, this is checkable and should be stated plainly.",
          },
        ],
      },
    },
    {
      slug: "worship-vs-obeisance",
      title: "Worship vs Obeisance",
      tree: {
        id: "jw-worship-root",
        speaker: "opponent",
        statement:
          "When people 'worship' Jesus in the Gospels, the Greek word proskuneo just means bowing or showing respect, obeisance to a king or important figure, not the worship reserved for Almighty God alone.",
        verseRefs: ["Matthew 28:17", "Hebrews 1:6"],
        choices: [
          {
            key: "A",
            text: "Proskuneo does have a range including respectful bowing in some contexts, but Hebrews 1:6 removes the ambiguity by explicitly commanding 'let all the angels of God worship him,' angels, who are repeatedly and severely forbidden from receiving that same proskuneo themselves (Revelation 19:10, 22:8-9, where an angel refuses John's proskuneo and redirects it to God alone); a word that angels are commanded to direct at Jesus, while being forbidden from receiving it themselves, is functioning as worship of God in that context, not mere royal courtesy.",
            correct: true,
            rubricNote: "Correct. The angel's refusal of proskuneo in Revelation 19:10/22:8-9 is the decisive contrast, it proves the word carries full worship-weight when the NT wants it to.",
          },
          {
            key: "B",
            text: "Proskuneo always means worship of God with zero exceptions anywhere in Greek literature.",
            correct: false,
            rubricNote: "Overstated, the word does have a range in secular Greek, the Revelation 19:10 contrast is the precise, defensible move, not a blanket vocabulary claim.",
          },
          {
            key: "C",
            text: "Angels worshiping Jesus doesn't mean anything special.",
            correct: false,
            rubricNote: "Ignores that angels are elsewhere forbidden from receiving that same act, which is precisely what makes Hebrews 1:6 significant.",
          },
          {
            key: "D",
            text: "This is just a word-meaning dispute I can't resolve.",
            correct: false,
            rubricNote: "The Revelation 19:10 contrast resolves it clearly, don't leave it hanging.",
          },
        ],
      },
    },
    {
      slug: "created-son-arguments",
      title: "Created Son Arguments",
      tree: {
        id: "jw-createdson-root",
        speaker: "opponent",
        statement:
          "Revelation 3:14 calls Jesus 'the beginning of the creation of God.' That's Jesus Himself stating plainly that He is the first being God created.",
        verseRefs: ["Revelation 3:14"],
        choices: [
          {
            key: "A",
            text: "'Beginning' (arche) commonly means source or origin, not first-in-a-sequence, John himself uses arche this way in his own Gospel opening ('In the beginning was the Word,' John 1:1, the Word as the origin point, not a created member of a timeline); the same speaker in the same book, Revelation 22:13, calls Himself 'the beginning and the ending... the first and the last,' directly quoting Isaiah 44:6's exclusive YHWH-only self-description from Lane 1, language that cannot apply to a created being without contradicting the very texts establishing God's exclusivity.",
            correct: true,
            rubricNote: "Correct. Same-author usage of arche as 'origin' (John 1:1) plus Revelation 22:13's direct Isaiah 44:6 quotation is the strongest combined answer.",
          },
          {
            key: "B",
            text: "Revelation 3:14 isn't really about Jesus at all.",
            correct: false,
            rubricNote: "The verse explicitly identifies the speaker in context as Christ addressing the Laodicean church, don't deny the plain referent.",
          },
          {
            key: "C",
            text: "Arche never means 'source' anywhere, only 'first in time.'",
            correct: false,
            rubricNote: "False as a blanket claim, John's own Gospel opening uses it as origin/source, easily checked and countered.",
          },
          {
            key: "D",
            text: "This is a clear statement Jesus was created, no way around it.",
            correct: false,
            rubricNote: "Revelation 22:13's Isaiah 44:6 quotation directly answers this, don't concede.",
          },
        ],
      },
    },
  ],
};
