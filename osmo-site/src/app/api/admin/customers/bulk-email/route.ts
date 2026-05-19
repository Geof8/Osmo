import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { fetchCustomers, type CustomerSegment } from "@/lib/admin-queries";
import { sendEmail } from "@/lib/email/send";
import { GenericMessage } from "@/lib/email/templates/GenericMessage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BATCH = 100;

export async function POST(req: NextRequest) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  let body: {
    segment?: string;
    subject?: string;
    body?: string;
  } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }

  const allowed: CustomerSegment[] = [
    "all",
    "founders",
    "vip",
    "abandoned",
    "no-purchase",
  ];
  const segment = (body.segment as CustomerSegment) ?? "all";
  if (!allowed.includes(segment)) {
    return NextResponse.json({ error: "Segment invalide" }, { status: 400 });
  }
  const subject = String(body.subject ?? "").trim();
  const messageBody = String(body.body ?? "").trim();
  if (!subject || !messageBody) {
    return NextResponse.json(
      { error: "Sujet et corps requis" },
      { status: 400 },
    );
  }

  const { customers } = await fetchCustomers({ segment });
  if (customers.length === 0) {
    return NextResponse.json({ sent: 0, message: "Aucun destinataire." });
  }
  if (customers.length > MAX_BATCH) {
    return NextResponse.json(
      { error: `Segment trop grand (${customers.length}). Max ${MAX_BATCH}.` },
      { status: 400 },
    );
  }

  const paragraphs = messageBody.split(/\n\s*\n/).filter(Boolean);
  let sent = 0;
  for (const c of customers) {
    const greeting = c.first_name ? `Bonjour ${c.first_name},` : "Bonjour,";
    const res = await sendEmail({
      to: c.email,
      type: "newsletter_send",
      subject,
      react: GenericMessage({
        preheader: subject,
        title: subject,
        greeting,
        body: paragraphs,
      }),
      meta: { bulk_segment: segment },
    });
    if (res.status === "sent" || res.status === "skipped_no_provider") {
      sent += 1;
    }
  }

  return NextResponse.json({ sent, total: customers.length });
}
