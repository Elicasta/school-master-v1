/**
 * Run with: npm run seed
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your env.
 * Pushes all Lake 1 content (8 lanes, Trinitarian debate tree, facts library)
 * into Supabase. Safe to re-run: uses upsert everywhere.
 */
import { createClient } from "@supabase/supabase-js";
import { LANE_LIST, FUTURE_LANES } from "../src/data/lanes";
import { DEBATE_OPPONENTS } from "../src/data/debate";
import { CHURCH_FATHERS } from "../src/data/facts/church-fathers";
import { DOCTRINE_COMPARISONS, TIMELINE } from "../src/data/facts/doctrine-comparisons";
import { DebateNode } from "../src/types";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env.");
  process.exit(1);
}

const supabase = createClient(url, key);

async function seedLanes() {
  for (const lane of LANE_LIST) {
    await supabase.from("doctrine_lanes").upsert({
      slug: lane.slug,
      order: lane.order,
      title: lane.title,
      summary: lane.summary,
      goal: lane.goal,
      difficulty: lane.difficulty,
      is_expandable: false,
    });

    for (const verse of lane.verses) {
      await supabase.from("verses").upsert({
        id: verse.id,
        reference: verse.reference,
        text: verse.text,
        role: verse.role,
      });
      await supabase.from("lane_verses").upsert({
        lane_slug: lane.slug,
        verse_id: verse.id,
        function: verse.function,
      });
    }

    for (const q of lane.drillQuestions) {
      await supabase.from("drill_questions").upsert({
        id: q.id,
        lane_slug: lane.slug,
        level: q.level,
        type: q.type,
        prompt: q.prompt,
        answer: q.answer,
        choices: q.choices ?? null,
        verse_id: q.verseId ?? null,
      });
    }
  }

  for (const future of FUTURE_LANES) {
    await supabase.from("doctrine_lanes").upsert({
      slug: future.slug,
      order: 99,
      title: future.title,
      summary: "Expandable lane, content ships in a later pass.",
      goal: "",
      difficulty: 1,
      is_expandable: true,
      category: future.category,
    });
  }
  console.log(`Seeded ${LANE_LIST.length} lanes + ${FUTURE_LANES.length} future lane placeholders.`);
}

async function seedDebate() {
  for (const opp of Object.values(DEBATE_OPPONENTS)) {
    await supabase.from("debate_opponents").upsert({
      type: opp.type,
      label: opp.label,
      description: opp.description,
    });
  }

  let totalTopics = 0;
  for (const opp of Object.values(DEBATE_OPPONENTS)) {
    for (const topic of opp.topics) {
      await supabase.from("debate_topics").upsert({
        slug: topic.slug,
        opponent_type: opp.type,
        title: topic.title,
      });
      await seedNode(topic.slug, topic.tree, null, null);
      totalTopics += 1;
    }
  }
  console.log(`Seeded ${totalTopics} debate trees across ${Object.values(DEBATE_OPPONENTS).filter((o) => o.topics.length > 0).length} opponents.`);
}

async function seedNode(topicSlug: string, node: DebateNode, parentId: string | null, parentChoiceKey: string | null) {
  await supabase.from("debate_nodes").upsert({
    id: node.id,
    topic_slug: topicSlug,
    parent_choice_key: parentChoiceKey,
    parent_node_id: parentId,
    statement: node.statement,
    verse_refs: node.verseRefs ?? null,
    choices: node.choices.map((c) => ({
      key: c.key,
      text: c.text,
      correct: c.correct,
      rubricNote: c.rubricNote,
      nextNodeId: c.next?.id ?? null,
    })),
  });

  for (const choice of node.choices) {
    if (choice.next) {
      await seedNode(topicSlug, choice.next, node.id, choice.key);
    }
  }
}

async function seedFacts() {
  for (const father of CHURCH_FATHERS) {
    await supabase.from("church_fathers").upsert({
      id: father.id,
      name: father.name,
      dates: father.dates,
      location: father.location,
      writings: father.writings,
      doctrine_of_god: father.doctrineOfGod,
      doctrine_of_christ: father.doctrineOfChrist,
      trinitarian_use: father.trinitarianUse,
      oneness_response: father.onenessResponse,
      cautions: father.cautions,
    });
  }

  for (const cmp of DOCTRINE_COMPARISONS) {
    await supabase.from("doctrine_comparisons").upsert({
      id: cmp.id,
      name: cmp.name,
      view_of_god: cmp.viewOfGod,
      view_of_jesus: cmp.viewOfJesus,
      view_of_holy_spirit: cmp.viewOfHolySpirit,
      view_of_salvation: cmp.viewOfSalvation,
      key_verses: cmp.keyVerses,
      main_weakness: cmp.mainWeakness,
      apostolic_response: cmp.apostolicResponse,
    });
  }

  for (const [i, event] of TIMELINE.entries()) {
    await supabase.from("church_history_events").upsert({
      id: event.id,
      year: event.year,
      label: event.label,
      detail: event.detail,
      sort_order: i,
    });
  }
  console.log(`Seeded ${CHURCH_FATHERS.length} church fathers, ${DOCTRINE_COMPARISONS.length} doctrine comparisons, ${TIMELINE.length} timeline events.`);
}

async function main() {
  await seedLanes();
  await seedDebate();
  await seedFacts();
  console.log("Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
