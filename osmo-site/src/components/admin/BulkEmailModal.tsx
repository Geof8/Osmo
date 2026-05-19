"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BulkEmailModal({
  segment,
  recipientCount,
  segmentLabel,
}: {
  segment: string;
  recipientCount: number;
  segmentLabel: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function send() {
    if (!subject.trim() || !body.trim()) {
      setResult("Sujet et corps requis");
      return;
    }
    if (
      !window.confirm(
        `Envoyer cet email à ${recipientCount} destinataire(s) du segment « ${segmentLabel} » ?`,
      )
    ) {
      return;
    }
    setSending(true);
    setResult(null);
    try {
      const res = await fetch("/api/admin/customers/bulk-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          segment,
          subject: subject.trim(),
          body: body.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResult(`Erreur : ${data.error ?? "envoi impossible"}`);
      } else {
        setResult(`${data.sent} email(s) envoyé(s).`);
        setSubject("");
        setBody("");
        router.refresh();
      }
    } catch {
      setResult("Erreur lors de l'envoi");
    } finally {
      setSending(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="admin-pill-btn admin-pill-btn-amber"
        disabled={recipientCount === 0}
        style={{ opacity: recipientCount === 0 ? 0.5 : 1 }}
      >
        ✉ Envoyer email à ce segment ({recipientCount})
      </button>
    );
  }

  return (
    <div
      role="dialog"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(17,17,17,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #ECECEC",
          borderRadius: 12,
          width: "100%",
          maxWidth: 560,
          padding: 24,
          boxShadow: "0 24px 48px rgba(17,17,17,0.20)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 14,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--display)",
              fontSize: 18,
              fontWeight: 600,
              color: "#111111",
              margin: 0,
            }}
          >
            Email au segment « {segmentLabel} »
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            style={{
              background: "transparent",
              border: "none",
              color: "#888888",
              fontSize: 20,
              cursor: "pointer",
            }}
            aria-label="Fermer"
          >
            ×
          </button>
        </div>

        <p
          style={{
            fontFamily: "var(--body)",
            fontSize: 13,
            color: "#666666",
            marginBottom: 16,
          }}
        >
          Ce message sera envoyé à <strong>{recipientCount}</strong> destinataire(s).
        </p>

        <label className="admin-label">Sujet</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Une mise à jour pour vous"
          className="admin-input"
          style={{ marginBottom: 12 }}
          disabled={sending}
        />

        <label className="admin-label">Corps (texte simple)</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={8}
          placeholder="Bonjour,&#10;&#10;…"
          className="admin-input"
          style={{
            fontFamily: "var(--body)",
            resize: "vertical",
            minHeight: 160,
          }}
          disabled={sending}
        />

        {result && (
          <p
            style={{
              fontFamily: "var(--body)",
              fontSize: 13,
              color: result.startsWith("Erreur") ? "#B23131" : "#1E7A3A",
              marginTop: 12,
            }}
          >
            {result}
          </p>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            marginTop: 18,
          }}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="admin-pill-btn admin-pill-btn-ghost"
            disabled={sending}
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={send}
            className="admin-pill-btn admin-pill-btn-amber"
            disabled={sending}
            style={{ opacity: sending ? 0.7 : 1 }}
          >
            {sending ? "Envoi…" : `Envoyer (${recipientCount})`}
          </button>
        </div>
      </div>
    </div>
  );
}
