import { DebateOpponent } from "@/types";

// Murray's position (per the "Doctrine of Christ" teaching associated with W.E. Murray):
// the Father and the Son are two distinct, eternal, divine beings, not one being in three
// persons (Trinity) and not one person revealed three ways (Oneness). This is binitarian,
// not the Trinity, so it needs its own answers even where the surface objection resembles
// a Trinitarian one.
export const murray: DebateOpponent = {
  type: "murray",
  label: "Murray / Doctrine of Christ",
  description:
    "Argues the Father and Son are two distinct, eternal, divine beings sharing one purpose, not one being (against both Trinity and Oneness).",
  topics: [
    {
      slug: "father-and-son-as-savior",
      title: "Father and Son as Savior",
      tree: {
        id: "murray-savior-root",
        speaker: "opponent",
        statement:
          "Titus 3:4-6 calls both the Father and the Son 'Saviour.' That's two distinct eternal beings who both hold the office of Savior, not one God wearing two roles.",
        verseRefs: ["Titus 3:4-6"],
        choices: [
          {
            key: "A",
            text: "Isaiah 43:11 doesn't say 'beside me there are no co-Saviors holding the office jointly,' it says 'beside me there is no saviour,' a strict numerical exclusion; Titus 3:4-6 resolves that by identifying the Father's saving activity as located specifically IN Christ (matching 2 Corinthians 5:19, 'God was in Christ'), one Savior, revealed, not two beings sharing an office.",
            correct: true,
            rubricNote: "Correct. Ties Isaiah's strict numerical exclusivity to the 'God was in Christ' texts to block the two-beings reading.",
          },
          {
            key: "B",
            text: "The Father isn't really called Savior anywhere.",
            correct: false,
            rubricNote: "Factually wrong, Titus 3:4 plainly says 'God our Saviour.'",
          },
          {
            key: "C",
            text: "Only the Son saves, the Father has nothing to do with salvation.",
            correct: false,
            rubricNote: "Contradicts John 3:16 and the entire NT framing of the Father's saving initiative.",
          },
          {
            key: "D",
            text: "There must be two gods then, one greater and one lesser.",
            correct: false,
            rubricNote: "Breaks Lane 1's strict monotheism, exactly the ditheism Murray's view actually teaches, don't concede it.",
          },
        ],
      },
    },
    {
      slug: "father-and-son-as-creator",
      title: "Father and Son as Creator",
      tree: {
        id: "murray-creator-root",
        speaker: "opponent",
        statement:
          "Both the Father (Genesis 1:1) and the Son (John 1:3, Colossians 1:16) are called Creator. Two distinct beings, both eternal, both credited with creating, that's exactly what Doctrine of Christ teaches.",
        verseRefs: ["Genesis 1:1", "John 1:3"],
        choices: [
          {
            key: "A",
            text: "Isaiah 44:24 has YHWH creating 'by myself,' alone, no second creating being present, which rules out two distinct Creator-beings; John 1:3's Word who creates is identified in John 1:1 as being God Himself, not a second god, one Creator, active through His own self-expression (the Word), matching Lane 6.",
            correct: true,
            rubricNote: "Correct. Isaiah 44:24's 'by myself' is the decisive block against any second creating being, distinct from or alongside YHWH.",
          },
          {
            key: "B",
            text: "The Son didn't really participate in creation, that's just poetic language.",
            correct: false,
            rubricNote: "Undersells your own texts, John 1:3 and Colossians 1:16 are direct, not merely poetic.",
          },
          {
            key: "C",
            text: "Creation had two authors working together as a team.",
            correct: false,
            rubricNote: "Directly contradicts Isaiah 44:24's 'by myself,' don't hand this one over.",
          },
          {
            key: "D",
            text: "I don't have an answer for two Creator-beings.",
            correct: false,
            rubricNote: "Isaiah 44:24 answers this directly, use it.",
          },
        ],
      },
    },
    {
      slug: "root-and-offspring-of-david",
      title: "Root and Offspring of David",
      tree: {
        id: "murray-rootoffspring-root",
        speaker: "opponent",
        statement:
          "Revelation 22:16 calls Jesus both the 'root' and the 'offspring' of David. Two roles like that make more sense as two distinct beings functioning together across time than one being somehow prior to and descended from the same ancestor.",
        verseRefs: ["Revelation 22:16"],
        choices: [
          {
            key: "A",
            text: "The paradox only resolves cleanly with one subject holding two states at once: the eternal Word (root, prior to and source of David's line) who became flesh as David's own descendant (offspring) through the incarnation; splitting it into two beings doesn't explain how a second, separate 'root'-being would relate to David's bloodline at all, it just relocates the paradox without solving it.",
            correct: true,
            rubricNote: "Correct. Shows the two-beings reading doesn't actually resolve the paradox, it just moves it, while one-subject-two-states does.",
          },
          {
            key: "B",
            text: "'Root' and 'offspring' are unrelated titles with no connection to each other.",
            correct: false,
            rubricNote: "The text pairs them deliberately in one verse, treat them as connected.",
          },
          {
            key: "C",
            text: "Jesus is only the offspring, not the root, that part is symbolic.",
            correct: false,
            rubricNote: "Arbitrarily discards half the verse's own wording.",
          },
          {
            key: "D",
            text: "This proves two beings and I have no response.",
            correct: false,
            rubricNote: "The one-subject-two-states answer resolves it without conceding.",
          },
        ],
      },
    },
    {
      slug: "genesis-1-26",
      title: "Genesis 1:26",
      tree: {
        id: "murray-gen126-root",
        speaker: "opponent",
        statement:
          "'Let us make man in our image' is the Father speaking to the Son, His pre-existent, distinct divine partner in creation. That's plainly two persons in conversation before man existed.",
        verseRefs: ["Genesis 1:26"],
        choices: [
          {
            key: "A",
            text: "The text itself resolves to the singular one verse later, 'So God created man in his own image' (v.27), which a two-beings reading has to explain away; the plural is better read as a plural of majesty or address to the heavenly council (Job 38:7, Isaiah 6:8), a known Hebrew pattern, not a hint of a second eternal being the rest of Genesis never introduces or names.",
            correct: true,
            rubricNote: "Correct. Same core answer as Lane 1's objection handling, verse 27's singular resolution plus majesty-plural/council reading.",
          },
          {
            key: "B",
            text: "God was talking to the angels who then physically helped create Adam.",
            correct: false,
            rubricNote: "Overstates the council reading into something the text doesn't claim, angels aren't credited with creating anything.",
          },
          {
            key: "C",
            text: "This is a scribal insertion, not original.",
            correct: false,
            rubricNote: "No manuscript basis, avoid.",
          },
          {
            key: "D",
            text: "Fine, two beings created man together.",
            correct: false,
            rubricNote: "Verse 27's singular 'God created' directly contradicts a two-being creation account.",
          },
        ],
      },
    },
    {
      slug: "right-hand-of-god",
      title: "Right Hand of God",
      tree: {
        id: "murray-righthand-root",
        speaker: "opponent",
        statement:
          "Acts 7:55-56 has Stephen seeing Jesus standing at the right hand of God, two distinct beings, one seated in glory, one standing beside Him, visibly separate.",
        verseRefs: ["Acts 7:55-56"],
        choices: [
          {
            key: "A",
            text: "This is a vision granted to Stephen at the moment of martyrdom, describing the glorified, resurrected, bodily human Jesus (Lane 3's real humanity, now exalted) in relation to the fullness of deity, using royal-court imagery ('right hand' = position of highest honor, per Psalm 110:1) rather than a literal snapshot of two co-eternal beings occupying adjacent space; the incarnate, human, bodily Christ is distinct in His humanity from the Spirit that fills Him (Lane 4), which is exactly what a vision of Him 'standing' would show, without requiring two eternal, uncreated beings.",
            correct: true,
            rubricNote: "Correct. Uses the human/divine two-natures distinction (Lanes 3-4) rather than denying the vision, which would be evasive.",
          },
          {
            key: "B",
            text: "Stephen was hallucinating during his execution.",
            correct: false,
            rubricNote: "Undermines biblical authority you rely on elsewhere, avoid.",
          },
          {
            key: "C",
            text: "'Right hand' is a literal physical location God occupies.",
            correct: false,
            rubricNote: "Overly literal reading of clearly royal/honorific idiom drawn from Psalm 110:1.",
          },
          {
            key: "D",
            text: "This settles it, two beings confirmed.",
            correct: false,
            rubricNote: "The glorified-humanity reading answers this without conceding two eternal beings.",
          },
        ],
      },
    },
    {
      slug: "one-god-and-one-mediator",
      title: "One God and One Mediator",
      tree: {
        id: "murray-onemediator-root",
        speaker: "opponent",
        statement:
          "1 Timothy 2:5 says 'there is one God, and one mediator between God and men, the man Christ Jesus.' A mediator stands between two parties, so God and the man Christ Jesus must be two distinct beings by definition.",
        verseRefs: ["1 Timothy 2:5"],
        choices: [
          {
            key: "A",
            text: "The mediator's role requires a genuine human party, which is exactly Lane 3's point, 'the man Christ Jesus' names the real human nature mediating on behalf of humanity, while the fullness of deity indwells that same person (Colossians 2:9, Lane 2, Lane 4); mediation between humanity and God happens through one incarnate person's human side, not through two separate eternal beings, the text specifies 'the MAN Christ Jesus' precisely to locate which side of the incarnation is doing the mediating.",
            correct: true,
            rubricNote: "Correct. The word 'man' in the verse itself is the key, it specifies the human nature is what mediates, consistent with two-natures Christology.",
          },
          {
            key: "B",
            text: "Jesus isn't really a mediator, that's symbolic language.",
            correct: false,
            rubricNote: "Contradicts the verse's plain wording, don't concede the text away.",
          },
          {
            key: "C",
            text: "God the Father doesn't need a mediator to reach humanity at all.",
            correct: false,
            rubricNote: "Doesn't address why the text specifically calls Christ a mediator between two parties.",
          },
          {
            key: "D",
            text: "A mediator always means two separate beings, no way around it.",
            correct: false,
            rubricNote: "The two-natures framework is exactly the way around it, don't hand over the point.",
          },
        ],
      },
    },
    {
      slug: "father-is-one-god",
      title: "Father is One God",
      tree: {
        id: "murray-fatherisonegod-root",
        speaker: "opponent",
        statement:
          "1 Corinthians 8:6 says 'to us there is but one God, the Father... and one Lord Jesus Christ.' Paul splits the single title 'one God' onto the Father specifically and a separate title 'one Lord' onto Jesus specifically, that's two distinct beings holding two distinct titles.",
        verseRefs: ["1 Corinthians 8:6"],
        choices: [
          {
            key: "A",
            text: "Paul is drawing directly from the Shema (Deuteronomy 6:4, 'the LORD our God is one LORD'), splitting its two divine names, God and LORD, across Father and Son to show both are included within Israel's one YHWH, not partitioning YHWH into two separate beings; this is the same move Isaiah 44:6 and Revelation 22:13 make when applying 'first and last' language to both YHWH and Jesus, inclusion within the one identity, not division of it into two.",
            correct: true,
            rubricNote: "Correct. Reads 1 Corinthians 8:6 as Paul splitting the Shema's two titles across Father and Son to include both, not divide the one God into two beings.",
          },
          {
            key: "B",
            text: "Paul contradicts the Shema here, he just wasn't being careful.",
            correct: false,
            rubricNote: "Undermines Paul's authority, a costly concession you don't need to make.",
          },
          {
            key: "C",
            text: "'One Lord' means Jesus is a lesser, secondary lord under the Father.",
            correct: false,
            rubricNote: "Undersells 'Lord' (kyrios), the same Greek word the Septuagint uses to translate YHWH itself.",
          },
          {
            key: "D",
            text: "This proves two gods, I have no response.",
            correct: false,
            rubricNote: "The Shema-splitting reading answers this directly, don't concede.",
          },
        ],
      },
    },
    {
      slug: "son-is-one-lord",
      title: "Son is One Lord",
      tree: {
        id: "murray-sonisonelord-root",
        speaker: "opponent",
        statement:
          "If Jesus is 'one Lord' as a distinct title from 'one God' the Father holds, doesn't that prove they're different beings with different ranks, not one God revealed two ways?",
        verseRefs: ["1 Corinthians 8:6", "Philippians 2:11"],
        choices: [
          {
            key: "A",
            text: "'Lord' (kyrios) is the standard Greek Old Testament (Septuagint) translation of YHWH itself, so calling Jesus 'Lord' in a Jewish-monotheist author's letter is applying the divine name to Him, not assigning Him a lesser rank; Philippians 2:11's 'every tongue confess that Jesus Christ is Lord, to the glory of God the Father' directly echoes Isaiah 45:23's YHWH-only confession text, identifying Jesus with YHWH, not subordinating Him under a separate being called God.",
            correct: true,
            rubricNote: "Correct. Kyrios as the LXX's YHWH-translation plus the Isaiah 45:23 echo in Philippians 2:11 is the strongest combined answer here.",
          },
          {
            key: "B",
            text: "'Lord' is just a polite title like 'sir,' nothing theological.",
            correct: false,
            rubricNote: "Ignores the Septuagint background entirely, weakens your own case unnecessarily.",
          },
          {
            key: "C",
            text: "Jesus earned the title 'Lord' after the resurrection, He didn't have it before.",
            correct: false,
            rubricNote: "Philippians 2:9-11 does describe exaltation language, but doesn't require reading 'Lord' as a brand-new, previously absent identity rather than a now fully revealed one.",
          },
          {
            key: "D",
            text: "Two ranks, two beings, that's just what the text says.",
            correct: false,
            rubricNote: "The Isaiah 45:23 echo defeats a simple two-ranks reading, don't concede.",
          },
        ],
      },
    },
    {
      slug: "god-filled-jesus-with-holy-ghost",
      title: "God Filled Jesus with the Holy Ghost",
      tree: {
        id: "murray-godfilled-root",
        speaker: "opponent",
        statement:
          "Acts 10:38 says 'God anointed Jesus of Nazareth with the Holy Ghost and with power.' That's one being (God) acting on another distinct being (Jesus) from the outside, exactly what you'd expect between two separate persons, not one person indwelling Himself.",
        verseRefs: ["Acts 10:38"],
        choices: [
          {
            key: "A",
            text: "This describes the incarnate Son's human nature (Lane 3, the real humanity that grows, is tempted, and here is anointed) being filled and empowered by the fullness of deity that indwells Him (Lane 4, Colossians 2:9, John 14:10); the same pattern shows up whenever Scripture describes God acting toward the human Jesus, it is describing the relationship between the two natures within one incarnate person, not a transaction between two separate eternal beings.",
            correct: true,
            rubricNote: "Correct. Anointing language describes the divine nature empowering the human nature within one person, the same two-natures move used throughout Lanes 3-4.",
          },
          {
            key: "B",
            text: "Jesus wasn't really anointed, that's just a figure of speech.",
            correct: false,
            rubricNote: "Contradicts the text's plain historical claim about Jesus' earthly ministry.",
          },
          {
            key: "C",
            text: "The Holy Ghost is a third being separate from both, so this proves three beings, not two.",
            correct: false,
            rubricNote: "Contradicts Lane 8, the Holy Ghost is the Spirit of the one God, not a separate being.",
          },
          {
            key: "D",
            text: "This is unanswerable proof of two distinct beings.",
            correct: false,
            rubricNote: "The two-natures framework from Lanes 3-4 answers this directly.",
          },
        ],
      },
    },
  ],
};
