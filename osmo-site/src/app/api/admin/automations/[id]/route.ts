import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { getAutomation } from "@/lib/automations/runner";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;
  const automation = await getAutomation(params.id);
  if (!automation) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ automation });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;
  let body: { active?: boolean; config?: Record<string, unknown> } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const supabase = getSupabaseAdmin();
  const update: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };
  if (typeof body.active === "boolean") update.active = body.active;
  if (body.config && typeof body.config === "object") update.config = body.config;
  if (Object.keys(update).length === 1) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }
  const { error } = await supabase
    .from("automations")
    .update(update)
    .eq("id", params.id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
