import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { customerName, formatDateTime } from "@/lib/format";
import {
  CARRIER_LABELS,
  getFulfillmentStage,
  getTrackingUrl,
  isCarrier,
} from "@/lib/fulfillment";
import TrackingLookup from "./TrackingLookup";
import TrackingTimeline from "./TrackingTimeline";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Suivi de commande — OSMO Recovery",
  description:
    "Suis l'avancement de ta commande OSMO Recovery : confirmation, production, expédition, livraison.",
};

type SearchParams = { order?: string; email?: string };

type SuiviOrder = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  created_at: string;
  production_started_at: string | null;
  shipped_at: string | null;
  delivered_at: string | null;
  tracking_number: string | null;
  tracking_carrier: string | null;
};

async function fetchOrderForSuivi(
  orderId: string,
  email: string,
): Promise<SuiviOrder | null> {
  try {
    const supabase = getSupabaseAdmin();
    // UUID-shaped orderId only; otherwise Postgres rejects the equality cast.
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(orderId)) {
      return null;
    }
    const { data, error } = await supabase
      .from("orders")
      .select(
        "id, email, first_name, last_name, created_at, production_started_at, shipped_at, delivered_at, tracking_number, tracking_carrier",
      )
      .eq("id", orderId)
      .ilike("email", email.trim())
      .maybeSingle();
    if (error) return null;
    return (data as SuiviOrder | null) ?? null;
  } catch (err) {
    console.error("suivi: fetch failed", err);
    return null;
  }
}

export default async function SuiviPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const orderId = searchParams.order?.trim();
  const email = searchParams.email?.trim();
  const order =
    orderId && email ? await fetchOrderForSuivi(orderId, email) : null;
  const notFound = Boolean(orderId && email && !order);

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main
        style={{
          minHeight: "70vh",
          padding: "clamp(48px, 8vw, 96px) 20px",
          background: "var(--paper)",
        }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h1
            style={{
              fontFamily: "var(--font-fraunces), var(--display)",
              fontWeight: 700,
              fontSize: "clamp(32px, 5vw, 48px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--ink)",
              margin: "0 0 12px",
            }}
          >
            Suivi de commande
          </h1>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), var(--body)",
              fontSize: 16,
              color: "var(--ink-2)",
              margin: "0 0 32px",
            }}
          >
            Entre ton numéro de commande et ton email pour suivre l&apos;avancée
            de ton OSMO Recovery.
          </p>

          {!order && (
            <TrackingLookup
              initialOrder={orderId ?? ""}
              initialEmail={email ?? ""}
              notFound={notFound}
            />
          )}

          {order && <OrderSummary order={order} />}
        </div>
      </main>
      <Footer />
    </>
  );
}

function OrderSummary({ order }: { order: SuiviOrder }) {
  const stage = getFulfillmentStage(order);
  const carrier = isCarrier(order.tracking_carrier)
    ? order.tracking_carrier
    : null;
  const trackingUrl = order.tracking_number
    ? getTrackingUrl(carrier, order.tracking_number)
    : null;

  return (
    <div>
      <div
        style={{
          background: "var(--soft, #F4F4F4)",
          borderRadius: 12,
          padding: "20px 24px",
          marginBottom: 32,
          fontFamily: "var(--font-dm-sans), var(--body)",
          color: "var(--ink)",
          fontSize: 15,
        }}
      >
        <div style={{ marginBottom: 4 }}>
          Bonjour{" "}
          <strong>
            {customerName(order.first_name, order.last_name) || order.email}
          </strong>
          .
        </div>
        <div style={{ color: "var(--ink-2)", fontSize: 13 }}>
          Commande passée le {formatDateTime(order.created_at)}.
        </div>
      </div>

      <TrackingTimeline
        stage={stage}
        trackingNumber={order.tracking_number}
        trackingUrl={trackingUrl}
        carrierLabel={carrier ? CARRIER_LABELS[carrier] : null}
        orderId={order.id}
      />

      <div
        style={{
          marginTop: 40,
          padding: "20px 24px",
          background: "#FFFFFF",
          border: "1px solid var(--rule, #E5E5E5)",
          borderRadius: 12,
          fontFamily: "var(--font-dm-sans), var(--body)",
          fontSize: 14,
          color: "var(--ink-2)",
        }}
      >
        Une question ? Écris à{" "}
        <a
          href="mailto:contact@osmo-lab.fr"
          style={{ color: "var(--ink)", textDecoration: "underline" }}
        >
          contact@osmo-lab.fr
        </a>
        .
      </div>
    </div>
  );
}
