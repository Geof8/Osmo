import Link from "next/link";
import type { OrderRow } from "@/lib/admin-queries";
import { customerName, formatDate, formatEuros } from "@/lib/format";
import StatusBadge from "./StatusBadge";

export default function RecentOrdersTable({ orders }: { orders: OrderRow[] }) {
  if (orders.length === 0) {
    return (
      <div
        className="admin-card admin-card-padded"
        style={{
          color: "#888888",
          fontFamily: "var(--body)",
          textAlign: "center",
          padding: "32px 24px",
        }}
      >
        Aucune commande pour l&apos;instant.
      </div>
    );
  }

  return (
    <div className="admin-card" style={{ overflow: "hidden" }}>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Client</th>
            <th>Email</th>
            <th style={{ textAlign: "right" }}>Montant</th>
            <th>Code promo</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td style={{ whiteSpace: "nowrap", color: "#666666" }}>
                {formatDate(o.created_at)}
              </td>
              <td style={{ fontWeight: 500 }}>
                <Link
                  href={`/admin/commandes/${o.id}`}
                  style={{ color: "#111111", textDecoration: "none" }}
                >
                  {customerName(o.first_name, o.last_name)}
                </Link>
              </td>
              <td style={{ color: "#666666" }}>{o.email}</td>
              <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                {formatEuros(o.amount_cents)}
              </td>
              <td style={{ color: "#666666" }}>
                {o.promo_code ? (
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      color: "#C8963E",
                    }}
                  >
                    {o.promo_code}
                  </span>
                ) : (
                  "—"
                )}
              </td>
              <td>
                <StatusBadge status={o.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
