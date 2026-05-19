import type { AutomationRunRow } from "@/lib/automations/runner";

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function durationMs(start: string, end: string | null): string {
  if (!end) return "—";
  const ms = new Date(end).getTime() - new Date(start).getTime();
  if (ms < 1000) return `${ms} ms`;
  return `${(ms / 1000).toFixed(1)} s`;
}

const STATUS_STYLES: Record<
  AutomationRunRow["status"],
  { color: string; bg: string; label: string }
> = {
  success: { color: "#1E7A3A", bg: "#E6F4EA", label: "Succès" },
  error: { color: "#B23131", bg: "#FBEAEA", label: "Erreur" },
  skipped: { color: "#666666", bg: "#F0F0F0", label: "Sauté" },
};

export default function AutomationRunHistory({
  runs,
}: {
  runs: AutomationRunRow[];
}) {
  if (runs.length === 0) {
    return (
      <div
        className="admin-card admin-card-padded"
        style={{
          color: "#888888",
          fontFamily: "var(--body)",
          textAlign: "center",
          padding: "32px 24px",
          fontSize: 13,
        }}
      >
        Aucune exécution pour le moment.
      </div>
    );
  }

  return (
    <div className="admin-card" style={{ overflow: "hidden" }}>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Statut</th>
            <th>Durée</th>
            <th>Détails</th>
          </tr>
        </thead>
        <tbody>
          {runs.map((r) => {
            const style = STATUS_STYLES[r.status];
            return (
              <tr key={r.id}>
                <td style={{ color: "#666666", whiteSpace: "nowrap" }}>
                  {formatDate(r.started_at)}
                </td>
                <td>
                  <span
                    style={{
                      display: "inline-flex",
                      padding: "3px 10px",
                      borderRadius: 999,
                      background: style.bg,
                      color: style.color,
                      fontFamily: "var(--mono)",
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    {style.label}
                  </span>
                </td>
                <td
                  style={{
                    color: "#666666",
                    fontFamily: "var(--mono)",
                    fontSize: 12,
                  }}
                >
                  {durationMs(r.started_at, r.finished_at)}
                </td>
                <td
                  style={{
                    color: r.error ? "#B23131" : "#666666",
                    fontSize: 12,
                  }}
                >
                  {r.error
                    ? r.error
                    : r.result
                      ? JSON.stringify(r.result)
                      : "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
