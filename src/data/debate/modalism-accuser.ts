import { DebateOpponent } from "@/types";

export const modalismAccuser: DebateOpponent = {
  type: "modalism-accuser",
  label: "Modalism Accuser",
  description:
    "Argues Oneness theology is the ancient heresy of Sabellian modalism, condemned by the early church and at Nicaea.",
  topics: [
    {
      slug: "tertullian-against-praxeas",
      title: "Tertullian Against Praxeas",
      tree: {
        id: "ma-tertullian-root",
        speaker: "opponent",
        statement:
          "Tertullian wrote an entire treatise, Against Praxeas, around 213 AD specifically refuting a teacher who denied real distinction between Father, Son, and Spirit. That's a direct, early, explicit condemnation of exactly what you're defending, from someone writing barely a century after the apostles.",
        verseRefs: [],
        choices: [
          {
            key: "A",
            text: "Against Praxeas is real and worth knowing cold, but it proves less than it sounds like: it shows a modalist-adjacent teaching existed and was contested around 200 AD, which actually confirms this kind of teaching is old, not a 20th-century invention; Tertullian's own vocabulary, 'persona' (originally a legal or theatrical role/mask), doesn't map cleanly onto later fully-developed, co-equal-persons Trinitarianism either, he's a transitional figure whose polemic tells us a debate was happening, not that the whole church had already reached settled consensus against it.",
            correct: true,
            rubricNote: "Correct. Uses the honest, two-sided reading from the Facts Library's own Tertullian entry: real evidence of an old debate, not proof of a settled, unanimous verdict.",
          },
          {
            key: "B",
            text: "Tertullian never wrote anything called Against Praxeas.",
            correct: false,
            rubricNote: "False, well-documented text, don't deny it exists, engage what it actually shows instead.",
          },
          {
            key: "C",
            text: "Praxeas doesn't matter because Tertullian was wrong about everything.",
            correct: false,
            rubricNote: "Too dismissive of a real early witness, weakens your credibility rather than strengthening your case.",
          },
          {
            key: "D",
            text: "This proves the early church unanimously rejected this view, no way around it.",
            correct: false,
            rubricNote: "Overstates what one polemical treatise against one teacher proves about the whole church's consensus, don't concede more than the evidence shows.",
          },
        ],
      },
    },
    {
      slug: "sabellius-label",
      title: "The Sabellius Label",
      tree: {
        id: "ma-sabellius-root",
        speaker: "opponent",
        statement:
          "What you're describing is textbook Sabellianism, named for the 3rd-century teacher Sabellius, condemned as heresy by the early church for teaching that God is one person appearing in three temporary modes. You're just repackaging an already-refuted position.",
        verseRefs: [],
        choices: [
          {
            key: "A",
            text: "Two honest points cut against a clean equivalence: first, no writings from Sabellius himself survive, everything we know comes from hostile opponents describing him, so the label may not even accurately represent what he taught; second, and more important, classical Sabellianism as described by its critics taught sequential modes, the Father-mode ending before the Son-mode begins, ending before the Spirit-mode begins, while historic Oneness theology teaches simultaneous, ongoing indwelling, the Father's Spirit fully filling the Son at the same time, not in temporal succession, that's a real structural difference in the model, not a rebrand of the same idea.",
            correct: true,
            rubricNote: "Correct. The sequential-vs-simultaneous distinction is the actual substantive difference, this is the single most important answer to have ready for this entire opponent.",
          },
          {
            key: "B",
            text: "Sabellius never existed, he's a myth invented by later theologians.",
            correct: false,
            rubricNote: "Unnecessary and unsupported claim, the historical existence of some such teacher isn't the load-bearing point, the sequential-vs-simultaneous distinction is.",
          },
          {
            key: "C",
            text: "It doesn't matter what a 3rd-century council said, only Scripture matters.",
            correct: false,
            rubricNote: "A fair point about final authority, but it dodges the specific factual claim being made rather than answering it, engage the actual distinction first.",
          },
          {
            key: "D",
            text: "Yes, this is basically Sabellianism, fair label.",
            correct: false,
            rubricNote: "Concedes a real, defeatable mischaracterization, don't hand this over, the sequential-vs-simultaneous distinction answers it.",
          },
        ],
      },
    },
    {
      slug: "nicene-creed-condemnation",
      title: "Nicene Creed Condemnation",
      tree: {
        id: "ma-nicene-root",
        speaker: "opponent",
        statement:
          "The Nicene Creed of 325 AD and the later Constantinopolitan Creed explicitly affirm three distinct, co-eternal persons. Your view was formally rejected by the church's own ecumenical councils, that's not a small thing to be on the wrong side of.",
        verseRefs: [],
        choices: [
          {
            key: "A",
            text: "Nicaea's actual, primary target in 325 AD was Arianism, the claim that the Son was a created being, not eternal, that's the specific heresy the council convened to address, and the creed's anti-Arian language ('begotten, not made, being of one substance with the Father') is aimed squarely at that; the fuller three-co-equal-persons formulation, with the Spirit's deity explicitly settled, wasn't finalized until Constantinople in 381, meaning 'the church' took over 350 years after the apostles to arrive at the fully developed formula being invoked here, a council vote settles what became the dominant institutional position from that point forward, it doesn't retroactively settle what the text of Scripture itself teaches.",
            correct: true,
            rubricNote: "Correct. Correctly narrows what Nicaea 325 actually targeted (Arianism) versus the later, fuller formulation at Constantinople 381, and separates institutional consensus from scriptural authority.",
          },
          {
            key: "B",
            text: "The Nicene Creed doesn't really teach three persons.",
            correct: false,
            rubricNote: "Misrepresents a well-documented historical text, don't deny what the creed plainly says.",
          },
          {
            key: "C",
            text: "Church councils have no authority or relevance to discuss at all.",
            correct: false,
            rubricNote: "Too sweeping, dismissing all church history weakens your credibility in a debate that's specifically about church history.",
          },
          {
            key: "D",
            text: "Being condemned at Nicaea does settle the theological question.",
            correct: false,
            rubricNote: "Concedes that a 4th-century vote overrides scriptural exegesis, don't hand over final authority this way.",
          },
        ],
      },
    },
    {
      slug: "sequential-vs-simultaneous-modes",
      title: "Sequential vs Simultaneous Modes",
      tree: {
        id: "ma-seqvssim-root",
        speaker: "opponent",
        statement:
          "Saying 'simultaneous, not sequential' is just a technical dodge. Either God is one person or God is three persons, adding the word 'simultaneous' doesn't change the fact that you still only have one person total, which is exactly modalism's core claim.",
        verseRefs: ["John 14:10"],
        choices: [
          {
            key: "A",
            text: "The word 'simultaneous' isn't a dodge, it's the entire substance of the disagreement: classical modalism's actual defect, per its own critics, wasn't 'believing in one person,' it was describing a God who is ONLY ONE MODE AT A TIME, so that while the Son-mode was active during the incarnation, there was, on that model, no active Father presiding over creation or hearing prayer simultaneously; Oneness theology explicitly rejects that limitation, John 14:10's 'the Father that dwelleth in me' describes the fullness of God being fully present and active AS Father over all creation AND fully indwelling the Son AT THE SAME MOMENT, which is a materially different, richer claim than a God who can only be in one mode at a time.",
            correct: true,
            rubricNote: "Correct. Spells out precisely why 'simultaneous' isn't cosmetic, it removes the actual defect ancient modalism's critics were objecting to (God being only one mode at a time, unable to act as Father while incarnate as Son).",
          },
          {
            key: "B",
            text: "There's no real difference, the accusation is fair.",
            correct: false,
            rubricNote: "Concedes the whole argument, don't hand this over when a real, substantive answer exists.",
          },
          {
            key: "C",
            text: "God is definitely three persons after all.",
            correct: false,
            rubricNote: "Abandons your own position entirely rather than defending it, not an answer.",
          },
          {
            key: "D",
            text: "This is just semantics and doesn't matter theologically.",
            correct: false,
            rubricNote: "It matters a great deal, per John 14:10, don't wave away the substance of your own strongest distinction.",
          },
        ],
      },
    },
    {
      slug: "baptism-of-jesus-modalism-version",
      title: "Baptism of Jesus (Modalism Version)",
      tree: {
        id: "ma-baptism-root",
        speaker: "opponent",
        statement:
          "At Jesus' baptism, the Father speaks from heaven while the Son stands in the water and the Spirit descends as a dove, three simultaneous, distinct manifestations in one scene. Sequential-mode-switching couldn't produce this, so even granting your 'simultaneous' framing, you still need three separate divine actors physically present at once, which is the Trinity, not Oneness.",
        verseRefs: ["Matthew 3:16-17"],
        choices: [
          {
            key: "A",
            text: "This scene is exactly what simultaneous indwelling was built to explain, not what defeats it: the incarnate body standing in the water is the localized human manifestation (Lane 3), while the voice and the Spirit-form are non-bodily manifestations of the same one Spirit that fills that body (Lane 4, Lane 8), simultaneous because God, being Spirit (John 4:24), is not confined to one location the way the incarnate body is, one being manifesting in more than one perceivable form at once is different from three separate, eternally distinct persons who each independently exist regardless of any manifestation.",
            correct: true,
            rubricNote: "Correct. Directly distinguishes 'one Spirit-being manifesting non-locally in multiple forms at once' from 'three independently-existing eternal persons,' the core Oneness answer to this exact scene.",
          },
          {
            key: "B",
            text: "This scene didn't literally happen, it's symbolic only.",
            correct: false,
            rubricNote: "Undercuts your own use of the Gospels elsewhere, treat the scene as real.",
          },
          {
            key: "C",
            text: "Only the Son was really present, the voice and dove were illusions.",
            correct: false,
            rubricNote: "Contradicts the text's plain description of three real, perceivable phenomena, don't deny what's written.",
          },
          {
            key: "D",
            text: "This does require three separate divine persons, no way around it.",
            correct: false,
            rubricNote: "The 'God is Spirit, not spatially confined the way the incarnate body is' answer directly resolves this, don't concede.",
          },
        ],
      },
    },
    {
      slug: "prayer-to-the-father-problem",
      title: "Prayer to the Father Problem",
      tree: {
        id: "ma-prayer-root",
        speaker: "opponent",
        statement:
          "If Jesus is simply one mode of the same single person as the Father, then His prayers to the Father are performative theater, Jesus can't genuinely petition, submit to, or be in relationship with Himself. That's not just modalism, it's borderline incoherent.",
        verseRefs: ["Matthew 26:39"],
        choices: [
          {
            key: "A",
            text: "The incoherence charge only lands against a model with a single unified will and a single unified consciousness talking to itself, which isn't what's being claimed: the incarnate Son has a genuine, full human will and consciousness (Lane 3, Hebrews 4:15's real temptation), and that human will and consciousness, in real, non-performative distress in Gethsemane, submits to the fullness of deity that indwells it (Lane 4, John 14:10); this is real prayer from a real human center of experience toward the divine nature filling that same person, not theater, and not incoherent, it's the actual, historic shape of the incarnation, one person, two natures, two wills.",
            correct: true,
            rubricNote: "Correct. Locates the answer in the genuine, distinct human will and consciousness established in Lanes 3-4, not in denying the prayer's reality.",
          },
          {
            key: "B",
            text: "The prayer wasn't real, Jesus was just performing for the disciples' benefit.",
            correct: false,
            rubricNote: "This concedes the 'theater' accusation rather than answering it, and is pastorally troubling, don't adopt it.",
          },
          {
            key: "C",
            text: "Jesus doesn't really have a human will separate from the Father's will at all.",
            correct: false,
            rubricNote: "Denies real humanity and breaks Lane 3, this actually strengthens the opponent's incoherence charge rather than answering it.",
          },
          {
            key: "D",
            text: "This is a fair criticism I can't really answer.",
            correct: false,
            rubricNote: "The two-natures, two-wills framework from Lanes 3-4 answers this directly, don't concede.",
          },
        ],
      },
    },
  ],
};
