"use client";

import { useState } from "react";
import { FONTS, GUARANTEE_LINE } from "@/lib/constants";

interface WaitlistFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

type Status = "idle" | "submitting" | "success" | "error" | "duplicate";

export default function WaitlistForm() {
  const [form, setForm] = useState<WaitlistFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): Record<string, string> {
    const errs: Record<string, string> = {};
    if (!form.firstName.trim()) errs.firstName = "Prénom requis";
    if (!form.lastName.trim()) errs.lastName = "Nom requis";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Email invalide";
    return errs;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "lot2-waitlist" }),
      });

      if (res.ok) {
        setStatus("success");
      } else if (res.status === 409) {
        setStatus("duplicate");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="p-8 text-center"
        style={{
          borderLeft: "2px solid #FFFFFF",
          backgroundColor: "rgba(255,255,255,0.04)",
          maxWidth: 560,
        }}
      >
        <p
          style={{
            fontFamily: FONTS.display,
            fontWeight: 700,
            fontSize: "clamp(20px, 2.5vw, 28px)",
            color: "#FFFFFF",
          }}
        >
          Tu es sur la liste !
        </p>
        <p
          className="mt-3"
          style={{
            fontFamily: FONTS.mono,
            fontSize: 12,
            lineHeight: 1.7,
            color: "rgba(255,248,232,0.7)",
            letterSpacing: "0.06em",
          }}
        >
          On te contactera dès que le Lot N°002 sera prêt.
        </p>
      </div>
    );
  }

  const inputStyle = {
    fontFamily: FONTS.mono,
    fontSize: 13,
  } as const;

  const labelStyle = {
    fontFamily: FONTS.mono,
    fontSize: 10,
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    color: "rgba(255,248,232,0.5)",
  } as const;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-[560px]">
      <div>
        <p
          style={{
            fontFamily: FONTS.display,
            fontWeight: 700,
            fontSize: "clamp(18px, 2vw, 24px)",
            color: "white",
          }}
        >
          Lot N°001 épuisé, rejoins la liste pour le Lot N°002
        </p>
        <p
          className="mt-2"
          style={{
            fontFamily: FONTS.mono,
            fontSize: 11,
            lineHeight: 1.7,
            color: "rgba(255,248,232,0.5)",
            letterSpacing: "0.06em",
          }}
        >
          Laisse tes coordonnées, on te prévient en priorité.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1.5" style={labelStyle}>Prénom</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Prénom"
            className="w-full h-12 px-4 border border-white/20 bg-white/5 text-white outline-none focus:border-white transition-colors placeholder:text-white/30"
            style={inputStyle}
          />
          {errors.firstName && <p className="mt-1 text-red-400" style={{ fontFamily: FONTS.mono, fontSize: 11 }}>{errors.firstName}</p>}
        </div>
        <div>
          <label className="block mb-1.5" style={labelStyle}>Nom</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Nom"
            className="w-full h-12 px-4 border border-white/20 bg-white/5 text-white outline-none focus:border-white transition-colors placeholder:text-white/30"
            style={inputStyle}
          />
          {errors.lastName && <p className="mt-1 text-red-400" style={{ fontFamily: FONTS.mono, fontSize: 11 }}>{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label className="block mb-1.5" style={labelStyle}>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="votre@email.com"
          className="w-full h-12 px-4 border border-white/20 bg-white/5 text-white outline-none focus:border-white transition-colors placeholder:text-white/30"
          style={inputStyle}
        />
        {errors.email && <p className="mt-1 text-red-400" style={{ fontFamily: FONTS.mono, fontSize: 11 }}>{errors.email}</p>}
      </div>

      <div>
        <label className="block mb-1.5" style={labelStyle}>
          Téléphone <span style={{ color: "rgba(255,248,232,0.3)" }}>(optionnel)</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="06 12 34 56 78"
          className="w-full h-12 px-4 border border-white/20 bg-white/5 text-white outline-none focus:border-white transition-colors placeholder:text-white/30"
          style={inputStyle}
        />
      </div>

      {status === "error" && (
        <p className="text-red-400" style={{ fontFamily: FONTS.mono, fontSize: 11 }}>
          Une erreur est survenue. Réessaie dans quelques instants.
        </p>
      )}
      {status === "duplicate" && (
        <p style={{ fontFamily: FONTS.mono, fontSize: 11, color: "#FFFFFF" }}>
          Cet email est déjà inscrit sur la liste d&apos;attente.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="cta-pill inline-flex items-center justify-center gap-3 px-7 min-h-[48px] active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          fontFamily: FONTS.mono,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        {status === "submitting" ? "Inscription..." : "Rejoindre la liste d'attente"}
        {status !== "submitting" && <span aria-hidden="true">→</span>}
      </button>
      <div className="cta-guarantee cta-guarantee-dark">{GUARANTEE_LINE}</div>
    </form>
  );
}
