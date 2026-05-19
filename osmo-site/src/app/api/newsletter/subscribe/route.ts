import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { sendEmail } from "@/lib/email/send";
import { NewsletterWelcome } from "@/lib/email/templates/NewsletterWelcome";
import {
  NEWSLETTER_PROMO_CODE,
  unsubscribeUrl,
} from "@/lib/newsletter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { email?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Email invalide" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  const { data: existing } = await supabase
    .from("newsletter_subscribers")
    .select("id, active, unsubscribe_token")
    .eq("email", email)
    .maybeSingle();

  if (existing) {
    if (existing.active) {
      return NextResponse.json(
        { ok: false, already: true, message: "Tu es déjà abonné." },
        { status: 409 },
      );
    }
    // Re-activate a previously unsubscribed address.
    const { error: updateError } = await supabase
      .from("newsletter_subscribers")
      .update({ active: true })
      .eq("id", existing.id);
    if (updateError) {
      console.error("newsletter subscribe re-activate:", updateError);
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
  } else {
    const { error: insertError } = await supabase
      .from("newsletter_subscribers")
      .insert({ email });
    if (insertError) {
      console.error("newsletter subscribe insert:", insertError);
      if (insertError.code === "23505") {
        return NextResponse.json(
          { ok: false, already: true, message: "Tu es déjà abonné." },
          { status: 409 },
        );
      }
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
  }

  // Fetch the row again so we have the unsubscribe token to put in the email.
  const { data: row } = await supabase
    .from("newsletter_subscribers")
    .select("id, unsubscribe_token")
    .eq("email", email)
    .maybeSingle();

  const token = row?.unsubscribe_token ?? "";

  const mail = await sendEmail({
    to: email,
    type: "newsletter_welcome",
    subject: "Ton code -15% OSMO + bienvenue 🔬",
    react: NewsletterWelcome({
      promoCode: NEWSLETTER_PROMO_CODE,
      unsubscribeUrl: unsubscribeUrl(token),
    }),
    meta: { source: "newsletter_signup" },
  });

  if (mail.status === "sent" && row) {
    await supabase
      .from("newsletter_subscribers")
      .update({ promo_sent: true })
      .eq("id", row.id);
  } else if (mail.status !== "sent") {
    console.warn("Newsletter welcome email:", mail.status, mail.error);
  }

  return NextResponse.json({ ok: true });
}
