-- School Master schema
-- Run this in the Supabase SQL editor, or via `supabase db push`.

create extension if not exists "uuid-ossp";

-- ---------- Profiles ----------
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz default now()
);

-- ---------- Doctrine content ----------
create table if not exists doctrine_lanes (
  slug text primary key,
  "order" int not null,
  title text not null,
  summary text not null,
  goal text not null,
  difficulty smallint not null default 1,
  is_expandable boolean not null default false, -- true for the 30 "future lanes"
  category text -- for future lanes grouping (Core Christology, Key Texts, History, Comparative)
);

create table if not exists verses (
  id text primary key,
  reference text not null,
  text text not null,
  role text not null check (role in ('anchor','variant'))
);

create table if not exists lane_verses (
  lane_slug text references doctrine_lanes(slug) on delete cascade,
  verse_id text references verses(id) on delete cascade,
  function text not null,
  primary key (lane_slug, verse_id)
);

create table if not exists drill_questions (
  id text primary key,
  lane_slug text references doctrine_lanes(slug) on delete cascade,
  level smallint not null check (level between 1 and 7),
  type text not null,
  prompt text not null,
  answer text not null,
  choices jsonb,
  verse_id text references verses(id)
);

-- ---------- Debate engine ----------
create table if not exists debate_opponents (
  type text primary key,
  label text not null,
  description text not null
);

create table if not exists debate_topics (
  slug text primary key,
  opponent_type text references debate_opponents(type) on delete cascade,
  title text not null
);

create table if not exists debate_nodes (
  id text primary key,
  topic_slug text references debate_topics(slug) on delete cascade,
  parent_choice_key text, -- 'A'|'B'|'C'|'D' if this node is a pushback from a parent choice, null if root
  parent_node_id text references debate_nodes(id),
  statement text not null,
  verse_refs jsonb,
  choices jsonb not null -- array of {key,text,correct,rubricNote,nextNodeId}
);

-- ---------- Memory ----------
create table if not exists memory_cards (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  lane_slug text references doctrine_lanes(slug),
  verse_id text references verses(id),
  reference text not null,
  phrase text not null,
  full_text_placeholder text,
  function text,
  difficulty int not null default 250,
  interval_days int not null default 0,
  repetitions int not null default 0,
  last_reviewed timestamptz,
  next_review timestamptz not null default now(),
  correct_count int not null default 0,
  miss_count int not null default 0,
  created_at timestamptz default now()
);

create table if not exists review_events (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  kind text not null check (kind in ('drill','memory','debate','mind-palace')),
  ref_id text not null,
  lane_slug text references doctrine_lanes(slug),
  correct boolean,
  grade smallint,
  created_at timestamptz default now()
);

-- ---------- Scores ----------
create table if not exists user_scores (
  user_id uuid primary key references profiles(id) on delete cascade,
  mastery_overall int not null default 0,
  lane_mastery jsonb not null default '{}'::jsonb,
  debate_score int not null default 0,
  debate_wins int not null default 0,
  debate_losses int not null default 0,
  memory_streak int not null default 0,
  weak_verse_ids jsonb not null default '[]'::jsonb,
  weak_objection_ids jsonb not null default '[]'::jsonb,
  unlocked_mixed_lane_debate boolean not null default false,
  interleaving_objections boolean not null default false,
  updated_at timestamptz default now()
);

-- ---------- Mind Palace ----------
create table if not exists mind_palaces (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  title text not null,
  lane_slug text references doctrine_lanes(slug),
  room_name text not null,
  debate_use text,
  difficulty smallint not null default 1,
  created_at timestamptz default now(),
  last_reviewed timestamptz,
  next_review timestamptz
);

create table if not exists mind_palace_objects (
  id uuid primary key default uuid_generate_v4(),
  palace_id uuid references mind_palaces(id) on delete cascade,
  "order" smallint not null,
  object_name text not null,
  verse_id text references verses(id),
  reference text not null,
  phrase text not null,
  function text,
  notes text
);

-- ---------- Facts library ----------
create table if not exists facts_entries (
  id text primary key,
  category text not null, -- 'timeline' | 'glossary' | 'teaching-point'
  title text not null,
  body text not null
);

create table if not exists church_history_events (
  id text primary key,
  year text not null,
  label text not null,
  detail text not null,
  sort_order int not null
);

create table if not exists church_fathers (
  id text primary key,
  name text not null,
  dates text not null,
  location text not null,
  writings jsonb not null,
  doctrine_of_god text not null,
  doctrine_of_christ text not null,
  trinitarian_use text not null,
  oneness_response text not null,
  cautions text not null
);

create table if not exists doctrine_comparisons (
  id text primary key,
  name text not null,
  view_of_god text not null,
  view_of_jesus text not null,
  view_of_holy_spirit text not null,
  view_of_salvation text not null,
  key_verses jsonb not null,
  main_weakness text not null,
  apostolic_response text not null
);

-- ---------- AI debate sessions (Gemini) ----------
create table if not exists ai_debate_sessions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  opponent_type text not null,
  topic text,
  score int default 0,
  status text default 'active' check (status in ('active','completed','abandoned')),
  created_at timestamptz default now(),
  ended_at timestamptz
);

create table if not exists ai_debate_messages (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid references ai_debate_sessions(id) on delete cascade,
  role text not null check (role in ('user','opponent','coach')),
  content text not null,
  created_at timestamptz default now()
);

-- ---------- Row Level Security ----------
alter table profiles enable row level security;
alter table memory_cards enable row level security;
alter table review_events enable row level security;
alter table user_scores enable row level security;
alter table mind_palaces enable row level security;
alter table mind_palace_objects enable row level security;
alter table ai_debate_sessions enable row level security;
alter table ai_debate_messages enable row level security;

create policy "own profile" on profiles for all using (auth.uid() = id);
create policy "own memory cards" on memory_cards for all using (auth.uid() = user_id);
create policy "own review events" on review_events for all using (auth.uid() = user_id);
create policy "own scores" on user_scores for all using (auth.uid() = user_id);
create policy "own mind palaces" on mind_palaces for all using (auth.uid() = user_id);
create policy "own mind palace objects" on mind_palace_objects for all using (
  exists (select 1 from mind_palaces p where p.id = palace_id and p.user_id = auth.uid())
);
create policy "own ai sessions" on ai_debate_sessions for all using (auth.uid() = user_id);
create policy "own ai messages" on ai_debate_messages for all using (
  exists (select 1 from ai_debate_sessions s where s.id = session_id and s.user_id = auth.uid())
);

-- Content tables (lanes, verses, drill_questions, debate_*, facts_*, church_fathers,
-- doctrine_comparisons, church_history_events) are public read, no RLS needed since
-- they hold no user data; they are populated by the seed script, not by users.
