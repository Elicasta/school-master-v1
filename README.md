# School Master

Scripture study, doctrine mastery, and debate prep. Apple-style, offline-first, AI-optional.

Built for Apostolic Oneness study: strict monotheism, Jesus as God revealed, baptism in Jesus'
name, and prepared, real debate reps against six live opponents.

## What's actually in this build (Lake 1 + Lake 2)

No stubs. Everything listed here works end to end right now:

- **8 doctrine lanes**, fully seeded: One God, Jesus is God Revealed, Sonship/Humanity, Father in
  Christ, Savior/Name, Creation/Word, Baptism in Jesus' Name, Holy Ghost/Spirit. Each lane has 7
  verses (5 anchor + 2 variant), 2 worked objections with full answer paths, 7 drill questions
  (one per difficulty level), 5 memory prompts, and 2 debate prompts.
- **Drill Mode**: all 7 levels, multiple choice and free-response, self-grading, wrong-answer
  review, auto-advances to the next question after grading, auto-difficulty bump after a strong
  session with a visible "Level up!" moment.
- **Memory Mode**: real SM-2 spaced repetition (same algorithm behind Anki), reference-first,
  phrase-first, and teach-back review styles.
- **Offline Debate Mode**: real, fully-graded argument trees for **six opponents**, every topic
  the original spec named for them, no placeholders:
  - **Trinitarian** — 12 topics, each 2 levels deep with real pushback branches.
  - **Murray / Doctrine of Christ** — all 9 topics.
  - **Jehovah's Witness** — all 7 topics.
  - **Mormon** — all 6 topics.
  - **Muslim** — all 6 topics.
  - **Jewish Monotheist** — all 8 topics.
  Apostolic Oneness (practice mode), Secular Critic, Modalism Accuser, and Church History
  Challenger never had topic lists defined in the original spec, so they're registered (nav,
  routing, schema all support them) but honestly labeled "next pass" instead of improvised.
- **AI Debate Mode**: wired to Gemini on the current `@google/genai` SDK using the
  `gemini-flash-latest` alias (auto-updates, won't rot the way a pinned model string does), plus
  a one-click "Check connection" button that tells you exactly why it isn't working (key missing,
  key invalid, model unavailable, rate limited) instead of a generic failure. Off by default until
  you add `GEMINI_API_KEY`. The app never depends on it.
- **Browser AI Mode**: detects Chrome specifically (not Edge/Opera/Brave), checks whether Gemini
  Nano is downloadable/downloading/available via the `LanguageModel` Prompt API, triggers the
  on-device download with a real progress bar, then runs the whole debate locally in the browser,
  no API key, no server, no data leaving the device. Clear messaging for non-Chrome browsers and
  unsupported devices instead of a silent failure.
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

## What's not in this build yet (Lake 3 and beyond)

Secular Critic, Modalism Accuser, Church History Challenger, and Apostolic Oneness practice mode
are registered but empty, the spec never gave them topic lists so nothing was improvised for them.
The 30 expandable doctrine lanes are listed but not yet populated.

## Stack

Next.js 14 App Router, TypeScript, Tailwind CSS, Supabase (Auth + Postgres), Gemini via
`@google/genai` (optional), Chrome's on-device Prompt API (optional), deployed on Vercel.

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
4. Run the seed script to push the 8 lanes, all six debate trees, and the facts library into
   Supabase (optional, the app works fully offline on local static data even without this):

```bash
npm run seed
```

### 3. Gemini (optional)

Get a key at [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey), add it as
`GEMINI_API_KEY`. Without it, AI Debate Mode shows a clear message and Offline Debate Mode keeps
working, nothing else in the app is affected. **If AI Debate Mode isn't working after adding the
key**: hit "Check connection" on the AI Debate page, or `GET /api/debate/gemini/status` directly,
it tells you the exact reason (key not set, key invalid, model unavailable, rate limited). The
most common cause: adding the env var in Vercel without redeploying, Vercel only applies new env
vars to builds that run after they're saved.

### 4. Browser AI Mode (optional, no setup)

Works automatically in desktop Chrome if the device meets Chrome's on-device AI requirements
(~22GB free disk, 4GB+ VRAM or 16GB+ RAM). Nothing to configure, the app detects it and offers the
download inline.

### 5. Environment variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GEMINI_API_KEY=
```

### 6. Run locally

```bash
npm run dev
```

### 7. Deploy to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add the four environment variables above in Vercel's project settings.
4. Deploy. The build is a standard Next.js App Router build, no special config needed.
5. On iPhone, open the deployed URL in Safari, tap Share, then "Add to Home Screen" to install
   as a PWA.

## Project structure

```
src/
  types/           # every content and app-state shape, plus Chrome Prompt API ambient types
  data/
    lanes/          # the 8 seeded doctrine lanes + future-lane registry
    debate/          # opponent registry + 6 fully-treed opponents (trinitarian, murray,
                       jehovahs-witness, mormon, muslim, jewish-monotheist)
    facts/            # church fathers, doctrine comparisons, timeline
    mind-palace/       # seed route (Savior Hall)
  lib/
    spaced-repetition.ts  # SM-2 algorithm
    scoring.ts              # progression engine (section 10 of the spec)
    local-store.ts           # offline-first localStorage layer
    browser-ai.ts             # Chrome detection + Prompt API helpers
    supabase/                  # browser + server + service-role clients
  components/         # all client-side interactive engines (Drill, Memory, Debate, Browser AI,
                         Mind Palace)
  app/                  # routes: dashboard, lanes, drill, memory, debate (+ ai, browser-ai),
                           mind-palace, facts, api/debate/gemini (+ status), api/scores
supabase/
  schema.sql          # all 19 tables + RLS policies
scripts/
  seed.ts               # pushes data/ content into Supabase
```

## Progression rules (as built)

- Score above 85% on 2+ drills in a session, difficulty auto-advances with a visible level-up
  moment, no manual click required to keep moving between questions.
- Miss the same verse twice, it's added to weak review (surfaced on the dashboard).
- Master a lane (mastery >= 90), mixed-lane debate unlocks.
- Master 3+ lanes, objection interleaving turns on.

## Next passes (already scoped, not started)

- **Lake 3**: Secular Critic, Modalism Accuser, Church History Challenger, Apostolic Oneness
  practice mode, once topic lists are defined for each.
- **Lake 4**: the 30 expandable doctrine lanes, fully populated.
- **Lake 5**: remaining facts library depth (full timeline detail, more church fathers).

