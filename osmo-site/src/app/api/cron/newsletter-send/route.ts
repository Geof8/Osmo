import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { sendEmail } from "@/lib/email/send";
import { Newsletter } from "@/lib/email/templates/Newsletter";
import { unsubscribeUrl } from "@/lib/newsletter";
import { isAuthorizedCron } from "@/lib/cron-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type QueueRow = {
  id: string;
  subject: string;
  title: string;
  content: string;
  cancelled: boolean;
  sent_at: string | null;
};

type SubscriberRow = {
  id: string;
  email: string;
  unsubscribe_token: string;
};

export async function GET(req: NextRequest) {
  if (!isAuthorizedCron(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();

  // Pick the most recently generated newsletter that has a preview but is not
  // yet sent or cancelled. (Day-1 generate + Day-2 send model.)
  const { data: queueRows, error: queueError } = await supabase
    .from("newsletter_queue")
    .select("id, subject, title, content, cancelled, sent_at")
    .is("sent_at", null)
    .order("generated_at", { ascending: false })
    .limit(1);

  if (queueError) {
    console.error("cron newsletter-send queue fetch:", queueError);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  const queued = (queueRows?.[0] as QueueRow | undefined) ?? null;
  if (!queued) {
    return NextResponse.json({ ok: true, skipped: "no_pending_newsletter" });
  }

  if (queued.cancelled) {
    console.log("cron newsletter-send: envoi annulé", queued.id);
    await supabase
      .from("newsletter_queue")
      .update({
        sent_at: new Date().toISOString(),
        subscribers_count: 0,
      })
      .eq("id", queued.id);
    return NextResponse.json({
      ok: true,
      cancelled: true,
      queue_id: queued.id,
    });
  }

  const { data: subscribers, error: subsError } = await supabase
    .from("newsletter_subscribers")
    .select("id, email, unsubscribe_token")
    .eq("active", true);

  if (subsError) {
    console.error("cron newsletter-send subscribers:", subsError);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  const list = (subscribers ?? []) as SubscriberRow[];
  let sentCount = 0;
  let failedCount = 0;

  for (const sub of list) {
    const mail = await sendEmail({
      to: sub.email,
      type: "newsletter_send",
      subject: queued.subject,
      react: Newsletter({
        title: queued.title,
        content: queued.content,
        unsubscribeUrl: unsubscribeUrl(sub.unsubscribe_token),
      }),
      meta: { queue_id: queued.id },
    });
    if (mail.status === "sent") sentCount += 1;
    else failedCount += 1;
  }

  await supabase
    .from("newsletter_queue")
    .update({
      sent_at: new Date().toISOString(),
      subscribers_count: sentCount,
    })
    .eq("id", queued.id);

  return NextResponse.json({
    ok: true,
    queue_id: queued.id,
    sent: sentCount,
    failed: failedCount,
    total: list.length,
  });
}

export const POST = GET;
