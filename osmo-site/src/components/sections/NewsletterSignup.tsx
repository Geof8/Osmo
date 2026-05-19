"use client";

import { useState } from "react";
import FadeUp from "@/components/ui/FadeUp";
import { FONTS } from "@/lib/constants";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "already" }
  | { kind: "error"; message: string };

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!EMAIL_RE.test(value)) {
      setStatus({ kind: "error", message: "Email invalide" });
      return;
    }
    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      const data: { ok?: boolean; already?: boolean; error?: string } =
        await res.json();
      if (res.status === 409 || data.already) {
        setStatus({ kind: "already" });
        return;
      }
      if (!res.ok || !data.ok) {
        setStatus({
          kind: "error",
          message: data.error || "Une erreur est survenue. Réessaie.",
        });
        return;
      }
      setStatus({ kind: "success" });
      setEmail("");
    } catch {
      setStatus({
        kind: "error",
        message: "Connexion impossible. Réessaie.",
      });
    }
  }

  return (
    <section
      id="newsletter"
      className="scroll-mt-20"
      style={{
        background: "#111111",
        color: "#FFFFFF",
        padding: "clamp(56px, 9vw, 80px) 0",
      }}
    >
      <div className="max-w-[720px] mx-auto px-6 sm:px-10 text-center">
        <FadeUp>
          <h2
            style={{
              fontFamily: FONTS.display,
              fontWeight: 900,
              fontSize: "clamp(32px, 6vw, 56px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              margin: 0,
            }}
          >
            Les secrets de la récupération.
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: 16,
              lineHeight: 1.6,
              color: "#666666",
              marginTop: 20,
            }}
          >
            Électrolytes, sommeil, alcool — ce que la science dit vraiment.
            <br />
            Une newsletter tous les 15 jours.
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-10 flex flex-col gap-3 mx-auto"
            style={{ maxWidth: 480 }}
          >
            <input
              type="email"
              required
              placeholder="ton@email.fr"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status.kind === "error") setStatus({ kind: "idle" });
              }}
              disabled={
                status.kind === "submitting" || status.kind === "success"
              }
              aria-label="Adresse email"
              style={{
                width: "100%",
                background: "#1A1A1A",
                border: "1px solid #333333",
                color: "#FFFFFF",
                borderRadius: 50,
                padding: "14px 24px",
                fontSize: 16,
                fontFamily: FONTS.body,
                outline: "none",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#C8963E";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#333333";
              }}
            />

            <button
              type="submit"
              disabled={
                status.kind === "submitting" || status.kind === "success"
              }
              className="cta-pill active:scale-[0.98]"
              style={{
                width: "100%",
                height: 56,
                fontWeight: 700,
                fontSize: 15,
                fontFamily: FONTS.body,
                opacity:
                  status.kind === "submitting" || status.kind === "success"
                    ? 0.7
                    : 1,
                cursor:
                  status.kind === "submitting" || status.kind === "success"
                    ? "default"
                    : "pointer",
              }}
            >
              {status.kind === "submitting"
                ? "Envoi…"
                : "Je m'abonne — -15% offert"}
            </button>

            {status.kind === "success" && (
              <p
                role="status"
                style={{
                  color: "#C8963E",
                  fontFamily: FONTS.body,
                  fontSize: 14,
                  marginTop: 12,
                  fontWeight: 600,
                }}
              >
                ✓ Check tes emails — ton code -15% t&apos;attend.
              </p>
            )}
            {status.kind === "already" && (
              <p
                role="status"
                style={{
                  color: "#C8963E",
                  fontFamily: FONTS.body,
                  fontSize: 14,
                  marginTop: 12,
                }}
              >
                Tu es déjà abonné.
              </p>
            )}
            {status.kind === "error" && (
              <p
                role="alert"
                style={{
                  color: "#C8963E",
                  fontFamily: FONTS.body,
                  fontSize: 14,
                  marginTop: 12,
                }}
              >
                {status.message}
              </p>
            )}

            <p
              style={{
                fontFamily: FONTS.body,
                color: "#666666",
                fontSize: 12,
                marginTop: 16,
                lineHeight: 1.6,
              }}
            >
              Code promo envoyé immédiatement après inscription.
              <br />
              Désabonnement en un clic.
            </p>
          </form>
        </FadeUp>
      </div>
    </section>
  );
}
