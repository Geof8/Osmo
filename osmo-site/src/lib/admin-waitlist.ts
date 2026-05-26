import "server-only";
import { unstable_noStore as noStore } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export type WaitlistRow = {
  id: string;
  email: string;
  phone: string | null;
  first_name: string | null;
  last_name: string | null;
  source: string;
  created_at: string;
};

function isMissingTableError(error: { code?: string; message?: string } | null) {
  if (!error) return false;
  if (error.code === "42P01") return true;
  return /relation .* does not exist/i.test(error.message ?? "");
}

// Escape ilike wildcards so a user typing "_" or "%" doesn't widen the match.
function escapeIlike(input: string): string {
  return input.replace(/[\\%_]/g, (c) => `\\${c}`);
}

export async function fetchWaitlistCount(): Promise<number> {
  noStore();
  const supabase = getSupabaseAdmin();
  const { count, error } = await supabase
    .from("waitlist")
    .select("*", { count: "exact", head: true });
  if (error) {
    if (isMissingTableError(error)) return 0;
    console.error("fetchWaitlistCount:", error);
    return 0;
  }
  return count ?? 0;
}

export async function fetchWaitlistPage(opts: {
  page: number;
  perPage: number;
  q?: string;
}): Promise<{ rows: WaitlistRow[]; totalMatching: number }> {
  noStore();
  const supabase = getSupabaseAdmin();
  const page = Math.max(1, opts.page);
  const from = (page - 1) * opts.perPage;
  const to = from + opts.perPage - 1;

  let query = supabase
    .from("waitlist")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (opts.q && opts.q.trim()) {
    query = query.ilike("email", `%${escapeIlike(opts.q.trim())}%`);
  }

  const { data, error, count } = await query;
  if (error) {
    if (isMissingTableError(error)) return { rows: [], totalMatching: 0 };
    console.error("fetchWaitlistPage:", error);
    return { rows: [], totalMatching: 0 };
  }
  return {
    rows: (data ?? []) as WaitlistRow[],
    totalMatching: count ?? 0,
  };
}

export async function fetchWaitlistForExport(opts: {
  q?: string;
}): Promise<WaitlistRow[]> {
  noStore();
  const supabase = getSupabaseAdmin();
  let query = supabase
    .from("waitlist")
    .select("*")
    .order("created_at", { ascending: false });

  if (opts.q && opts.q.trim()) {
    query = query.ilike("email", `%${escapeIlike(opts.q.trim())}%`);
  }

  const { data, error } = await query;
  if (error) {
    if (isMissingTableError(error)) return [];
    console.error("fetchWaitlistForExport:", error);
    return [];
  }
  return (data ?? []) as WaitlistRow[];
}
