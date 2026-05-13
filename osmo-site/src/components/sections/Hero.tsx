"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import CountUp from "@/components/CountUp";
import { FONTS, HERO_STATS } from "@/lib/constants";
import type { HeroProps } from "@/types";

const headlineWords = ["Le", "lendemain", "matin,"];
const headlineWords2 = ["tu", "assures."];

export default function Hero({ onOpenModal, revealed }: HeroProps) {
  return (
    <section
      className="scroll-mt-20 border-b border-[var(--rule)] relative z-[5]"
      style={{ padding: "80px 0" }}
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-[72px] items-center min-h-[50vh] lg:min-h-[70vh]">
          {/* LEFT: Product image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={revealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-2 lg:order-1"
          >
            <Image
              src="/osmo-hero.png"
              alt="OSMO Recovery — complexe d'électrolyte, goût citron, 150g"
              width={1024}
              height={1024}
              className="w-full lg:w-[108%] max-h-[50vh] lg:max-h-[65vh] object-contain lg:ml-[-40px]"
              priority
            />
          </motion.div>

          {/* RIGHT: Editorial text */}
          <div className="flex flex-col gap-7 sm:gap-9 order-1 lg:order-2">
            <h1
              style={{
                fontFamily: FONTS.display,
                fontWeight: 800,
                fontSize: "clamp(48px, 7vw, 110px)",
                lineHeight: 0.92,
                letterSpacing: "-0.02em",
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
              <span className="block text-[#C8963E]" style={{ fontStyle: "normal" }}>
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
              className="text-[var(--ink)]"
              style={{ fontSize: "clamp(16px, 1.2vw, 19px)", lineHeight: 1.6, maxWidth: 480 }}
            >
              Un complexe d&apos;électrolytes formulé pour la récupération{" "}
              <em
                style={{
                  fontFamily: FONTS.display,
                  fontStyle: "normal",
                  fontWeight: 600,
                  fontSize: "inherit",
                }}
              >
                pendant le sommeil
              </em>{" "}
              — après une soirée alcoolisée, une semaine chargée, ou les deux. À prendre le soir. Pas le matin.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col gap-4"
            >
              <div className="flex gap-3 flex-wrap items-center">
                <button
                  onClick={onOpenModal}
                  className="inline-flex items-center gap-3 px-5 min-h-[48px] bg-[var(--amber)] text-white border border-[var(--amber)] hover:bg-[var(--ink)] hover:border-[var(--ink)] transition-all duration-200 active:scale-[0.97]"
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  Devenir fondateur — 15 € <span aria-hidden="true">→</span>
                </button>
              </div>
              <ul style={{ fontFamily: FONTS.mono, fontSize: 11, lineHeight: 1.8, color: "#666666", listStyle: "none", padding: 0 }}>
                <li>— Prix fondateur : 15€ au lieu de <span style={{ textDecoration: "line-through" }}>30€</span> — 50% de réduction</li>
                <li>— Expédition estimée : dans 6 mois maximum</li>
                <li>— Aucun frais caché — paiement sécurisé</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p
                className="text-[var(--ink-3)]"
                style={{ fontFamily: FONTS.mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase" }}
              >
                Édition fondateurs · 500 places · 15€ · Expédié sous 6 mois
              </p>
            </motion.div>
          </div>
        </div>

        {/* Hero meta strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 lg:mt-12 pt-7 border-t border-[var(--rule)] grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {HERO_STATS.map((item, i) => (
            <div key={i}>
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontWeight: 800,
                  fontSize: "clamp(28px, 3vw, 36px)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1,
                  color: item.amber ? "var(--amber)" : "var(--ink)",
                }}
              >
                {item.count ? <CountUp target={item.k} /> : item.label}
              </div>
              <div
                className="text-[var(--ink-2)] mt-2"
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
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
