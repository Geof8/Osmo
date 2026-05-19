-- Newsletter system
-- Run once in Supabase SQL Editor after 0001_admin_backoffice.sql.
-- Safe to re-run.

-- ============================================================================
-- newsletter_subscribers: email list captured from the homepage signup
-- ============================================================================
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  subscribed_at timestamptz not null default now(),
  active boolean not null default true,
  promo_sent boolean not null default false,
  unsubscribe_token text not null default gen_random_uuid()::text
);

create index if not exists newsletter_subscribers_active_idx
  on public.newsletter_subscribers (active);
create index if not exists newsletter_subscribers_token_idx
  on public.newsletter_subscribers (unsubscribe_token);

-- ============================================================================
-- newsletter_queue: generated newsletter drafts, one row per scheduled send
-- ============================================================================
create table if not exists public.newsletter_queue (
  id uuid primary key default gen_random_uuid(),
  theme text not null,
  subject text not null,
  title text not null,
  content text not null,
  generated_at timestamptz not null default now(),
  preview_sent_at timestamptz,
  sent_at timestamptz,
  cancelled boolean not null default false,
  subscribers_count integer
);

create index if not exists newsletter_queue_generated_at_idx
  on public.newsletter_queue (generated_at desc);
create index if not exists newsletter_queue_pending_idx
  on public.newsletter_queue (sent_at, cancelled);

-- ============================================================================
-- Seed newsletter-related settings
-- ============================================================================
insert into public.settings (key, value) values
  ('newsletter_theme_index', '0'),
  ('newsletter_active', 'true')
on conflict (key) do nothing;

-- ============================================================================
-- Seed NEWSLETTER15 promo code (Stripe IDs filled by scripts/seed-newsletter15.ts)
-- ============================================================================
insert into public.promo_codes (code, discount_type, discount_value, active)
values ('NEWSLETTER15', 'percent', 15, true)
on conflict (code) do nothing;

-- ============================================================================
-- Grants — Supabase doesn't auto-grant on new tables, so service_role used by
-- /api/newsletter/* routes can't insert/select/update without this block.
-- ============================================================================
grant all on public.newsletter_subscribers to service_role;
grant all on public.newsletter_queue to service_role;
grant all on public.newsletter_subscribers to anon, authenticated;
grant all on public.newsletter_queue to anon, authenticated;
