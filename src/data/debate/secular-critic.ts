import { DebateOpponent } from "@/types";

export const secularCritic: DebateOpponent = {
  type: "secular-critic",
  label: "Secular Critic",
  description: "Argues from historical-critical method, textual variants, comparative religion, and philosophical objections to miracles.",
  topics: [
    {
      slug: "late-authorship",
      title: "Late Authorship Claims",
      tree: {
        id: "sc-lateauth-root",
        speaker: "opponent",
        statement: "The Gospels were written decades after Jesus died, by anonymous authors, based on oral tradition that had plenty of time to distort. That's not reliable history, that's legend formation.",
        choices: [
          { key: "A", text: "Even on the latest mainstream critical dating (Mark ~65-70 AD, the others through the 80s-90s), that's within living memory, not multiple generations, and the pre-Pauline creed in 1 Corinthians 15:3-7 (Paul says he 'received' it, meaning it predates his own letter) pushes the core resurrection claim back to within a few years of the event itself, far too early for legendary distortion by the standards used for any other ancient historical source.", correct: true, rubricNote: "Correct. The 1 Corinthians 15 creed's early dating is the strongest single fact here, it undercuts the 'decades of oral drift' framing directly." },
          { key: "B", text: "The Gospels were written the same year Jesus died.", correct: false, rubricNote: "Not defensible against mainstream dating, don't overstate on a checkable historical claim." },
          { key: "C", text: "Anonymous authorship doesn't matter for historical reliability at all.", correct: false, rubricNote: "Too dismissive, authorship does matter for source evaluation, better to engage the dating question directly." },
          { key: "D", text: "Oral tradition in that culture was unreliable and this is a real problem.", correct: false, rubricNote: "Concedes ground unnecessarily, ancient Near Eastern oral transmission of memorized material was often more disciplined than this assumes." },
        ],
      },
    },
    {
      slug: "textual-variants",
      title: "Textual Variants",
      tree: {
        id: "sc-variants-root",
        speaker: "opponent",
        statement: "There are hundreds of thousands of textual variants across New Testament manuscripts. How can you claim to know what the originals actually said?",
        choices: [
          { key: "A", text: "The raw variant count is high because we have an enormous number of manuscripts (thousands, versus a handful for most ancient texts), and the overwhelming majority of variants are spelling differences, word order, or obvious copying slips that don't touch meaning; textual critics can reconstruct the vast majority of the text with high confidence precisely because so many independent copies exist to cross-check against each other, more manuscripts means more certainty, not less.", correct: true, rubricNote: "Correct. Reframes 'more variants' as a function of 'more manuscripts,' which is actually a strength for reconstruction, not a weakness." },
          { key: "B", text: "There are no real variants, this is an exaggeration.", correct: false, rubricNote: "False, variants genuinely exist in large numbers, denying this will be checked and lose credibility." },
          { key: "C", text: "Textual criticism is a made-up field with no real standards.", correct: false, rubricNote: "Dismisses a legitimate academic discipline you actually want to lean on for your own case." },
          { key: "D", text: "It doesn't matter what the originals said.", correct: false, rubricNote: "Undermines the entire basis for taking the text seriously as a source." },
        ],
      },
    },
    {
      slug: "resurrection-contradictions",
      title: "Contradictions in Resurrection Accounts",
      tree: {
        id: "sc-rescontra-root",
        speaker: "opponent",
        statement: "The four Gospels disagree on basic details: how many women went to the tomb, how many angels were there, who saw Jesus first. Contradictory testimony isn't reliable testimony.",
        choices: [
          { key: "A", text: "Differing details across independent accounts of the same event is actually a standard marker of authentic, uncoordinated eyewitness testimony, courts and historians alike are more suspicious of accounts that agree on every detail, since that suggests collusion; the core claims agree completely across all four (empty tomb, women as first witnesses, which is itself striking since women's testimony carried little legal weight in that culture, and post-resurrection appearances), with variation only in secondary, peripheral details like exact headcounts.", correct: true, rubricNote: "Correct. Uses the 'too-consistent testimony is suspicious' principle plus the striking detail of women as first witnesses (an unlikely detail to invent in that culture)." },
          { key: "B", text: "The Gospels don't actually differ on any details at all.", correct: false, rubricNote: "Factually wrong and checkable, don't claim false harmony." },
          { key: "C", text: "The differences are all later scribal insertions.", correct: false, rubricNote: "No manuscript basis for this claim, avoid unfounded textual-criticism assertions." },
          { key: "D", text: "It doesn't matter if they contradict each other.", correct: false, rubricNote: "Concedes the objection's premise instead of reframing it." },
        ],
      },
    },
    {
      slug: "pagan-parallels",
      title: "Copying from Pagan Myths",
      tree: {
        id: "sc-paganparallels-root",
        speaker: "opponent",
        statement: "Dying-and-rising god myths (Osiris, Dionysus, Mithras) predate Christianity. The resurrection story is just another version of a common ancient template, borrowed and repackaged.",
        choices: [
          { key: "A", text: "Most of the specific parallel claims (Mithras' resurrection, in particular) come from sources written AFTER the New Testament, making the New Testament the earlier text if any direct borrowing happened at all, not the borrower; and the actual pattern-matches are far looser than popularized 'copycat' claims suggest; Osiris, for instance, becomes a god of the dead ruling the underworld, he doesn't return to bodily life on earth, which is a categorically different claim than the Gospels make about a physical, empty-tomb resurrection witnessed by named individuals in a specific historical setting.", correct: true, rubricNote: "Correct. Points out the chronology problem (later sources) and the real difference in content (underworld rule vs. bodily resurrection), both are checkable and devastating to the popular 'copycat thesis.'" },
          { key: "B", text: "No other ancient culture ever had any death-and-return myths.", correct: false, rubricNote: "False, such myths do exist, the answer is about dating and specifics, not denying their existence." },
          { key: "C", text: "Comparative mythology is an illegitimate field of study.", correct: false, rubricNote: "Dismisses real scholarship rather than engaging its actual, more modest findings." },
          { key: "D", text: "This is a serious problem for the resurrection's uniqueness.", correct: false, rubricNote: "The dating and content differences directly answer this, don't concede." },
        ],
      },
    },
    {
      slug: "historical-jesus-vs-christ-of-faith",
      title: "Historical Jesus vs Christ of Faith",
      tree: {
        id: "sc-histjesus-root",
        speaker: "opponent",
        statement: "There's a real, mostly Jewish apocalyptic preacher named Jesus buried under centuries of theological mythologizing. The 'Christ of faith' the church worships is a later invention layered onto a much smaller historical figure.",
        choices: [
          { key: "A", text: "This framework assumes a sharp separation between 'Jesus movement' and 'high Christology' developed only gradually and late, but Paul's letters, our earliest Christian documents (mid-first century, within 20-25 years of the crucifixion), already contain fully developed high-Christological material, including the pre-Pauline hymn in Philippians 2:6-11 and the 'Lord' language applying Isaiah 45:23's YHWH-only confession text to Jesus, meaning the 'high' view wasn't a late layer added over decades, it's present at the earliest textual layer we have access to.", correct: true, rubricNote: "Correct. Uses the dating of Paul's letters and the pre-Pauline material within them (which is even earlier than Paul's own writing) to collapse the 'gradual mythologizing' timeline." },
          { key: "B", text: "Jesus never existed as a historical figure at all.", correct: false, rubricNote: "This is a fringe position even among skeptical historians, don't adopt a weaker claim than the one being made against you." },
          { key: "C", text: "The Gospels are 100% unmediated eyewitness transcripts with zero theological framing.", correct: false, rubricNote: "Overclaims in a way that's easily challenged, all ancient biography involves selection and framing." },
          { key: "D", text: "It doesn't matter whether there's a gap between the historical figure and later belief.", correct: false, rubricNote: "Dodges rather than engages the actual dating evidence available." },
        ],
      },
    },
    {
      slug: "miracles-impossible",
      title: "Miracles Are Impossible",
      tree: {
        id: "sc-miracles-root",
        speaker: "opponent",
        statement: "By definition, a miracle violates the laws of nature, which are established by the uniform, repeated experience of all humanity. No amount of ancient testimony can outweigh that uniform experience, per Hume's classic argument.",
        choices: [
          { key: "A", text: "Hume's argument is circular: it defines 'uniform experience' in a way that already assumes no miracle has ever happened, then uses that assumed uniformity to rule out testimony to the contrary, which begs the question rather than proving it; if a God who created the laws of nature exists, a miracle isn't a violation of those laws so much as an exception introduced by the same authority that set them, whether such a God exists is the actual question at stake, and Hume's argument doesn't settle that question, it just assumes the negative answer from the start.", correct: true, rubricNote: "Correct. Naming Hume's argument as circular (assuming naturalism to rule out the supernatural) is the standard, serious philosophical response, engage the actual structure of the argument." },
          { key: "B", text: "Miracles happen all the time, so this whole objection is silly.", correct: false, rubricNote: "Doesn't engage the philosophical structure of the argument, too dismissive to be persuasive." },
          { key: "C", text: "Science has been proven wrong before, so it can't be trusted here either.", correct: false, rubricNote: "A weak, general anti-science move that undermines your own credibility rather than answering the specific argument." },
          { key: "D", text: "This argument is unanswerable, miracles probably can't be verified.", correct: false, rubricNote: "The circularity critique is a real, respected philosophical response, don't concede prematurely." },
        ],
      },
    },
  ],
};
