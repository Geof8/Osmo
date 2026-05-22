import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { computeRemaining } from "@/lib/supabase";
import { PRODUCT } from "@/lib/constants";
import type { FulfillmentStage } from "@/lib/fulfillment";

export type OrderRow = {
  id: string;
  stripe_session_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  amount_cents: number;
  promo_code: string | null;
  status: "paid" | "refunded" | "pending";
  tracking_number: string | null;
  tracking_carrier: string | null;
  shipped_at: string | null;
  delivered_at: string | null;
  production_started_at: string | null;
  late_alert_sent_at: string | null;
  ugc_request_sent_at: string | null;
  created_at: string;
  customer_tags: string[];
  risk_level?: string | null;
};

export type KPIs = {
  revenueCents: number;
  ordersCount: number;
  earlyAdoptersRemaining: number;
  earlyAdoptersTotal: number;
  earlyAdoptersClaimed: number;
  abandonedThisWeek: number;
  // period-over-period deltas as a fraction (e.g. 0.12 = +12 %)
  revenueDelta: number;
  ordersDelta: number;
  abandonedDelta: number;
  rangeDays: number;
};

export type RevenueSeriesPoint = {
  date: string;
  revenueCents: number;
  orders: number;
};

export type CustomerRow = {
  email: string;
  first_name: string | null;
  last_name: string | null;
  last_order_at: string;
  total_cents: number;
  orders_count: number;
  status: "paid" | "refunded" | "pending";
  tags: string[];
};

export type CustomerSegment =
  | "all"
  | "founders"
  | "vip"
  | "abandoned"
  | "no-purchase";

const PAGE_SIZE = 20;

function isMissingTableError(error: { code?: string; message?: string } | null) {
  if (!error) return false;
  if (error.code === "42P01") return true;
  return /relation .* does not exist/i.test(error.message ?? "");
}

function pctDelta(current: number, previous: number): number {
  if (previous <= 0) return current > 0 ? 1 : 0;
  return (current - previous) / previous;
}

export async function fetchKPIs(rangeDays = 30): Promise<KPIs> {
  const supabase = getSupabaseAdmin();
  const now = Date.now();
  const ms = rangeDays * 24 * 60 * 60 * 1000;
  const periodStart = new Date(now - ms).toISOString();
  const prevPeriodStart = new Date(now - 2 * ms).toISOString();

  const [
    revenueRes,
    ordersCountRes,
    paidOrdersCountRes,
    abandonedCurrentRes,
    abandonedPreviousRes,
    revenuePeriodRes,
    revenuePrevPeriodRes,
    ordersPeriodRes,
    ordersPrevPeriodRes,
  ] = await Promise.all([
    supabase.from("orders").select("amount_cents").eq("status", "paid"),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "paid"),
    supabase
      .from("abandoned_carts")
      .select("*", { count: "exact", head: true })
      .gte("timestamp", periodStart),
    supabase
      .from("abandoned_carts")
      .select("*", { count: "exact", head: true })
      .gte("timestamp", prevPeriodStart)
      .lt("timestamp", periodStart),
    supabase
      .from("orders")
      .select("amount_cents")
      .eq("status", "paid")
      .gte("created_at", periodStart),
    supabase
      .from("orders")
      .select("amount_cents")
      .eq("status", "paid")
      .gte("created_at", prevPeriodStart)
      .lt("created_at", periodStart),
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .gte("created_at", periodStart),
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .gte("created_at", prevPeriodStart)
      .lt("created_at", periodStart),
  ]);

  // Tolerate missing tables before the migration is applied — return zeros
  // instead of throwing, so the dashboard still renders.
  const revenueRows = isMissingTableError(revenueRes.error)
    ? []
    : ((revenueRes.data ?? []) as Array<{ amount_cents: number | null }>);
  const revenueCents = revenueRows.reduce(
    (sum, r) => sum + (r.amount_cents ?? 0),
    0,
  );

  const ordersCount = isMissingTableError(ordersCountRes.error)
    ? 0
    : ordersCountRes.count ?? 0;

  const paidOrdersCount = isMissingTableError(paidOrdersCountRes.error)
    ? 0
    : paidOrdersCountRes.count ?? 0;
  const { remaining, displayedSold } = computeRemaining(paidOrdersCount);

  const abandonedThisWeek = isMissingTableError(abandonedCurrentRes.error)
    ? 0
    : abandonedCurrentRes.count ?? 0;
  const abandonedPrev = isMissingTableError(abandonedPreviousRes.error)
    ? 0
    : abandonedPreviousRes.count ?? 0;

  const periodRevenue = isMissingTableError(revenuePeriodRes.error)
    ? 0
    : ((revenuePeriodRes.data ?? []) as Array<{ amount_cents: number | null }>)
        .reduce((s, r) => s + (r.amount_cents ?? 0), 0);
  const prevPeriodRevenue = isMissingTableError(revenuePrevPeriodRes.error)
    ? 0
    : ((revenuePrevPeriodRes.data ?? []) as Array<{
        amount_cents: number | null;
      }>).reduce((s, r) => s + (r.amount_cents ?? 0), 0);

  const periodOrders = isMissingTableError(ordersPeriodRes.error)
    ? 0
    : ordersPeriodRes.count ?? 0;
  const prevPeriodOrders = isMissingTableError(ordersPrevPeriodRes.error)
    ? 0
    : ordersPrevPeriodRes.count ?? 0;

  return {
    revenueCents,
    ordersCount,
    earlyAdoptersRemaining: remaining,
    earlyAdoptersTotal: PRODUCT.maxEarlyAdopters,
    earlyAdoptersClaimed: displayedSold,
    abandonedThisWeek,
    revenueDelta: pctDelta(periodRevenue, prevPeriodRevenue),
    ordersDelta: pctDelta(periodOrders, prevPeriodOrders),
    abandonedDelta: pctDelta(abandonedThisWeek, abandonedPrev),
    rangeDays,
  };
}

