import {
  STAGE_LABELS,
  type FulfillmentStage,
} from "@/lib/fulfillment";

type BillingStatus = "paid" | "refunded" | "pending";

const BILLING_LABELS: Record<BillingStatus, string> = {
  paid: "Payé",
  refunded: "Remboursé",
  pending: "En attente",
};

const STAGE_CLASS: Record<FulfillmentStage, string> = {
  paid: "admin-badge-paid",
  in_production: "admin-badge-production",
  shipped: "admin-badge-shipped",
  delivered: "admin-badge-delivered",
};

export default function StatusBadge({
  status,
  stage,
}: {
  status?: BillingStatus;
  stage?: FulfillmentStage;
}) {
  if (stage) {
    return (
      <span className={`admin-badge ${STAGE_CLASS[stage]}`}>
        {STAGE_LABELS[stage]}
      </span>
    );
  }
  const s: BillingStatus = status ?? "paid";
  return (
    <span className={`admin-badge admin-badge-${s}`}>{BILLING_LABELS[s]}</span>
  );
}
