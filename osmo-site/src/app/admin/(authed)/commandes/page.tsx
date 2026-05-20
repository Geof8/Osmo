import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Pagination from "@/components/admin/Pagination";
import SearchInput from "@/components/admin/SearchInput";
import StatusBadge from "@/components/admin/StatusBadge";
import StatusTabs from "@/components/admin/StatusTabs";
import {
  fetchOrders,
  fetchOrderFulfillmentCounts,
} from "@/lib/admin-queries";
import { customerName, formatDate, formatEuros } from "@/lib/format";
import { getFulfillmentStage, isFulfillmentStage } from "@/lib/fulfillment";

export const dynamic = "force-dynamic";

type SearchParams = {
  q?: string;
  stage?: string;
  page?: string;
};

export default async function AdminCommandesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const search = searchParams.q ?? "";
  const stage = isFulfillmentStage(searchParams.stage)
    ? searchParams.stage
    : "all";
  const page = Math.max(1, Number.parseInt(searchParams.page ?? "1", 10) || 1);

  const [{ orders, total, pageSize }, counts] = await Promise.all([
    fetchOrders({ search, stage, page }),
    fetchOrderFulfillmentCounts(),
  ]);

  const exportHref = `/api/admin/orders/export${
    new URLSearchParams({
      ...(search ? { q: search } : {}),
      ...(stage !== "all" ? { stage } : {}),
    }).toString()
      ? `?${new URLSearchParams({
          ...(search ? { q: search } : {}),
          ...(stage !== "all" ? { stage } : {}),
        }).toString()}`
      : ""
  }`;

  const queryString = new URLSearchParams({
    ...(search ? { q: search } : {}),
    ...(stage !== "all" ? { stage } : {}),
  }).toString();

  return (
    <>
      <AdminPageHeader
        title="Commandes"
        subtitle={`${total} commande${total === 1 ? "" : "s"} au total`}
        actions={
          <Link href={exportHref} className="admin-pill-btn admin-pill-btn-ghost">
            Export CSV
          </Link>
        }
      />

      <StatusTabs
        paramName="stage"
        tabs={[
          { value: "all", label: "Toutes", count: counts.all },
          { value: "paid", label: "Payées", count: counts.paid },
          {
            value: "in_production",
            label: "En production",
            count: counts.in_production,
          },
          { value: "shipped", label: "Expédiées", count: counts.shipped },
          { value: "delivered", label: "Livrées", count: counts.delivered },
        ]}
      />

      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 16,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <SearchInput placeholder="Rechercher par nom ou email" paramName="q" />
        <div
          style={{
            marginLeft: "auto",
            fontFamily: "var(--mono)",
            fontSize: 11,
            color: "#888888",
            letterSpacing: "0.06em",
          }}
        >
          {orders.length} sur {total} affiché{orders.length > 1 ? "s" : ""}
        </div>
      </div>

      {orders.length === 0 ? (
        <div
          className="admin-card admin-card-padded"
          style={{
            color: "#888888",
            fontFamily: "var(--body)",
            textAlign: "center",
            padding: "48px 24px",
          }}
        >
          Aucune commande ne correspond à cette recherche.
        </div>
      ) : (
        <div className="admin-card" style={{ overflow: "hidden" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Client</th>
                <th>Email</th>
                <th style={{ textAlign: "right" }}>Montant</th>
                <th>Code promo</th>
                <th>Étape</th>
                <th>Paiement</th>
                <th style={{ textAlign: "right" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={o.id}>
                  <td style={{ color: "#999999", fontFamily: "var(--mono)" }}>
                    {(page - 1) * pageSize + i + 1}
                  </td>
                  <td style={{ whiteSpace: "nowrap", color: "#666666" }}>
                    {formatDate(o.created_at)}
                  </td>
                  <td style={{ fontWeight: 500 }}>
                    {customerName(o.first_name, o.last_name)}
                  </td>
                  <td style={{ color: "#666666" }}>{o.email}</td>
                  <td
                    style={{
                      textAlign: "right",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {formatEuros(o.amount_cents)}
                  </td>
                  <td>
                    {o.promo_code ? (
                      <span
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: 11,
                          color: "#C8963E",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {o.promo_code}
                      </span>
                    ) : (
                      <span style={{ color: "#999999" }}>—</span>
                    )}
                  </td>
                  <td>
                    <StatusBadge stage={getFulfillmentStage(o)} />
                  </td>
                  <td>
                    {o.status === "refunded" ? (
                      <StatusBadge status="refunded" />
                    ) : (
                      <span style={{ color: "#999999", fontSize: 12 }}>—</span>
                    )}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <Link
                      href={`/admin/commandes/${o.id}`}
                      style={{
                        color: "#111111",
                        fontSize: 13,
                        textDecoration: "underline",
                        textUnderlineOffset: 3,
                      }}
                    >
                      Voir
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination
        page={page}
        pageSize={pageSize}
        total={total}
        searchString={queryString}
      />
    </>
  );
}

