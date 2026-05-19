import AdminPageHeader from "@/components/admin/AdminPageHeader";
import PromoCodeActions from "@/components/admin/PromoCodeActions";
import PromoCodeForm from "@/components/admin/PromoCodeForm";
import { fetchPromoCodes, type PromoCodeRow } from "@/lib/admin-queries";
import { formatDate, formatDateTime, formatEuros } from "@/lib/format";

export const dynamic = "force-dynamic";

function discountLabel(row: PromoCodeRow): string {
  if (row.discount_type === "percent") return `-${row.discount_value}%`;
  return `-${formatEuros(row.discount_value * 100)}`;
}

function StatusPill({ row }: { row: PromoCodeRow }) {
  const expired =
    row.expires_at !== null &&
    new Date(row.expires_at).getTime() <= Date.now();
  const exhausted =
    row.usage_limit !== null && row.usage_count >= row.usage_limit;
  const notSynced = !row.stripe_promotion_code_id;

  const state = !row.active
    ? { bg: "#F4F4F4", fg: "#888888", label: "Désactivé" }
    : notSynced
      ? { bg: "#FFF4E0", fg: "#A86A00", label: "Non synchronisé" }
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

export default async function AdminCodesPromoPage() {
  const codes = await fetchPromoCodes();

  return (
    <>
      <AdminPageHeader
        title="Codes promo"
        subtitle={`${codes.length} code${codes.length === 1 ? "" : "s"}`}
        actions={<PromoCodeForm />}
      />

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
          Aucun code promo créé pour le moment.
        </div>
      ) : (
        <div className="admin-card" style={{ overflow: "hidden" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Remise</th>
                <th style={{ textAlign: "right" }}>Utilisations</th>
                <th>Expiration</th>
                <th>Créé le</th>
                <th>Statut</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {codes.map((row) => (
                <tr key={row.id}>
                  <td>
                    <span
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 13,
                        letterSpacing: "0.08em",
                        color: "#C8963E",
                        fontWeight: 600,
                      }}
                    >
                      {row.code}
                    </span>
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
                        {" "}
                        / {row.usage_limit}
                      </span>
                    ) : null}
                  </td>
                  <td style={{ color: "#666666", whiteSpace: "nowrap" }}>
                    {row.expires_at ? (
                      formatDateTime(row.expires_at)
                    ) : (
                      <span style={{ color: "#999999" }}>—</span>
                    )}
                  </td>
                  <td style={{ color: "#666666", whiteSpace: "nowrap" }}>
                    {formatDate(row.created_at)}
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
        promotion code). Les codes existants sans ID Stripe (ex. seed initial)
        doivent être synchronisés via le script <code>seed-bienvenue10.ts</code>.
      </p>
    </>
  );
}
