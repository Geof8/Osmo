"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lock, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { GUARANTEE_LINE, PRODUCT } from "@/lib/constants";

type FormState = { firstName: string; lastName: string; email: string };
type Errors = Partial<Record<keyof FormState, string>>;
type AppliedPromo = {
  code: string;
  discount_type: "percent" | "amount";
  discount_value: number;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function computeFinalPrice(
  basePriceEuros: number,
  applied: AppliedPromo | null,
): number {
  if (!applied) return basePriceEuros;
  if (applied.discount_type === "percent") {
    return Math.max(
      0,
      Math.round((basePriceEuros - (basePriceEuros * applied.discount_value) / 100) * 100) /
        100,
    );
  }
  return Math.max(0, basePriceEuros - applied.discount_value);
}

function formatPriceEuros(price: number): string {
  return Number.isInteger(price) ? `${price}€` : `${price.toFixed(2)}€`;
}

function validate(form: FormState): Errors {
  const errs: Errors = {};
  if (!form.firstName.trim()) errs.firstName = "Prénom requis";
  if (!form.lastName.trim()) errs.lastName = "Nom requis";
  if (!form.email.trim()) errs.email = "Email requis";
  else if (!EMAIL_RE.test(form.email.trim())) errs.email = "Email invalide";
  return errs;
}

const inputBase: React.CSSProperties = {
  width: "100%",
  border: "1px solid #E0E0E0",
  borderRadius: 8,
  padding: "12px 16px",
  fontSize: 15,
  fontFamily: "var(--body)",
  outline: "none",
  background: "#FFFFFF",
};

const labelBase: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontFamily: "var(--mono)",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#555555",
  marginBottom: 6,
};

