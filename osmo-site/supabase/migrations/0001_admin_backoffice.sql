-- Admin back-office schema
-- Run once in Supabase SQL Editor: Dashboard → SQL Editor → New Query → paste → Run
-- Safe to re-run: uses `if not exists` and `on conflict do nothing` where applicable.

-- ============================================================================
-- orders: paid Stripe orders mirror, populated by /api/stripe/webhook
-- ============================================================================
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text unique not null,
  email text not null,
  first_name text,
  last_name text,
  amount_cents integer not null,
  promo_code text,
  status text not null default 'paid' check (status in ('paid', 'refunded', 'pending')),
  tracking_number text,
  shipped_at timestamptz,
  delivered_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists orders_email_idx on public.orders (email);
create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_status_idx on public.orders (status);

-- ============================================================================
-- abandoned_carts: captured from SideCart email field before payment
-- ============================================================================
create table if not exists public.abandoned_carts (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  first_name text,
  timestamp timestamptz not null default now(),
  relance_sent boolean not null default false,
  relance_sent_at timestamptz,
  second_relance_sent boolean not null default false,
  second_relance_sent_at timestamptz,
  converted boolean not null default false
);

create index if not exists abandoned_carts_email_idx on public.abandoned_carts (email);
create index if not exists abandoned_carts_unsent_idx
  on public.abandoned_carts (relance_sent, timestamp)
  where converted = false;

-- ============================================================================
-- settings: key/value store for admin-editable configuration
-- ============================================================================
create table if not exists public.settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

-- ============================================================================
-- email_logs: outbound email audit trail
-- ============================================================================
create table if not exists public.email_logs (
  id uuid primary key default gen_random_uuid(),
  recipient text not null,
  type text not null,
  sent_at timestamptz not null default now(),
  status text not null,
  meta jsonb
);

create index if not exists email_logs_sent_at_idx on public.email_logs (sent_at desc);
create index if not exists email_logs_type_idx on public.email_logs (type);

-- ============================================================================
-- promo_codes: local mirror of Stripe promotion codes
-- ============================================================================
create table if not exists public.promo_codes (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  stripe_promotion_code_id text,
  stripe_coupon_id text,
  discount_type text not null check (discount_type in ('percent', 'amount')),
  discount_value integer not null,
  usage_count integer not null default 0,
  usage_limit integer,
  expires_at timestamptz,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- Seed default settings
-- ============================================================================
insert into public.settings (key, value) values
  ('places_affichees', '50'),
  ('prix_early', '20'),
  ('prix_public', '30'),
  ('email_contact', 'contact@osmo-lab.fr'),
  ('stock_alert_threshold', '10'),
  ('maintenance_mode', 'false')
on conflict (key) do nothing;

-- ============================================================================
-- Seed default promo code (BIENVENUE10)
-- Stripe coupon + promotion_code IDs are NULL until the sync script runs.
-- Code is rejected at validation time if stripe_promotion_code_id is null,
-- so this row is harmless until Phase 4 wires up the sync.
-- ============================================================================
insert into public.promo_codes (code, discount_type, discount_value, active)
values ('BIENVENUE10', 'percent', 10, true)
on conflict (code) do nothing;
