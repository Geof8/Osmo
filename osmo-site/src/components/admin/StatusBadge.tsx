type Status = "paid" | "refunded" | "pending";

const LABELS: Record<Status, string> = {
  paid: "Payé",
  refunded: "Remboursé",
  pending: "En attente",
};

export default function StatusBadge({ status }: { status: Status }) {
  return <span className={`admin-badge admin-badge-${status}`}>{LABELS[status]}</span>;
}
