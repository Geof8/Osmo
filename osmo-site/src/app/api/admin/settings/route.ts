import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const deny = await requireAdmin(req);
  if (deny) return deny;

  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  if (!key) return NextResponse.json({ error: "key requis" }, { status: 400 });

  const { data, error } = await getSupabaseAdmin()
    .from("settings")
    .select("value")
    .eq("key", key)
    .single();

  if (error && error.code !== "PGRST116") {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ value: data?.value ?? null });
}

export async function PUT(req: NextRequest) {
  const deny = await requireAdmin(req);
  if (deny) return deny;

  const { key, value } = await req.json();
  if (!key || value == null) {
    return NextResponse.json({ error: "key et value requis" }, { status: 400 });
  }

  const { error } = await getSupabaseAdmin()
    .from("settings")
    .upsert(
      { key, value: String(value), updated_at: new Date().toISOString() },
      { onConflict: "key" }
    );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
