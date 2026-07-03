-- Run this on an existing School Master Supabase project before deploying this build.
-- Fresh projects can just run supabase/schema.sql.

alter table memory_cards add column if not exists client_id text;
alter table review_events add column if not exists client_id text;

create unique index if not exists memory_cards_user_client_id_idx
  on memory_cards(user_id, client_id)
  where client_id is not null;

create unique index if not exists review_events_user_client_id_idx
  on review_events(user_id, client_id)
  where client_id is not null;
