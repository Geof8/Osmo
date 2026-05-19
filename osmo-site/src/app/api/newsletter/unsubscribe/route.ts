import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { siteBaseUrl } from "@/lib/newsletter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token")?.trim() ?? "";
  const base = siteBaseUrl();

  if (!token) {
    return NextResponse.redirect(`${base}/newsletter/desabonnement?status=missing`);
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("id, active")
    .eq("unsubscribe_token", token)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.redirect(`${base}/newsletter/desabonnement?status=invalid`);
  }

  if (data.active) {
    const { error: updateError } = await supabase
      .from("newsletter_subscribers")
      .update({ active: false })
      .eq("id", data.id);
    if (updateError) {
      console.error("newsletter unsubscribe update:", updateError);
      return NextResponse.redirect(
        `${base}/newsletter/desabonnement?status=error`,
      );
    }
  }

  return NextResponse.redirect(`${base}/newsletter/desabonnement?status=ok`);
}
