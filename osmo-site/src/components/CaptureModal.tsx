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
      <DialogContent className="sm:max-w-md p-8">
        {/* Close button */}
        <button
          onClick={() => handleClose(false)}
          className="absolute top-4 right-4 text-osmo-muted hover:text-osmo-text transition-colors"
          aria-label="Fermer"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 5l10 10M15 5L5 15" />
          </svg>
        </button>

        {success ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-osmo-accent/10">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C8963E"
                strokeWidth="2"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <p className="font-display text-xl font-bold text-osmo-text mb-2">
              C&apos;est noté.
            </p>
            <p className="text-osmo-muted text-sm font-body">
              Tu fais partie des premiers. On te contacte dès que c&apos;est
              prêt.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2 mb-6">
              <h2 className="font-display text-2xl font-bold text-osmo-text">
                Réserver mon accès prioritaire
              </h2>
              <p className="text-osmo-muted text-sm font-body">
                Aucun paiement maintenant. Vous serez contacté en priorité dès
                que le stock est disponible.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
              />
              <Input
                type="tel"
                placeholder="06 XX XX XX XX — optionnel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-osmo-accent hover:bg-osmo-accent-hover text-white font-medium py-3 text-sm transition-colors disabled:opacity-50"
              >
                {loading
                  ? "Envoi en cours..."
                  : "Réserver mon accès prioritaire"}
              </button>
              <p className="text-xs text-osmo-muted text-center">
                Prix fondateur garanti : 25€. Vous serez contacté avant la mise
                en vente publique.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
