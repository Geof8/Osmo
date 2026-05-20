"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TrackingLookup({
  initialOrder,
  initialEmail,
  notFound,
}: {
  initialOrder: string;
  initialEmail: string;
  notFound: boolean;
}) {
  const router = useRouter();
  const [orderId, setOrderId] = useState(initialOrder);
  const [email, setEmail] = useState(initialEmail);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const o = orderId.trim();
    const m = email.trim();
    if (!o || !m) return;
    const qs = new URLSearchParams({ order: o, email: m }).toString();
    router.push(`/suivi?${qs}`);
  }

  return (
    <form
      onSubmit={submit}
      style={{
        background: "#FFFFFF",
        border: "1px solid var(--rule, #E5E5E5)",
        borderRadius: 12,
        padding: "28px 28px 24px",
      }}
    >
      <label
        style={{
          fontFamily: "var(--font-mono), var(--mono)",
          fontSize: 11,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--ink-2)",
          display: "block",
          marginBottom: 6,
        }}
      >
        Numéro de commande
      </label>
      <input
        type="text"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        placeholder="ex. 5d29c2a4-…"
        required
        style={{
          width: "100%",
          padding: "12px 14px",
          borderRadius: 8,
          border: "1px solid var(--rule, #DDDDDD)",
          fontFamily: "var(--font-dm-sans), var(--body)",
          fontSize: 15,
          color: "var(--ink)",
          background: "var(--paper, #FFFFFF)",
          marginBottom: 16,
        }}
      />

      <label
        style={{
          fontFamily: "var(--font-mono), var(--mono)",
          fontSize: 11,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--ink-2)",
          display: "block",
          marginBottom: 6,
        }}
      >
        Email
      </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ton@email.fr"
        required
        style={{
          width: "100%",
          padding: "12px 14px",
          borderRadius: 8,
          border: "1px solid var(--rule, #DDDDDD)",
          fontFamily: "var(--font-dm-sans), var(--body)",
          fontSize: 15,
          color: "var(--ink)",
          background: "var(--paper, #FFFFFF)",
          marginBottom: 20,
        }}
      />

      {notFound && (
        <p
          role="alert"
          style={{
            color: "#B23131",
            fontSize: 14,
            margin: "0 0 16px",
            fontFamily: "var(--font-dm-sans), var(--body)",
          }}
        >
          Aucune commande trouvée pour ce numéro et cet email.
        </p>
      )}

      <button
        type="submit"
        style={{
          padding: "12px 24px",
          borderRadius: 50,
          border: "1px solid var(--ink)",
          background: "var(--ink)",
          color: "#FFFFFF",
          fontFamily: "var(--font-dm-sans), var(--body)",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Suivre ma commande →
      </button>
    </form>
  );
}
