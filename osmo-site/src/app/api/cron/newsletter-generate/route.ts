import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { sendEmail } from "@/lib/email/send";
import { Newsletter } from "@/lib/email/templates/Newsletter";
import {
  NEWSLETTER_THEMES,
  generateNewsletterFromClaude,
  siteBaseUrl,
} from "@/lib/newsletter";
import { isAuthorizedCron } from "@/lib/cron-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PREVIEW_RECIPIENT = "contact@osmo-lab.fr";

export async function GET(req: NextRequest) {
  if (!isAuthorizedCron(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();

  const { data: activeRow } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "newsletter_active")
    .maybeSingle();
  if (activeRow?.value && activeRow.value !== "true") {
    return NextResponse.json({ ok: true, skipped: "newsletter_active=false" });
  }

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
    console.error("cron newsletter-generate Claude:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Claude error" },
      { status: 500 },
    );
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

  if (insertError || !inserted) {
    console.error("cron newsletter-generate insert:", insertError);
    return NextResponse.json({ error: "DB insert failed" }, { status: 500 });
  }

  const adminUrl = `${siteBaseUrl()}/admin/newsletter`;

  const mail = await sendEmail({
    to: PREVIEW_RECIPIENT,
    type: "newsletter_preview",
    subject: `🔍 PREVIEW — Newsletter OSMO · Envoi dans 24h`,
    react: Newsletter({
      title: generated.title,
      content: generated.content,
      unsubscribeUrl: `${siteBaseUrl()}/newsletter/desabonnement`,
      previewBanner: { previewUrl: adminUrl },
    }),
    meta: {
      queue_id: inserted.id,
      theme,
      subject: generated.subject,
    },
  });

  await supabase
    .from("newsletter_queue")
    .update({ preview_sent_at: new Date().toISOString() })
    .eq("id", inserted.id);

  await supabase
    .from("settings")
    .upsert(
      {
        key: "newsletter_theme_index",
        value: String((currentIndex + 1) % NEWSLETTER_THEMES.length),
      },
      { onConflict: "key" },
    );

  return NextResponse.json({
    ok: true,
    queue_id: inserted.id,
    preview_status: mail.status,
  });
}

// Vercel cron uses GET, but allow POST for manual `curl -X POST` runs.
export const POST = GET;
