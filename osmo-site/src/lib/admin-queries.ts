import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { computeRemaining } from "@/lib/supabase";
import { PRODUCT } from "@/lib/constants";

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
  shipped_at: string | null;
  delivered_at: string | null;
  created_at: string;
};

export type KPIs = {
  revenueCents: number;
  ordersCount: number;
  earlyAdoptersRemaining: number;
  earlyAdoptersTotal: number;
  earlyAdoptersClaimed: number;
  abandonedThisWeek: number;
};

export type CustomerRow = {
  email: string;
  first_name: string | null;
  last_name: string | null;
  last_order_at: string;
  total_cents: number;
  orders_count: number;
  status: "paid" | "refunded" | "pending";
};

const PAGE_SIZE = 20;

function isMissingTableError(error: { code?: string; message?: string } | null) {
  if (!error) return false;
  if (error.code === "42P01") return true;
  return /relation .* does not exist/i.test(error.message ?? "");
}

export async function fetchKPIs(): Promise<KPIs> {
  const supabase = getSupabaseAdmin();

  const [revenueRes, ordersCountRes, paidOrdersCountRes, abandonedRes] =
    await Promise.all([
      supabase.from("orders").select("amount_cents").eq("status", "paid"),
      supabase.from("orders").select("*", { count: "exact", head: true }),
      supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("status", "paid"),
      supabase
        .from("abandoned_carts")
        .select("*", { count: "exact", head: true })
        .gte(
          "timestamp",
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        ),
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

  const abandonedThisWeek = isMissingTableError(abandonedRes.error)
    ? 0
    : abandonedRes.count ?? 0;

  return {
    revenueCents,
    ordersCount,
    earlyAdoptersRemaining: remaining,
    earlyAdoptersTotal: PRODUCT.maxEarlyAdopters,
    earlyAdoptersClaimed: displayedSold,
    abandonedThisWeek,
  };
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
  page,
}: {
  search?: string;
  status?: OrderRow["status"] | "all";
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
}: {
  search?: string;
}): Promise<{ customers: CustomerRow[]; total: number }> {
  const supabase = getSupabaseAdmin();
  let query = supabase
    .from("orders")
    .select("email, first_name, last_name, amount_cents, status, created_at")
    .order("created_at", { ascending: false });

  if (search && search.trim().length > 0) {
    const term = search.trim().replace(/[%,]/g, "");
    query = query.or(
      `email.ilike.%${term}%,first_name.ilike.%${term}%,last_name.ilike.%${term}%`,
    );
  }

  const { data, error } = await query;
  if (error) {
    if (isMissingTableError(error)) return { customers: [], total: 0 };
    console.error("fetchCustomers:", error);
    return { customers: [], total: 0 };
  }

  type Row = {
    email: string;
    first_name: string | null;
    last_name: string | null;
    amount_cents: number;
    status: OrderRow["status"];
    created_at: string;
  };

  const grouped = new Map<string, CustomerRow>();
  for (const row of (data ?? []) as Row[]) {
    const key = row.email.toLowerCase();
    const existing = grouped.get(key);
    if (existing) {
      existing.orders_count += 1;
      existing.total_cents += row.amount_cents;
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
      });
    }
  }

  const customers = Array.from(grouped.values()).sort((a, b) =>
    a.last_order_at < b.last_order_at ? 1 : -1,
  );
  return { customers, total: customers.length };
}

export type PromoCodeRow = {
  id: string;
  code: string;
  stripe_promotion_code_id: string | null;
  stripe_coupon_id: string | null;
  discount_type: "percent" | "amount";
  discount_value: number;
  usage_count: number;
  usage_limit: number | null;
  expires_at: string | null;
  active: boolean;
  created_at: string;
};

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
  return (data ?? []) as PromoCodeRow[];
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
