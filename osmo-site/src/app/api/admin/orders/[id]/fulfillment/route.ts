import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { fetchOrderById } from "@/lib/admin-queries";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { sendEmail } from "@/lib/email/send";
import { OrderInProduction } from "@/lib/email/templates/OrderInProduction";
import { OrderShipped } from "@/lib/email/templates/OrderShipped";
import { OrderDelivered } from "@/lib/email/templates/OrderDelivered";
import {
  CARRIER_LABELS,
  getFulfillmentStage,
  getTrackingUrl,
  isCarrier,
  isFulfillmentStage,
  STAGE_ORDER,
  ugcTokenForOrder,
  type Carrier,
  type FulfillmentStage,
} from "@/lib/fulfillment";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function rank(stage: FulfillmentStage): number {
  return STAGE_ORDER.indexOf(stage);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const unauth = await requireAdmin(req);
  if (unauth) return unauth;

  let body: {
    stage?: unknown;
    tracking_number?: unknown;
    carrier?: unknown;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isFulfillmentStage(body.stage)) {
    return NextResponse.json({ error: "Étape invalide" }, { status: 400 });
  }
  const targetStage: FulfillmentStage = body.stage;

  const order = await fetchOrderById(params.id);
  if (!order) {
    return NextResponse.json(
      { error: "Commande introuvable" },
      { status: 404 },
    );
  }
  if (order.status === "refunded") {
    return NextResponse.json(
      { error: "Commande remboursée — changement impossible" },
      { status: 400 },
    );
  }

  const currentStage = getFulfillmentStage(order);
  if (rank(targetStage) <= rank(currentStage)) {
    return NextResponse.json(
      {
        error: `Étape actuelle déjà ≥ « ${targetStage} ». Les retours en arrière ne sont pas autorisés.`,
      },
      { status: 400 },
    );
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    req.headers.get("origin") ||
    "https://osmo-lab.fr";
  const supabase = getSupabaseAdmin();
  const nowIso = new Date().toISOString();

  // For each "skipped" stage between current and target, fill its timestamp
  // so the fulfillment history stays consistent (e.g. paid → shipped without
  // ever marking in_production still records production_started_at = now).
  const updates: Record<string, string | null> = {};
  const stagesBetween = STAGE_ORDER.slice(
    rank(currentStage) + 1,
    rank(targetStage) + 1,
  );
  for (const s of stagesBetween) {
    if (s === "in_production") updates.production_started_at = nowIso;
    if (s === "shipped") updates.shipped_at = nowIso;
    if (s === "delivered") updates.delivered_at = nowIso;
  }

  if (targetStage === "shipped") {
    const trackingNumber =
      typeof body.tracking_number === "string"
        ? body.tracking_number.trim()
        : "";
    if (!trackingNumber) {
      return NextResponse.json(
        { error: "Numéro de suivi requis pour passer à « Expédié »." },
        { status: 400 },
      );
    }
    if (!isCarrier(body.carrier)) {
      return NextResponse.json(
        { error: "Transporteur invalide." },
        { status: 400 },
      );
    }
    updates.tracking_number = trackingNumber;
    updates.tracking_carrier = body.carrier;
  }

  const { error: updateError } = await supabase
    .from("orders")
    .update(updates)
    .eq("id", order.id);
  if (updateError) {
    console.error("fulfillment: orders update failed", updateError);
    return NextResponse.json(
      { error: "Échec de mise à jour" },
      { status: 500 },
    );
  }

  // Send the email matching the final target stage. We don't fan out emails
  // for skipped intermediate stages — only one message per admin click.
  const emailResult = await sendStageEmail({
    stage: targetStage,
    order: {
      id: order.id,
      email: order.email,
      first_name: order.first_name,
    },
    trackingNumber:
      typeof updates.tracking_number === "string"
        ? updates.tracking_number
        : order.tracking_number,
    carrier:
      typeof updates.tracking_carrier === "string" &&
      isCarrier(updates.tracking_carrier)
        ? updates.tracking_carrier
        : isCarrier(order.tracking_carrier)
          ? order.tracking_carrier
          : null,
    baseUrl,
  });

  return NextResponse.json({
    ok: true,
    stage: targetStage,
    email_status: emailResult.status,
  });
}

async function sendStageEmail(args: {
  stage: FulfillmentStage;
  order: { id: string; email: string; first_name: string | null };
  trackingNumber: string | null;
  carrier: Carrier | null;
  baseUrl: string;
}) {
  const { stage, order, trackingNumber, carrier, baseUrl } = args;

  if (stage === "in_production") {
    return sendEmail({
      to: order.email,
      type: "order_in_production",
      subject: "🔬 Ta commande OSMO est en production",
      react: OrderInProduction({
        firstName: order.first_name,
        baseUrl,
        orderId: order.id,
      }),
      meta: { order_id: order.id },
    });
  }

  if (stage === "shipped") {
    if (!trackingNumber) return { status: "skipped_no_provider" as const };
    return sendEmail({
      to: order.email,
      type: "order_shipped",
      subject: "📦 Ton OSMO est en route !",
      react: OrderShipped({
        firstName: order.first_name,
        trackingNumber,
        trackingUrl: getTrackingUrl(carrier, trackingNumber),
        carrierLabel: carrier ? CARRIER_LABELS[carrier] : null,
        baseUrl,
        orderId: order.id,
      }),
      meta: {
        order_id: order.id,
        tracking_number: trackingNumber,
        carrier,
      },
    });
  }

  if (stage === "delivered") {
    return sendEmail({
      to: order.email,
      type: "order_delivered",
      subject: "✅ Ton OSMO est arrivé !",
      react: OrderDelivered({
        firstName: order.first_name,
        baseUrl,
        ugcToken: ugcTokenForOrder(order.id),
      }),
      meta: { order_id: order.id },
    });
  }

  return { status: "skipped_no_provider" as const };
}
