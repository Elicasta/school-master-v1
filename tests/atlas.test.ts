import assert from "node:assert/strict";
import test from "node:test";
import { ATLAS_TOPICS } from "../src/data/atlas/index";
import { isaiah4816, EVIDENCE_CASES } from "../src/data/atlas/cases";
import { validateEvidenceCase } from "../src/data/atlas/types";

test("atlas topic IDs and coordinates are sound", () => {
  assert.equal(new Set(ATLAS_TOPICS.map((t) => t.id)).size, ATLAS_TOPICS.length);
  assert.ok(ATLAS_TOPICS.length >= 12);
  for (const topic of ATLAS_TOPICS) {
    assert.ok(topic.x >= 0 && topic.x <= 100 && topic.y >= 0 && topic.y <= 100);
    if (topic.status === "case-draft") assert.ok(topic.caseSlug && EVIDENCE_CASES[topic.caseSlug]);
    if (topic.status === "mapped") assert.equal(topic.caseSlug, undefined);
  }
});

test("first case contains exact KJV passage range and traces source IDs", () => {
  assert.deepEqual(isaiah4816.verses.map((v) => v.number), [12, 13, 14, 15, 16, 17]);
  assert.match(isaiah4816.verses[4].text, /and his Spirit, hath sent me/);
  assert.equal(isaiah4816.status, "working-draft");
  assert.deepEqual(validateEvidenceCase(isaiah4816), []);
});

test("validation rejects unsourced interpretations and unsupported review claims", () => {
  const candidate = { ...isaiah4816, status: "reviewed" as const, points: [{ ...isaiah4816.points[0], sourceIds: ["nonexistent"] }] };
  const errors = validateEvidenceCase(candidate);
  assert.ok(errors.some((x) => x.includes("sign-off")));
  assert.ok(errors.some((x) => x.includes("Broken source reference")));
});
