-- Admin modules: Automatisations, Tags clients, Codes promo enrichis
-- Run in Supabase SQL Editor.

-- ============================================================================
-- automations: bibliothèque de workflows (slug stable comme id)
-- ============================================================================
create table if not exists public.automations (
  id text primary key,
  name text not null,
  description text not null,
  category text not null check (
    category in ('fulfillment', 'fraud', 'loyalty', 'inventory', 'marketing')
  ),
  trigger_label text not null,
  condition_label text not null,
  action_label text not null,
  active boolean not null default true,
  config jsonb not null default '{}'::jsonb,
  last_run_at timestamptz,
  last_run_status text,
  total_runs integer not null default 0,
  success_runs integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists automations_category_idx on public.automations (category);
create index if not exists automations_active_idx on public.automations (active);

-- ============================================================================
-- automation_runs: log d'exécution
-- ============================================================================
create table if not exists public.automation_runs (
  id uuid primary key default gen_random_uuid(),
  automation_id text not null references public.automations(id) on delete cascade,
  status text not null check (status in ('success', 'error', 'skipped')),
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  result jsonb,
  error text
);

create index if not exists automation_runs_by_automation_idx
  on public.automation_runs (automation_id, started_at desc);

-- ============================================================================
-- Tags clients sur orders
-- ============================================================================
alter table public.orders
  add column if not exists customer_tags text[] not null default '{}';

create index if not exists orders_customer_tags_idx
  on public.orders using gin (customer_tags);

-- ============================================================================
-- Codes promo enrichis (nouvelles variables)
-- ============================================================================
alter table public.promo_codes
  add column if not exists description text,
  add column if not exists starts_at timestamptz,
  add column if not exists min_order_amount_cents integer,
  add column if not exists first_time_only boolean not null default false,
  add column if not exists limit_per_customer integer,
  add column if not exists tags text[] not null default '{}';

create index if not exists promo_codes_tags_idx
  on public.promo_codes using gin (tags);
