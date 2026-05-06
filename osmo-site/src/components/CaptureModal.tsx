"use client";

import { useState, FormEvent } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { getSupabase } from "@/lib/supabase";

interface CaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string;
}

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Veuillez entrer une adresse email valide.");
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

  const handleClose = (open: boolean) => {
    if (!open) {
      setTimeout(() => {
        setSuccess(false);
        setEmail("");
        setPhone("");
        setError("");
      }, 300);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-10 border-[var(--rule)]">
        {/* Close button */}
        <button
          onClick={() => handleClose(false)}
          className="absolute top-5 right-5 text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors"
          aria-label="Fermer"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4l10 10M14 4L4 14" />
          </svg>
        </button>

        {success ? (
          <div className="text-center py-6">
            <div
              className="text-[var(--ink)] mb-2"
              style={{
                fontFamily: "var(--font-barlow), var(--display)",
                fontWeight: 800,
                fontSize: 28,
                letterSpacing: "-0.02em",
              }}
            >
              Place réservée.
            </div>
            <p className="text-[var(--ink-2)]" style={{ fontSize: 14, lineHeight: 1.55 }}>
              Vous serez contacté en priorité dès que le stock est disponible.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div
                className="text-[var(--ink-2)] mb-5"
                style={{
                  fontFamily: "var(--font-mono), var(--mono)",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase" as const,
                }}
              >
                Accès prioritaire · Lot 001
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-barlow), var(--display)",
                  fontWeight: 800,
                  fontSize: 32,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                Réserver mon accès
              </h2>
              <p className="text-[var(--ink-2)] mt-3" style={{ fontSize: 14, lineHeight: 1.55 }}>
                Aucun paiement maintenant. Vous serez contacté en priorité dès que le stock est disponible.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 border-[var(--rule)]"
              />
              <Input
                type="tel"
                placeholder="06 XX XX XX XX — optionnel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12 border-[var(--soft)]"
              />
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-3 py-[14px] bg-[var(--amber)] text-white border border-[var(--amber)] hover:bg-[var(--ink)] hover:border-[var(--ink)] transition-colors duration-200 disabled:opacity-50"
                style={{
                  fontFamily: "var(--font-mono), var(--mono)",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase" as const,
                }}
              >
                {loading ? "Envoi..." : "Réserver — 25 €"}
                {!loading && <span>→</span>}
              </button>
              <p
                className="text-[var(--ink-3)] text-center"
                style={{ fontFamily: "var(--font-mono), var(--mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" as const }}
              >
                Prix fondateur garanti · 0 € maintenant
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
