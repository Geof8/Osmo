import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FALLBACK = 47;

export async function GET() {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("settings")
      .select("value")
      .eq("key", "early_adopters_remaining")
      .single();

    if (error || !data?.value) {
      return NextResponse.json({ remaining: FALLBACK });
    }

    const n = parseInt(data.value, 10);
    return NextResponse.json({ remaining: isNaN(n) ? FALLBACK : n });
  } catch (err) {
    console.error("/api/early-adopters/count failed:", err);
    return NextResponse.json({ remaining: FALLBACK });
  }
}
