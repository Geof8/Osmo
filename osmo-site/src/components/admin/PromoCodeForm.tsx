"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type DiscountType = "percent" | "amount";

export default function PromoCodeForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Champs principaux
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState<DiscountType>("percent");
  const [discountValue, setDiscountValue] = useState("");

  // Restrictions
  const [minOrderAmount, setMinOrderAmount] = useState("");
  const [firstTimeOnly, setFirstTimeOnly] = useState(false);
  const [limitPerCustomer, setLimitPerCustomer] = useState("");
  const [usageLimit, setUsageLimit] = useState("");

  // Période de validité
  const [startsAt, setStartsAt] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  // Tags
  const [tagsInput, setTagsInput] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function reset() {
    setCode("");
    setDescription("");
    setDiscountType("percent");
    setDiscountValue("");
    setMinOrderAmount("");
    setFirstTimeOnly(false);
    setLimitPerCustomer("");
    setUsageLimit("");
    setStartsAt("");
    setExpiresAt("");
    setTagsInput("");
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
    if (discountType === "percent" && value > 100) {
      setError("Le pourcentage doit être ≤ 100");
      return;
    }
    const usageLimitParsed = usageLimit.trim()
      ? Math.max(1, Math.floor(Number(usageLimit)))
      : null;
    const limitPerCustomerParsed = limitPerCustomer.trim()
      ? Math.max(1, Math.floor(Number(limitPerCustomer)))
      : null;
    const minOrderParsed = minOrderAmount.trim()
      ? Math.round(Number(minOrderAmount) * 100)
      : null;
    const tagsParsed = tagsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/promo-codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          description: description || null,
          discount_type: discountType,
          discount_value: value,
          usage_limit: usageLimitParsed,
          limit_per_customer: limitPerCustomerParsed,
          min_order_amount_cents: minOrderParsed,
          first_time_only: firstTimeOnly,
          starts_at: startsAt || null,
          expires_at: expiresAt || null,
          tags: tagsParsed,
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
        + Nouvelle réduction
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
          Nouvelle réduction
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
        <Section title="Identification">
          <FieldGrid>
            <LabeledInput label="Code (visible au client)">
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
            </LabeledInput>

            <LabeledInput label="Description (interne, optionnel)">
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Lancement Newsletter Q3"
                className="admin-input"
                disabled={submitting}
              />
            </LabeledInput>

            <LabeledInput label="Tags (séparés par des virgules)">
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="newsletter, fondateurs"
                className="admin-input"
                disabled={submitting}
              />
            </LabeledInput>
          </FieldGrid>
        </Section>

        <Section title="Montant">
          <FieldGrid>
            <LabeledInput label="Type de remise">
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as DiscountType)}
                className="admin-input"
                disabled={submitting}
              >
                <option value="percent">Pourcentage (%)</option>
                <option value="amount">Montant fixe (€)</option>
              </select>
            </LabeledInput>

            <LabeledInput
              label={`Valeur (${discountType === "percent" ? "%" : "€"})`}
            >
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
            </LabeledInput>

            <LabeledInput label="Panier minimum (€, optionnel)">
              <input
                type="number"
                min={0}
                step="0.01"
                value={minOrderAmount}
                onChange={(e) => setMinOrderAmount(e.target.value)}
                placeholder="0"
                className="admin-input"
                disabled={submitting}
              />
            </LabeledInput>
          </FieldGrid>
        </Section>

        <Section title="Restrictions d'usage">
          <FieldGrid>
            <LabeledInput label="Usage total (toutes commandes)">
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
            </LabeledInput>

            <LabeledInput label="Usage par client">
              <input
                type="number"
                min={1}
                step={1}
                value={limitPerCustomer}
                onChange={(e) => setLimitPerCustomer(e.target.value)}
                placeholder="Illimité"
                className="admin-input"
                disabled={submitting}
              />
            </LabeledInput>

            <LabeledInput label="Réservé au premier achat">
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 14px",
                  border: "1px solid #DDDDDD",
                  borderRadius: 8,
                  background: "#FFFFFF",
                  cursor: "pointer",
                  fontFamily: "var(--body)",
                  fontSize: 13,
                  color: "#444444",
                }}
              >
                <input
                  type="checkbox"
                  checked={firstTimeOnly}
                  onChange={(e) => setFirstTimeOnly(e.target.checked)}
                  disabled={submitting}
                />
                Le client n&apos;a jamais commandé
              </label>
            </LabeledInput>
          </FieldGrid>
        </Section>

        <Section title="Période de validité">
          <FieldGrid>
            <LabeledInput label="Démarre le (optionnel)">
              <input
                type="datetime-local"
                value={startsAt}
                onChange={(e) => setStartsAt(e.target.value)}
                className="admin-input"
                disabled={submitting}
              />
            </LabeledInput>

            <LabeledInput label="Expire le (optionnel)">
              <input
                type="datetime-local"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="admin-input"
                disabled={submitting}
              />
            </LabeledInput>
          </FieldGrid>
        </Section>

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
            {submitting ? "Création…" : "Créer la réduction"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 18 }}>
      <h3
        style={{
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#888888",
          fontWeight: 600,
          marginBottom: 10,
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function FieldGrid({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gap: 14,
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      }}
    >
      {children}
    </div>
  );
}

function LabeledInput({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label>
      <span
        className="admin-kpi-label"
        style={{ fontSize: 10, display: "block", marginBottom: 6 }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}
