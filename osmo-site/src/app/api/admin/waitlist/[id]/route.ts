import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const unauth = await requireAdmin(req);
  if (unauth) return unauth;

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("waitlist")
    .delete()
    .eq("id", params.id);

  if (error) {
    console.error("deleteWaitlistEntry:", error);
    return NextResponse.json(
      { error: "Suppression impossible" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
