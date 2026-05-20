-- Enable Supabase Realtime broadcasts for newsletter_subscribers so the
-- /admin/newsletter page can subscribe to live INSERT/UPDATE/DELETE events.
-- Run in Supabase SQL Editor (safe to re-run).

-- Create the publication if it doesn't already exist (it normally does on
-- a fresh Supabase project, but be defensive for self-hosted setups).
do $$
begin
  if not exists (
    select 1 from pg_publication where pubname = 'supabase_realtime'
  ) then
    create publication supabase_realtime;
  end if;
end
$$;

-- Add newsletter_subscribers to the publication if it isn't already a member.
do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'newsletter_subscribers'
  ) then
    alter publication supabase_realtime add table public.newsletter_subscribers;
  end if;
end
$$;

-- REPLICA IDENTITY FULL ensures DELETE/UPDATE events carry the previous row
-- values (otherwise payload.old.active is null and we can't tell whether a
-- removed/updated row was active).
alter table public.newsletter_subscribers replica identity full;
