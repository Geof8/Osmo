"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lock, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { GUARANTEE_LINE } from "@/lib/constants";

type FormState = { firstName: string; lastName: string; email: string };
type Errors = Partial<Record<keyof FormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  const { open, closeCart } = useCart();
  const [form, setForm] = useState<FormState>({ firstName: "", lastName: "", email: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
        }),
      });
      const data: { url?: string; error?: string } = await res.json();
      if (!res.ok || !data.url) {
        setSubmitError(data.error || "Une erreur est survenue. Réessaie.");
        setSubmitting(false);
        return;
      }
      window.location.href = data.url;
    } catch (err) {
      console.error("Checkout error:", err);
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
                OSMO Recovery — Lot N°001
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
                  20€
                </span>
                <span
                  style={{
                    fontSize: 16,
                    color: "#999999",
                    textDecoration: "line-through",
                    lineHeight: 1,
                  }}
                >
                  30€
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
                {submitting ? "Traitement…" : "Confirmer ma commande — 20€"}
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
