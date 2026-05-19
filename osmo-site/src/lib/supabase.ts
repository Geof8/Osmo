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

// `claimed` is the number of paid Early Adopter spots (1:1 with rows in `orders`
// where status='paid'). The hero/dashboard show that number as-is — no inflation.
export function computeRemaining(claimed: number) {
  const safe = Math.max(0, Math.floor(claimed));
  const remaining = PRODUCT.maxEarlyAdopters - safe;
  return { displayedSold: safe, remaining: Math.max(0, remaining) };
}
