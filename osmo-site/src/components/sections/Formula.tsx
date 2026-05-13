"use client";

import { motion } from "framer-motion";
import FadeUp from "@/components/FadeUp";
import IngredientCard from "@/components/IngredientCard";
import MolecularAnimation from "@/components/MolecularAnimation";
import { useInView } from "@/hooks/useInView";
import { FONTS, STAMPS } from "@/lib/constants";
import type { Ingredient } from "@/types";

const actifs: Ingredient[] = [
  {
    ord: "N° 01 · Minéral",
    mol: "NaHCO₃",
    name: "Bicarbonate de sodium",
    dose: "1700",
    role: "Équilibre acido-basique post-alcool. Tampon des fluides corporels.",
    svg: (
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={1.2} aria-hidden="true">
        <path d="M28 6 L44 20 L36 46 L20 46 L12 20 Z" />
        <line x1="28" y1="6" x2="28" y2="46" />
        <line x1="12" y1="20" x2="44" y2="20" />
      </svg>
    ),
  },
  {
    ord: "N° 02 · Minéral",
    mol: "K₃C₆H₅O₇",
    name: "Citrate de potassium",
    dose: "2000",
    role: "Fonction musculaire. Contraction cardiaque normale.",
    svg: (
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} aria-hidden="true">
        <path d="M30 6 L16 32 L24 32 L20 50 L40 24 L30 24 Z" />
      </svg>
    ),
  },
  {
    ord: "N° 03 · Minéral",
    mol: "Mg(C₂H₄NO₂)₂",
    name: "Bisglycinate de magnésium",
    dose: "1350",
    role: "Récupération nerveuse. Sommeil profond.",
    svg: (
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={1.2} aria-hidden="true">
        <path d="M6 22 Q14 14 22 22 T36 22 T50 22" />
        <path d="M6 32 Q14 24 22 32 T36 32 T50 32" />
        <path d="M6 42 Q14 34 22 42 T36 42 T50 42" />
      </svg>
    ),
  },
  {
    ord: "N° 04 · Minéral",
    mol: "NaCl",
    name: "Chlorure de sodium",
    dose: "150",
    role: "Hydratation cellulaire ciblée.",
    svg: (
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} aria-hidden="true">
        <path d="M28 6 Q14 24 14 34 A14 14 0 0 0 42 34 Q42 24 28 6 Z" />
        <path d="M21 34 Q21 41 28 44" />
      </svg>
    ),
  },
  {
    ord: "N° 05 · Acide aminé",
    mol: "C₅H₉NO₃S",
    name: "N-Acétyl-Cystéine",
    dose: "600",
    role: "Soutien hépatique nocturne. Précurseur du glutathion.",
    svg: (
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} aria-hidden="true">
        <path d="M28 6 L46 14 V28 Q46 44 28 50 Q10 44 10 28 V14 Z" />
        <path d="M19 28 L25 34 L37 22" />
      </svg>
    ),
  },
];

export default function Formula() {
  const [ref, isInView] = useInView<HTMLDivElement>();

  return (
    <section
      id="formule"
      className="scroll-mt-20 relative z-[5]"
      style={{ background: "#111111", padding: "clamp(32px, 4vw, 60px) 0 clamp(16px, 2vw, 24px)" }}
    >
      <div ref={ref} className="max-w-[1380px] mx-auto px-5 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div
              className="mb-4"
              style={{
                fontFamily: FONTS.mono,
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#AAAAAA",
              }}
            >
              La formule
            </div>
            <h2
              style={{
                fontFamily: FONTS.display,
                fontWeight: 900,
                fontSize: "clamp(40px, 5vw, 80px)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                color: "#FFFFFF",
              }}
            >
              {["Cinq", "actifs."].map((word, i) => (
                <motion.span
                  key={i}
                  style={{ display: "inline-block", marginRight: i === 0 ? "0.3em" : 0 }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                >
                  {word}
                </motion.span>
              ))}
              <br />
              {["Une", "équation."].map((word, i) => (
                <motion.span
                  key={i + 2}
                  style={{ display: "inline-block", marginRight: i === 0 ? "0.3em" : 0 }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1, ease: "easeOut" }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>
            <motion.p
              className="mt-5"
              style={{ fontSize: 15, lineHeight: 1.65, color: "#AAAAAA", maxWidth: 380 }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Chaque ingr&eacute;dient a &eacute;t&eacute; s&eacute;lectionn&eacute; pour un r&ocirc;le pr&eacute;cis.
              <br />
              Rien de superflu. Tout est dos&eacute;.
            </motion.p>
          </div>

          <div className="flex justify-center">
            <MolecularAnimation />
          </div>
        </div>

        <div className="mt-6">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
            style={{ borderTop: "1px solid #333333", borderLeft: "1px solid #333333" }}
          >
            {actifs.map((a, i) => (
              <IngredientCard key={i} a={a} index={i} />
            ))}
          </div>

          <FadeUp delay={0.3}>
            <div
              className="mt-5 lg:mt-6 pt-4 flex justify-between gap-8 flex-wrap items-center"
              style={{ borderTop: "1px solid #333333" }}
            >
              <div
                className="flex gap-5 sm:gap-7 flex-wrap"
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                }}
              >
                {STAMPS.map((s) => (
                  <span key={s} className="inline-flex items-center gap-2">
                    <span className="w-[6px] h-[6px] bg-[#C8963E] rounded-full" aria-hidden="true" />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
