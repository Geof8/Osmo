import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import {
  NEWSLETTER_THEMES,
  generateNewsletterFromClaude,
} from "@/lib/newsletter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const unauth = await requireAdmin(req);
  if (unauth) return unauth;

  const supabase = getSupabaseAdmin();

  const { data: indexRow } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "newsletter_theme_index")
    .maybeSingle();

  const currentIndex = Number.parseInt(indexRow?.value ?? "0", 10) || 0;
  const theme = NEWSLETTER_THEMES[currentIndex % NEWSLETTER_THEMES.length];

  let generated;
  try {
    generated = await generateNewsletterFromClaude(theme);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erreur génération Claude";
    console.error("generate-newsletter:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }

  const { data: inserted, error: insertError } = await supabase
    .from("newsletter_queue")
    .insert({
      theme,
      subject: generated.subject,
      title: generated.title,
      content: generated.content,
    })
    .select("*")
    .single();

  if (insertError) {
    console.error("generate-newsletter insert:", insertError);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  await supabase
    .from("settings")
    .upsert(
      {
        key: "newsletter_theme_index",
        value: String((currentIndex + 1) % NEWSLETTER_THEMES.length),
      },
      { onConflict: "key" },
    );

  return NextResponse.json({ ok: true, newsletter: inserted });
}
