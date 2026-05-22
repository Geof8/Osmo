"use client";

import { motion } from "framer-motion";
import FadeUp from "@/components/ui/FadeUp";
import WaitlistForm from "@/components/ui/WaitlistForm";
import { useCart } from "@/context/CartContext";
import { FONTS, GUARANTEE_LINE } from "@/lib/constants";
import type { SoldOutProps } from "@/types";

export default function ClosingCTA({ soldOut = false }: SoldOutProps) {
  const { addToCartAndNavigate } = useCart();
  return (
    <section id="reserve" className="scroll-mt-20 text-white relative overflow-hidden" style={{ background: "#111111", padding: "clamp(72px, 10vw, 100px) 0" }}>
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        aria-hidden="true"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10 relative">
        <FadeUp>
          <div
            className="mb-10 lg:mb-14 flex items-center gap-[14px]"
            style={{
              fontFamily: FONTS.mono,
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#999999",
            }}
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
            fontSize: "clamp(32px, 7vw, 72px)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
          }}
        >
          Parce que demain matin,{" "}
          tu n&apos;as{" "}
          <span
            style={{
              fontFamily: FONTS.display,
              fontWeight: 800,
              fontStyle: "italic",
              color: "#FFFFFF",
            }}
          >
            pas le choix.
          </span>
        </motion.h2>

        <FadeUp delay={0.1}>
          <p
            className="mt-8"
            style={{
              fontFamily: FONTS.mono,
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#999999",
            }}
          >
            50 places · 20€ · Expédié sous 6 mois
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div
            className="mt-12 lg:mt-16"
            style={{
              borderLeft: "2px solid #FFFFFF",
              backgroundColor: "rgba(255,255,255,0.04)",
              padding: "20px 24px",
              maxWidth: 680,
            }}
          >
            <p
              style={{
                fontFamily: FONTS.body,
                fontWeight: 400,
                fontSize: "clamp(14px, 3.4vw, 16px)",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.78)",
              }}
            >
              <strong style={{ color: "#FFFFFF", fontWeight: 700 }}>Pourquoi 6 mois ?</strong>{" "}
              OSMO est en phase de pré-lancement. La commande au laboratoire
              sera passée une fois les 50 Early Adopters réunis.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="mt-12 lg:mt-16 pt-8 border-t border-white/[0.16]">
            {soldOut ? (
              <WaitlistForm />
            ) : (
              <div className="flex flex-col sm:flex-row gap-6 items-stretch sm:items-center">
                <div className="flex flex-col gap-2 items-stretch sm:items-start">
                  <button
                    onClick={addToCartAndNavigate}
                    className="cta-pill inline-flex items-center justify-center gap-3 px-7 min-h-[52px] active:scale-[0.97] w-full sm:w-auto"
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                    }}
                  >
                    Réserver ma place — 20€{" "}
                    <span aria-hidden="true">→</span>
                  </button>
                  <div className="cta-guarantee cta-guarantee-dark w-full">
                    {GUARANTEE_LINE}
                  </div>
                </div>
                <ul style={{ fontFamily: FONTS.mono, fontSize: 11, lineHeight: 1.8, color: "rgba(255,248,232,0.5)", listStyle: "none", padding: 0 }}>
                  <li><strong>Prix Early Adopter : 20€ au lieu de 30€, 33% de réduction</strong></li>
                  <li>Validé par un laboratoire</li>
                  <li>Expédition estimée : dans 6 mois maximum</li>
                  <li>Aucun frais caché, paiement sécurisé</li>
                </ul>
              </div>
            )}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
