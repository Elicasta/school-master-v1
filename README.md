# School Master

Scripture study, doctrine mastery, and debate prep. Apple-style, offline-first, AI-optional.

Built for Apostolic Oneness study: strict monotheism, Jesus as God revealed, baptism in Jesus'
name, and prepared, real debate reps against a Trinitarian opponent.

## What's actually in this build (Lake 1)

No stubs. Everything listed here works end to end right now:

- **8 doctrine lanes**, fully seeded: One God, Jesus is God Revealed, Sonship/Humanity, Father in
  Christ, Savior/Name, Creation/Word, Baptism in Jesus' Name, Holy Ghost/Spirit. Each lane has 7
  verses (5 anchor + 2 variant), 2 worked objections with full answer paths, 7 drill questions
  (one per difficulty level), 5 memory prompts, and 2 debate prompts.
- **Drill Mode**: all 7 levels, multiple choice and free-response, self-grading, wrong-answer
  review, auto-difficulty bump after a strong session.
- **Memory Mode**: real SM-2 spaced repetition (same algorithm behind Anki), reference-first,
  phrase-first, and teach-back review styles.
- **Offline Debate Mode**: a full, real argument tree for the **Trinitarian** opponent across all
  12 topics from the spec (baptism of Jesus, John 1:1, John 17:5, Matthew 28:19, 2 Corinthians
  13:14, Father sends Son, Son prays to Father, Holy Spirit speaks, "let us make man," another
  Comforter, Hebrews 1, Philippians 2), each two levels deep with real pushback, not placeholder
  branches.
- **AI Debate Mode**: wired to Gemini, opponent-locked, cites the app's own verse data, scores
  clarity/scripture use/logic/fairness. Off by default until you add `GEMINI_API_KEY`. The app
  never depends on it.
- **Mind Palace**: build and save custom memory routes, walk-from-memory test mode. Seeded with
  the Savior Hall example from the spec.
- **Facts Library**: full timeline (Shema to UPCI formation), 5 church father entries (Ignatius,
  Justin Martyr, Tertullian, Origen, Sabellius) with honest cautions on each, 8 doctrine
  comparison tables (Trinity, Oneness, Arianism, Modalism, JW, Islam, Judaism).
- **PWA**: installable on iPhone, offline-capable via service worker, works fully without a
  network connection once loaded (drill, memory, mind palace, facts, offline debate all run on
  static local data, no server round-trip required).
- **Scores**: tracked locally (works with zero setup) and synced to Supabase when you're signed
  in.

## What's not in this build yet (Lake 2 and beyond)

The other 9 debate opponents (Apostolic Oneness practice, Murray, JW, Mormon, Muslim, Jewish
Monotheist, Secular Critic, Modalism Accuser, Church History Challenger) are registered in the app
(nav, routing, schema all support them) but their argument trees are empty. The UI says "next
pass," it does not fake content. The 30 expandable doctrine lanes are listed but not yet
populated. Browser-native AI mode (Chrome's on-device model) is not wired up.

## Stack

Next.js 14 App Router, TypeScript, Tailwind CSS, Supabase (Auth + Postgres), Gemini (optional),
deployed on Vercel.

## Setup

### 1. Install

```bash
npm install
```

### 2. Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run `supabase/schema.sql`. This creates all 19 tables (profiles, doctrine
   content, debate trees, memory cards, mind palaces, facts library, AI debate sessions) with row
   level security on every user-owned table.
3. Copy your project URL, anon key, and service role key into `.env.local` (copy
   `.env.example` first).
4. Run the seed script to push the 8 lanes, Trinitarian debate tree, and facts library into
   Supabase (optional, the app works fully offline on local static data even without this):

```bash
npm run seed
```

### 3. Gemini (optional)

Get a key at [aistudio.google.com](https://aistudio.google.com/app/apikey), add it as
`GEMINI_API_KEY`. Without it, AI Debate Mode shows a clear message and Offline Debate Mode keeps
working, nothing else in the app is affected.

### 4. Environment variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GEMINI_API_KEY=
```

### 5. Run locally

```bash
npm run dev
```

### 6. Deploy to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add the four environment variables above in Vercel's project settings.
4. Deploy. The build is a standard Next.js App Router build, no special config needed.
5. On iPhone, open the deployed URL in Safari, tap Share, then "Add to Home Screen" to install
   as a PWA.

## Project structure

```
src/
  types/           # every content and app-state shape
  data/
    lanes/          # the 8 seeded doctrine lanes + future-lane registry
    debate/          # opponent registry + Trinitarian's full argument tree
    facts/            # church fathers, doctrine comparisons, timeline
    mind-palace/       # seed route (Savior Hall)
  lib/
    spaced-repetition.ts  # SM-2 algorithm
    scoring.ts              # progression engine (section 10 of the spec)
    local-store.ts           # offline-first localStorage layer
    supabase/                 # browser + server + service-role clients
  components/         # all client-side interactive engines (Drill, Memory, Debate, Mind Palace)
  app/                  # routes: dashboard, lanes, drill, memory, debate, mind-palace, facts
supabase/
  schema.sql          # all 19 tables + RLS policies
scripts/
  seed.ts               # pushes data/ content into Supabase
```

## Progression rules (as built)

- Score above 85% on 2+ drills in a session, difficulty bumps up automatically.
- Miss the same verse twice, it's added to weak review (surfaced on the dashboard).
- Master a lane (mastery >= 90), mixed-lane debate unlocks.
- Master 3+ lanes, objection interleaving turns on.

## Next passes (already scoped, not started)

- **Lake 2**: the remaining 9 debate opponents, same rigor as Trinitarian, no stubs.
- **Lake 3**: the 30 expandable doctrine lanes, fully populated.
- **Lake 4**: remaining facts library depth, Chrome on-device AI debate mode.
