"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RefundButton({
  orderId,
  disabled,
  amountLabel,
}: {
  orderId: string;
  disabled?: boolean;
  amountLabel: string;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRefund() {
    if (disabled) return;
    const confirmed = window.confirm(
      `Confirmer le remboursement de ${amountLabel} ? Cette action est irréversible.`,
    );
    if (!confirmed) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/refund`, {
        method: "POST",
      });
      const data: { ok?: boolean; error?: string } = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Remboursement impossible");
        setSubmitting(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Remboursement impossible");
      setSubmitting(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleRefund}
        disabled={disabled || submitting}
        className="admin-pill-btn"
        style={{
          background: disabled ? "#DDDDDD" : "#B23131",
          borderColor: disabled ? "#DDDDDD" : "#B23131",
          color: disabled ? "#888888" : "#FFFFFF",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: submitting ? 0.7 : 1,
        }}
      >
        {submitting ? "Remboursement…" : disabled ? "Déjà remboursée" : "Rembourser"}
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
