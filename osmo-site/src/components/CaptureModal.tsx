"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { getSupabase } from "@/lib/supabase";
import { FONTS } from "@/lib/constants";
import type { CaptureModalProps } from "@/types";

export default function CaptureModal({
  open,
  onOpenChange,
  source = "homepage",
}: CaptureModalProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      emailRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Veuillez entrer une adresse email valide.");
      emailRef.current?.focus();
      return;
    }

    setLoading(true);
    try {
      const { error: supaError } = await getSupabase()
        .from("waitlist")
        .insert([{ email, phone: phone || null, source }]);

      if (supaError) {
        if (supaError.code === "23505") {
          setError("Cette adresse email est déjà inscrite.");
        } else {
          setError("Une erreur est survenue. Réessayez.");
        }
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch {
      setError("Une erreur est survenue. Réessayez.");
    }
    setLoading(false);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setSuccess(false);
      setEmail("");
      setPhone("");
      setError("");
    }, 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Réserver mon accès prioritaire"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative z-50 w-full sm:max-w-md bg-white border border-[var(--rule)] p-8 sm:p-10 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={closeRef}
                onClick={handleClose}
                className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors"
                aria-label="Fermer"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M4 4l10 10M14 4L4 14" />
                </svg>
              </button>

              {success ? (
                <div className="text-center py-6">
                  <div
                    className="text-[var(--ink)] mb-2"
                    style={{
                      fontFamily: FONTS.display,
                      fontWeight: 800,
                      fontSize: 28,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Place réservée.
                  </div>
                  <p className="text-[var(--ink-2)]" style={{ fontSize: 14, lineHeight: 1.6 }}>
                    Tu seras contacté en priorité dès que le stock est disponible.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <div
                      className="text-[var(--ink-2)] mb-5"
                      style={{
                        fontFamily: FONTS.mono,
                        fontSize: 10,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                      }}
                    >
                      Accès prioritaire · Lot 001
                    </div>
                    <h2
                      style={{
                        fontFamily: FONTS.display,
                        fontWeight: 800,
                        fontSize: 32,
                        letterSpacing: "-0.03em",
                        lineHeight: 1,
                      }}
                    >
                      Devenir fondateur
                    </h2>
                    <p className="text-[var(--ink-2)] mt-3" style={{ fontSize: 14, lineHeight: 1.6 }}>
                      Rejoins les 500 fondateurs. <span style={{ textDecoration: "line-through" }}>30€</span> → 15€ — expédié sous 6 mois.
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div>
                      <label
                        htmlFor="capture-email"
                        className="block mb-1.5 text-[var(--ink)]"
                        style={{
                          fontFamily: FONTS.mono,
                          fontSize: 10,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                        }}
                      >
                        Email <span className="text-[var(--amber)]">*</span>
                      </label>
                      <Input
                        ref={emailRef}
                        id="capture-email"
                        type="email"
                        placeholder="ton@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        aria-invalid={error && error.includes("email") ? "true" : undefined}
                        aria-describedby={error ? "capture-error" : undefined}
                        className="h-12 border-[var(--rule)]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="capture-phone"
                        className="block mb-1.5 text-[var(--ink-2)]"
                        style={{
                          fontFamily: FONTS.mono,
                          fontSize: 10,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                        }}
                      >
                        Téléphone — optionnel
                      </label>
                      <Input
                        id="capture-phone"
                        type="tel"
                        placeholder="06 XX XX XX XX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete="tel"
                        className="h-12 border-[var(--soft)]"
                      />
                    </div>
                    {error && (
                      <p id="capture-error" className="text-red-600 text-sm" role="alert">
                        {error}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-3 min-h-[48px] bg-[var(--amber)] text-white border border-[var(--amber)] hover:bg-[var(--ink)] hover:border-[var(--ink)] transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none"
                      style={{
                        fontFamily: FONTS.mono,
                        fontSize: 11,
                        fontWeight: 500,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                      }}
                    >
                      {loading ? "Envoi..." : "Devenir fondateur — 15 €"}
                      {!loading && <span aria-hidden="true">→</span>}
                    </button>
                    <ul className="mt-2" style={{ fontFamily: FONTS.mono, fontSize: 10, lineHeight: 1.8, color: "#666666", listStyle: "none", padding: 0 }}>
                      <li>— Prix fondateur : 15€ au lieu de <span style={{ textDecoration: "line-through" }}>30€</span> — 50% de réduction</li>
                      <li>— Expédition estimée : dans 6 mois maximum</li>
                      <li>— Aucun frais caché — paiement sécurisé</li>
                    </ul>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
