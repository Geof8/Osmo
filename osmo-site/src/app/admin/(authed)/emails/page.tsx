import AdminPageHeader from "@/components/admin/AdminPageHeader";
import EnumFilter from "@/components/admin/EnumFilter";
import Pagination from "@/components/admin/Pagination";
import { fetchEmailLogs } from "@/lib/admin-queries";
import { formatDateTime } from "@/lib/format";

export const dynamic = "force-dynamic";

const TYPE_OPTIONS = [
  { value: "all", label: "Tous types" },
  { value: "order_confirmation", label: "Confirmation commande" },
  { value: "order_shipped", label: "Expédition" },
  { value: "abandoned_cart_1h", label: "Relance 1h" },
  { value: "abandoned_cart_24h", label: "Relance 24h" },
  { value: "milestone_reached", label: "Lot complet" },
  { value: "inventory_alert", label: "Alerte stock" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "Tous statuts" },
  { value: "sent", label: "Envoyé" },
  { value: "failed", label: "Échec" },
  { value: "skipped_no_provider", label: "Skippé (Resend off)" },
];

const TYPE_LABELS: Record<string, string> = Object.fromEntries(
  TYPE_OPTIONS.filter((o) => o.value !== "all").map((o) => [o.value, o.label]),
);

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, { bg: string; fg: string; label: string }> = {
    sent: { bg: "#E5F3EC", fg: "#1F7A4D", label: "Envoyé" },
    failed: { bg: "#FBE6E6", fg: "#B23131", label: "Échec" },
    skipped_no_provider: {
      bg: "#F4F4F4",
      fg: "#888888",
      label: "Skippé",
    },
  };
  const s = styles[status] ?? {
    bg: "#F4F4F4",
    fg: "#666666",
    label: status,
  };
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: 999,
        background: s.bg,
        color: s.fg,
        fontFamily: "var(--mono)",
        fontSize: 10,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        fontWeight: 600,
      }}
    >
      {s.label}
    </span>
  );
}

export default async function AdminEmailsPage({
  searchParams,
}: {
  searchParams: { type?: string; status?: string; page?: string };
}) {
  const type = searchParams.type ?? "all";
  const status = searchParams.status ?? "all";
  const page = Math.max(1, Number.parseInt(searchParams.page ?? "1", 10) || 1);

  const { logs, total, pageSize } = await fetchEmailLogs({
    type,
    status,
    page,
  });

  const queryString = new URLSearchParams({
    ...(type !== "all" ? { type } : {}),
    ...(status !== "all" ? { status } : {}),
  }).toString();

  return (
    <>
      <AdminPageHeader
        title="Emails"
        subtitle={`${total} email${total === 1 ? "" : "s"} envoyé${total === 1 ? "" : "s"}`}
      />

      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 18,
          flexWrap: "wrap",
        }}
      >
        <EnumFilter
          paramName="type"
          options={TYPE_OPTIONS}
          ariaLabel="Filtrer par type"
        />
        <EnumFilter
          paramName="status"
          options={STATUS_OPTIONS}
          ariaLabel="Filtrer par statut"
        />
      </div>

      {logs.length === 0 ? (
        <div
          className="admin-card admin-card-padded"
          style={{
            color: "#888888",
            fontFamily: "var(--body)",
            textAlign: "center",
            padding: "48px 24px",
          }}
        >
          Aucun email pour ces filtres.
        </div>
      ) : (
        <div className="admin-card" style={{ overflow: "hidden" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Destinataire</th>
                <th>Sujet</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => {
                const subject =
                  (log.meta as { subject?: string } | null)?.subject ?? "—";
                return (
                  <tr key={log.id}>
                    <td
                      style={{
                        whiteSpace: "nowrap",
                        color: "#666666",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {formatDateTime(log.sent_at)}
                    </td>
                    <td>
                      <span
                        style={{
                          fontFamily: "var(--body)",
                          fontSize: 13,
                          color: "#111111",
                        }}
                      >
                        {TYPE_LABELS[log.type] ?? log.type}
                      </span>
                    </td>
                    <td style={{ color: "#666666" }}>{log.recipient}</td>
                    <td
                      style={{
                        color: "#444444",
                        maxWidth: 320,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      title={subject}
                    >
                      {subject}
                    </td>
                    <td>
                      <StatusPill status={log.status} />
                    </td>
                  </tr>
                );
              })}
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
