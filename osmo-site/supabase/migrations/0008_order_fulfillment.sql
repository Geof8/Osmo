-- Order fulfillment lifecycle: production, shipping carrier, late-delivery alert.
-- Run in Supabase SQL Editor (safe to re-run).

-- Production milestone — set when admin moves an order to "En production"
alter table public.orders
  add column if not exists production_started_at timestamptz;

-- Carrier used for the shipment (Colissimo / Chronopost / DHL / Autre)
alter table public.orders
  add column if not exists tracking_carrier text;

-- Track whether a late-delivery alert has been sent (avoids duplicates)
alter table public.orders
  add column if not exists late_alert_sent_at timestamptz;

-- Track UGC request scheduling so we only schedule once after delivery
alter table public.orders
  add column if not exists ugc_request_sent_at timestamptz;

create index if not exists orders_production_started_at_idx
  on public.orders (production_started_at desc);
create index if not exists orders_delivered_at_idx
  on public.orders (delivered_at desc);
