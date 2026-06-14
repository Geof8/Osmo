"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CountUp from "@/components/ui/CountUp";
import HeroCarousel from "@/components/ui/HeroCarousel";
import { useCart } from "@/context/CartContext";
import { FONTS, HERO_STATS, PRODUCT, REASSURANCE_LINE } from "@/lib/constants";
import type { HeroProps } from "@/types";

const headlineWordsPlain = ["Le", "lendemain", "matin,"];
const headlineWordsItalic = ["tu", "assures."];

const HERO_VARIANT: "A" | "B" | "C" = "A";

const HERO_SUBLINES: Record<"A" | "B" | "C", string[]> = {
  A: [
    "3 verres hier soir. Réunion à 9h ce matin.",
    "Le lendemain, ça ne pardonne plus.",
  ],
  B: [
    "Tu bois avec tes amis le soir.",
    "Tu assures au bureau le matin.",
    "OSMO, c'est pour ça.",
  ],
  C: [
    "Ton corps se déshydrate pendant que tu dors.",
    "Tes minéraux s'effondrent. Ton foie sature.",
    "Et toi tu te réveilles en morceaux.",
  ],
};

const ACCORDION_ITEMS = [
  {
    title: "Ce que vous ne trouverez pas ici",
    body: "Pas de sucre ajouté, pas d'arômes artificiels, pas de gélules sous-dosées, pas de marketing sans preuves. Juste 5 actifs cliniques dosés, formulés en France.",
  },
  {
    title: "Pourquoi la poudre est plus efficace que la gélule",
    body: "Absorption 3× plus rapide : dissolution directe dans l'eau vs digestion de la coque. Nos actifs — NAC, Magnésium bisglycinate, Potassium — sont actifs en 15 minutes au lieu de 45-60 min en gélule.",
  },
  {
    title: "Livraison & politique de retour",
    body: "OSMO est en pré-commande. Expédition prévue Automne 2026. Si tu n'es pas satisfait dans les 30 jours suivant la réception, on te rembourse intégralement, sans conditions.",
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 220ms ease",
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      <path d="M3 6l5 5 5-5" />
    </svg>
  );
}

