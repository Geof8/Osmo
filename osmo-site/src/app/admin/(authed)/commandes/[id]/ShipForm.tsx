"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ShipForm({
  orderId,
  initialTrackingNumber,
  alreadyShipped,
}: {
  orderId: string;
  initialTrackingNumber: string | null;
  alreadyShipped: boolean;
}) {
  const router = useRouter();
  const [tracking, setTracking] = useState(initialTrackingNumber ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = tracking.trim();
    if (!trimmed) {
      setError("Numéro de suivi requis");
      return;
    }
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/ship`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tracking_number: trimmed }),
      });
      const data: { ok?: boolean; error?: string; email_status?: string } =
        await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Mise à jour impossible");
        setSubmitting(false);
        return;
      }
      const note =
        data.email_status === "sent"
          ? "Commande marquée expédiée — email envoyé."
          : data.email_status === "skipped_no_provider"
            ? "Commande marquée expédiée (email non envoyé : Resend non configuré)."
            : "Commande marquée expédiée.";
      setSuccess(note);
      setSubmitting(false);
      router.refresh();
    } catch {
      setError("Mise à jour impossible");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "flex-end",
        }}
      >
        <label style={{ flex: "1 1 240px", minWidth: 200 }}>
          <span
            className="admin-kpi-label"
            style={{ fontSize: 10, display: "block", marginBottom: 6 }}
          >
            Numéro de suivi
          </span>
          <input
            type="text"
            value={tracking}
            onChange={(e) => setTracking(e.target.value)}
            placeholder="ex. LX123456789FR"
            disabled={submitting}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #DDDDDD",
              fontFamily: "var(--body)",
              fontSize: 14,
              color: "#111111",
              background: "#FFFFFF",
            }}
          />
        </label>
        <button
          type="submit"
          disabled={submitting}
          className="admin-pill-btn"
          style={{
            background: "#C8963E",
            borderColor: "#C8963E",
            color: "#FFFFFF",
            opacity: submitting ? 0.7 : 1,
            cursor: submitting ? "wait" : "pointer",
          }}
        >
          {submitting
            ? "Enregistrement…"
            : alreadyShipped
              ? "Mettre à jour le suivi"
              : "Marquer comme expédié"}
        </button>
      </div>
      {error && (
        <p
          role="alert"
          style={{
            color: "#B23131",
            fontSize: 12,
            marginTop: 10,
            fontFamily: "var(--body)",
          }}
        >
          {error}
        </p>
      )}
      {success && (
        <p
          style={{
            color: "#1F7A4D",
            fontSize: 12,
            marginTop: 10,
            fontFamily: "var(--body)",
          }}
        >
          {success}
        </p>
      )}
    </form>
  );
}
