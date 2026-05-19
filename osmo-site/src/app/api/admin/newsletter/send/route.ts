import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { sendEmail } from "@/lib/email/send";
import { Newsletter } from "@/lib/email/templates/Newsletter";
import { siteBaseUrl, unsubscribeUrl } from "@/lib/newsletter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PREVIEW_RECIPIENT = "contact@osmo-lab.fr";

type Body = {
  mode?: "preview" | "send";
  subject?: string;
  title?: string;
  content?: string;
  theme?: string;
};

export async function POST(req: NextRequest) {
  const unauth = await requireAdmin(req);
  if (unauth) return unauth;

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const mode = body.mode === "send" ? "send" : "preview";
  const subject = body.subject?.trim();
  const title = body.title?.trim();
  const content = body.content?.trim();
  const theme = body.theme?.trim() || "manuel";

  if (!subject || !title || !content) {
    return NextResponse.json(
      { error: "Sujet, titre et contenu requis" },
      { status: 400 },
    );
  }

  const supabase = getSupabaseAdmin();

  if (mode === "preview") {
    const mail = await sendEmail({
      to: PREVIEW_RECIPIENT,
      type: "newsletter_preview",
      subject: `🔍 PREVIEW — ${subject}`,
      react: Newsletter({
        title,
        content,
        unsubscribeUrl: `${siteBaseUrl()}/newsletter/desabonnement`,
        previewBanner: { previewUrl: `${siteBaseUrl()}/admin/newsletter` },
      }),
      meta: { mode: "preview", theme },
    });
    if (mail.status !== "sent") {
      return NextResponse.json(
        { error: `Envoi preview impossible (${mail.status})` },
        { status: 500 },
      );
    }
    return NextResponse.json({ ok: true, mode: "preview" });
  }

  // mode === "send": persist to queue, then dispatch to all active subs.
  const { data: queueRow, error: queueError } = await supabase
    .from("newsletter_queue")
    .insert({
      theme,
      subject,
      title,
      content,
      preview_sent_at: new Date().toISOString(),
    })
    .select("*")
    .single();

  if (queueError || !queueRow) {
    console.error("admin newsletter manual queue insert:", queueError);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  const { data: subscribers, error: subsError } = await supabase
    .from("newsletter_subscribers")
    .select("id, email, unsubscribe_token")
    .eq("active", true);
  if (subsError) {
    console.error("admin newsletter manual subscribers:", subsError);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  const list = (subscribers ?? []) as Array<{
    id: string;
    email: string;
    unsubscribe_token: string;
  }>;
  let sentCount = 0;
  for (const sub of list) {
    const mail = await sendEmail({
      to: sub.email,
      type: "newsletter_send",
      subject,
      react: Newsletter({
        title,
        content,
        unsubscribeUrl: unsubscribeUrl(sub.unsubscribe_token),
      }),
      meta: { queue_id: queueRow.id, manual: true },
    });
    if (mail.status === "sent") sentCount += 1;
  }

  await supabase
    .from("newsletter_queue")
    .update({
      sent_at: new Date().toISOString(),
      subscribers_count: sentCount,
    })
    .eq("id", queueRow.id);

  return NextResponse.json({
    ok: true,
    mode: "send",
    sent: sentCount,
    total: list.length,
  });
}
