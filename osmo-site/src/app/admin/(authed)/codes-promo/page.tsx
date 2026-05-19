import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ModuleStats from "@/components/admin/ModuleStats";
import PromoCodeActions from "@/components/admin/PromoCodeActions";
import PromoCodeForm from "@/components/admin/PromoCodeForm";
import SearchInput from "@/components/admin/SearchInput";
import {
  fetchPromoCodes,
  fetchPromoRevenueByCode,
  fetchPromoStats,
  type PromoCodeRow,
} from "@/lib/admin-queries";
import { formatDate, formatDateTime, formatEuros } from "@/lib/format";

export const dynamic = "force-dynamic";

function discountLabel(row: PromoCodeRow): string {
  if (row.discount_type === "percent") return `-${row.discount_value} %`;
  return `-${formatEuros(row.discount_value * 100)}`;
}

function StatusPill({ row }: { row: PromoCodeRow }) {
  const now = Date.now();
  const expired =
    row.expires_at !== null && new Date(row.expires_at).getTime() <= now;
  const notStarted =
    row.starts_at !== null && new Date(row.starts_at).getTime() > now;
  const exhausted =
    row.usage_limit !== null && row.usage_count >= row.usage_limit;
  const notSynced = !row.stripe_promotion_code_id;

  const state = !row.active
    ? { bg: "#F4F4F4", fg: "#888888", label: "Désactivé" }
    : notSynced
      ? { bg: "#FFF4E0", fg: "#A86A00", label: "Non synchronisé" }
      : notStarted
        ? { bg: "#F0E8F8", fg: "#5B2A8A", label: "Programmé" }
        : expired
          ? { bg: "#FBE6E6", fg: "#B23131", label: "Expiré" }
          : exhausted
            ? { bg: "#FBE6E6", fg: "#B23131", label: "Épuisé" }
            : { bg: "#E5F3EC", fg: "#1F7A4D", label: "Actif" };

  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: 999,
        background: state.bg,
        color: state.fg,
        fontFamily: "var(--mono)",
        fontSize: 10,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        fontWeight: 600,
      }}
    >
      {state.label}
    </span>
  );
}

export default async function AdminCodesPromoPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const search = (searchParams.q ?? "").trim().toUpperCase();
  const [allCodes, stats, revenueByCode] = await Promise.all([
    fetchPromoCodes(),
    fetchPromoStats(),
    fetchPromoRevenueByCode(),
  ]);

  const codes = search
    ? allCodes.filter(
        (c) =>
          c.code.includes(search) ||
          (c.description ?? "").toUpperCase().includes(search) ||
          c.tags.some((t) => t.toUpperCase().includes(search)),
      )
    : allCodes;

  return (
    <>
      <AdminPageHeader
        title="Réductions"
        subtitle="Codes promo et réductions. Synchro Stripe en temps réel."
      />

      <div style={{ marginBottom: 16 }}>
        <PromoCodeForm />
      </div>

      <ModuleStats
        stats={[
          {
            label: "Réductions actives",
            value: `${stats.activeCount}`,
            hint: `sur ${stats.totalCount} créées`,
            accent: true,
          },
          {
            label: "Redemptions 30 j",
            value: stats.redemptions30d.toString(),
          },
          {
            label: "CA via codes 30 j",
            value: formatEuros(stats.revenue30dCents),
            tone: "positive",
          },
          {
            label: "Panier moyen",
            value:
              stats.redemptions30d > 0
                ? formatEuros(stats.revenue30dCents / stats.redemptions30d)
                : "—",
          },
        ]}
      />

      <div style={{ marginBottom: 16, display: "flex", gap: 12 }}>
        <SearchInput placeholder="Rechercher un code, tag ou description" />
      </div>

      {codes.length === 0 ? (
        <div
          className="admin-card admin-card-padded"
          style={{
            color: "#888888",
            fontFamily: "var(--body)",
            textAlign: "center",
            padding: "48px 24px",
          }}
        >
          {search
            ? "Aucune réduction ne correspond à cette recherche."
            : "Aucune réduction créée pour le moment."}
        </div>
      ) : (
        <div className="admin-card" style={{ overflow: "hidden" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Remise</th>
                <th>Conditions</th>
                <th style={{ textAlign: "right" }}>Usages</th>
                <th style={{ textAlign: "right" }}>CA généré</th>
                <th>Période</th>
                <th>Statut</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {codes.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 13,
                        letterSpacing: "0.08em",
                        color: "#C8963E",
                        fontWeight: 600,
                      }}
                    >
                      {row.code}
                    </div>
                    {row.description && (
                      <div
                        style={{
                          fontSize: 11,
                          color: "#888888",
                          marginTop: 2,
                        }}
                      >
                        {row.description}
                      </div>
                    )}
                    {row.tags.length > 0 && (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 4,
                          marginTop: 4,
                        }}
                      >
                        {row.tags.map((t) => (
                          <span
                            key={t}
                            style={{
                              fontFamily: "var(--mono)",
                              fontSize: 9,
                              padding: "1px 6px",
                              borderRadius: 999,
                              background: "#F4F4F4",
                              color: "#666666",
                              letterSpacing: "0.06em",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td
                    style={{
                      fontWeight: 600,
                      color: "#111111",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {discountLabel(row)}
                  </td>
                  <td style={{ fontSize: 12, color: "#666666" }}>
                    {row.min_order_amount_cents != null && (
                      <div>
                        Panier ≥ {formatEuros(row.min_order_amount_cents)}
                      </div>
                    )}
                    {row.first_time_only && <div>1er achat uniquement</div>}
                    {row.limit_per_customer != null && (
                      <div>{row.limit_per_customer} / client</div>
                    )}
                    {row.min_order_amount_cents == null &&
                      !row.first_time_only &&
                      row.limit_per_customer == null && (
                        <span style={{ color: "#AAAAAA" }}>—</span>
                      )}
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      fontVariantNumeric: "tabular-nums",
                      color: "#666666",
                    }}
                  >
                    {row.usage_count}
                    {row.usage_limit !== null ? (
                      <span style={{ color: "#999999" }}>
                        {" / "}
                        {row.usage_limit}
                      </span>
                    ) : null}
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      fontVariantNumeric: "tabular-nums",
                      color: "#111111",
                      fontWeight: 500,
                    }}
                  >
                    {revenueByCode.get(row.code) ? (
                      formatEuros(revenueByCode.get(row.code) ?? 0)
                    ) : (
                      <span style={{ color: "#AAAAAA" }}>—</span>
                    )}
                  </td>
                  <td
                    style={{
                      color: "#666666",
                      fontSize: 12,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.starts_at && (
                      <div>Démarre {formatDate(row.starts_at)}</div>
                    )}
                    {row.expires_at ? (
                      <div>Expire {formatDateTime(row.expires_at)}</div>
                    ) : !row.starts_at ? (
                      <span style={{ color: "#999999" }}>Toujours valide</span>
                    ) : null}
                    <div style={{ color: "#999999", fontSize: 11, marginTop: 2 }}>
                      Créé {formatDate(row.created_at)}
                    </div>
                  </td>
                  <td>
                    <StatusPill row={row} />
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <PromoCodeActions
                      id={row.id}
                      code={row.code}
                      active={row.active}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p
        style={{
          marginTop: 16,
          fontSize: 12,
          color: "#888888",
          fontFamily: "var(--body)",
        }}
      >
        Les codes sont synchronisés en temps réel avec Stripe (coupon +
        promotion code, restrictions de panier et 1er achat incluses).
      </p>
    </>
  );
}
