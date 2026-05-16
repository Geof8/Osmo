"use client";

import { motion } from "framer-motion";
import FadeUp from "@/components/FadeUp";
import { useCart } from "@/context/CartContext";
import { FONTS } from "@/lib/constants";
import type { OpenModalProps } from "@/types";

export default function ClosingCTA({ soldOut = false }: OpenModalProps) {
  const { addToCartAndNavigate } = useCart();
  return (
    <section id="reserve" className="scroll-mt-20 bg-[var(--ink)] text-white relative overflow-hidden" style={{ padding: "80px 0" }}>
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        aria-hidden="true"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="max-w-[1380px] mx-auto px-5 sm:px-10 relative">
        <FadeUp>
          <div
            className="text-[var(--ink-2)] mb-8 lg:mb-12 flex items-center gap-[14px]"
            style={{ fontFamily: FONTS.mono, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" }}
          >
            <span className="w-7 h-px bg-white/40" aria-hidden="true" />
            Vol. 01 · Lot N°001 · 50 ex.
          </div>
        </FadeUp>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: FONTS.display,
            fontWeight: 800,
            fontSize: "clamp(40px, 7vw, 110px)",
            lineHeight: 0.92,
            letterSpacing: "-0.02em",
          }}
        >
          Parce que demain matin,{" "}
          tu n&apos;as{" "}
          <span
            style={{
              fontFamily: FONTS.display,
              fontWeight: 800,
              fontStyle: "normal",
              color: "var(--amber)",
            }}
          >
            pas le choix.
          </span>
        </motion.h2>

        <FadeUp delay={0.1}>
          <p
            className="mt-6"
            style={{
              fontFamily: FONTS.mono,
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,248,232,0.6)",
            }}
          >
            50 places · 20€ · Expédié sous 6 mois
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div
            className="mt-12 lg:mt-16"
            style={{
              borderLeft: "3px solid #C8963E",
              backgroundColor: "rgba(255,255,255,0.06)",
              padding: "clamp(20px, 3vw, 32px)",
              maxWidth: 680,
            }}
          >
            <p
              style={{
                fontFamily: FONTS.display,
                fontWeight: 400,
                fontSize: "clamp(14px, 1.1vw, 17px)",
                lineHeight: 1.65,
                color: "rgba(255,248,232,0.8)",
              }}
            >
              <strong style={{ color: "var(--amber)", fontWeight: 700 }}>Pourquoi 6 mois ?</strong>{" "}
              OSMO est en phase de pré-lancement. La commande au laboratoire
              sera passée une fois les 50 Early Adopters réunis.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="mt-12 lg:mt-16 pt-8 border-t border-white/[0.16] flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <button
              onClick={addToCartAndNavigate}
              className="inline-flex items-center gap-3 px-5 min-h-[48px] bg-[var(--amber)] text-white border border-[var(--amber)] hover:bg-white hover:text-[var(--ink)] hover:border-white transition-all duration-200 active:scale-[0.97]"
              style={{
                fontFamily: FONTS.mono,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              {soldOut
                ? "Lot N°001 complet — rejoindre la liste d'attente"
                : "Devenir Early Adopter — 20 €"}{" "}
              <span aria-hidden="true">→</span>
            </button>
            <ul style={{ fontFamily: FONTS.mono, fontSize: 11, lineHeight: 1.8, color: "rgba(255,248,232,0.5)", listStyle: "none", padding: 0 }}>
              <li><strong>— Prix Early Adopter : 20€ au lieu de 30€ — 33% de réduction</strong></li>
              <li>— Validé par un laboratoire, testé par l&apos;entourage</li>
              <li>— Expédition estimée : dans 6 mois maximum</li>
              <li>— Aucun frais caché — paiement sécurisé</li>
            </ul>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