export async function fetchRevenueSeries(
  rangeDays = 30,
): Promise<RevenueSeriesPoint[]> {
  const supabase = getSupabaseAdmin();
  const now = new Date();
  const start = new Date(now.getTime() - rangeDays * 24 * 60 * 60 * 1000);

  const { data, error } = await supabase
    .from("orders")
    .select("amount_cents, created_at, status")
    .gte("created_at", start.toISOString())
    .order("created_at", { ascending: true });

  const buckets = new Map<string, { revenueCents: number; orders: number }>();
  for (let i = 0; i < rangeDays; i++) {
    const d = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
    const key = d.toISOString().slice(0, 10);
    buckets.set(key, { revenueCents: 0, orders: 0 });
  }

  if (error) {
    if (!isMissingTableError(error)) console.error("fetchRevenueSeries:", error);
  } else {
    type Row = {
      amount_cents: number | null;
      created_at: string;
      status: OrderRow["status"];
    };
    for (const row of (data ?? []) as Row[]) {
      const key = row.created_at.slice(0, 10);
      const b = buckets.get(key);
      if (!b) continue;
      b.orders += 1;
      if (row.status === "paid") b.revenueCents += row.amount_cents ?? 0;
    }
  }

  return Array.from(buckets.entries()).map(([date, v]) => ({
    date,
    revenueCents: v.revenueCents,
    orders: v.orders,
  }));
}

export type AdminNotification = {
  id: string;
  kind: "order" | "abandoned" | "promo" | "newsletter" | "info";
  title: string;
  body: string;
  href: string;
  created_at: string;
  unread: boolean;
};

export async function fetchAdminNotifications(): Promise<AdminNotification[]> {
  const supabase = getSupabaseAdmin();
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [recentOrdersRes, recentAbandonsRes] = await Promise.all([
    supabase
      .from("orders")
      .select("id, email, first_name, last_name, amount_cents, status, created_at")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(8),
    supabase
      .from("abandoned_carts")
      .select("id, email, timestamp")
      .gte("timestamp", since)
      .order("timestamp", { ascending: false })
      .limit(5),
  ]);

  const items: AdminNotification[] = [];
  const dayAgo = Date.now() - 24 * 60 * 60 * 1000;

  if (!isMissingTableError(recentOrdersRes.error)) {
    type OrderNotificationRow = {
      id: string;
      email: string;
      first_name: string | null;
      last_name: string | null;
      amount_cents: number;
      status: OrderRow["status"];
      created_at: string;
    };
    for (const o of (recentOrdersRes.data ?? []) as OrderNotificationRow[]) {
      const name =
        [o.first_name, o.last_name].filter(Boolean).join(" ") || o.email;
      const amount = (o.amount_cents / 100).toFixed(2).replace(".", ",");
      items.push({
        id: `order-${o.id}`,
        kind: "order",
        title:
          o.status === "paid"
            ? `Nouvelle commande · ${amount} €`
            : `Commande ${o.status} · ${amount} €`,
        body: `de ${name}`,
        href: `/admin/commandes/${o.id}`,
        created_at: o.created_at,
        unread: new Date(o.created_at).getTime() > dayAgo,
      });
    }
  }

  if (!isMissingTableError(recentAbandonsRes.error)) {
    type AbandonedRow = { id: string; email: string; timestamp: string };
    for (const a of (recentAbandonsRes.data ?? []) as AbandonedRow[]) {
      items.push({
        id: `abandon-${a.id}`,
        kind: "abandoned",
        title: "Panier abandonné",
        body: a.email,
        href: "/admin/abandons",
        created_at: a.timestamp,
        unread: new Date(a.timestamp).getTime() > dayAgo,
      });
    }
  }

  return items
    .sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, 12);
}

