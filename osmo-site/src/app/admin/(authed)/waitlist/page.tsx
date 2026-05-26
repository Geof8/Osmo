import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import KpiCard from "@/components/admin/KpiCard";
import SearchInput from "@/components/admin/SearchInput";
import DeleteWaitlistButton from "./DeleteWaitlistButton";
import {
  fetchWaitlistCount,
  fetchWaitlistPage,
} from "@/lib/admin-waitlist";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const PER_PAGE = 20;

function formatSource(s: string) {
  if (s === "maintenance") return "Page maintenance";
  if (s === "lot2-waitlist") return "Liste d'attente Lot 2";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function StatusBadge() {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: 999,
        background: "#E5F3EC",
        color: "#1F7A4D",
        fontFamily: "var(--mono)",
        fontSize: 10,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        fontWeight: 600,
      }}
    >
      En attente
    </span>
  );
}

export default async function AdminWaitlistPage({
  searchParams,
}: {
  searchParams: { page?: string; q?: string };
}) {
  const q = searchParams.q?.trim() || undefined;
  const parsedPage = Number.parseInt(searchParams.page ?? "1", 10);
  const page = Number.isFinite(parsedPage) ? Math.max(1, parsedPage) : 1;

  const [totalCount, { rows, totalMatching }] = await Promise.all([
    fetchWaitlistCount(),
    fetchWaitlistPage({ page, perPage: PER_PAGE, q }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalMatching / PER_PAGE));
  const exportHref = q
    ? `/api/admin/waitlist/export?q=${encodeURIComponent(q)}`
    : "/api/admin/waitlist/export";

  function pageHref(p: number) {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (p > 1) sp.set("page", String(p));
    const qs = sp.toString();
    return qs ? `/admin/waitlist?${qs}` : "/admin/waitlist";
  }

  return (
    <>
      <AdminPageHeader
        title="Liste d'attente"
        subtitle="Inscriptions collectées via la page maintenance et le formulaire Lot 2."
        actions={
          <Link
            href={exportHref}
            className="admin-pill-btn admin-pill-btn-ghost"
          >
            Exporter CSV
          </Link>
        }
      />

      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 320px)",
          }}
        >
          <KpiCard
            label="Total inscriptions"
            value={totalCount.toLocaleString("fr-FR")}
            hint="personnes en attente du lancement"
            accent
          />
        </div>
      </div>

      <div style={{ marginBottom: 18 }}>
        <SearchInput placeholder="Rechercher par email" paramName="q" />
      </div>

      {rows.length === 0 ? (
        <div
          className="admin-card admin-card-padded"
          style={{
            color: "#888888",
            fontFamily: "var(--body)",
            textAlign: "center",
            padding: "48px 24px",
          }}
        >
          Aucune inscription pour le moment.
        </div>
      ) : (
        <>
          <div className="admin-card" style={{ overflow: "hidden" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Email</th>
                  <th>Source</th>
                  <th>Statut</th>
                  <th style={{ textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td style={{ color: "#666666", whiteSpace: "nowrap" }}>
                      {formatDate(row.created_at)}
                    </td>
                    <td style={{ fontWeight: 500 }}>{row.email}</td>
                    <td style={{ color: "#666666" }}>
                      {formatSource(row.source)}
                    </td>
                    <td>
                      <StatusBadge />
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <DeleteWaitlistButton id={row.id} email={row.email} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div
              style={{
                marginTop: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                fontFamily: "var(--body)",
                fontSize: 13,
                color: "#666666",
              }}
            >
              <div>
                {totalMatching.toLocaleString("fr-FR")} inscription
                {totalMatching === 1 ? "" : "s"}
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                {page > 1 ? (
                  <Link
                    href={pageHref(page - 1)}
                    className="admin-pill-btn admin-pill-btn-ghost"
                  >
                    ← Précédent
                  </Link>
                ) : (
                  <span
                    className="admin-pill-btn admin-pill-btn-ghost"
                    style={{
                      opacity: 0.4,
                      pointerEvents: "none",
                    }}
                  >
                    ← Précédent
                  </span>
                )}
                <span style={{ fontVariantNumeric: "tabular-nums" }}>
                  Page {page} / {totalPages}
                </span>
                {page < totalPages ? (
                  <Link
                    href={pageHref(page + 1)}
                    className="admin-pill-btn admin-pill-btn-ghost"
                  >
                    Suivant →
                  </Link>
                ) : (
                  <span
                    className="admin-pill-btn admin-pill-btn-ghost"
                    style={{
                      opacity: 0.4,
                      pointerEvents: "none",
                    }}
                  >
                    Suivant →
                  </span>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
