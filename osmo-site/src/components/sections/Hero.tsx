"use client";

import { motion } from "framer-motion";
import CountUp from "@/components/ui/CountUp";
import HeroCarousel from "@/components/ui/HeroCarousel";
import { useCart } from "@/context/CartContext";
import { FONTS, GUARANTEE_LINE, HERO_STATS } from "@/lib/constants";
import type { HeroProps } from "@/types";

const headlineWords = ["Le", "lendemain", "matin,"];
const headlineWords2 = ["tu", "assures."];

export default function Hero({ revealed, soldOut = false }: HeroProps) {
  const { addToCartAndNavigate } = useCart();
  return (
    <section
      className="scroll-mt-20 border-b border-[#E8E8E8] relative z-[5]"
      style={{ padding: "clamp(64px, 9vw, 100px) 0" }}
    >
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[72px] items-start lg:min-h-[70vh]">
          {/* RIGHT: Editorial text (desktop) / Below carousel (mobile) */}
          <div className="flex flex-col gap-8 sm:gap-10 order-2 lg:order-2">
            <h1
              style={{
                fontFamily: FONTS.display,
                fontWeight: 800,
                fontSize: "clamp(36px, 8vw, 96px)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                color: "#111111",
              }}
            >
              <span className="block">
                {headlineWords.map((word, i) => (
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
              </span>
              <span className="block" style={{ fontStyle: "italic", fontWeight: 700, color: "#111111" }}>
                {headlineWords2.map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                    animate={revealed ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 30, filter: "blur(4px)" }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                fontSize: "clamp(15px, 3.5vw, 16px)",
                lineHeight: 1.65,
                maxWidth: 480,
                color: "#444444",
              }}
            >
              Un complexe d&apos;électrolytes formulé pour la récupération{" "}
              <em
                style={{
                  fontFamily: FONTS.body,
                  fontStyle: "italic",
                  fontWeight: 600,
                  fontSize: "inherit",
                  color: "#111111",
                }}
              >
                pendant le sommeil et au réveil
              </em>{" "}
              après une soirée alcoolisée, une semaine chargée, ou les deux. Protocole quotidien · Soir + Matin.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col gap-4"
            >
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
                  {soldOut
                    ? "Lot N°001 complet · liste d'attente"
                    : "Rejoindre les Early Adopters · 20 €"}{" "}
                  <span aria-hidden="true">→</span>
                </button>
                <div className="cta-guarantee w-full">{GUARANTEE_LINE}</div>
              </div>
              <ul
                className="flex flex-col sm:flex-row sm:flex-wrap gap-y-1 sm:gap-x-5 sm:gap-y-1"
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 11,
                  letterSpacing: "0.04em",
                  color: "#666666",
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  lineHeight: 1.6,
                  fontWeight: 400,
                }}
              >
                <li>✓ Paiement sécurisé · Stripe</li>
                <li>✓ Expédition estimée sous 6 mois</li>
              </ul>
            </motion.div>

          </div>

          {/* LEFT: Carousel + feature row (desktop) / Top (mobile) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={revealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-1 lg:order-1 flex flex-col gap-4"
          >
            <HeroCarousel />

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {[
                {
                  label: "Goût citron",
                  icon: (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <ellipse cx="12" cy="13" rx="7" ry="8" />
                      <path d="M12 5c-1.5-1.5-3-2-4-2" />
                      <path d="M9.5 10.5 12 13l2.5-2.5M9.5 15.5 12 13l2.5 2.5" />
                    </svg>
                  ),
                },
                {
                  label: "Sans sucre ajouté",
                  icon: (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="5" y="5" width="14" height="14" rx="2" />
                      <line x1="4" y1="4" x2="20" y2="20" />
                    </svg>
                  ),
                },
                {
                  label: "Made in France",
                  icon: (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 21s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                  ),
                },
              ].map((f) => (
                <div
                  key={f.label}
                  className="osmo-card flex flex-col items-center text-center gap-2 sm:gap-3"
                  style={{ padding: "16px 6px" }}
                >
                  <div style={{ color: "#111111" }}>{f.icon}</div>
                  <div
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: "clamp(10px, 2.6vw, 12px)",
                      fontWeight: 400,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#111111",
                      lineHeight: 1.3,
                    }}
                  >
                    {f.label}
                  </div>
                </div>
              ))}
            </div>
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