export default function Hero({ revealed, soldOut = false, remaining = PRODUCT.maxEarlyAdopters }: HeroProps) {
  const { addToCartAndNavigate } = useCart();
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const total = PRODUCT.maxEarlyAdopters;
  const safeRemaining = Math.max(0, Math.min(total, remaining));
  const fillPct = Math.max(0, Math.min(100, (safeRemaining / total) * 100));
  const lowStock = safeRemaining < 10;
  const counterColor = lowStock ? "#C8963E" : "#666666";
  const fillColor = lowStock ? "#C8963E" : "#111111";
  const counterText = lowStock
    ? `⚡ Plus que ${safeRemaining} places — offre limitée`
    : `Il reste ${safeRemaining} places sur ${total}`;

  return (
    <section
      id="hero"
      className="scroll-mt-20 border-b border-[#E8E8E8] relative z-[5] bg-white"
      style={{ padding: "clamp(64px, 9vw, 100px) 0" }}
    >
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[72px] items-start lg:min-h-[70vh]">

          {/* RIGHT: Editorial text */}
          <div className="flex flex-col gap-6 sm:gap-8 order-2 lg:order-2">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <span
                className="inline-flex items-center"
                style={{
                  background: "#111111",
                  color: "#FFFFFF",
                  fontFamily: FONTS.body,
                  fontSize: 13,
                  letterSpacing: "0.1em",
                  borderRadius: 50,
                  padding: "8px 20px",
                }}
              >
                🔒 PRÉ-COMMANDE · Expédition estimée : Automne 2026
              </span>
            </motion.div>

            {/* Headline */}
            <h1
              style={{
                fontFamily: FONTS.display,
                fontWeight: 800,
                fontSize: "clamp(26px, 4.2vw, 52px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "#111111",
                margin: 0,
              }}
            >
              {headlineWordsPlain.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                  animate={revealed ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 30, filter: "blur(4px)" }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
              {headlineWordsItalic.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                  animate={revealed ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 30, filter: "blur(4px)" }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="inline-block mr-[0.25em]"
                  style={{ fontStyle: "italic", fontWeight: 700 }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                fontFamily: FONTS.body,
                fontSize: "clamp(15px, 3vw, 17px)",
                lineHeight: 1.55,
                maxWidth: 460,
                color: "#555555",
                fontWeight: 400,
                margin: 0,
              }}
            >
              {HERO_SUBLINES[HERO_VARIANT].map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </motion.p>

            {/* Price + Urgency block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col gap-3"
              style={{ maxWidth: 400 }}
            >
              {/* Price inline */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                <span
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 20,
                    color: "#AAAAAA",
                    textDecoration: "line-through",
                    lineHeight: 1,
                  }}
                >
                  {PRODUCT.publicPrice}€
                </span>
                <span
                  aria-hidden="true"
                  style={{ fontFamily: FONTS.body, fontSize: 16, color: "#AAAAAA", lineHeight: 1 }}
                >
                  →
                </span>
                <span
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 48,
                    fontWeight: 900,
                    color: "#C8963E",
                    lineHeight: 1,
                  }}
                >
                  {PRODUCT.earlyPrice}€
                </span>
                <span
                  style={{
                    background: "#111111",
                    color: "#FFFFFF",
                    fontFamily: FONTS.body,
                    fontSize: 12,
                    fontWeight: 700,
                    padding: "5px 14px",
                    borderRadius: 50,
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                    alignSelf: "center",
                  }}
                >
                  -29%
                </span>
              </div>

              {/* Urgency */}
              <div className="flex flex-col gap-2">
                <p
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 13,
                    color: counterColor,
                    margin: 0,
                  }}
                >
                  {counterText}
                </p>
                <div
                  style={{
                    width: "100%",
                    height: 3,
                    background: "#E8E8E8",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={revealed ? { width: `${fillPct}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{ height: "100%", background: fillColor, borderRadius: 2 }}
                  />
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-col gap-2"
              style={{ maxWidth: 400 }}
            >
              <button
                onClick={addToCartAndNavigate}
                className="cta-pill inline-flex items-center justify-center gap-3 px-7 min-h-[52px] active:scale-[0.97] w-full"
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                {soldOut
                  ? "Lot N°001 complet · liste d'attente"
                  : "Réserver ma place — 25€"}{" "}
                <span aria-hidden="true">→</span>
              </button>
              <p
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 11,
                  color: "#666666",
                  letterSpacing: "0.05em",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                {REASSURANCE_LINE}
              </p>
            </motion.div>

            {/* Accordion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              style={{ borderTop: "1px solid #E8E8E8", maxWidth: 400 }}
            >
              {ACCORDION_ITEMS.map((item, i) => {
                const isOpen = openAccordion === i;
                return (
                  <div key={i} style={{ borderBottom: "1px solid #E8E8E8" }}>
                    <button
                      onClick={() => setOpenAccordion(isOpen ? null : i)}
                      className="w-full flex items-center justify-between text-left"
                      style={{ padding: "14px 0", gap: 12, background: "none", border: "none", cursor: "pointer" }}
                      aria-expanded={isOpen}
                    >
                      <span
                        style={{
                          fontFamily: FONTS.body,
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#111111",
                          lineHeight: 1.4,
                        }}
                      >
                        {item.title}
                      </span>
                      <ChevronIcon open={isOpen} />
                    </button>
                    <div
                      style={{
                        overflow: "hidden",
                        maxHeight: isOpen ? 200 : 0,
                        transition: "max-height 280ms ease",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: FONTS.body,
                          fontSize: 14,
                          color: "#666666",
                          lineHeight: 1.65,
                          margin: 0,
                          paddingBottom: 16,
                        }}
                      >
                        {item.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>

          </div>

          {/* LEFT: Carousel + feature row */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={revealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-1 lg:order-1 flex flex-col gap-4"
          >
            <HeroCarousel />
          </motion.div>
        </div>

        {/* Hero meta strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 lg:mt-14 pt-8 grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4 sm:gap-8"
          style={{ borderTop: "1px solid #E8E8E8" }}
        >
          {HERO_STATS.map((item, i) => (
            <div key={i} className="min-w-0">
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontWeight: 800,
                  fontSize: "clamp(26px, 5vw, 36px)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1,
                  color: "#C8963E",
                }}
              >
                {item.count ? <CountUp target={item.k} start={revealed} /> : item.label}
              </div>
              <div
                className="mt-3"
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  lineHeight: 1.4,
                  fontWeight: 400,
                  color: "#999999",
                }}
              >
                {item.v}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
