"use client";

import { motion } from "framer-motion";
import FadeUp from "@/components/FadeUp";

const actifs = [
  {
    ord: "N° 01 · Minéral",
    mol: "NaHCO₃",
    name: "Bicarbonate de sodium",
    dose: "1700",
    role: "Équilibre acido-basique post-alcool. Tampon des fluides corporels.",
    svg: (
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={1.2}>
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
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}>
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
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={1.2}>
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
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}>
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
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}>
        <path d="M28 6 L46 14 V28 Q46 44 28 50 Q10 44 10 28 V14 Z" />
        <path d="M19 28 L25 34 L37 22" />
      </svg>
    ),
  },
];

const stamps = ["Sans sucre ajouté", "Sans colorant", "Vegan", "Made in France"];

export default function Ingredients() {
  return (
    <section id="actifs" className="scroll-mt-20 bg-[var(--paper-2)] border-b border-[var(--rule)] relative z-[5]" style={{ padding: "140px 0" }}>
      <div className="max-w-[1380px] mx-auto px-10">
        <FadeUp>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-20 items-end mb-24">
            <div>
              <div
                className="text-[var(--ink-2)] mb-7"
                style={{ fontFamily: "var(--font-mono), var(--mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" }}
              >
                La Formule · Lot 001
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-barlow), var(--display)",
                  fontWeight: 800,
                  fontSize: "clamp(56px, 7vw, 112px)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.035em",
                }}
              >
                Cinq{" "}
                <span style={{ fontFamily: "var(--font-barlow), var(--display)", fontWeight: 800, fontStyle: "normal" }}>
                  actifs.
                </span>
                <br />
                Aucun remplissage.
              </h2>
            </div>
            <p className="text-[var(--ink-2)]" style={{ fontSize: 17, lineHeight: 1.55, maxWidth: 420 }}>
              Pour 1 dose de 8g.{" "}
              <em style={{ fontFamily: "var(--font-barlow), var(--display)", fontStyle: "normal", fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em" }}>
                Apports conformes ANSES.
              </em>
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-2 lg:grid-cols-5 border-t border-l border-[var(--rule)]">
          {actifs.map((a, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-[var(--paper)] border-r border-b border-[var(--rule)] hover:bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex flex-col gap-[14px]"
              style={{ padding: "36px 24px 32px" }}
            >
              <div
                className="text-[var(--ink-2)] pb-3 border-b border-[var(--soft)]"
                style={{ fontFamily: "var(--font-mono), var(--mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" }}
              >
                {a.ord}
              </div>
              <div className="w-11 h-11 text-[var(--ink)]">{a.svg}</div>
              <div
                className="text-[var(--ink-2)]"
                style={{ fontFamily: "var(--font-mono), var(--mono)", fontSize: 11 }}
              >
                {a.mol}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-barlow), var(--display)",
                  fontWeight: 700,
                  fontSize: 22,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  alignSelf: "end",
                }}
              >
                {a.name}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-barlow), var(--display)",
                  fontWeight: 800,
                  fontSize: 36,
                  letterSpacing: "-0.025em",
                  lineHeight: 1,
                  color: "var(--ink)",
                }}
              >
                {a.dose}
                <span
                  className="text-[var(--ink-2)]"
                  style={{
                    fontFamily: "var(--font-barlow), var(--display)",
                    fontWeight: 500,
                    fontStyle: "normal",
                    fontSize: 16,
                    letterSpacing: 0,
                  }}
                >
                  {" "}mg
                </span>
              </div>
              <div
                className="text-[var(--ink-2)] border-t border-dashed border-[var(--soft)] pt-3"
                style={{ fontSize: 13, lineHeight: 1.5 }}
              >
                {a.role}
              </div>
            </motion.article>
          ))}
        </div>

        <FadeUp delay={0.3}>
          <div className="mt-14 pt-7 border-t border-[var(--rule)] flex justify-between gap-8 flex-wrap items-center">
            <div
              className="flex gap-7 flex-wrap text-[var(--ink)]"
              style={{ fontFamily: "var(--font-mono), var(--mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase" }}
            >
              {stamps.map((s) => (
                <span key={s} className="inline-flex items-center gap-2">
                  <span className="w-[6px] h-[6px] bg-[var(--ink)] rounded-full" />
                  {s}
                </span>
              ))}
            </div>
            <div
              className="text-[var(--ink-2)]"
              style={{ fontFamily: "var(--font-mono), var(--mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase" }}
            >
              LOT 001 · FAB 04—2026 · DLUO 04—2028
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
