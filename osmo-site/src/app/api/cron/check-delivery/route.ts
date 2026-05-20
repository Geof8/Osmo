import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedCron } from "@/lib/cron-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { lookupTracking } from "@/lib/carriers";
import { sendEmail } from "@/lib/email/send";
import { OrderDelivered } from "@/lib/email/templates/OrderDelivered";
import { GenericMessage } from "@/lib/email/templates/GenericMessage";
import {
  CARRIER_LABELS,
  isCarrier,
  ugcTokenForOrder,
  type Carrier,
} from "@/lib/fulfillment";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LATE_THRESHOLD_DAYS = 15;
const UGC_DELAY_DAYS = 30;

type ShippedOrder = {
  id: string;
  email: string;
  first_name: string | null;
  tracking_number: string | null;
  tracking_carrier: string | null;
  shipped_at: string;
  delivered_at: string | null;
  late_alert_sent_at: string | null;
};

export async function GET(req: NextRequest) {
  if (!isAuthorizedCron(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    req.headers.get("origin") ||
    "https://osmo-lab.fr";
  const alertEmail = process.env.ADMIN_ALERT_EMAIL || "contact@osmo-lab.fr";

  const { data, error } = await supabase
    .from("orders")
    .select(
      "id, email, first_name, tracking_number, tracking_carrier, shipped_at, delivered_at, late_alert_sent_at",
    )
    .not("shipped_at", "is", null)
    .is("delivered_at", null);

  if (error) {
    console.error("check-delivery: fetch failed", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  const orders = (data ?? []) as ShippedOrder[];
  const now = Date.now();
  const summary = {
    scanned: orders.length,
    delivered: 0,
    late_alerts: 0,
    not_configured: 0,
    errors: 0,
  };

  for (const o of orders) {
    if (!o.tracking_number) continue;
    const carrier: Carrier | null = isCarrier(o.tracking_carrier)
      ? o.tracking_carrier
      : null;

    const lookup = await lookupTracking(carrier, o.tracking_number);

    if (lookup.status === "delivered") {
      const deliveredAt = new Date().toISOString();
      const { error: updErr } = await supabase
        .from("orders")
        .update({ delivered_at: deliveredAt })
        .eq("id", o.id);
      if (updErr) {
        console.error("check-delivery: mark delivered failed", o.id, updErr);
        summary.errors += 1;
        continue;
      }
      await sendEmail({
        to: o.email,
        type: "order_delivered",
        subject: "✅ Ton OSMO est arrivé !",
        react: OrderDelivered({
          firstName: o.first_name,
          baseUrl,
          ugcToken: ugcTokenForOrder(o.id),
        }),
        meta: {
          order_id: o.id,
          source: "cron:check-delivery",
          ugc_followup_scheduled_for: new Date(
            now + UGC_DELAY_DAYS * 24 * 3600 * 1000,
          ).toISOString(),
        },
      });
      summary.delivered += 1;
      continue;
    }

    if (lookup.status === "not_configured") {
      summary.not_configured += 1;
      // Still run the late-delivery alert below even without carrier polling.
    } else if (lookup.status === "error") {
      summary.errors += 1;
    }

    if (o.late_alert_sent_at) continue;
    const shippedMs = new Date(o.shipped_at).getTime();
    const daysSinceShip = (now - shippedMs) / (24 * 3600 * 1000);
    if (daysSinceShip < LATE_THRESHOLD_DAYS) continue;

    const carrierLabel = carrier ? CARRIER_LABELS[carrier] : "—";
    const alertRes = await sendEmail({
      to: alertEmail,
      type: "delivery_late_alert",
      subject: `⚠️ Commande ${o.id.slice(0, 8)} — livraison en retard`,
      react: GenericMessage({
        preheader: `Pas de livraison après ${LATE_THRESHOLD_DAYS} jours`,
        title: "⚠️ Livraison en retard",
        greeting: "Alerte fulfillment,",
        body: [
          `Commande ${o.id} (${o.email}) expédiée il y a ${Math.round(daysSinceShip)} jours sans confirmation de livraison.`,
          `Transporteur : ${carrierLabel} · Numéro de suivi : ${o.tracking_number}`,
          `Vérifier le statut côté transporteur et contacter le client si besoin.`,
        ],
      }),
      meta: {
        order_id: o.id,
        days_since_ship: Math.round(daysSinceShip),
        carrier,
      },
    });
    if (alertRes.status === "sent" || alertRes.status === "skipped_no_provider") {
      await supabase
        .from("orders")
        .update({ late_alert_sent_at: new Date().toISOString() })
        .eq("id", o.id);
      summary.late_alerts += 1;
    }
  }

  return NextResponse.json({ ok: true, ...summary });
}