export default function SideCart() {
  const { open, closeCart, openCart } = useCart();
  const [form, setForm] = useState<FormState>({ firstName: "", lastName: "", email: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<AppliedPromo | null>(null);
  const [validatingPromo, setValidatingPromo] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Auto-apply promo from `?promo=CODE` (used by the newsletter welcome email).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const promo = params.get("promo");
    if (!promo) return;
    const code = promo.trim().toUpperCase();
    if (!code) return;
    params.delete("promo");
    const qs = params.toString();
    const cleanUrl =
      window.location.pathname + (qs ? `?${qs}` : "") + window.location.hash;
    window.history.replaceState({}, "", cleanUrl);
    openCart();
    (async () => {
      setValidatingPromo(true);
      try {
        const res = await fetch("/api/promo/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });
        const data: {
          valid?: boolean;
          code?: string;
          discount_type?: "percent" | "amount";
          discount_value?: number;
        } = await res.json();
        if (
          res.ok &&
          data.valid &&
          data.code &&
          data.discount_type &&
          typeof data.discount_value === "number"
        ) {
          setAppliedPromo({
            code: data.code,
            discount_type: data.discount_type,
            discount_value: data.discount_value,
          });
          setPromoInput(data.code);
        } else {
          setPromoInput(code);
        }
      } catch {
        setPromoInput(code);
      } finally {
        setValidatingPromo(false);
      }
    })();
    // openCart is stable; we only want to run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finalPrice = useMemo(
    () => computeFinalPrice(PRODUCT.earlyPrice, appliedPromo),
    [appliedPromo],
  );

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, closeCart]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function applyPromo() {
    const code = promoInput.trim().toUpperCase();
    if (!code) {
      setPromoError("Saisis un code");
      return;
    }
    setValidatingPromo(true);
    setPromoError(null);
    try {
      const res = await fetch("/api/promo/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data: {
        valid?: boolean;
        code?: string;
        discount_type?: "percent" | "amount";
        discount_value?: number;
        message?: string;
      } = await res.json();
      if (
        !res.ok ||
        !data.valid ||
        !data.code ||
        !data.discount_type ||
        typeof data.discount_value !== "number"
      ) {
        setAppliedPromo(null);
        setPromoError(data.message || "Code invalide");
        setValidatingPromo(false);
        return;
      }
      setAppliedPromo({
        code: data.code,
        discount_type: data.discount_type,
        discount_value: data.discount_value,
      });
      setPromoInput(data.code);
      setValidatingPromo(false);
    } catch {
      setPromoError("Validation impossible");
      setValidatingPromo(false);
    }
  }

  function removePromo() {
    setAppliedPromo(null);
    setPromoInput("");
    setPromoError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim().toLowerCase(),
          ...(appliedPromo ? { promoCode: appliedPromo.code } : {}),
        }),
      });
      const data: { url?: string; error?: string } = await res.json();
      if (!res.ok || !data.url) {
        setSubmitError(data.error || "Une erreur est survenue. Réessaie.");
        setSubmitting(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setSubmitError("Connexion impossible. Vérifie ta connexion et réessaie.");
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            className="fixed inset-0 z-40 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            aria-hidden="true"
          />
          <motion.aside
            key="drawer"
            className="fixed right-0 top-0 z-50 h-full w-full sm:w-[480px] overflow-y-auto sm:rounded-l-2xl"
            style={{
              background: "#FFFFFF",
              borderLeft: "1px solid #E0E0E0",
              padding: "clamp(20px, 5vw, 32px)",
              maxWidth: "100vw",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Votre commande"
          >
            <div className="flex items-center justify-between">
              <h2
                style={{
                  fontFamily: "var(--display)",
                  fontWeight: 700,
                  fontSize: 20,
                  color: "#111111",
                  letterSpacing: "0.01em",
                }}
              >
                Votre commande
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Fermer"
                className="inline-flex h-9 w-9 items-center justify-center transition-opacity hover:opacity-70"
              >
                <X strokeWidth={1} size={24} color="#111111" />
              </button>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #E0E0E0", margin: "24px 0" }} />

            <div>
              <div
                style={{
                  fontFamily: "var(--display)",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#111111",
                  letterSpacing: "0.01em",
                }}
              >
                OSMO Recovery · Lot N°001
              </div>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 12,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#999999",
                  marginTop: 6,
                }}
              >
                Early Adopters · 120g · 15 doses
              </div>
              <div className="flex items-baseline gap-3" style={{ marginTop: 14 }}>
                <span
                  style={{
                    fontFamily: "var(--display)",
                    fontSize: 24,
                    fontWeight: 700,
                    color: "#C8963E",
                    lineHeight: 1,
                  }}
                >
                  {formatPriceEuros(finalPrice)}
                </span>
                <span
                  style={{
                    fontSize: 16,
                    color: "#999999",
                    textDecoration: "line-through",
                    lineHeight: 1,
                  }}
                >
                  {appliedPromo
                    ? formatPriceEuros(PRODUCT.earlyPrice)
                    : formatPriceEuros(PRODUCT.publicPrice)}
                </span>
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "#999999",
                  marginTop: 10,
                }}
              >
                Expédition estimée sous 6 mois
              </div>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #E0E0E0", margin: "24px 0" }} />

            <form onSubmit={handleSubmit} noValidate>
              <div style={{ marginBottom: 16 }}>
                <label htmlFor="sc-firstName" style={labelBase}>
                  Prénom
                </label>
                <input
                  id="sc-firstName"
                  type="text"
                  required
                  placeholder="Thomas"
                  value={form.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  style={{
                    ...inputBase,
                    borderColor: errors.firstName ? "#C8963E" : "#E0E0E0",
                  }}
                  className="focus:border-[#111111]"
                />
                {errors.firstName && (
                  <p style={{ color: "#C8963E", fontSize: 12, marginTop: 4 }}>{errors.firstName}</p>
                )}
              </div>

              <div style={{ marginBottom: 16 }}>
                <label htmlFor="sc-lastName" style={labelBase}>
                  Nom
                </label>
                <input
                  id="sc-lastName"
                  type="text"
                  required
                  placeholder="Dupont"
                  value={form.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
                  style={{
                    ...inputBase,
                    borderColor: errors.lastName ? "#C8963E" : "#E0E0E0",
                  }}
                  className="focus:border-[#111111]"
                />
                {errors.lastName && (
                  <p style={{ color: "#C8963E", fontSize: 12, marginTop: 4 }}>{errors.lastName}</p>
                )}
              </div>

              <div style={{ marginBottom: 16 }}>
                <label htmlFor="sc-email" style={labelBase}>
                  Email
                </label>
                <input
                  id="sc-email"
                  type="email"
                  required
                  placeholder="thomas@email.com"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  style={{
                    ...inputBase,
                    borderColor: errors.email ? "#C8963E" : "#E0E0E0",
                  }}
                  className="focus:border-[#111111]"
                />
                {errors.email && (
                  <p style={{ color: "#C8963E", fontSize: 12, marginTop: 4 }}>{errors.email}</p>
                )}
              </div>

              <hr style={{ border: "none", borderTop: "1px solid #E0E0E0", margin: "24px 0" }} />

              <div style={{ marginBottom: 20 }}>
                <label htmlFor="sc-promo" style={labelBase}>
                  Code promo
                </label>
                {appliedPromo ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      padding: "10px 14px",
                      borderRadius: 8,
                      background: "#EAF6EE",
                      border: "1px solid #C7E5D3",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        color: "#1F7A4D",
                        fontFamily: "var(--body)",
                      }}
                    >
                      ✓{" "}
                      {appliedPromo.discount_type === "percent"
                        ? `-${appliedPromo.discount_value}%`
                        : `-${appliedPromo.discount_value}€`}{" "}
                      appliqué
                      <span
                        style={{
                          marginLeft: 8,
                          fontFamily: "var(--mono)",
                          fontSize: 11,
                          letterSpacing: "0.08em",
                          color: "#1F7A4D",
                        }}
                      >
                        ({appliedPromo.code})
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={removePromo}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#1F7A4D",
                        cursor: "pointer",
                        fontSize: 12,
                        fontFamily: "var(--mono)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      Retirer
                    </button>
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      id="sc-promo"
                      type="text"
                      placeholder="BIENVENUE10"
                      value={promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value.toUpperCase());
                        if (promoError) setPromoError(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          applyPromo();
                        }
                      }}
                      disabled={validatingPromo}
                      style={{
                        ...inputBase,
                        fontFamily: "var(--mono)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        borderColor: promoError ? "#C8963E" : "#E0E0E0",
                      }}
                    />
                    <button
                      type="button"
                      onClick={applyPromo}
                      disabled={validatingPromo || !promoInput.trim()}
                      style={{
                        padding: "0 18px",
                        borderRadius: 999,
                        border: "1px solid #111111",
                        background: "#111111",
                        color: "#FFFFFF",
                        fontFamily: "var(--body)",
                        fontSize: 13,
                        fontWeight: 600,
                        cursor:
                          validatingPromo || !promoInput.trim()
                            ? "not-allowed"
                            : "pointer",
                        opacity:
                          validatingPromo || !promoInput.trim() ? 0.6 : 1,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {validatingPromo ? "…" : "Appliquer"}
                    </button>
                  </div>
                )}
                {promoError && (
                  <p style={{ color: "#C8963E", fontSize: 12, marginTop: 6 }}>
                    {promoError}
                  </p>
                )}
              </div>

              <div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#999999",
                    fontFamily: "var(--mono)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 10,
                  }}
                >
                  Paiement sécurisé
                </div>
                <div
                  style={{
                    border: "1px solid #E0E0E0",
                    borderRadius: 8,
                    padding: "12px 16px",
                    background: "#F9F9F9",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Lock size={16} strokeWidth={1.5} color="#999999" />
                  <span
                    style={{
                      color: "#555555",
                      fontSize: 13,
                      lineHeight: 1.4,
                    }}
                  >
                    Redirection vers Stripe pour finaliser le paiement
                    (CB, Apple Pay, Google Pay).
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#999999",
                    marginTop: 10,
                  }}
                >
                  🔒 Paiement 100% sécurisé · Données chiffrées SSL
                </div>
              </div>

              {submitError && (
                <p
                  role="alert"
                  style={{
                    color: "#C8963E",
                    fontSize: 13,
                    marginTop: 12,
                    textAlign: "center",
                  }}
                >
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="cta-pill active:scale-[0.98]"
                style={{
                  width: "100%",
                  height: 56,
                  fontWeight: 700,
                  fontSize: 16,
                  fontFamily: "var(--body)",
                  marginTop: 24,
                  cursor: submitting ? "default" : "pointer",
                  opacity: submitting ? 0.7 : 1,
                }}
              >
                {submitting
                  ? "Traitement…"
                  : `Confirmer ma commande — ${formatPriceEuros(finalPrice)}`}
              </button>

              <div className="cta-guarantee">{GUARANTEE_LINE}</div>

              <div
                className="flex items-center justify-center gap-4 flex-wrap"
                style={{
                  marginTop: 16,
                  fontSize: 12,
                  color: "#999999",
                  textAlign: "center",
                }}
              >
                <span>✓ Sans engagement</span>
                <span>✓ Remboursé si annulation</span>
                <span>✓ Livraison suivie</span>
              </div>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
