export type FulfillmentStage =
  | "paid"
  | "in_production"
  | "shipped"
  | "delivered";

export type Carrier = "colissimo" | "chronopost" | "dhl" | "other";

export const CARRIER_LABELS: Record<Carrier, string> = {
  colissimo: "Colissimo",
  chronopost: "Chronopost",
  dhl: "DHL",
  other: "Autre",
};

export const STAGE_LABELS: Record<FulfillmentStage, string> = {
  paid: "Payé",
  in_production: "En production",
  shipped: "Expédié",
  delivered: "Livré",
};

export const STAGE_EMOJI: Record<FulfillmentStage, string> = {
  paid: "✅",
  in_production: "🔬",
  shipped: "📦",
  delivered: "🎉",
};

export const STAGE_ORDER: FulfillmentStage[] = [
  "paid",
  "in_production",
  "shipped",
  "delivered",
];

type OrderTimestamps = {
  production_started_at?: string | null;
  shipped_at?: string | null;
  delivered_at?: string | null;
};

export function getFulfillmentStage(order: OrderTimestamps): FulfillmentStage {
  if (order.delivered_at) return "delivered";
  if (order.shipped_at) return "shipped";
  if (order.production_started_at) return "in_production";
  return "paid";
}

export function isCarrier(value: unknown): value is Carrier {
  return (
    value === "colissimo" ||
    value === "chronopost" ||
    value === "dhl" ||
    value === "other"
  );
}

export function isFulfillmentStage(value: unknown): value is FulfillmentStage {
  return (
    value === "paid" ||
    value === "in_production" ||
    value === "shipped" ||
    value === "delivered"
  );
}

export function getTrackingUrl(
  carrier: Carrier | null | undefined,
  trackingNumber: string,
): string | null {
  if (!trackingNumber) return null;
  const tn = encodeURIComponent(trackingNumber);
  switch (carrier) {
    case "colissimo":
      return `https://www.laposte.fr/outils/suivre-vos-envois?code=${tn}`;
    case "chronopost":
      return `https://www.chronopost.fr/tracking-no-cms/suivi-page?listeNumerosLT=${tn}`;
    case "dhl":
      return `https://www.dhl.com/fr-fr/home/tracking/tracking-parcel.html?submit=1&tracking-id=${tn}`;
    default:
      return null;
  }
}

/**
 * Token used in /ugc/[token] post-delivery review request links.
 * Stable per-order and reversible server-side (base64url of the order UUID).
 * No PII is leaked; the UGC route can validate the order exists.
 */
export function ugcTokenForOrder(orderId: string): string {
  return Buffer.from(orderId, "utf-8").toString("base64url");
}
