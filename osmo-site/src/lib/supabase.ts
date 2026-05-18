import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { PRODUCT } from "@/lib/constants";

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (_supabase) return _supabase;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || url === "your_supabase_url") {
    return createClient("https://placeholder.supabase.co", "placeholder");
  }

  _supabase = createClient(url, key);
  return _supabase;
}

export async function getSupabaseCount(): Promise<number> {
  try {
    const { count, error } = await getSupabase()
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    if (error || count === null) return 0;
    return count;
  } catch {
    return 0;
  }
}

export function computeRemaining(actualCount: number) {
  const displayedSold = Math.floor(actualCount / 5);
  const remaining = PRODUCT.maxEarlyAdopters - displayedSold;
  return { displayedSold, remaining: Math.max(0, remaining) };
}
