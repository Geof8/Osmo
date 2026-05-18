import Link from "next/link";
import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import { fetchOrderById } from "@/lib/admin-queries";
import { customerName, formatDateTime, formatEuros } from "@/lib/format";
import RefundButton from "./RefundButton";

export const dynamic = "force-dynamic";

function Field({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <div className="admin-kpi-label" style={{ fontSize: 10 }}>
        {label}
      </div>
      <div
        style={{
          marginTop: 6,
          fontFamily: "var(--body)",
          fontSize: 15,
          color: "#111111",
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default async function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const order = await fetchOrderById(params.id);
  if (!order) notFound();

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Link
          href="/admin/commandes"
          style={{
            fontFamily: "var(--mono)",
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#888888",
            textDecoration: "none",
          }}
        >
          ← Toutes les commandes
        </Link>
      </div>

      <AdminPageHeader
        title={`Commande de ${customerName(order.first_name, order.last_name)}`}
        subtitle={formatDateTime(order.created_at)}
        actions={
          <RefundButton
            orderId={order.id}
            disabled={order.status === "refunded"}
            amountLabel={formatEuros(order.amount_cents)}
          />
        }
      />

      <div
        className="admin-card admin-card-padded"
        style={{ marginBottom: 20 }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 20,
          }}
        >
          <Field label="Statut" value={<StatusBadge status={order.status} />} />
          <Field
            label="Montant"
            value={
              <span style={{ fontWeight: 600, color: "#C8963E" }}>
                {formatEuros(order.amount_cents)}
              </span>
            }
          />
          <Field label="Email" value={order.email} />
          <Field
            label="Code promo"
            value={order.promo_code ?? <span style={{ color: "#999999" }}>—</span>}
          />
        </div>
      </div>

      <div
        className="admin-card admin-card-padded"
        style={{ marginBottom: 20 }}
      >
        <h2
          style={{
            fontFamily: "var(--display)",
            fontWeight: 600,
            fontSize: 16,
            marginBottom: 16,
            color: "#111111",
          }}
        >
          Expédition
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 20,
          }}
        >
          <Field
            label="Numéro de suivi"
            value={
              order.tracking_number ?? (
                <span style={{ color: "#999999" }}>Pas encore expédiée</span>
              )
            }
          />
          <Field
            label="Expédiée le"
            value={
              order.shipped_at ? (
                formatDateTime(order.shipped_at)
              ) : (
                <span style={{ color: "#999999" }}>—</span>
              )
            }
          />
          <Field
            label="Livrée le"
            value={
              order.delivered_at ? (
                formatDateTime(order.delivered_at)
              ) : (
                <span style={{ color: "#999999" }}>—</span>
              )
            }
          />
        </div>
      </div>

      <div className="admin-card admin-card-padded">
        <h2
          style={{
            fontFamily: "var(--display)",
            fontWeight: 600,
            fontSize: 16,
            marginBottom: 16,
            color: "#111111",
          }}
        >
          Identifiants Stripe
        </h2>
        <Field
          label="Session ID"
          value={
            <code
              style={{
                fontFamily: "var(--mono)",
                fontSize: 12,
                color: "#444444",
                wordBreak: "break-all",
              }}
            >
              {order.stripe_session_id}
            </code>
          }
        />
      </div>
    </>
  );
}
