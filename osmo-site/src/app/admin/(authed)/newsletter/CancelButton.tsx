"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CancelButton({ queueId }: { queueId: string }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCancel() {
    if (
      !confirm(
        "Annuler cet envoi ? La newsletter restera dans l'historique mais ne sera pas envoyée.",
      )
    ) {
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/newsletter/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: queueId }),
      });
      const data: { ok?: boolean; error?: string } = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Annulation impossible");
        setSubmitting(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Annulation impossible");
      setSubmitting(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleCancel}
        disabled={submitting}
        style={{
          padding: "10px 20px",
          borderRadius: 999,
          background: "#B23131",
          color: "#FFFFFF",
          border: "none",
          fontFamily: "var(--body)",
          fontSize: 13,
          fontWeight: 600,
          cursor: submitting ? "default" : "pointer",
          opacity: submitting ? 0.7 : 1,
        }}
      >
        {submitting ? "Annulation…" : "Annuler cet envoi"}
      </button>
      {error && (
        <p
          role="alert"
          style={{
            color: "#B23131",
            fontSize: 12,
            marginTop: 8,
            fontFamily: "var(--body)",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