export async function searchEverything(term: string): Promise<
  Array<{
    type: "order" | "customer" | "promo";
    label: string;
    hint: string;
    href: string;
  }>
> {
  const supabase = getSupabaseAdmin();
  const clean = term.trim().replace(/[%,]/g, "");
  if (clean.length < 2) return [];

  const [ordersRes, promosRes] = await Promise.all([
    supabase
      .from("orders")
      .select("id, email, first_name, last_name, amount_cents, status")
      .or(
        `email.ilike.%${clean}%,first_name.ilike.%${clean}%,last_name.ilike.%${clean}%`,
      )
      .limit(8),
    supabase
      .from("promo_codes")
      .select("id, code, discount_type, discount_value, active")
      .ilike("code", `%${clean}%`)
      .limit(5),
  ]);

  const results: Array<{
    type: "order" | "customer" | "promo";
    label: string;
    hint: string;
    href: string;
  }> = [];

  const seenCustomers = new Set<string>();
  if (!isMissingTableError(ordersRes.error)) {
    type OrderSearchRow = {
      id: string;
      email: string;
      first_name: string | null;
      last_name: string | null;
      amount_cents: number;
      status: OrderRow["status"];
    };
    for (const o of (ordersRes.data ?? []) as OrderSearchRow[]) {
      const name =
        [o.first_name, o.last_name].filter(Boolean).join(" ") || o.email;
      const amount = (o.amount_cents / 100).toFixed(2).replace(".", ",");
      results.push({
        type: "order",
        label: `${name} · ${amount} €`,
        hint: o.status === "paid" ? "Payé" : o.status,
        href: `/admin/commandes/${o.id}`,
      });
      if (!seenCustomers.has(o.email.toLowerCase())) {
        seenCustomers.add(o.email.toLowerCase());
        results.push({
          type: "customer",
          label: name,
          hint: o.email,
          href: `/admin/clients?q=${encodeURIComponent(o.email)}`,
        });
      }
    }
  }

  if (!isMissingTableError(promosRes.error)) {
    type PromoSearchRow = {
      id: string;
      code: string;
      discount_type: "percent" | "amount";
      discount_value: number;
      active: boolean;
    };
    for (const p of (promosRes.data ?? []) as PromoSearchRow[]) {
      results.push({
        type: "promo",
        label: p.code,
        hint:
          p.discount_type === "percent"
            ? `${p.discount_value} %`
            : `${(p.discount_value / 100).toFixed(2)} €`,
        href: "/admin/codes-promo",
      });
    }
  }

  return results.slice(0, 16);
}

export async function fetchRecentOrders(limit = 10): Promise<OrderRow[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    if (isMissingTableError(error)) return [];
    console.error("fetchRecentOrders:", error);
    return [];
  }
  return (data ?? []) as OrderRow[];
}

