import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { requireAdmin } from "@/lib/admin-auth";
import { fetchOrderById } from "@/lib/admin-queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const unauth = await requireAdmin(req);
  if (unauth) return unauth;

  const order = await fetchOrderById(params.id);
  if (!order) {
    return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });
  }
  if (order.status === "refunded") {
    return NextResponse.json(
      { error: "Commande déjà remboursée" },
      { status: 400 },
    );
  }

  const stripe = getStripe();

  // Pull payment_intent from the original checkout session.
  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(order.stripe_session_id);
  } catch (err) {
    console.error("refund: stripe session retrieve failed", err);
    return NextResponse.json(
      { error: "Session Stripe introuvable" },
      { status: 500 },
    );
  }

  const paymentIntent =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id;
  if (!paymentIntent) {
    return NextResponse.json(
      { error: "Aucun paiement à rembourser" },
      { status: 400 },
    );
  }

  try {
    await stripe.refunds.create({ payment_intent: paymentIntent });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Échec du remboursement Stripe";
    console.error("refund: stripe.refunds.create failed", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }

  const supabase = getSupabaseAdmin();
  const { error: updateError } = await supabase
    .from("orders")
    .update({ status: "refunded" })
    .eq("id", order.id);
  if (updateError) {
    console.error("refund: supabase update failed", updateError);
    return NextResponse.json(
      { error: "Remboursement Stripe OK, mais échec de mise à jour DB" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
