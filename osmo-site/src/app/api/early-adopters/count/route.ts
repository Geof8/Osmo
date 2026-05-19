import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { computeRemaining } from "@/lib/supabase";
import { PRODUCT } from "@/lib/constants";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    const { count, error } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "paid");

    if (error) {
      console.error("/api/early-adopters/count:", error);
      return NextResponse.json({
        claimed: 0,
        remaining: PRODUCT.maxEarlyAdopters,
        total: PRODUCT.maxEarlyAdopters,
      });
    }

    const { displayedSold, remaining } = computeRemaining(count ?? 0);
    return NextResponse.json({
      claimed: displayedSold,
      remaining,
      total: PRODUCT.maxEarlyAdopters,
    });
  } catch (err) {
    console.error("/api/early-adopters/count failed:", err);
    return NextResponse.json({
      claimed: 0,
      remaining: PRODUCT.maxEarlyAdopters,
      total: PRODUCT.maxEarlyAdopters,
    });
  }
}