export async function fetchOrders({
  search,
  status,
  stage,
  page,
}: {
  search?: string;
  status?: OrderRow["status"] | "all";
  stage?: FulfillmentStage | "all";
  page?: number;
}): Promise<{ orders: OrderRow[]; total: number; page: number; pageSize: number }> {
  const supabase = getSupabaseAdmin();
  const currentPage = Math.max(1, page ?? 1);
  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("orders")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (status && status !== "all") {
    query = query.eq("status", status);
  }
  if (stage && stage !== "all") {
    switch (stage) {
      case "paid":
        query = query
          .is("production_started_at", null)
          .is("shipped_at", null)
          .is("delivered_at", null)
          .neq("status", "refunded");
        break;
      case "in_production":
        query = query
          .not("production_started_at", "is", null)
          .is("shipped_at", null)
          .is("delivered_at", null);
        break;
      case "shipped":
        query = query
          .not("shipped_at", "is", null)
          .is("delivered_at", null);
        break;
      case "delivered":
        query = query.not("delivered_at", "is", null);
        break;
    }
  }
  if (search && search.trim().length > 0) {
    const term = search.trim();
    const escaped = term.replace(/[%,]/g, "");
    query = query.or(
      `email.ilike.%${escaped}%,first_name.ilike.%${escaped}%,last_name.ilike.%${escaped}%`,
    );
  }

  const { data, error, count } = await query;
  if (error) {
    if (isMissingTableError(error)) {
      return { orders: [], total: 0, page: currentPage, pageSize: PAGE_SIZE };
    }
    console.error("fetchOrders:", error);
    return { orders: [], total: 0, page: currentPage, pageSize: PAGE_SIZE };
  }
  return {
    orders: (data ?? []) as OrderRow[],
    total: count ?? 0,
    page: currentPage,
    pageSize: PAGE_SIZE,
  };
}

export async function fetchOrderFulfillmentCounts(): Promise<{
  all: number;
  paid: number;
  in_production: number;
  shipped: number;
  delivered: number;
}> {
  const supabase = getSupabaseAdmin();
  const [allRes, paidRes, prodRes, shippedRes, deliveredRes] = await Promise.all([
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .is("production_started_at", null)
      .is("shipped_at", null)
      .is("delivered_at", null)
      .neq("status", "refunded"),
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .not("production_started_at", "is", null)
      .is("shipped_at", null)
      .is("delivered_at", null),
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .not("shipped_at", "is", null)
      .is("delivered_at", null),
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .not("delivered_at", "is", null),
  ]);
  return {
    all: isMissingTableError(allRes.error) ? 0 : allRes.count ?? 0,
    paid: isMissingTableError(paidRes.error) ? 0 : paidRes.count ?? 0,
    in_production: isMissingTableError(prodRes.error) ? 0 : prodRes.count ?? 0,
    shipped: isMissingTableError(shippedRes.error) ? 0 : shippedRes.count ?? 0,
    delivered: isMissingTableError(deliveredRes.error)
      ? 0
      : deliveredRes.count ?? 0,
  };
}

export async function fetchOrderStatusCounts(): Promise<{
  all: number;
  paid: number;
  pending: number;
  refunded: number;
}> {
  const supabase = getSupabaseAdmin();
  const [allRes, paidRes, pendingRes, refundedRes] = await Promise.all([
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "paid"),
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "refunded"),
  ]);
  return {
    all: isMissingTableError(allRes.error) ? 0 : allRes.count ?? 0,
    paid: isMissingTableError(paidRes.error) ? 0 : paidRes.count ?? 0,
    pending: isMissingTableError(pendingRes.error) ? 0 : pendingRes.count ?? 0,
    refunded: isMissingTableError(refundedRes.error)
      ? 0
      : refundedRes.count ?? 0,
  };
}

export async function fetchOrderById(id: string): Promise<OrderRow | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    if (isMissingTableError(error)) return null;
    console.error("fetchOrderById:", error);
    return null;
  }
  return (data as OrderRow | null) ?? null;
}

