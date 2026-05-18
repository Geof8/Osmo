import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const rawBody = await req.text();
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    console.error("Stripe webhook signature error:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const supabase = getSupabaseAdmin();

  const waitlistId = session.metadata?.waitlist_id || null;
  const email =
    session.customer_details?.email?.toLowerCase() ||
    session.customer_email?.toLowerCase() ||
    null;

  const updatePayload = {
    status: "paid" as const,
    stripe_session_id: session.id,
    stripe_customer_id:
      typeof session.customer === "string" ? session.customer : null,
    shipping_address: (session.collected_information?.shipping_details ??
      session.shipping_details ??
      null) as Record<string, unknown> | null,
    amount_paid_cents: session.amount_total ?? null,
    paid_at: new Date().toISOString(),
  };

  let query = supabase.from("waitlist").update(updatePayload);
  if (waitlistId) {
    query = query.eq("id", waitlistId);
  } else if (email) {
    query = query.eq("email", email);
  } else {
    console.error("Webhook: no waitlist_id and no email on session", session.id);
    return NextResponse.json({ received: true });
  }

  const { error } = await query;
  if (error) {
    console.error("Webhook supabase update error:", error);
    return NextResponse.json({ error: "DB update failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
