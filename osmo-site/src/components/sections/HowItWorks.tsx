"use client";

import { motion } from "framer-motion";
import FadeUp from "@/components/FadeUp";

const steps = [
  {
    num: "01",
    sub: "Préparation",
    label: "Versez une dose",
    labelEm: true,
    desc: "8g rasés dans 400ml d'eau froide. Pas chaude.",
    timing: "⌁ 30 sec",
    svg: (
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="16" cy="16" rx="9" ry="6.5" transform="rotate(-30 16 16)" />
        <line x1="22" y1="22" x2="44" y2="44" />
        <path d="M34 8 Q42 14 38 24 L30 20 Q26 14 34 8 Z" />
      </svg>
    ),
  },
  {
    num: "02",
    sub: "Dissolution",
    label: "Mélangez",
    labelEm: false,
    desc: "Jusqu'à dissolution complète. Goût citron franc, légèrement salin.",
    timing: "⌁ 20 sec",
    svg: (
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 10 L42 10 L38 50 L18 50 Z" />
        <path d="M16 24 Q28 20 40 24" />
        <circle cx="22" cy="32" r="1.4" fill="currentColor" />
        <circle cx="32" cy="38" r="1.1" fill="currentColor" />
        <circle cx="28" cy="42" r="0.9" fill="currentColor" />
      </svg>
    ),
  },
  {
    num: "03",
    sub: "Administration",
    label: "Buvez le soir",
    labelEm: true,
    desc: "Avant le coucher — pas le matin. C'est ici que tout se joue.",
    timing: "⌁ avant 23h",
    svg: (
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={1.2}>
        <path d="M40 8 A22 22 0 1 0 48 38 A18 18 0 0 1 40 8 Z" />
        <circle cx="46" cy="16" r="0.9" fill="currentColor" />
        <circle cx="50" cy="26" r="0.7" fill="currentColor" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="protocole" className="scroll-mt-20 border-b border-[var(--rule)] relative z-[5]" style={{ padding: "140px 0" }}>
      <div className="max-w-[1380px] mx-auto px-10">
        <FadeUp>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-20 items-end mb-24">
            <div>
              <div
                className="text-[var(--ink-2)] mb-7"
                style={{ fontFamily: "var(--font-mono), var(--mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" }}
              >
                Le protocole
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
                Simple. Le soir.
                <br />
                <span style={{ fontFamily: "var(--font-barlow), var(--display)", fontWeight: 800, fontStyle: "normal" }}>
                  Pas le matin.
                </span>
              </h2>
            </div>
            <p className="text-[var(--ink-2)]" style={{ fontSize: 17, lineHeight: 1.55, maxWidth: 420 }}>
              C&apos;est{" "}
              <em style={{ fontFamily: "var(--font-barlow), var(--display)", fontStyle: "normal", fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em" }}>
                là
              </em>{" "}
              toute la différence. Les électrolytes, le NAC et le magnésium agissent pendant que vous dormez — pas pendant que vous attendez qu&apos;ils agissent.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {steps.map((step, i) => (
            <motion.article
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="p-8 min-h-[420px] bg-white border border-[var(--rule)] flex flex-col gap-7 relative transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-barlow), var(--display)",
                    fontWeight: 800,
                    fontSize: 96,
                    lineHeight: 0.85,
                    letterSpacing: "-0.04em",
                    color: "var(--ink)",
                  }}
                >
                  {step.num}
                </div>
                <div
                  className="text-[var(--ink-2)] mt-2"
                  style={{
                    fontFamily: "var(--font-barlow), var(--display)",
                    fontWeight: 500,
                    fontStyle: "normal",
                    fontSize: 20,
                    letterSpacing: 0,
                  }}
                >
                  {step.sub}
                </div>
              </div>
              <div className="w-14 h-14 text-[var(--ink)]">{step.svg}</div>
              <h3
                style={{
                  fontFamily: "var(--font-barlow), var(--display)",
                  fontWeight: 700,
                  fontSize: 30,
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                }}
              >
                {step.labelEm ? (
                  <>
                    {step.label.split(" ")[0]}{" "}
                    <em style={{ fontFamily: "var(--font-barlow), var(--display)", fontStyle: "normal", fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em" }}>
                      {step.label.split(" ").slice(1).join(" ")}
                    </em>
                  </>
                ) : (
                  step.label
                )}
              </h3>
              <p className="text-[var(--ink-2)]" style={{ fontSize: 14, lineHeight: 1.55, maxWidth: 240 }}>
                {step.desc}
              </p>
              <div
                className="mt-auto pt-4 border-t border-[var(--soft)] text-[var(--ink)]"
                style={{ fontFamily: "var(--font-mono), var(--mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase" }}
              >
                {step.timing}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