export async function fetchCustomers({
  search,
  segment = "all",
}: {
  search?: string;
  segment?: CustomerSegment;
}): Promise<{
  customers: CustomerRow[];
  total: number;
  counts: Record<CustomerSegment, number>;
}> {
  const supabase = getSupabaseAdmin();
  let query = supabase
    .from("orders")
    .select(
      "email, first_name, last_name, amount_cents, status, created_at, customer_tags",
    )
    .order("created_at", { ascending: false });

  if (search && search.trim().length > 0) {
    const term = search.trim().replace(/[%,]/g, "");
    query = query.or(
      `email.ilike.%${term}%,first_name.ilike.%${term}%,last_name.ilike.%${term}%`,
    );
  }

  const { data, error } = await query;
  if (error) {
    if (isMissingTableError(error))
      return {
        customers: [],
        total: 0,
        counts: { all: 0, founders: 0, vip: 0, abandoned: 0, "no-purchase": 0 },
      };
    console.error("fetchCustomers:", error);
    return {
      customers: [],
      total: 0,
      counts: { all: 0, founders: 0, vip: 0, abandoned: 0, "no-purchase": 0 },
    };
  }

  type Row = {
    email: string;
    first_name: string | null;
    last_name: string | null;
    amount_cents: number;
    status: OrderRow["status"];
    created_at: string;
    customer_tags: string[] | null;
  };

  const grouped = new Map<string, CustomerRow>();
  for (const row of (data ?? []) as Row[]) {
    const key = row.email.toLowerCase();
    const existing = grouped.get(key);
    const rowTags = row.customer_tags ?? [];
    if (existing) {
      existing.orders_count += 1;
      existing.total_cents += row.amount_cents;
      existing.tags = Array.from(new Set([...existing.tags, ...rowTags]));
      if (row.created_at > existing.last_order_at) {
        existing.last_order_at = row.created_at;
        existing.status = row.status;
      }
    } else {
      grouped.set(key, {
        email: row.email,
        first_name: row.first_name,
        last_name: row.last_name,
        last_order_at: row.created_at,
        total_cents: row.amount_cents,
        orders_count: 1,
        status: row.status,
        tags: rowTags,
      });
    }
  }

  // Charge la liste des emails abandonnés (non convertis)
  let abandonedEmails = new Set<string>();
  try {
    const { data: abData } = await supabase
      .from("abandoned_carts")
      .select("email")
      .eq("converted", false);
    abandonedEmails = new Set(
      ((abData ?? []) as Array<{ email: string }>).map((r) =>
        r.email.toLowerCase(),
      ),
    );
  } catch {
    // ignore
  }

  const customers = Array.from(grouped.values()).sort((a, b) =>
    a.last_order_at < b.last_order_at ? 1 : -1,
  );

  const founders = customers; // toute personne qui a une order
  const vips = customers.filter((c) => c.orders_count >= 2);
  // Abandoned segment: emails dans abandoned_carts non présents dans orders
  const purchaserEmails = new Set(customers.map((c) => c.email.toLowerCase()));
  const abandonedOnly = Array.from(abandonedEmails)
    .filter((e) => !purchaserEmails.has(e))
    .map(
      (email): CustomerRow => ({
        email,
        first_name: null,
        last_name: null,
        last_order_at: "",
        total_cents: 0,
        orders_count: 0,
        status: "pending",
        tags: [],
      }),
    );

  const counts: Record<CustomerSegment, number> = {
    all: customers.length + abandonedOnly.length,
    founders: founders.length,
    vip: vips.length,
    abandoned: abandonedOnly.length,
    "no-purchase": abandonedOnly.length,
  };

  let filtered: CustomerRow[];
  switch (segment) {
    case "founders":
      filtered = founders;
      break;
    case "vip":
      filtered = vips;
      break;
    case "abandoned":
    case "no-purchase":
      filtered = abandonedOnly;
      break;
    default:
      filtered = [...customers, ...abandonedOnly];
  }

  return { customers: filtered, total: filtered.length, counts };
}

export type PromoCodeRow = {
  id: string;
  code: string;
  description: string | null;
  stripe_promotion_code_id: string | null;
  stripe_coupon_id: string | null;
  discount_type: "percent" | "amount";
  discount_value: number;
  usage_count: number;
  usage_limit: number | null;
  limit_per_customer: number | null;
  min_order_amount_cents: number | null;
  first_time_only: boolean;
  starts_at: string | null;
  expires_at: string | null;
  tags: string[];
  active: boolean;
  created_at: string;
};

export type PromoStats = {
  activeCount: number;
  totalCount: number;
  redemptions30d: number;
  revenue30dCents: number;
};

export async function fetchPromoStats(): Promise<PromoStats> {
  const supabase = getSupabaseAdmin();
  const since = new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString();

  const [activeRes, totalRes, ordersRes] = await Promise.all([
    supabase
      .from("promo_codes")
      .select("*", { count: "exact", head: true })
      .eq("active", true),
    supabase.from("promo_codes").select("*", { count: "exact", head: true }),
    supabase
      .from("orders")
      .select("amount_cents, promo_code")
      .eq("status", "paid")
      .gte("created_at", since)
      .not("promo_code", "is", null),
  ]);

  const activeCount = isMissingTableError(activeRes.error)
    ? 0
    : activeRes.count ?? 0;
  const totalCount = isMissingTableError(totalRes.error)
    ? 0
    : totalRes.count ?? 0;

  let redemptions = 0;
  let revenueCents = 0;
  if (!isMissingTableError(ordersRes.error)) {
    const rows = (ordersRes.data ?? []) as Array<{
      amount_cents: number | null;
      promo_code: string | null;
    }>;
    redemptions = rows.length;
    revenueCents = rows.reduce((sum, r) => sum + (r.amount_cents ?? 0), 0);
  }

  return {
    activeCount,
    totalCount,
    redemptions30d: redemptions,
    revenue30dCents: revenueCents,
  };
}

