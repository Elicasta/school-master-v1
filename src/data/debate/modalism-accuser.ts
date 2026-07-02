import { DebateOpponent } from "@/types";

export const modalismAccuser: DebateOpponent = {
  type: "modalism-accuser",
  label: "Modalism Accuser",
  description: "Argues Oneness theology is the ancient heresy of Sabellian modalism, condemned at Nicaea, dressed in new clothes.",
  topics: [
    {
      slug: "sabellius-was-condemned",
      title: "Sabellius Was Condemned",
      tree: {
        id: "ma-sabelliuscondemned-root",
        speaker: "opponent",
        statement: "Sabellius taught exactly what you teach, one God in three modes, and the church condemned him as a heretic in the early third century. You're reviving a position the church already rejected.",
        choices: [
          { key: "A", text: "We only know Sabellius through hostile sources, none of his own writings survive, so the caricature comes entirely from his opponents; more importantly, the specific structure ancient sources attribute to him is sequential modalism, the Father-mode ending before the Son-mode begins, like changing masks, while historic Oneness theology teaches simultaneous, ongoing indwelling, the Father's Spirit fully filling the incarnate Son at the same time, not in temporal succession, which is a real structural difference, not a rebrand.", correct: true, rubricNote: "Correct. The sequential-vs-simultaneous distinction is the single most important fact in this entire debate opponent, know it cold." },
          { key: "B", text: "Sabellius never existed, this is a fabricated accusation.", correct: false, rubricNote: "He's attested across multiple ancient sources, denying his existence will be immediately and easily refuted." },
          { key: "C", text: "Nicaea never actually addressed modalism at all.", correct: false, rubricNote: "Modalism was a live concern in the theological environment around Nicaea, don't deny well-documented history." },
          { key: "D", text: "The label doesn't matter, only whether the doctrine is true.", correct: false, rubricNote: "True as a deeper point, but dodges the specific historical claim being made, answer it directly first." },
        ],
      },
    },
    {
      slug: "nicaea-settled-this",
      title: "Nicaea Settled This",
      tree: {
        id: "ma-nicaeasettled-root",
        speaker: "opponent",
        statement: "The Council of Nicaea in 325 AD, with the church's bishops gathered from across the Roman world, formally settled this question. Continuing to teach a Oneness position after Nicaea is knowingly rejecting the church's historic consensus.",
        choices: [
          { key: "A", text: "A council vote settles what a particular institution will teach going forward, it doesn't retroactively settle what the biblical text itself says, and the pre-Nicene period Nicaea was responding to was genuinely unsettled and varied, Justin Martyr's subordinationist Logos theology, Origen's eternal generation with real rank differences, and modalist-leaning teachers were all circulating without one clean, unbroken 'orthodox' line running straight back to the apostles; treating a fourth-century political and theological settlement as automatically decisive for first-century exegesis skips the actual textual question.", correct: true, rubricNote: "Correct. Distinguishes 'what a council decided to teach' from 'what the text actually says,' and notes the genuine diversity of the pre-Nicene period." },
          { key: "B", text: "Nicaea was a purely political event with no theological content.", correct: false, rubricNote: "Overstated, real theological argument happened there, don't flatten it to pure politics." },
          { key: "C", text: "Nicaea actually agrees with the Oneness position.", correct: false, rubricNote: "Historically inaccurate, the Nicene Creed's language was specifically crafted against modalist and subordinationist readings both, don't misstate the historical record." },
          { key: "D", text: "Church councils are always right by definition.", correct: false, rubricNote: "Undermines your own position entirely, since Nicaea explicitly ruled against you if councils are infallible." },
        ],
      },
    },
    {
      slug: "sequential-vs-simultaneous-modes",
      title: "Sequential vs Simultaneous Modes",
      tree: {
        id: "ma-seqvssim-root",
        speaker: "opponent",
        statement: "Sequential or simultaneous, it's still just one person playing different roles depending on the moment. Calling it 'simultaneous' doesn't change the fact that you deny real, eternal distinction of persons.",
        choices: [
          { key: "A", text: "The distinction matters because it changes what actually happens at scenes like Jesus' baptism, where a voice from heaven, a dove descending, and a man standing in the water are all present at the same moment, not sequentially; simultaneous indwelling explains this as one being manifesting in more than one perceivable form at once (the incarnate body plus the non-bodily Spirit and voice), while sequential modalism cannot explain simultaneity without resorting to illusion, that structural difference is exactly what lets Oneness theology handle texts modalism's ancient form couldn't.", correct: true, rubricNote: "Correct. Ground the abstract distinction in a concrete text (the baptism scene) that sequential modalism genuinely cannot explain without special pleading." },
          { key: "B", text: "There's no real difference, the accusation is basically fair.", correct: false, rubricNote: "Concedes the whole point of this topic, don't hand this over." },
          { key: "C", text: "Persons and modes are just synonyms, so this whole distinction is meaningless wordplay.", correct: false, rubricNote: "Erases a real, substantive theological distinction rather than explaining it." },
          { key: "D", text: "I can't really explain how this is different from modalism.", correct: false, rubricNote: "The baptism-scene example gives a concrete, explainable difference, use it." },
        ],
      },
    },
    {
      slug: "tertullian-against-praxeas",
      title: "Tertullian Against Praxeas",
      tree: {
        id: "ma-tertullianpraxeas-root",
        speaker: "opponent",
        statement: "Tertullian wrote an entire treatise, Against Praxeas, specifically refuting a modalist-leaning teacher around 200 AD. That means the church was actively rejecting your view within living memory of the apostolic era, not centuries later.",
        choices: [
          { key: "A", text: "Against Praxeas is genuinely useful evidence, but for a different point than intended: it proves teaching resembling Oneness (or its precursor) was present and being actively debated as early as 200 AD, well within the second century, which cuts against the claim that this is some late medieval or modern invention; Tertullian's own vocabulary in that treatise, 'persona,' originally meant a legal or theatrical role or mask, not a modern 'distinct center of consciousness,' so even his own polemical terms don't map cleanly onto later fully-developed Nicene Trinitarianism, the fight in 200 AD wasn't the same fight as 325 AD.", correct: true, rubricNote: "Correct. Turns the citation around, it actually proves early presence of the view, and flags that Tertullian's own terminology predates and differs from later Nicene categories." },
          { key: "B", text: "Tertullian never wrote about Praxeas, this is a fabricated text.", correct: false, rubricNote: "A well-attested, extant work, denying its existence will be immediately disproven." },
          { key: "C", text: "Praxeas and Sabellius are definitely the exact same person and teaching.", correct: false, rubricNote: "Historically uncertain and unnecessary to claim, stick to what the text itself shows." },
          { key: "D", text: "This proves the early church always taught the Trinity.", correct: false, rubricNote: "Overclaims, Against Praxeas shows a live controversy, not a settled unanimous consensus reaching back to the apostles." },
        ],
      },
    },
    {
      slug: "baptism-of-jesus-modalism",
      title: "The Baptism of Jesus Problem",
      tree: {
        id: "ma-baptismmodalism-root",
        speaker: "opponent",
        statement: "At Jesus' baptism the Father speaks, the Son stands in the water, the Spirit descends, three simultaneous, spatially distinct presences. That's not one person switching masks, that's three real, distinct persons interacting, exactly what the Trinity says and modalism can't explain.",
        choices: [
          { key: "A", text: "The incarnate body in the water is the localized human manifestation of the Son, while the voice and the Spirit-form are simultaneous non-bodily manifestations of the same one Spirit that fills that body, God is not spatially bound the way the incarnate flesh is, so one being manifesting in more than one perceivable form at once is coherent for a Spirit-being in a way it wouldn't be for a body; this reads the scene as one being's multi-form self-presentation, not three eternally distinct persons, and it's precisely the kind of scene sequential modalism (Sabellius' actual teaching) couldn't handle, which is why the simultaneous-indwelling model matters.", correct: true, rubricNote: "Correct. This is the same answer used against the Trinitarian opponent on this exact topic, consistency across opponents is a good sign your framework actually holds together." },
          { key: "B", text: "The baptism scene was a shared hallucination, not a real event.", correct: false, rubricNote: "Undermines the reliability of the text you're relying on elsewhere, avoid denying the narrative." },
          { key: "C", text: "The voice and the dove were just symbols with no real presence at all.", correct: false, rubricNote: "Underreads the text's plain description of real, perceived events." },
          { key: "D", text: "This scene proves three persons and I can't explain it otherwise.", correct: false, rubricNote: "The simultaneous, non-spatially-bound manifestation answer explains it, don't concede." },
        ],
      },
    },
    {
      slug: "personhood-language",
      title: "Personhood Language in Scripture",
      tree: {
        id: "ma-personhood-root",
        speaker: "opponent",
        statement: "The Bible uses 'I,' 'you,' 'he,' and 'my Father' between Jesus and God constantly, real personal pronouns marking real, distinct persons in conversation with each other. That's not compatible with one person wearing different masks.",
        choices: [
          { key: "A", text: "Personal pronouns and 'my Father' language flow from the genuine human nature of the incarnate Son (Hebrews 4:15's real human experience) addressing and depending on the fullness of deity that indwells Him (Colossians 2:9, John 14:10, 'the Father that dwelleth in me'), one person, two natures, with the human side genuinely relating to the divine side that fills it, which is exactly the same structure that explains Gethsemane's prayer and every other instance of Jesus addressing 'the Father,' not evidence of two separate eternal persons.", correct: true, rubricNote: "Correct. The two-natures framework (human nature addressing indwelling deity) is the consistent answer across every 'personal address' text, this is the single most reusable answer against this whole opponent." },
          { key: "B", text: "Jesus never actually used personal pronouns about the Father.", correct: false, rubricNote: "Easily disproven by reading any Gospel, don't deny plain textual features." },
          { key: "C", text: "Jesus was just human, with no deity present at all, so of course He'd address God as separate.", correct: false, rubricNote: "Denies full deity in Christ, breaking Lane 2, don't overcorrect into a denial of Jesus' deity." },
          { key: "D", text: "This is the strongest objection and I have no real answer.", correct: false, rubricNote: "The two-natures framework answers this directly and consistently, don't concede the strongest-sounding objection just because it's common." },
        ],
      },
    },
  ],
};
