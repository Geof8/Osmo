"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type DiscountType = "percent" | "amount";

export default function PromoCodeForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<DiscountType>("percent");
  const [discountValue, setDiscountValue] = useState("");
  const [usageLimit, setUsageLimit] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function reset() {
    setCode("");
    setDiscountType("percent");
    setDiscountValue("");
    setUsageLimit("");
    setExpiresAt("");
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const value = Number(discountValue);
    if (!Number.isFinite(value) || value <= 0) {
      setError("Valeur de remise invalide");
      return;
    }
    const usageLimitParsed = usageLimit.trim()
      ? Math.max(1, Math.floor(Number(usageLimit)))
      : null;
    if (usageLimit.trim() && !Number.isFinite(Number(usageLimit))) {
      setError("Limite d'usage invalide");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/promo-codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          discount_type: discountType,
          discount_value: value,
          usage_limit: usageLimitParsed,
          expires_at: expiresAt || null,
        }),
      });
      const data: { ok?: boolean; error?: string } = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Création impossible");
        setSubmitting(false);
        return;
      }
      reset();
      setOpen(false);
      setSubmitting(false);
      router.refresh();
    } catch {
      setError("Création impossible");
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="admin-pill-btn admin-pill-btn-amber"
      >
        + Nouveau code promo
      </button>
    );
  }

  return (
    <div
      className="admin-card admin-card-padded"
      style={{ marginBottom: 20 }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h2
          style={{
            fontFamily: "var(--display)",
            fontSize: 16,
            fontWeight: 600,
            color: "#111111",
            margin: 0,
          }}
        >
          Nouveau code promo
        </h2>
        <button
          type="button"
          onClick={() => {
            reset();
            setOpen(false);
          }}
          style={{
            background: "transparent",
            border: "none",
            color: "#888888",
            fontFamily: "var(--mono)",
            fontSize: 12,
            cursor: "pointer",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Annuler
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          }}
        >
          <label>
            <span
              className="admin-kpi-label"
              style={{ fontSize: 10, display: "block", marginBottom: 6 }}
            >
              Code
            </span>
            <input
              type="text"
              required
              value={code}
              onChange={(e) =>
                setCode(e.target.value.toUpperCase().replace(/\s+/g, ""))
              }
              placeholder="BIENVENUE10"
              className="admin-input"
              style={{ fontFamily: "var(--mono)", letterSpacing: "0.08em" }}
              disabled={submitting}
            />
          </label>

          <label>
            <span
              className="admin-kpi-label"
              style={{ fontSize: 10, display: "block", marginBottom: 6 }}
            >
              Type de remise
            </span>
            <select
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value as DiscountType)}
              className="admin-input"
              disabled={submitting}
            >
              <option value="percent">Pourcentage (%)</option>
              <option value="amount">Montant fixe (€)</option>
            </select>
          </label>

          <label>
            <span
              className="admin-kpi-label"
              style={{ fontSize: 10, display: "block", marginBottom: 6 }}
            >
              Valeur ({discountType === "percent" ? "%" : "€"})
            </span>
            <input
              type="number"
              min={1}
              max={discountType === "percent" ? 100 : undefined}
              step={1}
              required
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
              placeholder={discountType === "percent" ? "10" : "5"}
              className="admin-input"
              disabled={submitting}
            />
          </label>

          <label>
            <span
              className="admin-kpi-label"
              style={{ fontSize: 10, display: "block", marginBottom: 6 }}
            >
              Limite d&apos;usage (optionnel)
            </span>
            <input
              type="number"
              min={1}
              step={1}
              value={usageLimit}
              onChange={(e) => setUsageLimit(e.target.value)}
              placeholder="Illimité"
              className="admin-input"
              disabled={submitting}
            />
          </label>

          <label>
            <span
              className="admin-kpi-label"
              style={{ fontSize: 10, display: "block", marginBottom: 6 }}
            >
              Expiration (optionnel)
            </span>
            <input
              type="datetime-local"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="admin-input"
              disabled={submitting}
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

        <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
          <button
            type="submit"
            disabled={submitting}
            className="admin-pill-btn admin-pill-btn-amber"
            style={{ opacity: submitting ? 0.7 : 1 }}
          >
            {submitting ? "Création…" : "Créer le code"}
          </button>
        </div>
      </form>
    </div>
  );
}
