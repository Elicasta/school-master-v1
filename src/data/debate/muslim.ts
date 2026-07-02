import { DebateOpponent } from "@/types";

export const muslim: DebateOpponent = {
  type: "muslim",
  label: "Muslim",
  description:
    "Argues strict tawhid (absolute divine oneness), that Jesus (Isa) is a prophet and messenger only, and rejects the crucifixion and the Trinity.",
  topics: [
    {
      slug: "god-has-no-son",
      title: "God Has No Son",
      tree: {
        id: "muslim-noson-root",
        speaker: "opponent",
        statement:
          "The Qur'an is explicit: 'He begetteth not, nor is He begotten' (112:3). God having a literal son implies a physical, sexual act unworthy of the transcendent, unified God. Calling Jesus 'Son of God' is blasphemy against tawhid.",
        verseRefs: ["Luke 1:35"],
        choices: [
          {
            key: "A",
            text: "The objection assumes 'Son of God' means literal biological begetting through a physical act, but Luke 1:35 explicitly describes the conception as the Holy Ghost 'overshadowing' Mary, a miraculous, non-physical act of creative power, the same kind of language Genesis uses for the Spirit 'moving upon the waters,' not sexual reproduction; 'Son of God' in this context names the incarnation event itself, God's own Spirit taking on human flesh, which is a categorically different claim than the pagan god-siring-children mythology the Qur'an is correctly rejecting.",
            correct: true,
            rubricNote: "Correct. Distinguishing the biblical incarnation account (Spirit overshadowing, non-physical) from the pagan mythological 'son of god' concept the Qur'an targets is the key move here.",
          },
          {
            key: "B",
            text: "Christians don't really believe Jesus is God's literal son in any sense.",
            correct: false,
            rubricNote: "Overcorrects, the incarnation claim is real and central, the answer is explaining WHAT KIND of sonship, not denying it exists.",
          },
          {
            key: "C",
            text: "The Qur'an is not a reliable source to even discuss.",
            correct: false,
            rubricNote: "Dismissing the other side's text outright shuts down the conversation rather than engaging the actual argument.",
          },
          {
            key: "D",
            text: "This is a real problem for the concept of Sonship, I don't have an answer.",
            correct: false,
            rubricNote: "The overshadowing language in Luke 1:35 answers exactly this concern, don't concede.",
          },
        ],
      },
    },
    {
      slug: "jesus-as-prophet-only",
      title: "Jesus as Prophet Only",
      tree: {
        id: "muslim-prophetonly-root",
        speaker: "opponent",
        statement:
          "The Qur'an honors Isa as a great prophet, born of a virgin, who performed miracles by God's permission, but explicitly denies His deity. He was a messenger like Moses and Muhammad, not God Himself.",
        verseRefs: ["John 10:33", "Colossians 2:9"],
        choices: [
          {
            key: "A",
            text: "The New Testament's own eyewitness record doesn't fit a prophet-only claim: John 10:33 has Jesus' own Jewish hearers, who knew the difference between a prophet and a deity claim, charge Him with blasphemy specifically 'because that thou, being a man, makest thyself God,' not merely a great prophet claim; Colossians 2:9 states plainly that 'in him dwelleth all the fulness of the Godhead bodily,' language no accepted prophet, before or after, ever had applied to himself, the earliest Christian community's own testimony already exceeds a prophet-only framework from the very beginning, this isn't a later corruption, it's the original claim in the earliest texts.",
            correct: true,
            rubricNote: "Correct. John 10:33's contemporary Jewish blasphemy charge is strong evidence the deity claim isn't a later corruption, it's how Jesus was understood by His own hearers.",
          },
          {
            key: "B",
            text: "The Qur'an actually agrees Jesus is God, this is a misunderstanding of Islamic teaching.",
            correct: false,
            rubricNote: "Factually inaccurate representation of Islamic theology, don't misstate the other side's actual position.",
          },
          {
            key: "C",
            text: "Being a prophet and being God aren't mutually exclusive categories.",
            correct: false,
            rubricNote: "Doesn't directly engage the specific claim being made, softer than citing the actual textual evidence.",
          },
          {
            key: "D",
            text: "Christians made up the deity claim centuries after Jesus lived.",
            correct: false,
            rubricNote: "This concedes the opponent's framing rather than contesting it, and it's historically weak, John 10:33 shows the claim was contemporary, not a later addition.",
          },
        ],
      },
    },
    {
      slug: "trinity-misunderstanding",
      title: "Trinity Misunderstanding",
      tree: {
        id: "muslim-trinitymisunderstanding-root",
        speaker: "opponent",
        statement:
          "The Qur'an (5:116) depicts the Trinity as God, Jesus, and Mary, three gods, which is a real misunderstanding of the actual (and equally false) Christian doctrine. Either way, worshiping any multiplicity alongside God is shirk, the greatest sin in Islam.",
        verseRefs: ["Deuteronomy 6:4"],
        choices: [
          {
            key: "A",
            text: "This is actually common ground worth building on: Oneness theology already agrees the Qur'an's depiction (God, Jesus, Mary as three separate gods) is a real error, and goes further than most Trinitarian responses by affirming the exact same strict numerical monotheism the Qur'an defends, Deuteronomy 6:4's 'the LORD our God is one LORD,' with no plurality of persons at all; the actual disagreement isn't about whether God is absolutely one (both sides affirm this), it's about whether the New Testament's own claims about Jesus (Lanes 2 and 5) are accepted as authoritative revelation, a different, narrower question than the shirk objection assumes.",
            correct: true,
            rubricNote: "Correct. Reframes the debate onto genuinely shared ground (strict monotheism) and narrows the real disagreement to biblical authority, not persons-in-the-godhead.",
          },
          {
            key: "B",
            text: "The Qur'an's description of the Trinity is completely accurate to what most Christians believe.",
            correct: false,
            rubricNote: "Inaccurate, most Trinitarian formulations don't include Mary as a divine person, don't concede a strawman as accurate.",
          },
          {
            key: "C",
            text: "Shirk isn't a real concern worth taking seriously.",
            correct: false,
            rubricNote: "Dismissive of a category the opponent takes with total seriousness, undermines the conversation.",
          },
          {
            key: "D",
            text: "Christians do worship three separate gods, that's accurate.",
            correct: false,
            rubricNote: "Concedes a position that breaks Lane 1's monotheism, don't hand this over even to score a point against Trinitarianism.",
          },
        ],
      },
    },
    {
      slug: "crucifixion-denial",
      title: "Crucifixion Denial",
      tree: {
        id: "muslim-crucifixiondenial-root",
        speaker: "opponent",
        statement:
          "The Qur'an (4:157) states Jesus was not killed or crucified, it only appeared that way to His enemies, God raised Him up instead. The entire Christian narrative of the cross and resurrection rests on an event that never actually happened.",
        verseRefs: ["1 Corinthians 15:3-4"],
        choices: [
          {
            key: "A",
            text: "The crucifixion is one of the most multiply-attested events in ancient history, reported not just in all four Gospels but confirmed by non-Christian first-century and early-second-century sources with no reason to affirm it, including the Jewish historian Josephus and the Roman historians Tacitus and Suetonius, writing decades later without any Christian bias to serve; the Qur'an's account was written roughly six centuries after the event, while 1 Corinthians 15:3-4 records a creed Paul says he 'received' and 'delivered,' meaning it predates his own letter and traces back to within a few years of the crucifixion itself, making it a far earlier and more historically grounded source than a claim first appearing centuries later.",
            correct: true,
            rubricNote: "Correct. The early creed in 1 Corinthians 15:3-4 (dated by scholars to within a few years of the crucifixion) plus non-Christian first-century corroboration is the strongest historical answer available.",
          },
          {
            key: "B",
            text: "The Qur'an is simply wrong and not worth discussing further.",
            correct: false,
            rubricNote: "Shuts down rather than engages, the historical evidence itself is the stronger, more persuasive path here.",
          },
          {
            key: "C",
            text: "Maybe someone else died in Jesus' place, that's plausible.",
            correct: false,
            rubricNote: "This isn't your own position and isn't supported by the historical evidence, don't adopt or entertain an unsupported theory as your own answer.",
          },
          {
            key: "D",
            text: "Whether the crucifixion happened or not doesn't matter much theologically.",
            correct: false,
            rubricNote: "It matters enormously (1 Corinthians 15:14, 'if Christ be not risen, your faith is vain'), don't minimize the stakes.",
          },
        ],
      },
    },
    {
      slug: "tawhid-objections",
      title: "Tawhid Objections",
      tree: {
        id: "muslim-tawhid-root",
        speaker: "opponent",
        statement:
          "Tawhid, absolute, indivisible oneness, is the single most important truth in all of existence for a Muslim. Any theology that introduces multiplicity into God's essence, however defined, is a direct assault on tawhid and cannot be reconciled with true monotheism.",
        verseRefs: ["Deuteronomy 6:4", "Isaiah 45:5"],
        choices: [
          {
            key: "A",
            text: "This is precisely the ground Oneness theology stands on too, not the ground it departs from: Deuteronomy 6:4 and Isaiah 45:5's 'there is no God beside me' are treated as absolute, non-negotiable, with no plurality of persons introduced into God's essence at all; the New Testament's statements about Jesus (John 1:1, Colossians 2:9) are read as describing God's own self-revelation, one God appearing and acting, not a second or third divine individual added alongside Him, which is a materially different claim than the multi-person Trinitarian model tawhid is usually built to refute.",
            correct: true,
            rubricNote: "Correct. Positions Oneness theology as structurally closer to tawhid's actual concern than Trinitarianism is, which is honest and also the strongest rhetorical position available.",
          },
          {
            key: "B",
            text: "Tawhid and the Trinity are actually saying the exact same thing.",
            correct: false,
            rubricNote: "Overclaims compatibility with classical Trinitarianism specifically, which is a different, harder case to make than the Oneness parallel.",
          },
          {
            key: "C",
            text: "Monotheism isn't really that important a category to worry about.",
            correct: false,
            rubricNote: "Undermines your own Lane 1 foundation, monotheism is exactly what you're defending too.",
          },
          {
            key: "D",
            text: "I can't reconcile my view with tawhid at all.",
            correct: false,
            rubricNote: "Oneness theology's strict monotheism is genuinely reconcilable with tawhid's core concern, don't concede this.",
          },
        ],
      },
    },
    {
      slug: "quran-vs-new-testament-claims",
      title: "Qur'an vs New Testament Claims",
      tree: {
        id: "muslim-quranvsnt-root",
        speaker: "opponent",
        statement:
          "The Qur'an says the New Testament we have today has been corrupted (tahrif) over the centuries, the true original Injil, revealed to Isa, matched the Qur'an's teaching about him as a prophet, and was later altered by Christian scribes to invent His deity.",
        verseRefs: ["1 Corinthians 15:3-4"],
        choices: [
          {
            key: "A",
            text: "The corruption claim runs directly against the manuscript evidence: we possess New Testament manuscripts and fragments dating within decades to a couple of centuries of the originals (far earlier than the Qur'an's own six-century gap from the events it describes), and the deity claims aren't isolated late additions, they appear in the earliest layers, including the pre-Pauline creed in 1 Corinthians 15:3-4 (dated by most scholars to within 2-5 years of the crucifixion) and John 20:28's worship-confession; a corruption theory has to explain how an alteration could spread uniformly into manuscripts from wildly different regions (Egypt, Rome, Syria) that had no contact with each other in that era, without leaving any surviving trace of the supposedly original, uncorrupted, deity-free version anywhere in the manuscript record.",
            correct: true,
            rubricNote: "Correct. The manuscript-dating evidence plus the early creed in 1 Corinthians 15 (predating the letter itself) is the strongest historical rebuttal to a late-corruption theory.",
          },
          {
            key: "B",
            text: "The Qur'an never makes any claim about New Testament corruption.",
            correct: false,
            rubricNote: "The tahrif concept is a real part of the classical Islamic position on prior scriptures, don't deny the opponent's actual claim.",
          },
          {
            key: "C",
            text: "It's impossible to know what the earliest Christian texts actually said.",
            correct: false,
            rubricNote: "It is knowable, and reasonably well, through manuscript and patristic citation evidence, don't concede unnecessary uncertainty.",
          },
          {
            key: "D",
            text: "Maybe the text was corrupted somewhat, hard to rule out entirely.",
            correct: false,
            rubricNote: "The early, geographically-scattered manuscript agreement makes large-scale, uniform corruption highly implausible, state this directly rather than hedging.",
          },
        ],
      },
    },
  ],
};