export async function fetchPromoRevenueByCode(): Promise<Map<string, number>> {
  const supabase = getSupabaseAdmin();
  const map = new Map<string, number>();
  const { data, error } = await supabase
    .from("orders")
    .select("amount_cents, promo_code")
    .eq("status", "paid")
    .not("promo_code", "is", null);
  if (error || !data) return map;
  for (const row of data as Array<{
    amount_cents: number | null;
    promo_code: string | null;
  }>) {
    if (!row.promo_code) continue;
    const code = row.promo_code.toUpperCase();
    map.set(code, (map.get(code) ?? 0) + (row.amount_cents ?? 0));
  }
  return map;
}

export async function fetchPromoCodes(): Promise<PromoCodeRow[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("promo_codes")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    if (isMissingTableError(error)) return [];
    console.error("fetchPromoCodes:", error);
    return [];
  }
  return ((data ?? []) as Partial<PromoCodeRow>[]).map(normalizePromoCodeRow);
}

function normalizePromoCodeRow(row: Partial<PromoCodeRow>): PromoCodeRow {
  return {
    id: row.id ?? "",
    code: row.code ?? "",
    description: row.description ?? null,
    stripe_promotion_code_id: row.stripe_promotion_code_id ?? null,
    stripe_coupon_id: row.stripe_coupon_id ?? null,
    discount_type: row.discount_type ?? "percent",
    discount_value: row.discount_value ?? 0,
    usage_count: row.usage_count ?? 0,
    usage_limit: row.usage_limit ?? null,
    limit_per_customer: row.limit_per_customer ?? null,
    min_order_amount_cents: row.min_order_amount_cents ?? null,
    first_time_only: row.first_time_only ?? false,
    starts_at: row.starts_at ?? null,
    expires_at: row.expires_at ?? null,
    tags: row.tags ?? [],
    active: row.active ?? false,
    created_at: row.created_at ?? new Date().toISOString(),
  };
}

export type EmailLogRow = {
  id: string;
  recipient: string;
  type: string;
  sent_at: string;
  status: "sent" | "failed" | "skipped_no_provider" | string;
  meta: Record<string, unknown> | null;
};

const EMAIL_LOGS_PAGE_SIZE = 30;

export async function fetchEmailLogs({
  type,
  status,
  page,
}: {
  type?: string;
  status?: string;
  page?: number;
}): Promise<{
  logs: EmailLogRow[];
  total: number;
  page: number;
  pageSize: number;
}> {
  const supabase = getSupabaseAdmin();
  const currentPage = Math.max(1, page ?? 1);
  const from = (currentPage - 1) * EMAIL_LOGS_PAGE_SIZE;
  const to = from + EMAIL_LOGS_PAGE_SIZE - 1;

  let query = supabase
    .from("email_logs")
    .select("*", { count: "exact" })
    .order("sent_at", { ascending: false })
    .range(from, to);

  if (type && type !== "all") query = query.eq("type", type);
  if (status && status !== "all") query = query.eq("status", status);

  const { data, error, count } = await query;
  if (error) {
    if (isMissingTableError(error)) {
      return {
        logs: [],
        total: 0,
        page: currentPage,
        pageSize: EMAIL_LOGS_PAGE_SIZE,
      };
    }
    console.error("fetchEmailLogs:", error);
    return {
      logs: [],
      total: 0,
      page: currentPage,
      pageSize: EMAIL_LOGS_PAGE_SIZE,
    };
  }
  return {
    logs: (data ?? []) as EmailLogRow[],
    total: count ?? 0,
    page: currentPage,
    pageSize: EMAIL_LOGS_PAGE_SIZE,
  };
}

export function toCSV(rows: Array<Record<string, string | number | null>>): string {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const escape = (v: string | number | null) => {
    if (v === null || v === undefined) return "";
    const s = String(v);
    if (/[",\n;]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((h) => escape(row[h] ?? null)).join(","));
  }
  return lines.join("\n");
}
