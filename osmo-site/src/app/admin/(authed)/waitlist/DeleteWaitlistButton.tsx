"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteWaitlistButton({
  id,
  email,
}: {
  id: string;
  email: string;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function handle() {
    if (!confirm(`Supprimer ${email} de la liste d'attente ?`)) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/waitlist/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data: { error?: string } = await res.json().catch(() => ({}));
        alert(data.error || "Suppression impossible");
        setSubmitting(false);
        return;
      }
      router.refresh();
    } catch {
      alert("Suppression impossible");
      setSubmitting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handle}
      disabled={submitting}
      style={{
        padding: "5px 12px",
        borderRadius: 999,
        background: "transparent",
        color: "#B23131",
        border: "1px solid #E8C9C9",
        fontFamily: "var(--mono)",
        fontSize: 10,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        fontWeight: 600,
        cursor: submitting ? "default" : "pointer",
        opacity: submitting ? 0.5 : 1,
      }}
    >
      {submitting ? "…" : "Supprimer"}
    </button>
  );
}
