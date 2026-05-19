import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import KpiCard from "@/components/admin/KpiCard";
import {
  fetchNewsletterHistory,
  fetchNewsletterStats,
  fetchPendingNewsletter,
  fetchSubscribers,
} from "@/lib/admin-newsletter";
import { formatDate, formatDateTime } from "@/lib/format";
import CancelButton from "./CancelButton";
import ManualSendForm from "./ManualSendForm";

export const dynamic = "force-dynamic";

function StatusBadge({
  cancelled,
  sentAt,
}: {
  cancelled: boolean;
  sentAt: string | null;
}) {
  const state = cancelled
    ? { bg: "#FBE6E6", fg: "#B23131", label: "Annulé ❌" }
    : sentAt
      ? { bg: "#E5F3EC", fg: "#1F7A4D", label: "Envoyé ✅" }
      : { bg: "#FFF4E0", fg: "#A86A00", label: "En attente ⏳" };
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

export default async function AdminNewsletterPage() {
  const [stats, pending, history, subscribers] = await Promise.all([
    fetchNewsletterStats(),
    fetchPendingNewsletter(),
    fetchNewsletterHistory(),
    fetchSubscribers(),
  ]);

  return (
    <>
      <AdminPageHeader
        title="Newsletter"
        subtitle={`${stats.activeSubscribers} abonné${stats.activeSubscribers === 1 ? "" : "s"} actif${stats.activeSubscribers === 1 ? "" : "s"}`}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          marginBottom: 28,
        }}
      >
        <KpiCard
          label="Abonnés actifs"
          value={stats.activeSubscribers.toString()}
          accent
          hint={`${stats.totalSubscribers} inscriptions total`}
        />
        <KpiCard
          label="Newsletters envoyées"
          value={stats.sentCount.toString()}
        />
        <KpiCard
          label="Désabonnés"
          value={(stats.totalSubscribers - stats.activeSubscribers).toString()}
        />
      </div>

      {pending && (
        <section style={{ marginBottom: 28 }}>
          <h2
            style={{
              fontFamily: "var(--display)",
              fontWeight: 600,
              fontSize: 18,
              color: "#111111",
              marginBottom: 14,
            }}
          >
            Prochain envoi
          </h2>
          <div
            className="admin-card admin-card-padded"
            style={{
              borderLeft: "3px solid #C8963E",
              background: "#FFFDF6",
            }}
          >
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#A86A00",
                marginBottom: 8,
              }}
            >
              Thème · {pending.theme}
            </div>
            <h3
              style={{
                fontFamily: "var(--display)",
                fontWeight: 700,
                fontSize: 22,
                color: "#111111",
                margin: 0,
                marginBottom: 12,
              }}
            >
              {pending.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--body)",
                fontSize: 13,
                color: "#666666",
                marginBottom: 12,
              }}
            >
              Sujet : <strong>{pending.subject}</strong>
            </p>
            <div
              style={{
                fontFamily: "var(--body)",
                fontSize: 14,
                lineHeight: 1.7,
                color: "#333333",
                whiteSpace: "pre-wrap",
                maxHeight: 280,
                overflowY: "auto",
                background: "#FFFFFF",
                border: "1px solid #F4E8C8",
                borderRadius: 8,
                padding: "12px 16px",
                marginBottom: 16,
              }}
            >
              {pending.content}
            </div>
            <div
              style={{
                display: "flex",
                gap: 16,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--body)",
                  fontSize: 12,
                  color: "#888888",
                }}
              >
                Générée le {formatDateTime(pending.generated_at)}
                {pending.preview_sent_at
                  ? ` · Preview envoyé ${formatDateTime(pending.preview_sent_at)}`
                  : ""}
              </div>
              <div style={{ flex: 1 }} />
              {!pending.cancelled ? (
                <CancelButton queueId={pending.id} />
              ) : (
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "#B23131",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Envoi annulé
                </span>
              )}
            </div>
          </div>
        </section>
      )}

      <section style={{ marginBottom: 28 }}>
        <ManualSendForm subscriberCount={stats.activeSubscribers} />
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2
          style={{
            fontFamily: "var(--display)",
            fontWeight: 600,
            fontSize: 18,
            color: "#111111",
            marginBottom: 14,
          }}
        >
          Historique
        </h2>
        {history.length === 0 ? (
          <div
            className="admin-card admin-card-padded"
            style={{
              color: "#888888",
              fontFamily: "var(--body)",
              textAlign: "center",
              padding: "48px 24px",
            }}
          >
            Aucune newsletter générée pour le moment.
          </div>
        ) : (
          <div className="admin-card" style={{ overflow: "hidden" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Thème</th>
                  <th>Sujet</th>
                  <th style={{ textAlign: "right" }}>Abonnés</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {history.map((row) => (
                  <tr key={row.id}>
                    <td
                      style={{
                        whiteSpace: "nowrap",
                        color: "#666666",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {formatDate(row.sent_at ?? row.generated_at)}
                    </td>
                    <td style={{ color: "#444444" }}>{row.theme}</td>
                    <td
                      style={{
                        color: "#111111",
                        maxWidth: 320,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      title={row.subject}
                    >
                      {row.subject}
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        fontVariantNumeric: "tabular-nums",
                        color: "#666666",
                      }}
                    >
                      {row.subscribers_count ?? "—"}
                    </td>
                    <td>
                      <StatusBadge
                        cancelled={row.cancelled}
                        sentAt={row.sent_at}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 14,
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--display)",
              fontWeight: 600,
              fontSize: 18,
              color: "#111111",
              margin: 0,
            }}
          >
            Abonnés ({subscribers.length})
          </h2>
          <Link
            href="/api/admin/newsletter/subscribers/export"
            className="admin-pill-btn admin-pill-btn-ghost"
          >
            Export CSV
          </Link>
        </div>
        {subscribers.length === 0 ? (
          <div
            className="admin-card admin-card-padded"
            style={{
              color: "#888888",
              fontFamily: "var(--body)",
              textAlign: "center",
              padding: "48px 24px",
            }}
          >
            Aucun abonné pour le moment.
          </div>
        ) : (
          <div className="admin-card" style={{ overflow: "hidden" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Date d&apos;inscription</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((s) => (
                  <tr key={s.id}>
                    <td style={{ color: "#111111" }}>{s.email}</td>
                    <td
                      style={{
                        color: "#666666",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formatDate(s.subscribed_at)}
                    </td>
                    <td>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "3px 10px",
                          borderRadius: 999,
                          background: s.active ? "#E5F3EC" : "#F4F4F4",
                          color: s.active ? "#1F7A4D" : "#888888",
                          fontFamily: "var(--mono)",
                          fontSize: 10,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          fontWeight: 600,
                        }}
                      >
                        {s.active ? "Actif" : "Désabonné"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
