import "server-only";
import type { Carrier } from "@/lib/fulfillment";

export type CarrierStatus =
  | "delivered"
  | "in_transit"
  | "unknown"
  | "error"
  | "not_configured";

export type CarrierLookup = {
  status: CarrierStatus;
  raw?: unknown;
  error?: string;
};

/**
 * Polls the appropriate carrier API for delivery status.
 *
 * Required env vars (each carrier independent):
 *   - LAPOSTE_API_KEY  → both Colissimo & Chronopost via api.laposte.fr/suivi/v2
 *   - DHL_API_KEY      → DHL Shipment Tracking Unified
 *
 * Returns `not_configured` when no key is set so the cron can short-circuit
 * gracefully instead of marking orders as failed.
 */
export async function lookupTracking(
  carrier: Carrier | null,
  trackingNumber: string,
): Promise<CarrierLookup> {
  if (!trackingNumber) return { status: "unknown" };

  if (carrier === "colissimo" || carrier === "chronopost") {
    return lookupLaPoste(trackingNumber);
  }
  if (carrier === "dhl") return lookupDhl(trackingNumber);
  return { status: "unknown" };
}

async function lookupLaPoste(trackingNumber: string): Promise<CarrierLookup> {
  const key = process.env.LAPOSTE_API_KEY;
  if (!key) return { status: "not_configured" };

  try {
    const res = await fetch(
      `https://api.laposte.fr/suivi/v2/idships/${encodeURIComponent(trackingNumber)}?lang=fr_FR`,
      {
        headers: { "X-Okapi-Key": key, Accept: "application/json" },
        cache: "no-store",
      },
    );
    if (!res.ok) {
      return { status: "error", error: `La Poste HTTP ${res.status}` };
    }
    const data = (await res.json()) as {
      shipment?: { isFinal?: boolean; event?: Array<{ code?: string }> };
    };
    const events = data.shipment?.event ?? [];
    const lastCode = events[events.length - 1]?.code ?? "";
    // DI1/DI2/LIV codes mean delivered in La Poste's status taxonomy.
    const isDelivered =
      data.shipment?.isFinal === true ||
      /^DI/i.test(lastCode) ||
      lastCode === "LIV";
    return {
      status: isDelivered ? "delivered" : "in_transit",
      raw: data,
    };
  } catch (err) {
    return {
      status: "error",
      error: err instanceof Error ? err.message : "lookup failed",
    };
  }
}

async function lookupDhl(trackingNumber: string): Promise<CarrierLookup> {
  const key = process.env.DHL_API_KEY;
  if (!key) return { status: "not_configured" };

  try {
    const res = await fetch(
      `https://api-eu.dhl.com/track/shipments?trackingNumber=${encodeURIComponent(trackingNumber)}`,
      {
        headers: { "DHL-API-Key": key, Accept: "application/json" },
        cache: "no-store",
      },
    );
    if (!res.ok) {
      return { status: "error", error: `DHL HTTP ${res.status}` };
    }
    const data = (await res.json()) as {
      shipments?: Array<{ status?: { statusCode?: string } }>;
    };
    const code = data.shipments?.[0]?.status?.statusCode ?? "";
    const isDelivered = code.toLowerCase() === "delivered";
    return {
      status: isDelivered ? "delivered" : "in_transit",
      raw: data,
    };
  } catch (err) {
    return {
      status: "error",
      error: err instanceof Error ? err.message : "lookup failed",
    };
  }
}
