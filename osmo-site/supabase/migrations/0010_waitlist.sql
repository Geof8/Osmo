-- Waitlist capture (maintenance page + lot2 WaitlistForm)
-- Run once in Supabase SQL Editor: Dashboard → SQL Editor → New Query → paste → Run
-- Safe to re-run.

-- ============================================================================
-- waitlist: email signups from the maintenance page and the lot2 waitlist form
-- ============================================================================
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  phone text,
  first_name text,
  last_name text,
  source text not null default 'maintenance',
  created_at timestamptz not null default now()
);

create index if not exists waitlist_created_at_idx
  on public.waitlist (created_at desc);
create index if not exists waitlist_source_idx
  on public.waitlist (source);

grant all on public.waitlist to service_role;
grant insert, select on public.waitlist to anon, authenticated;
