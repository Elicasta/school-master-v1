import { DebateOpponent } from "@/types";

export const churchHistoryChallenger: DebateOpponent = {
  type: "church-history-challenger",
  label: "Church History Challenger",
  description: "Argues from the early creeds and councils that Trinitarianism is the historic, continuous, unbroken position of the church.",
  topics: [
    {
      slug: "apostles-creed",
      title: "The Apostles' Creed",
      tree: {
        id: "chc-apostlescreed-root",
        speaker: "opponent",
        statement: "The Apostles' Creed, tracing to the earliest post-apostolic era, confesses belief in Father, Son, and Holy Spirit in a three-part structure. That's the church's earliest summary of the faith, and it's already implicitly Trinitarian.",
        choices: [
          { key: "A", text: "The Apostles' Creed's threefold structure (I believe in the Father... I believe in the Son... I believe in the Holy Spirit) names three activities of the one God exactly the way Matthew 28:19's baptismal formula does, it doesn't use the later technical vocabulary of 'one substance, three co-equal persons' at all, that precision is a fourth and fifth-century development (Nicaea 325, Constantinople 381); an early creed confessing Father, Son, and Spirit is fully consistent with Oneness theology's own confession of the same three, the question is what relationship those three have to each other, not whether all three are named.", correct: true, rubricNote: "Correct. Distinguishes 'names three' from 'defines them as three co-equal persons in one substance,' the creed itself doesn't make the second, more technical claim." },
          { key: "B", text: "The Apostles' Creed doesn't mention the Son or Spirit at all.", correct: false, rubricNote: "Factually wrong, easily checked and disproven." },
          { key: "C", text: "The Apostles' Creed was written by the twelve apostles personally.", correct: false, rubricNote: "Historically inaccurate tradition, the creed developed over the second through eighth centuries, don't overclaim its origin." },
          { key: "D", text: "This creed proves the Trinity was the original apostolic teaching.", correct: false, rubricNote: "Overreads a simple threefold naming as full Nicene technical content it doesn't contain." },
        ],
      },
    },
    {
      slug: "council-of-nicaea-325",
      title: "Council of Nicaea 325",
      tree: {
        id: "chc-nicaea325-root",
        speaker: "opponent",
        statement: "Nicaea in 325 AD gathered bishops from across the Christian world and produced the first formal, ecumenical statement on Christ's relationship to the Father: homoousios, same substance. That's the church speaking with one voice.",
        choices: [
          { key: "A", text: "Nicaea's primary target was Arianism, the view that the Son was a created being, not modalism, and 'homoousios' (same substance) was actually a term some at the time worried sounded too modalist, since it could be read as saying Father and Son are so united in substance they're barely distinguishable; Nicaea settled the question of the Son's full, uncreated deity, which Oneness theology also affirms (Lane 2, Lane 6), the later, separate development of exactly how many 'persons' share that one substance came at Constantinople in 381, and even then, 'persona' was still a developing technical term, not a settled modern concept.", correct: true, rubricNote: "Correct. Nicaea's actual target was Arianism, not modalism, and the specific 'three co-equal persons' formulation came later at Constantinople, this is an important historical precision most people miss." },
          { key: "B", text: "Nicaea was unanimous with zero dissent or controversy.", correct: false, rubricNote: "Historically false, the vote and its aftermath were genuinely contested for decades, don't overstate consensus." },
          { key: "C", text: "Nicaea has no relevance to this discussion at all.", correct: false, rubricNote: "It's directly relevant, engage its actual content rather than dismissing it." },
          { key: "D", text: "Nicaea definitively condemned the Oneness position by name.", correct: false, rubricNote: "Nicaea's primary target was Arianism, don't misstate what the council was actually responding to." },
        ],
      },
    },
    {
      slug: "council-of-constantinople-381",
      title: "Council of Constantinople 381",
      tree: {
        id: "chc-constantinople381-root",
        speaker: "opponent",
        statement: "Constantinople in 381 completed the Trinity doctrine by affirming the Holy Spirit's full, co-equal deity alongside Father and Son, three distinct, co-equal, co-eternal persons. This is the fully formed doctrine, settled by the end of the fourth century.",
        choices: [
          { key: "A", text: "This is honestly the strongest historical fact this opponent has: by 381, fifty-six years after Nicaea, the fully three-person model was formally in place, which does show real doctrinal development happening over multiple generations, not a single, unchanging apostolic formula; the actual question for a Oneness believer isn't whether 381 happened, it's whether that fourth-century formalization got the New Testament's own claims right, and Lanes 2, 4, and 8 (Jesus is God revealed, the Father in Christ, the Spirit as God's own Spirit) argue directly from the text that it didn't need three co-equal persons to account for what Scripture actually says.", correct: true, rubricNote: "Correct. Doesn't dodge the historical fact (real, honest concession that doctrine developed over decades), then redirects to the actual textual question, which is the right move when the historical claim itself is accurate." },
          { key: "B", text: "Constantinople 381 never actually happened.", correct: false, rubricNote: "Well-documented historical event, denying it will destroy your credibility instantly." },
          { key: "C", text: "The Holy Spirit isn't really God at all.", correct: false, rubricNote: "Contradicts Lane 8, the Spirit is the Spirit of the one God, don't deny the Spirit's deity to score a point here." },
          { key: "D", text: "This proves the Trinity is correct since the whole church agreed by 381.", correct: false, rubricNote: "Institutional agreement by a certain date settles what the institution will teach, not what the text itself says, don't concede the deeper point." },
        ],
      },
    },
    {
      slug: "continuous-historic-consensus",
      title: "Continuous Historic Consensus",
      tree: {
        id: "chc-continuousconsensus-root",
        speaker: "opponent",
        statement: "For seventeen centuries, from Nicaea to today, the overwhelming majority of Christians across every tradition, Catholic, Orthodox, Protestant, has confessed the Trinity. Oneness theology is a tiny, recent minority view by comparison.",
        choices: [
          { key: "A", text: "Numerical and historical majority tells you what most institutions chose to teach, it doesn't function as an argument for truth on its own, otherwise you'd have to accept whatever position held majority Christian opinion at any given moment in history as automatically correct, including positions later reformers explicitly broke from; Oneness Pentecostalism's twentieth-century emergence (the 1913-16 'New Issue') is a modern re-articulation and revival movement, not an invention from nothing, drawing on the same New Testament texts (Acts 2:38's baptismal formula, Isaiah 43:11's Savior exclusivity) that existed the entire time, size of following isn't the same question as textual accuracy.", correct: true, rubricNote: "Correct. Separates 'majority opinion' from 'correct interpretation,' and notes the movement draws on ancient texts even though its modern organizational form is recent." },
          { key: "B", text: "Oneness theology has actually always been the majority view throughout history.", correct: false, rubricNote: "Not historically accurate for the post-Nicene period, don't overclaim numerical dominance you can't support." },
          { key: "C", text: "Numbers and history don't matter at all.", correct: false, rubricNote: "Too dismissive of a real point about doctrinal continuity worth taking seriously, even while disagreeing with its conclusion." },
          { key: "D", text: "Since Oneness theology is a minority view, it's probably wrong.", correct: false, rubricNote: "This concedes the argument from popularity, which is a weak standard you don't want to accept as valid." },
        ],
      },
    },
    {
      slug: "chalcedonian-definition",
      title: "Chalcedonian Definition",
      tree: {
        id: "chc-chalcedon-root",
        speaker: "opponent",
        statement: "Chalcedon in 451 defined Christ as one person in two natures, fully God, fully man, without confusion, without change, without division, without separation. This became the universal standard for Christology across virtually all of Christianity.",
        choices: [
          { key: "A", text: "This is actually the point of real, substantial agreement: Oneness Christology already affirms one person, fully God and fully man, which is exactly the two-natures framework used throughout this app to answer prayer, submission, and 'my Father is greater than I' texts (Lanes 3 and 4); Chalcedon's Christological formula, one person, two natures, isn't really in dispute here, the actual disagreement is a separate question, whether that one divine nature shared by Father, Son, and Spirit involves three co-equal persons (Trinity) or one person revealed three ways (Oneness), Chalcedon's language doesn't settle that separate Trinity-vs-Oneness question at all.", correct: true, rubricNote: "Correct. Identifies genuine common ground (one person, two natures Christology) while correctly noting Chalcedon doesn't actually settle the separate question of how many persons share the Godhead." },
          { key: "B", text: "Chalcedon taught Jesus has only one nature, not two.", correct: false, rubricNote: "Historically inaccurate, Chalcedon explicitly affirms two natures against Eutychian monophysitism, don't misstate the council's actual content." },
          { key: "C", text: "Chalcedon has nothing useful to say and should be ignored entirely.", correct: false, rubricNote: "Its one-person-two-natures Christology is actually compatible with and useful for the Oneness framework, don't discard a genuinely helpful formula." },
          { key: "D", text: "Chalcedon proves Oneness theology is wrong.", correct: false, rubricNote: "Chalcedon's specific content (one person, two natures) is actually closer to Oneness Christology than this framing suggests, don't concede more than the council actually says." },
        ],
      },
    },
    {
      slug: "reformers-kept-trinity",
      title: "Reformers Kept the Trinity",
      tree: {
        id: "chc-reformerskept-root",
        speaker: "opponent",
        statement: "The Protestant Reformation, for all its radical departures from Catholic tradition on salvation, authority, and practice, never once questioned the Trinity. Luther, Calvin, Zwingli, all Trinitarian. If sola scriptura-driven reformers found nothing to challenge here, that's strong evidence the doctrine holds up under close scriptural scrutiny.",
        choices: [
          { key: "A", text: "The magisterial Reformers inherited and kept many doctrines they didn't specifically re-examine from scratch, their reforms targeted particular abuses and doctrines they saw as unbiblical additions (indulgences, papal authority, purgatory), not a systematic re-derivation of every prior doctrine from the ground up; it's also worth noting that radical Reformation figures did raise anti-Trinitarian questions in the sixteenth century (early Socinians, Michael Servetus, executed at Calvin's Geneva specifically for questioning the Trinity), showing the mainstream Reformers' silence reflects the immense social and institutional cost of dissent on this specific point at that specific moment, not an absence of biblical difficulty with the doctrine.", correct: true, rubricNote: "Correct. Notes that reform was selective and targeted, not comprehensive re-derivation, and cites Servetus' execution as evidence dissent existed but carried severe consequences, undercutting the 'they found nothing to challenge' framing." },
          { key: "B", text: "The Reformers actually rejected the Trinity too.", correct: false, rubricNote: "Historically false, the magisterial Reformers were firmly Trinitarian, don't misstate the historical record." },
          { key: "C", text: "Sola scriptura has nothing to do with this question.", correct: false, rubricNote: "It's directly relevant to why they didn't revisit this doctrine specifically, engage the point rather than dismissing it." },
          { key: "D", text: "This is strong evidence the Trinity is correct and I can't answer it.", correct: false, rubricNote: "The Servetus execution and the selective nature of Reformation-era reform both complicate this claim, don't concede." },
        ],
      },
    },
  ],
};
