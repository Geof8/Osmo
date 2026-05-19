import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { sendEmail } from "@/lib/email/send";
import { OrderConfirmation } from "@/lib/email/templates/OrderConfirmation";
import { checkInventoryAndAlert } from "@/lib/inventory";
import { formatEuros } from "@/lib/format";
import {
  ensureAutomationsSeeded,
  triggerAutomations,
} from "@/lib/automations/runner";
import type { OrderRow } from "@/lib/admin-queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getBaseUrl(req: NextRequest): string {
  return (
    process.env.NEXT_PUBLIC_BASE_URL ??
    req.headers.get("origin") ??
    "https://osmo-lab.fr"
  );
}

function extractPromoCode(session: Stripe.Checkout.Session): string | null {
  const direct = session.metadata?.promo_code;
  if (direct && direct.trim()) return direct.trim();
  const breakdown = session.total_details?.breakdown?.discounts;
  if (breakdown && breakdown.length > 0) {
    const coupon = breakdown[0]?.discount?.coupon;
    if (coupon) {
      const metaCode =
        (coupon.metadata as Record<string, string> | null | undefined)?.code;
      if (metaCode && metaCode.trim()) return metaCode.trim();
      if (coupon.name) return coupon.name;
    }
  }
  return null;
}

async function handleCheckoutCompleted(
  req: NextRequest,
  session: Stripe.Checkout.Session,
) {
  const supabase = getSupabaseAdmin();

  const waitlistId = session.metadata?.waitlist_id || null;
  const email =
    session.customer_details?.email?.toLowerCase() ||
    session.customer_email?.toLowerCase() ||
    null;
  const firstName =
    session.metadata?.first_name ||
    session.customer_details?.name?.split(" ")[0] ||
    null;
  const lastName =
    session.metadata?.last_name ||
    session.customer_details?.name?.split(" ").slice(1).join(" ") ||
    null;

  // 1) Preserve existing waitlist update
  if (email || waitlistId) {
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
    }
    const { error: waitlistError } = await query;
    if (waitlistError) {
      console.error("Webhook waitlist update error:", waitlistError);
    }
  } else {
    console.error("Webhook: no waitlist_id and no email on session", session.id);
  }

  if (!email) {
    return;
  }

  // 2) Upsert into orders (idempotent on stripe_session_id)
  const promoCode = extractPromoCode(session);
  const orderPayload = {
    stripe_session_id: session.id,
    email,
    first_name: firstName,
    last_name: lastName,
    amount_cents: session.amount_total ?? 0,
    promo_code: promoCode,
    status: "paid" as const,
  };

  const { data: orderRow, error: orderError } = await supabase
    .from("orders")
    .upsert(orderPayload, { onConflict: "stripe_session_id" })
    .select("id, created_at")
    .single();

  if (orderError) {
    console.error("Webhook orders upsert error:", orderError);
  }

  // 3) Mark matching abandoned_carts as converted
  const { error: convError } = await supabase
    .from("abandoned_carts")
    .update({ converted: true })
    .eq("email", email)
    .eq("converted", false);
  if (convError) {
    console.error("Webhook abandoned_carts conversion mark failed:", convError);
  }

  // 4) Increment promo usage if applicable
  if (promoCode) {
    const { data: promo } = await supabase
      .from("promo_codes")
      .select("id, usage_count")
      .eq("code", promoCode)
      .maybeSingle();
    if (promo) {
      const next = ((promo as { usage_count: number }).usage_count ?? 0) + 1;
      await supabase
        .from("promo_codes")
        .update({ usage_count: next })
        .eq("id", (promo as { id: string }).id);
    }
  }

  // 5) Send confirmation email (no-op if no Resend key)
  const baseUrl = getBaseUrl(req);
  const orderId = (orderRow as { id: string } | null)?.id ?? "";
  await sendEmail({
    to: email,
    type: "order_confirmation",
    subject: "✓ Ta place dans le Lot N°001 est confirmée",
    react: OrderConfirmation({
      firstName,
      amountLabel: formatEuros(session.amount_total ?? 0),
      baseUrl,
      orderId,
    }),
    meta: { session_id: session.id, order_id: orderId },
  });

  // 6) Inventory alert (idempotent — internally checks 24h cooldown)
  await checkInventoryAndAlert();

  // 7) Trigger automatisations branchées sur "order.paid"
  if (orderRow) {
    await ensureAutomationsSeeded();
    const { data: fullOrder } = await supabase
      .from("orders")
      .select("*")
      .eq("id", (orderRow as { id: string }).id)
      .maybeSingle();
    if (fullOrder) {
      const riskLevel =
        typeof session.payment_intent === "object" &&
        session.payment_intent &&
        "charges" in session.payment_intent
          ? null
          : null; // risk_score lookup nécessite un appel Stripe séparé, à brancher plus tard
      await triggerAutomations({
        event: "order.paid",
        order: { ...(fullOrder as OrderRow), risk_level: riskLevel },
      });
    }
  }
}

async function handleChargeRefunded(charge: Stripe.Charge) {
  const supabase = getSupabaseAdmin();

  const paymentIntentId =
    typeof charge.payment_intent === "string"
      ? charge.payment_intent
      : charge.payment_intent?.id;
  if (!paymentIntentId) {
    console.error("charge.refunded: no payment_intent on charge", charge.id);
    return;
  }

  // Find checkout session that owns this PI
  const stripe = getStripe();
  let sessionId: string | null = null;
  try {
    const list = await stripe.checkout.sessions.list({
      payment_intent: paymentIntentId,
      limit: 1,
    });
    sessionId = list.data[0]?.id ?? null;
  } catch (err) {
    console.error("charge.refunded: list sessions failed", err);
  }

  if (!sessionId) {
    console.error(
      "charge.refunded: could not resolve session for PI",
      paymentIntentId,
    );
    return;
  }

  const { data: refundedOrder, error } = await supabase
    .from("orders")
    .update({ status: "refunded" })
    .eq("stripe_session_id", sessionId)
    .select("*")
    .maybeSingle();
  if (error) {
    console.error("charge.refunded: orders update failed", error);
  }
  if (refundedOrder) {
    await ensureAutomationsSeeded();
    await triggerAutomations({
      event: "order.refunded",
      order: refundedOrder as OrderRow,
    });
  }
}

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

  try {
    if (event.type === "checkout.session.completed") {
      await handleCheckoutCompleted(
        req,
        event.data.object as Stripe.Checkout.Session,
      );
    } else if (event.type === "charge.refunded") {
      await handleChargeRefunded(event.data.object as Stripe.Charge);
    }
  } catch (err) {
    console.error(`Webhook handler error (${event.type}):`, err);
    return NextResponse.json(
      { error: "Handler failure" },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true });
}
