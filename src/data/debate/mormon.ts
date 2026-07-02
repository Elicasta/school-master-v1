import { DebateOpponent } from "@/types";

export const mormon: DebateOpponent = {
  type: "mormon",
  label: "Mormon",
  description:
    "Argues God was once a man who progressed to godhood, and that Jesus and Lucifer are spirit brothers, both offspring of a Heavenly Father.",
  topics: [
    {
      slug: "god-was-once-a-man",
      title: "God Was Once a Man",
      tree: {
        id: "mormon-godonceaman-root",
        speaker: "opponent",
        statement:
          "As Joseph Smith taught, God the Father was once a man like us, who progressed through mortality and eventually became exalted to godhood. That's how eternal progression works, and it's why humans can become gods too.",
        verseRefs: ["Malachi 3:6"],
        choices: [
          {
            key: "A",
            text: "Malachi 3:6, 'I am the LORD, I change not,' is a direct, explicit denial of exactly this kind of progression, a God who became God through change and advancement over time contradicts His own self-description as unchanging; Isaiah 43:10 adds 'before me there was no God formed, neither shall there be after me,' ruling out any prior state, human or otherwise, from which God progressed into deity.",
            correct: true,
            rubricNote: "Correct. Malachi 3:6's 'I change not' directly and simply contradicts the progression claim, this is the cleanest possible answer.",
          },
          {
            key: "B",
            text: "The Bible doesn't really describe God's nature at all, so this can't be checked.",
            correct: false,
            rubricNote: "Concedes far too much ground, the Bible has extensive, explicit statements about God's unchanging eternal nature.",
          },
          {
            key: "C",
            text: "Maybe God did progress, the Bible is just silent on it.",
            correct: false,
            rubricNote: "The Bible isn't silent, Malachi 3:6 and Isaiah 43:10 address this directly, don't concede silence where there is a text.",
          },
          {
            key: "D",
            text: "This is an interesting idea worth considering seriously.",
            correct: false,
            rubricNote: "Treats a direct contradiction of Malachi 3:6 as an open question rather than answering it.",
          },
        ],
      },
    },
    {
      slug: "eternal-progression",
      title: "Eternal Progression",
      tree: {
        id: "mormon-eternalprogression-root",
        speaker: "opponent",
        statement:
          "'As man is, God once was; as God is, man may become.' This teaching just extends what Jesus Himself said in John 10:34, quoting Psalm 82, 'Ye are gods.' Scripture itself calls humans gods with the potential for exaltation.",
        verseRefs: ["John 10:34", "Psalm 82:6"],
        choices: [
          {
            key: "A",
            text: "Psalm 82 is addressing human judges/rulers ironically, calling them 'gods' (elohim, a term also used for human authorities, compare Exodus 21:6, 22:8-9) precisely because they were about to be judged and 'die like men' (Psalm 82:7) for abusing that delegated authority, not exalted to actual deity; Jesus cites it in John 10:34 as a rabbinic argument from the lesser to the greater ('if he called them gods... how can you say I blaspheme for saying I am the Son of God'), using their own scripture against His accusers, not endorsing a doctrine of human exaltation to godhood, the passage's own next verse (Psalm 82:7) undercuts any exaltation reading by pronouncing their mortality and judgment.",
            correct: true,
            rubricNote: "Correct. Psalm 82:7's 'die like men' one verse later is the decisive block against reading Psalm 82:6 as a promise of exaltation to godhood.",
          },
          {
            key: "B",
            text: "Psalm 82 has nothing to do with John 10:34 at all.",
            correct: false,
            rubricNote: "Jesus explicitly quotes it, don't deny the direct connection, engage with what it actually means instead.",
          },
          {
            key: "C",
            text: "Jesus was speaking ironically and didn't mean anything by the quote.",
            correct: false,
            rubricNote: "Underreads the rabbinic argument-form Jesus is actually using, which has real force, just not the force claimed here.",
          },
          {
            key: "D",
            text: "This does support eternal progression, I don't have a response.",
            correct: false,
            rubricNote: "Psalm 82:7's 'die like men' directly answers this, don't concede the exaltation reading.",
          },
        ],
      },
    },
    {
      slug: "plurality-of-gods",
      title: "Plurality of Gods",
      tree: {
        id: "mormon-plurality-root",
        speaker: "opponent",
        statement:
          "Genesis uses 'Elohim,' a plural Hebrew word for God, and passages like Psalm 82:1 mention God standing 'in the congregation of the mighty; he judgeth among the gods.' Scripture itself teaches a plurality of gods, not strict monotheism.",
        verseRefs: ["Genesis 1:1", "Psalm 82:1"],
        choices: [
          {
            key: "A",
            text: "Elohim is a plural NOUN form used with SINGULAR verbs throughout Genesis 1 ('Elohim created,' bara is singular), a well-known Hebrew grammatical pattern called the plural of majesty, the same construction used for a single human king's dignity, not a claim of multiple gods; Psalm 82:1's 'gods' are the same human judges/rulers discussed in the Eternal Progression topic (elohim applied to human authorities, Exodus 21:6), whom God judges and sentences to death in verse 7, obviously not a council of literal deities coequal with YHWH, and Deuteronomy 32:39's 'I, even I, am he, and there is no god with me' directly rules out any actual plurality of true gods.",
            correct: true,
            rubricNote: "Correct. Singular verb with plural noun (grammar) plus Deuteronomy 32:39's explicit denial together defeat the plurality reading.",
          },
          {
            key: "B",
            text: "Elohim is just a proper name with no grammatical plurality at all.",
            correct: false,
            rubricNote: "It is grammatically plural in form, the point is the singular verb agreement, not denying the plural form itself.",
          },
          {
            key: "C",
            text: "Psalm 82 doesn't exist in the earliest manuscripts.",
            correct: false,
            rubricNote: "False, well-attested, don't dispute the text's existence, engage its meaning instead.",
          },
          {
            key: "D",
            text: "Maybe there is a plurality of gods, the evidence is unclear.",
            correct: false,
            rubricNote: "Deuteronomy 32:39 makes the evidence clear, don't leave this open.",
          },
        ],
      },
    },
    {
      slug: "jesus-and-lucifer-as-spirit-brothers",
      title: "Jesus and Lucifer as Spirit Brothers",
      tree: {
        id: "mormon-spiritbrothers-root",
        speaker: "opponent",
        statement:
          "In the premortal existence, all spirits, including Jesus and Lucifer, were born as literal spirit children of Heavenly Father and Heavenly Mother. Jesus and Lucifer are, in that sense, spirit brothers, Jesus was simply chosen as the firstborn to be the Savior.",
        verseRefs: ["Colossians 1:16"],
        choices: [
          {
            key: "A",
            text: "Colossians 1:16 places Lucifer (a created being, whatever his exact nature) firmly inside the category of 'all things... created by him,' meaning Jesus is Lucifer's Creator, not his sibling, a categorical difference in kind, not merely rank; nowhere does Scripture describe a 'Heavenly Mother' or literal spirit-birth of either figure, that framework has to be imported from outside the biblical text entirely, while the text that IS there places Jesus on the Creator side of the Creator/creature line and Lucifer (as a fallen created being, Isaiah 14:12-15, Ezekiel 28:12-17) on the creature side.",
            correct: true,
            rubricNote: "Correct. Colossians 1:16 puts Jesus and Lucifer on opposite sides of the Creator/creature line, not siblings sharing one line.",
          },
          {
            key: "B",
            text: "Lucifer isn't a real being at all, just a metaphor.",
            correct: false,
            rubricNote: "Unnecessary and disputable claim, the Creator/creature distinction from Colossians 1:16 settles the point without needing this.",
          },
          {
            key: "C",
            text: "Jesus and Lucifer really are related somehow, just not exactly as described.",
            correct: false,
            rubricNote: "Concedes too much of the framework, the Creator/creature line is categorical, not a matter of degree.",
          },
          {
            key: "D",
            text: "The Bible doesn't address premortal existence, so this can't be checked either way.",
            correct: false,
            rubricNote: "Colossians 1:16 does address it, by placing all created things, including any premortal spirits, under Christ as Creator.",
          },
        ],
      },
    },
    {
      slug: "heavenly-mother",
      title: "Heavenly Mother",
      tree: {
        id: "mormon-heavenlymother-root",
        speaker: "opponent",
        statement:
          "If God the Father is our literal Father, and spirit children require both a father and a mother, logic itself demands a Heavenly Mother, even if she's rarely mentioned directly in scripture.",
        verseRefs: ["John 4:24"],
        choices: [
          {
            key: "A",
            text: "The argument assumes God's Fatherhood is literal biological paternity requiring a female counterpart, but John 4:24 states 'God is a Spirit,' and Scripture consistently uses 'Father' for God in covenantal and creative/adoptive senses (compare 'Father of lights,' James 1:17, or Father by creation and by adoption, Romans 8:15), not literal biological reproduction; the argument's premise, that fatherhood always requires a literal mother in the biological sense, doesn't transfer to a being explicitly identified as Spirit rather than embodied and gendered in the way biological reproduction requires.",
            correct: true,
            rubricNote: "Correct. John 4:24's 'God is a Spirit' undercuts the literal-biological-parentage premise the whole argument depends on.",
          },
          {
            key: "B",
            text: "God definitely doesn't have a body of any kind, ever, in any sense.",
            correct: false,
            rubricNote: "Overreaches into a separate debate about anthropomorphic language and theophanies, the Spirit-nature point in John 4:24 is sufficient on its own.",
          },
          {
            key: "C",
            text: "There's no way to know if a Heavenly Mother exists or not.",
            correct: false,
            rubricNote: "Too agnostic, John 4:24 gives a real, specific answer to work with, don't leave it as unknowable.",
          },
          {
            key: "D",
            text: "The logic is sound, I don't have a counter.",
            correct: false,
            rubricNote: "The premise itself is flawed (literal biological fatherhood applied to a Spirit-being), that's the answer.",
          },
        ],
      },
    },
    {
      slug: "priesthood-authority-claims",
      title: "Priesthood Authority Claims",
      tree: {
        id: "mormon-priesthood-root",
        speaker: "opponent",
        statement:
          "The true priesthood authority to act for God, the Aaronic and Melchizedek priesthoods, was lost after the apostles died and was only restored through Joseph Smith by angelic ordination in 1829. Without that restored authority, no other church's baptisms or ordinances are valid.",
        verseRefs: ["Hebrews 7:24"],
        choices: [
          {
            key: "A",
            text: "Hebrews 7:24 says of Christ's own priesthood, 'because he continueth ever, hath an unchangeable priesthood,' explicitly built as a contrast to the Aaronic priesthood's need for succession (verses 23-24 argue the OLD priesthood needed repeated ordination BECAUSE its priests kept dying, Christ's does not, because He does not die again); a restoration-through-succession claim for a NEW priesthood in 1829 runs directly against a passage arguing Christ's own priesthood requires no human successor at all, since He personally, permanently, holds it.",
            correct: true,
            rubricNote: "Correct. Hebrews 7:23-24's whole argument is that Christ's priesthood doesn't need succession precisely because He doesn't die, which undercuts any human successor-priesthood restoration claim.",
          },
          {
            key: "B",
            text: "Priesthood authority doesn't matter at all in the New Testament.",
            correct: false,
            rubricNote: "Overstated, Hebrews spends multiple chapters on priesthood, the point is what KIND of priesthood Christ established, not that it's unimportant.",
          },
          {
            key: "C",
            text: "The apostles definitely passed on formal priesthood authority to specific successors by name.",
            correct: false,
            rubricNote: "This isn't clearly established in the NT text itself and isn't necessary for the Hebrews 7:24 answer, don't overclaim.",
          },
          {
            key: "D",
            text: "Maybe the priesthood really was lost, hard to say from the Bible alone.",
            correct: false,
            rubricNote: "Hebrews 7:24 speaks directly to this, don't treat it as unaddressed.",
          },
        ],
      },
    },
  ],
};
