import { DebateOpponent } from "@/types";

// Practice mode: a fellow Oneness believer probing your explanations for
// precision, not a hostile opponent. "Opponent" statements here are honest
// questions a new believer or a sharpening peer would actually ask. The
// correct choice is the most precise, complete answer, not merely "not wrong."
export const apostolicOneness: DebateOpponent = {
  type: "apostolic-oneness",
  label: "Apostolic Oneness",
  description: "Practice mode: a fellow believer probes your explanations for precision and completeness, sharpening rather than correcting.",
  topics: [
    {
      slug: "explaining-shema-to-a-seeker",
      title: "Explaining the Shema to a Seeker",
      tree: {
        id: "ao-shemaseeker-root",
        speaker: "opponent",
        statement: "A seeker asks you: 'If Jesus is God, isn't that two gods, the Father and Jesus?' Give your first-response explanation.",
        choices: [
          { key: "A", text: "There's only one God, the Shema settles that (Deuteronomy 6:4, Isaiah 45:5), Jesus isn't a second God alongside the Father, He's that one God revealed in human flesh (John 14:9, Colossians 2:9), so calling Jesus God doesn't add a second being, it identifies who was doing the revealing.", correct: true, rubricNote: "Precise and complete: leads with the monotheism claim, then explains revelation rather than addition, in seeker-friendly language." },
          { key: "B", text: "It's a mystery, we just believe it by faith.", correct: false, rubricNote: "True in a limited sense but skips the actual explanation available, a seeker deserves the real answer, not a deflection." },
          { key: "C", text: "Jesus is God's Son, so He's a separate but lesser divine being under the Father.", correct: false, rubricNote: "This drifts into a Murray-style two-beings answer, not the Oneness position, watch this exact slip." },
          { key: "D", text: "The Trinity explains this better, you should look into that instead.", correct: false, rubricNote: "Undercuts your own position entirely, don't concede ground you don't need to." },
        ],
      },
    },
    {
      slug: "answering-isnt-that-modalism",
      title: "Answering 'Isn't That Modalism?' Precisely",
      tree: {
        id: "ao-isntmodalism-root",
        speaker: "opponent",
        statement: "Someone at a Bible study says, 'What you're describing sounds exactly like modalism, which the church condemned as heresy.' How do you respond precisely, not just defensively?",
        choices: [
          { key: "A", text: "Sabellian modalism, as ancient sources describe it, taught sequential modes, the Father-mode ending before the Son-mode begins, like changing masks one at a time; what I'm describing is simultaneous indwelling, the Father's Spirit fully filling the incarnate Son at the same time, which is why scenes like Jesus' baptism (Father's voice, Son in the water, Spirit descending, all at once) make sense in this view but couldn't in classic sequential modalism.", correct: true, rubricNote: "Precise: names the actual technical difference (sequential vs simultaneous) instead of just asserting 'we're not that.'" },
          { key: "B", text: "That's an unfair label, we're nothing like that at all.", correct: false, rubricNote: "Too vague to be persuasive, doesn't show you understand what the actual accusation is claiming." },
          { key: "C", text: "Modalism isn't actually heresy, the church was wrong to condemn it.", correct: false, rubricNote: "Concedes the identification instead of showing the real distinction, and picks an unnecessary fight over Nicaea's authority." },
          { key: "D", text: "I'm not familiar enough with modalism to answer that.", correct: false, rubricNote: "This is exactly the gap this practice topic exists to close, know the sequential/simultaneous distinction cold." },
        ],
      },
    },
    {
      slug: "explaining-two-natures-simply",
      title: "Explaining Two Natures Without Confusing People",
      tree: {
        id: "ao-twonaturessimple-root",
        speaker: "opponent",
        statement: "A new believer asks: 'If Jesus is fully God, why did He pray to the Father? Wouldn't that mean He's praying to Himself?' Explain it in one clear, simple sentence they'll actually remember.",
        choices: [
          { key: "A", text: "Jesus has a real human side and a fully divine side in one person, and His human side, the part of Him that gets tired, hungry, and afraid, prayed to the fullness of God living inside Him, the same way your own will submits to your own convictions, just at the highest possible level.", correct: true, rubricNote: "Precise and memorable: uses a relatable human analogy (will submitting to conviction) to make two-natures concrete rather than abstract." },
          { key: "B", text: "It's complicated theology, don't worry about it for now.", correct: false, rubricNote: "This is exactly the question that will come up again, and dodging it now makes it harder to answer later." },
          { key: "C", text: "Jesus wasn't really praying, He was just modeling prayer for us to imitate.", correct: false, rubricNote: "Makes Jesus' anguish and dependence performative, theologically weak and it will feel evasive to a thoughtful listener." },
          { key: "D", text: "Jesus is only human, the God part came later.", correct: false, rubricNote: "This is adoptionism, not Oneness theology, and it breaks Lane 2's full-deity claim from the start." },
        ],
      },
    },
    {
      slug: "explaining-acts-238-simply",
      title: "Explaining Acts 2:38 Baptism Simply",
      tree: {
        id: "ao-acts238simple-root",
        speaker: "opponent",
        statement: "Someone raised in a church that baptizes 'Father, Son, and Holy Spirit' asks why you baptize in Jesus' name instead. Give the short, respectful version.",
        choices: [
          { key: "A", text: "Matthew 28:19 says baptize in the name, singular, of the Father, Son, and Holy Spirit, and every time we actually see the apostles baptize in the book of Acts, four separate times in four different places, they use the specific name Jesus, which tells us Jesus is the name behind all three titles, not a rejection of Matthew 28:19 but the apostles' own application of it.", correct: true, rubricNote: "Precise: leads with the singular 'name' grammar, then grounds it in the consistent apostolic pattern, respectful and textual, not combative." },
          { key: "B", text: "The other way is just wrong and those churches aren't really baptizing anyone.", correct: false, rubricNote: "Unnecessarily harsh opening for someone asking a genuine question, will shut down the conversation instead of opening it." },
          { key: "C", text: "Both formulas are equally valid, it doesn't really matter which one you use.", correct: false, rubricNote: "Doesn't actually answer why you personally hold your position, and undersells your own textual case." },
          { key: "D", text: "It's just our tradition, that's how we've always done it.", correct: false, rubricNote: "Skips the actual textual reasoning (Acts 2:38, 8:16, 10:48, 19:5) that's available and persuasive." },
        ],
      },
    },
    {
      slug: "explaining-holy-ghost-infilling",
      title: "Explaining the Holy Ghost Infilling",
      tree: {
        id: "ao-hginfilling-root",
        speaker: "opponent",
        statement: "A visitor asks what speaking in tongues has to do with being filled with the Holy Ghost, and whether it's required. Give a clear, honest answer.",
        choices: [
          { key: "A", text: "In Acts 2:4, the initial evidence of being filled with the Holy Ghost was speaking in tongues, and that pattern repeats in Acts 10:44-46 and Acts 19:6, so we teach it as the biblical sign that the infilling has happened, not a separate, optional extra experience layered on top of salvation.", correct: true, rubricNote: "Precise and honest: states the position clearly, grounds it in the specific repeated Acts pattern, doesn't hedge or oversell." },
          { key: "B", text: "Tongues don't really matter, it's just an emotional experience some people have.", correct: false, rubricNote: "Undersells the actual biblical pattern this doctrine is built on." },
          { key: "C", text: "If you haven't spoken in tongues, you're definitely not saved.", correct: false, rubricNote: "Overstates and conflates two distinct questions, salvation and the Spirit's infilling evidence, in a way that isn't textually careful." },
          { key: "D", text: "It's a complicated doctrine, ask the pastor about it instead.", correct: false, rubricNote: "A visitor asking a genuine question deserves a real answer in the moment, not a deferral." },
        ],
      },
    },
    {
      slug: "godhead-in-one-sentence",
      title: "Explaining the Godhead in One Sentence",
      tree: {
        id: "ao-godheadonesentence-root",
        speaker: "opponent",
        statement: "You have thirty seconds before someone changes the subject. Give your best one-sentence summary of the Oneness view of God.",
        choices: [
          { key: "A", text: "There's one God, not three persons, who reveals Himself as Father over creation, as Son in the person of Jesus for our redemption, and as Holy Ghost within us for our regeneration, one being, three revelations of who He is.", correct: true, rubricNote: "Precise and complete in one breath: names the number (one), rejects the alternative (not three persons), and gives the actual three-role structure clearly." },
          { key: "B", text: "God is complicated and hard to explain in one sentence.", correct: false, rubricNote: "This is exactly the moment this skill matters, a real, clear sentence is available, use it." },
          { key: "C", text: "God the Father is the only real person, Jesus and the Spirit aren't really Him.", correct: false, rubricNote: "This undersells full deity in Christ and the Spirit, breaking Lanes 2 and 8, watch this common oversimplification." },
          { key: "D", text: "It's basically the same as the Trinity, just different words.", correct: false, rubricNote: "Erases a real, meaningful distinction (one person vs three persons) that matters to the position you actually hold." },
        ],
      },
    },
  ],
};
