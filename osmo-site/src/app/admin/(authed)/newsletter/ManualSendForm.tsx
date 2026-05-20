"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLiveActiveSubscribers } from "./useLiveActiveSubscribers";

export default function ManualSendForm({
  initialActive,
  initialTotal,
}: {
  initialActive: number;
  initialTotal: number;
}) {
  const router = useRouter();
  const { active: subscriberCount } = useLiveActiveSubscribers(
    initialActive,
    initialTotal,
  );
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState<"preview" | "send" | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function reset() {
    setSubject("");
    setTitle("");
    setContent("");
  }

  async function submitMode(mode: "preview" | "send") {
    setError(null);
    setMessage(null);
    if (!subject.trim() || !title.trim() || !content.trim()) {
      setError("Sujet, titre et contenu requis.");
      return;
    }
    if (
      mode === "send" &&
      !confirm(`Envoyer à ${subscriberCount} abonné${subscriberCount === 1 ? "" : "s"} ?`)
    ) {
      return;
    }
    setSubmitting(mode);
    try {
      const res = await fetch("/api/admin/newsletter/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, subject, title, content }),
      });
      const data: { ok?: boolean; sent?: number; total?: number; error?: string } =
        await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Envoi impossible");
        setSubmitting(null);
        return;
      }
      if (mode === "preview") {
        setMessage("Preview envoyé à contact@osmo-lab.fr.");
      } else {
        setMessage(
          `Newsletter envoyée à ${data.sent ?? 0}/${data.total ?? 0} abonnés.`,
        );
        reset();
        router.refresh();
      }
      setSubmitting(null);
    } catch {
      setError("Envoi impossible");
      setSubmitting(null);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    border: "1px solid #E0E0E0",
    borderRadius: 8,
    padding: "10px 14px",
    fontSize: 14,
    fontFamily: "var(--body)",
    outline: "none",
    background: "#FFFFFF",
  };
  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 11,
    fontFamily: "var(--mono)",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#555555",
    marginBottom: 6,
  };

  return (
    <div className="admin-card admin-card-padded">
      <h2
        style={{
          fontFamily: "var(--display)",
          fontSize: 18,
          fontWeight: 600,
          color: "#111111",
          margin: 0,
          marginBottom: 18,
        }}
      >
        Envoyer une newsletter manuellement
      </h2>

      <div style={{ display: "grid", gap: 14 }}>
        <label>
          <span style={labelStyle}>Sujet email</span>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Sodium, potassium, magnésium : le trio que tu perds chaque soirée"
            style={inputStyle}
            disabled={submitting !== null}
          />
        </label>

        <label>
          <span style={labelStyle}>Titre dans la newsletter</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Le trio des électrolytes"
            style={inputStyle}
            disabled={submitting !== null}
          />
        </label>

        <label>
          <span style={labelStyle}>Contenu (paragraphes séparés par une ligne vide)</span>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            placeholder="Premier paragraphe…&#10;&#10;Deuxième paragraphe…"
            style={{
              ...inputStyle,
              fontFamily: "var(--body)",
              lineHeight: 1.6,
              resize: "vertical",
            }}
            disabled={submitting !== null}
          />
        </label>
      </div>

      {error && (
        <p
          role="alert"
          style={{
            color: "#B23131",
            fontSize: 13,
            marginTop: 12,
            fontFamily: "var(--body)",
          }}
        >
          {error}
        </p>
      )}
      {message && (
        <p
          role="status"
          style={{
            color: "#1F7A4D",
            fontSize: 13,
            marginTop: 12,
            fontFamily: "var(--body)",
          }}
        >
          {message}
        </p>
      )}

      <div
        style={{
          display: "flex",
          gap: 12,
          marginTop: 18,
          flexWrap: "wrap",
        }}
      >
        <button
          type="button"
          onClick={() => submitMode("preview")}
          disabled={submitting !== null}
          className="admin-pill-btn admin-pill-btn-ghost"
        >
          {submitting === "preview" ? "Envoi…" : "Preview → contact@osmo-lab.fr"}
        </button>
        <button
          type="button"
          onClick={() => submitMode("send")}
          disabled={submitting !== null || subscriberCount === 0}
          className="admin-pill-btn admin-pill-btn-amber"
        >
          {submitting === "send"
            ? "Envoi en cours…"
            : `Envoyer à tous les abonnés (${subscriberCount})`}
        </button>
      </div>
    </div>
  );
}
