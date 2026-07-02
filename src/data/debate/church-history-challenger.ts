import { DebateOpponent } from "@/types";

export const churchHistoryChallenger: DebateOpponent = {
  type: "church-history-challenger",
  label: "Church History Challenger",
  description:
    "Argues from the early creeds and councils that Trinitarianism is the historic, continuous position, and Oneness theology is a modern break from it.",
  topics: [
    {
      slug: "council-of-nicaea-325",
      title: "Council of Nicaea, 325 AD",
      tree: {
        id: "chc-nicaea-root",
        speaker: "opponent",
        statement:
          "In 325 AD, over 300 bishops from across the Roman world gathered at Nicaea and formally affirmed the Son's full, co-eternal deity, 'begotten, not made, being of one substance with the Father.' That's an enormous, geographically diverse consensus, not one faction's opinion.",
        verseRefs: [],
        choices: [
          {
            key: "A",
            text: "Nicaea's core affirmation, that the Son is fully, truly, uncreated God, not a created being, is something Oneness theology fully agrees with too (Lane 2, Lane 6), the council's actual target was Arianism specifically, the claim that the Son was God's first creation; Nicaea in 325 did not yet settle the fuller three-co-equal-persons model or the Spirit's status, that development continued for another half-century until Constantinople in 381, so citing Nicaea 325 as having already established the full Trinity formula overstates what that specific council actually decided.",
            correct: true,
            rubricNote: "Correct. Distinguishes what Nicaea 325 actually affirmed (full deity of the Son, anti-Arian) from the later, fuller formulation, while noting genuine agreement on the anti-Arian point.",
          },
          {
            key: "B",
            text: "Nicaea didn't really happen or wasn't a real gathering of bishops.",
            correct: false,
            rubricNote: "False, well-documented historical event, don't dispute its occurrence, engage what it actually decided.",
          },
          {
            key: "C",
            text: "300 bishops agreeing means nothing theologically.",
            correct: false,
            rubricNote: "Too dismissive of a genuinely significant historical moment, weakens your credibility, the more precise answer is about scope, not dismissing the event.",
          },
          {
            key: "D",
            text: "This settles the full Trinity doctrine as apostolic and original.",
            correct: false,
            rubricNote: "Nicaea 325 didn't yet include the full three-co-equal-persons formulation, that came at Constantinople 381, don't concede more than the historical record shows.",
          },
        ],
      },
    },
    {
      slug: "council-of-constantinople-381",
      title: "Council of Constantinople, 381 AD",
      tree: {
        id: "chc-constantinople-root",
        speaker: "opponent",
        statement:
          "Constantinople in 381 completed the picture, formally affirming the Holy Spirit's full deity alongside the Father and Son. By the end of the 4th century, the whole church, across the empire, had settled on the Trinity. That's the historic Christian position, full stop.",
        verseRefs: [],
        choices: [
          {
            key: "A",
            text: "What Constantinople 381 shows is that it took the institutional church roughly 350 years after the apostles to formally settle this specific three-co-equal-persons vocabulary, which is itself worth sitting with: if the doctrine were as immediately, obviously apostolic as claimed, it's a fair question why it needed two major ecumenical councils across half a century to formalize, rather than being uncontested from the start; a council vote establishes what became the majority institutional position from that point forward, under an empire that was now actively enforcing doctrinal uniformity through imperial authority, it doesn't by itself establish what the apostles themselves taught in the first century, that question has to be settled by the New Testament text.",
            correct: true,
            rubricNote: "Correct. Notes the long gap and the imperial-enforcement context without denying the council happened, and redirects final authority to the NT text itself.",
          },
          {
            key: "B",
            text: "Constantinople 381 has nothing to do with the Trinity doctrine.",
            correct: false,
            rubricNote: "Misrepresents a well-documented council's actual content, don't deny what it decided.",
          },
          {
            key: "C",
            text: "The whole church was unanimous with zero dissent by this point.",
            correct: false,
            rubricNote: "Overstated, there was real, ongoing dissent (various subordinationist and other minority positions) well after 381, don't overclaim total uniformity.",
          },
          {
            key: "D",
            text: "This proves the Trinity was the apostles' own original teaching.",
            correct: false,
            rubricNote: "A 4th-century council settling institutional doctrine isn't the same claim as the apostles themselves teaching it in the 1st century, don't collapse the two.",
          },
        ],
      },
    },
    {
      slug: "apostles-creed",
      title: "The Apostles' Creed",
      tree: {
        id: "chc-apostlescreed-root",
        speaker: "opponent",
        statement:
          "The Apostles' Creed, one of Christianity's oldest and most basic confessions, structures itself in three sections, Father, Son, Holy Spirit, mirroring Trinitarian structure from very early on, well before Nicaea.",
        verseRefs: [],
        choices: [
          {
            key: "A",
            text: "The Apostles' Creed's threefold structure directly reflects Matthew 28:19's threefold baptismal language ('the name of the Father, and of the Son, and of the Holy Ghost'), which Oneness theology already fully affirms and confesses (Lane 7), the creed's structure by itself doesn't specify HOW the Father, Son, and Spirit relate ontologically, whether as three eternally distinct persons or as three titles/manifestations of the one God revealed in flesh, the creed's actual wording (which doesn't use terms like 'persons' or 'substance,' those come later, at Nicaea and after) is compatible with confessing Father, Son, and Spirit without settling the later technical vocabulary either way.",
            correct: true,
            rubricNote: "Correct. Points out the creed's threefold structure mirrors Matthew 28:19 (which Oneness affirms) and predates the technical persons/substance vocabulary that would actually settle the dispute.",
          },
          {
            key: "B",
            text: "The Apostles' Creed doesn't mention the Father, Son, and Holy Spirit at all.",
            correct: false,
            rubricNote: "Factually wrong, don't deny the creed's basic, well-known content.",
          },
          {
            key: "C",
            text: "The Apostles' Creed was actually written by the twelve apostles themselves.",
            correct: false,
            rubricNote: "Historically inaccurate, the creed developed over the 2nd-8th centuries despite its traditional name, don't overclaim its authorship.",
          },
          {
            key: "D",
            text: "This structure proves three distinct eternal persons, no way around it.",
            correct: false,
            rubricNote: "The creed's structure mirrors Matthew 28:19's baptismal formula, which doesn't by itself specify person-versus-manifestation, don't concede more than the text shows.",
          },
        ],
      },
    },
    {
      slug: "ante-nicene-fathers-unanimity-claim",
      title: "Ante-Nicene Fathers Unanimity Claim",
      tree: {
        id: "chc-antenicene-root",
        speaker: "opponent",
        statement:
          "Every significant Christian writer before Nicaea, Ignatius, Justin Martyr, Irenaeus, Tertullian, Origen, and more, affirms some form of plurality within the Godhead. There's no early, credible voice teaching what you're teaching, it's a unanimous pre-Nicene witness against Oneness theology.",
        verseRefs: [],
        choices: [
          {
            key: "A",
            text: "The actual pre-Nicene record is far less unanimous than that framing suggests: Ignatius (d. c. 108) directly calls Jesus 'our God' with strong identification language and no developed persons-vocabulary at all; Justin Martyr's Logos theology describes the Word as 'other in number,' language so subordinationist that later, fuller Nicene theology itself had to correct and move past it; and Tertullian wrote an entire treatise specifically because a real, contemporary modalist-adjacent teacher (Praxeas) had real support worth refuting around 200 AD, that's not unanimity, that's evidence of a live, ongoing, unsettled debate across the pre-Nicene period, with real diversity of view, not a single unbroken line.",
            correct: true,
            rubricNote: "Correct. Uses the Facts Library's own church father entries (Ignatius, Justin Martyr, Tertullian) to show real pre-Nicene diversity, not manufactured unanimity.",
          },
          {
            key: "B",
            text: "None of those church fathers actually existed or wrote anything.",
            correct: false,
            rubricNote: "False and easily disproven, don't deny well-documented historical figures and texts.",
          },
          {
            key: "C",
            text: "Ignatius, Justin, and Tertullian all taught pure Oneness theology explicitly and clearly.",
            correct: false,
            rubricNote: "Overclaims, none of them use fully-developed Oneness vocabulary either, the honest point is diversity and lack of settled consensus, not that they secretly agreed with you.",
          },
          {
            key: "D",
            text: "This is an unanswerable, unanimous pre-Nicene witness against Oneness theology.",
            correct: false,
            rubricNote: "The actual variety among these specific writers (Ignatius' pre-technical language, Justin's subordinationism, Tertullian's polemic against a real opposing teacher) answers this directly, don't concede unanimity that isn't there.",
          },
        ],
      },
    },
    {
      slug: "continuous-unbroken-tradition",
      title: "Continuous Unbroken Tradition",
      tree: {
        id: "chc-continuous-root",
        speaker: "opponent",
        statement:
          "Trinitarian doctrine has an unbroken chain of transmission from the apostles through the councils to today, roughly 2000 years of continuous teaching. Oneness Pentecostalism only emerges as an organized movement around 1913-1916. A 2000-year continuous position should carry more weight than a 100-year-old one.",
        verseRefs: [],
        choices: [
          {
            key: "A",
            text: "The 1913-1916 date marks when Oneness teaching re-emerged as an organized, named movement within modern Pentecostalism specifically, not when the underlying theological claims (strict monotheism, Jesus as God's own self-revelation, baptism in Jesus' name) first appeared, those claims are argued directly from Old and New Testament texts that are roughly 2000-3500 years old themselves (Lanes 1, 2, 5, 7); institutional continuity of an organization is a different claim than textual and exegetical continuity with the apostolic writings, and 'how long has this specific denomination existed' doesn't settle 'what did the apostles' own writings actually teach,' which is the real question underneath the debate.",
            correct: true,
            rubricNote: "Correct. Separates 'age of the modern organized movement' from 'age of the underlying exegetical claims,' which is the real distinction that defeats a pure continuity-of-institution argument.",
          },
          {
            key: "B",
            text: "Oneness theology has actually existed as an organized movement since the 1st century with an unbroken institutional history.",
            correct: false,
            rubricNote: "Overclaims institutional continuity that isn't historically documented, the stronger and more honest answer is about textual/exegetical continuity, not institutional continuity.",
          },
          {
            key: "C",
            text: "How long a position has existed doesn't matter at all.",
            correct: false,
            rubricNote: "Too dismissive, age and continuity are reasonable things to weigh, the better move is reframing what kind of continuity actually matters.",
          },
          {
            key: "D",
            text: "This proves Trinitarianism is correct since it's older as an institution.",
            correct: false,
            rubricNote: "Institutional age isn't the same as textual accuracy, don't concede that a longer unbroken organizational chain settles the exegetical question.",
          },
        ],
      },
    },
    {
      slug: "oneness-as-20th-century-novelty",
      title: "Oneness as a 20th-Century Novelty",
      tree: {
        id: "chc-novelty-root",
        speaker: "opponent",
        statement:
          "If Oneness theology were true, why did it take until the early 1900s for anyone to rediscover it? New doctrines that surface suddenly after 1,900 years of silence should raise real suspicion, that's the classic profile of a novel invention, not a recovered truth.",
        verseRefs: [],
        choices: [
          {
            key: "A",
            text: "The 'sudden novelty' framing doesn't hold up against the specific historical record already on the table in this very conversation: modalist-adjacent teaching (whatever its precise content) was significant enough by 200 AD that Tertullian wrote a full treatise specifically refuting it, meaning the underlying question wasn't first raised in 1913, it was a live controversy within the church's first two centuries, then suppressed rather than definitively refuted by exegesis, once it became institutionally disadvantageous to hold after Nicaea and Constantinople formalized the opposing view with imperial backing; 'rediscovery' after a long period of institutional suppression is a meaningfully different story than 'sudden invention out of nowhere,' and the 1913-1916 Pentecostal reexamination happened specifically because people were reading the Acts baptismal texts (Lane 7) directly and asking why practice didn't match the text.",
            correct: true,
            rubricNote: "Correct. Uses Tertullian's own polemic (already established elsewhere in this debate set) as evidence the underlying question is ancient, not new, reframing 'sudden novelty' as 're-emergence after institutional suppression.'",
          },
          {
            key: "B",
            text: "It didn't take until 1913, Oneness theology has been the dominant view continuously since the apostles.",
            correct: false,
            rubricNote: "Overclaims continuous dominance that isn't historically documented, the more defensible claim is 're-emergence of an old, suppressed question,' not 'unbroken dominant tradition.'",
          },
          {
            key: "C",
            text: "New doctrines are always automatically true regardless of when they appear.",
            correct: false,
            rubricNote: "Doesn't engage the actual, reasonable concern about novelty, dodges rather than answers.",
          },
          {
            key: "D",
            text: "The timing really is suspicious and I don't have a good answer for it.",
            correct: false,
            rubricNote: "Tertullian's own early polemic (already on the table from other topics with this opponent) directly answers the 'sudden novelty' framing, don't concede.",
          },
        ],
      },
    },
  ],
};
