"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PromoCodeActions({
  id,
  code,
  active,
}: {
  id: string;
  code: string;
  active: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function toggle() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/promo-codes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !active }),
      });
      const data: { ok?: boolean; error?: string; warning?: string } =
        await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Mise à jour impossible");
        setBusy(false);
        return;
      }
      router.refresh();
      setBusy(false);
    } catch {
      setError("Mise à jour impossible");
      setBusy(false);
    }
  }

  async function remove() {
    const confirmed = window.confirm(
      `Supprimer le code ${code} ? L'opération désactive aussi le code dans Stripe.`,
    );
    if (!confirmed) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/promo-codes/${id}`, {
        method: "DELETE",
      });
      const data: { ok?: boolean; error?: string } = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Suppression impossible");
        setBusy(false);
        return;
      }
      router.refresh();
      setBusy(false);
    } catch {
      setError("Suppression impossible");
      setBusy(false);
    }
  }

  return (
    <div style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
      <button
        type="button"
        onClick={toggle}
        disabled={busy}
        className="admin-pill-btn admin-pill-btn-ghost"
        style={{
          padding: "4px 12px",
          fontSize: 12,
          opacity: busy ? 0.7 : 1,
        }}
      >
        {active ? "Désactiver" : "Activer"}
      </button>
      <button
        type="button"
        onClick={remove}
        disabled={busy}
        className="admin-pill-btn"
        style={{
          background: "transparent",
          color: "#B23131",
          borderColor: "#EBCCCC",
          padding: "4px 12px",
          fontSize: 12,
          opacity: busy ? 0.7 : 1,
        }}
      >
        Supprimer
      </button>
      {error && (
        <span
          role="alert"
          style={{
            color: "#B23131",
            fontSize: 11,
            fontFamily: "var(--body)",
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}
