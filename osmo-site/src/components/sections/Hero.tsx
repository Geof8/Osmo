"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import CountUp from "@/components/CountUp";

const words = ["Osmo", "Recovery."];

export default function Hero({ onOpenModal, revealed }: { onOpenModal: () => void; revealed: boolean }) {
  return (
    <section
      className="scroll-mt-20 border-b border-[var(--rule)] relative z-[5]"
      style={{ padding: "56px 0 96px" }}
    >
      <div className="max-w-[1380px] mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-[72px] items-center min-h-[70vh]">
          {/* LEFT: Product image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={revealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Image
              src="/osmo-product.jpeg"
              alt="OSMO Recovery — complexe d'électrolyte, goût citron, 120g"
              width={700}
              height={780}
              className="bg-white"
              style={{ width: "108%", marginLeft: -40, aspectRatio: "0.9", objectFit: "cover" }}
              priority
            />
          </motion.div>

          {/* RIGHT: Editorial text */}
          <div className="flex flex-col gap-9">
            <h1
              style={{
                fontFamily: "var(--font-barlow), var(--display)",
                fontWeight: 800,
                fontSize: "clamp(80px, 9vw, 160px)",
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
                textWrap: "balance" as never,
              }}
            >
              {words.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 20 }}
                  animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
                  className="inline-block"
                  style={i === 1 ? { fontStyle: "normal", display: "block" } : undefined}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-[var(--ink)]"
              style={{ fontSize: 19, lineHeight: 1.55, maxWidth: 480 }}
            >
              Un complexe d&apos;électrolytes formulé pour la récupération{" "}
              <em
                style={{
                  fontFamily: "var(--font-barlow), var(--display)",
                  fontStyle: "normal",
                  fontWeight: 600,
                  fontSize: 19,
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
              className="flex gap-3 flex-wrap items-center"
            >
              <button
                onClick={onOpenModal}
                className="inline-flex items-center gap-3 px-[22px] py-[14px] bg-[var(--amber)] text-white border border-[var(--amber)] hover:bg-[var(--ink)] hover:border-[var(--ink)] transition-all duration-200 hover:scale-[1.02]"
                style={{
                  fontFamily: "var(--font-mono), var(--mono)",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                Réserver — 25 € <span>→</span>
              </button>
              <a
                href="#actifs"
                className="inline-flex items-center gap-3 px-[22px] py-[14px] bg-transparent text-[var(--ink)] border border-[var(--ink)] hover:bg-[var(--ink)] hover:text-white transition-all duration-200 hover:scale-[1.02]"
                style={{
                  fontFamily: "var(--font-mono), var(--mono)",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                Voir la formule
              </a>
              <span
                className="text-[var(--ink-2)]"
                style={{
                  fontFamily: "var(--font-mono), var(--mono)",
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                ⌁ Aucun paiement maintenant
              </span>
            </motion.div>
          </div>
        </div>

        {/* Hero meta strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-24 pt-7 border-t border-[var(--rule)] grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            { k: 5, label: "5", v: "Actifs cliniques", count: true },
            { k: 15, label: "15", v: "Doses · 120g", count: true },
            { k: 25, label: "25 €", v: "Tarif fondateur", amber: true, count: false },
            { k: 300, label: "300", v: "Places · Mai 2026", count: true },
          ].map((item, i) => (
            <div key={i}>
              <div
                style={{
                  fontFamily: "var(--font-barlow), var(--display)",
                  fontWeight: 800,
                  fontSize: 36,
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
                  fontFamily: "var(--font-mono), var(--mono)",
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
