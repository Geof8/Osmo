import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import BulkEmailModal from "@/components/admin/BulkEmailModal";
import ModuleStats from "@/components/admin/ModuleStats";
import SearchInput from "@/components/admin/SearchInput";
import StatusBadge from "@/components/admin/StatusBadge";
import StatusTabs from "@/components/admin/StatusTabs";
import {
  fetchCustomers,
  type CustomerSegment,
} from "@/lib/admin-queries";
import { formatDate, formatEuros } from "@/lib/format";

export const dynamic = "force-dynamic";

const SEGMENT_LABELS: Record<CustomerSegment, string> = {
  all: "Tous",
  founders: "Fondateurs",
  vip: "VIP",
  abandoned: "Avec abandon",
  "no-purchase": "Sans achat",
};

function normaliseSegment(s: string | undefined): CustomerSegment {
  if (
    s === "founders" ||
    s === "vip" ||
    s === "abandoned" ||
    s === "no-purchase"
  ) {
    return s;
  }
  return "all";
}

export default async function AdminClientsPage({
  searchParams,
}: {
  searchParams: { q?: string; segment?: string };
}) {
  const search = searchParams.q ?? "";
  const segment = normaliseSegment(searchParams.segment);
  const { customers, total, counts } = await fetchCustomers({
    search,
    segment,
  });

  const exportHref = search
    ? `/api/admin/customers/export?q=${encodeURIComponent(search)}`
    : "/api/admin/customers/export";

  const abandonRate =
    counts.all > 0
      ? Math.round((counts.abandoned / counts.all) * 100)
      : 0;

  const tabs: Array<{ value: CustomerSegment; label: string; count: number }> = [
    { value: "all", label: SEGMENT_LABELS.all, count: counts.all },
    { value: "founders", label: SEGMENT_LABELS.founders, count: counts.founders },
    { value: "vip", label: SEGMENT_LABELS.vip, count: counts.vip },
    {
      value: "abandoned",
      label: SEGMENT_LABELS.abandoned,
      count: counts.abandoned,
    },
  ];

  return (
    <>
      <AdminPageHeader
        title="Clients"
        subtitle={`${total} client${total === 1 ? "" : "s"} dans le segment « ${SEGMENT_LABELS[segment]} »`}
        actions={
          <div style={{ display: "flex", gap: 8 }}>
            <BulkEmailModal
              segment={segment}
              recipientCount={customers.length}
              segmentLabel={SEGMENT_LABELS[segment]}
            />
            <Link href={exportHref} className="admin-pill-btn admin-pill-btn-ghost">
              Export CSV
            </Link>
          </div>
        }
      />

      <ModuleStats
        stats={[
          {
            label: "Clients total",
            value: counts.all.toString(),
            accent: true,
          },
          {
            label: "Fondateurs",
            value: counts.founders.toString(),
            hint: "≥ 1 commande payée",
          },
          {
            label: "VIP",
            value: counts.vip.toString(),
            hint: "≥ 2 commandes payées",
            tone: "amber",
          },
          {
            label: "Taux d'abandon",
            value: counts.all > 0 ? `${abandonRate} %` : "—",
            hint: `${counts.abandoned} paniers abandonnés`,
            tone: abandonRate > 40 ? "negative" : "default",
          },
        ]}
      />

      <StatusTabs tabs={tabs} paramName="segment" />

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
          Aucun client dans ce segment.
        </div>
      ) : (
        <div className="admin-card" style={{ overflow: "hidden" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Tags</th>
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
                  <td>
                    {c.tags.length === 0 ? (
                      <span style={{ color: "#AAAAAA" }}>—</span>
                    ) : (
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                        {c.tags.map((t) => (
                          <span
                            key={t}
                            style={{
                              fontFamily: "var(--mono)",
                              fontSize: 9,
                              padding: "1px 6px",
                              borderRadius: 999,
                              background:
                                t === "founder"
                                  ? "#EFE9DC"
                                  : t === "vip"
                                    ? "#FFF4DB"
                                    : t === "fraud-review"
                                      ? "#FBE6E6"
                                      : "#F4F4F4",
                              color:
                                t === "founder"
                                  ? "#8A6310"
                                  : t === "vip"
                                    ? "#A86A00"
                                    : t === "fraud-review"
                                      ? "#B23131"
                                      : "#666666",
                              letterSpacing: "0.06em",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td style={{ color: "#666666", whiteSpace: "nowrap" }}>
                    {c.last_order_at ? (
                      formatDate(c.last_order_at)
                    ) : (
                      <span style={{ color: "#AAAAAA" }}>—</span>
                    )}
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
