-- Adaptive coach sync migration.
-- Safe to run more than once.

alter table public.memory_cards
  add column if not exists card_kind text,
  add column if not exists source text,
  add column if not exists weakness_tag text;

alter table public.review_events
  add column if not exists response_ms integer,
  add column if not exists confidence integer,
  add column if not exists mode text;

create index if not exists review_events_user_created_idx on public.review_events(user_id, created_at desc);
create index if not exists review_events_user_lane_idx on public.review_events(user_id, lane_slug);
create index if not exists memory_cards_user_due_idx on public.memory_cards(user_id, next_review);
