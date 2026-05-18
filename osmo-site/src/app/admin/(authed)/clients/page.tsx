import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import SearchInput from "@/components/admin/SearchInput";
import StatusBadge from "@/components/admin/StatusBadge";
import { fetchCustomers } from "@/lib/admin-queries";
import { formatDate, formatEuros } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminClientsPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const search = searchParams.q ?? "";
  const { customers, total } = await fetchCustomers({ search });

  const exportHref = search
    ? `/api/admin/customers/export?q=${encodeURIComponent(search)}`
    : "/api/admin/customers/export";

  return (
    <>
      <AdminPageHeader
        title="Clients"
        subtitle={`${total} client${total === 1 ? "" : "s"}`}
        actions={
          <Link href={exportHref} className="admin-pill-btn admin-pill-btn-ghost">
            Export CSV
          </Link>
        }
      />

      <div style={{ marginBottom: 18 }}>
        <SearchInput placeholder="Rechercher par nom ou email" paramName="q" />
      </div>

      {customers.length === 0 ? (
        <div
          className="admin-card admin-card-padded"
          style={{
            color: "#888888",
            fontFamily: "var(--body)",
            textAlign: "center",
            padding: "48px 24px",
          }}
        >
          Aucun client ne correspond à cette recherche.
        </div>
      ) : (
        <div className="admin-card" style={{ overflow: "hidden" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Dernière commande</th>
                <th style={{ textAlign: "right" }}>Total dépensé</th>
                <th style={{ textAlign: "right" }}>Commandes</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.email}>
                  <td style={{ fontWeight: 500 }}>{c.first_name ?? "—"}</td>
                  <td style={{ fontWeight: 500 }}>{c.last_name ?? "—"}</td>
                  <td style={{ color: "#666666" }}>{c.email}</td>
                  <td style={{ color: "#666666", whiteSpace: "nowrap" }}>
                    {formatDate(c.last_order_at)}
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {formatEuros(c.total_cents)}
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      fontVariantNumeric: "tabular-nums",
                      color: "#666666",
                    }}
                  >
                    {c.orders_count}
                  </td>
                  <td>
                    <StatusBadge status={c.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
