"use client";

import { motion } from "framer-motion";
import FadeUp from "@/components/FadeUp";
import { useInView } from "@/hooks/useInView";
import { ANIMATION_CONFIG, FONTS } from "@/lib/constants";
import type { Step } from "@/types";

const steps: Step[] = [
  {
    num: "01",
    sub: "Préparation",
    label: "Versez une dose",
    labelEm: true,
    desc: "8g rasés dans 400ml d'eau froide. Pas chaude.",
    timing: "⌁ 30 sec",
    svg: (
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={1.2} aria-hidden="true">
        <path d="M40 8 A22 22 0 1 0 48 38 A18 18 0 0 1 40 8 Z" />
        <circle cx="46" cy="16" r="0.9" fill="currentColor" />
        <circle cx="50" cy="26" r="0.7" fill="currentColor" />
      </svg>
    ),
  },
];

function StepCard({ step, index }: { step: Step; index: number }) {
  const [ref, isInView] = useInView<HTMLElement>({ margin: ANIMATION_CONFIG.inViewMarginLoose });

  return (
    <motion.article
      ref={ref}
      initial={ANIMATION_CONFIG.stepReveal.initial}
      animate={isInView ? { opacity: 1, y: 0 } : ANIMATION_CONFIG.stepReveal.initial}
      transition={{ ...ANIMATION_CONFIG.stepReveal.transition, delay: index * 0.15 }}
      className="p-6 sm:p-8 min-h-[380px] sm:min-h-[420px] bg-white border border-[var(--rule)] flex flex-col gap-6 sm:gap-7 relative transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
    >
      <div>
        <div
          style={{
            fontFamily: FONTS.display,
            fontWeight: 800,
            fontSize: "clamp(64px, 7vw, 96px)",
            lineHeight: 0.85,
            letterSpacing: "-0.02em",
            color: "var(--ink)",
          }}
        >
          {step.num}
        </div>
        <div
          className="text-[var(--ink-2)] mt-2"
          style={{
            fontFamily: FONTS.display,
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
          fontFamily: FONTS.display,
          fontWeight: 700,
          fontSize: "clamp(24px, 2vw, 30px)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
        }}
      >
        {step.labelEm ? (
          <>
            {step.label.split(" ")[0]}{" "}
            <span className="text-[#C8963E]" style={{ fontFamily: FONTS.display, fontStyle: "normal", fontWeight: 700, letterSpacing: "-0.02em" }}>
              {step.label.split(" ").slice(1).join(" ")}
            </span>
          </>
        ) : (
          step.label
        )}
      </h3>
      <p className="text-[var(--ink-2)]" style={{ fontSize: 14, lineHeight: 1.6, maxWidth: 260 }}>
        {step.desc}
      </p>
      <div
        className="mt-auto pt-4 border-t border-[var(--soft)] text-[var(--ink)]"
        style={{ fontFamily: FONTS.mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase" }}
      >
        {step.timing}
      </div>
    </motion.article>
  );
}

export default function HowItWorks() {
  return (
    <section id="protocole" className="scroll-mt-20 border-b border-[var(--rule)] relative z-[5]" style={{ padding: "80px 0" }}>
      <div className="max-w-[1380px] mx-auto px-5 sm:px-10">
        <FadeUp>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end mb-16 lg:mb-24">
            <div>
              <div
                className="text-[var(--ink-2)] mb-5 lg:mb-7"
                style={{ fontFamily: FONTS.mono, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" }}
              >
                Le protocole
              </div>
              <h2
                style={{
                  fontFamily: FONTS.display,
                  fontWeight: 800,
                  fontSize: "clamp(40px, 5.5vw, 88px)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.02em",
                }}
              >
                Simple. Le soir.
                <br />
                <span className="text-[#C8963E]" style={{ fontFamily: FONTS.display, fontWeight: 800, fontStyle: "normal" }}>
                  Pas le matin.
                </span>
              </h2>
            </div>
            <p className="text-[var(--ink-2)]" style={{ fontSize: "clamp(16px, 1.3vw, 20px)", lineHeight: 1.6, maxWidth: 460 }}>
              C&apos;est{" "}
              <em style={{ fontFamily: FONTS.display, fontStyle: "normal", fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em" }}>
                là
              </em>{" "}
              toute la différence. Les électrolytes, la NAC et le magnésium agissent pendant que vous dormez — pas pendant que vous attendez qu&apos;ils agissent.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-7">
          {steps.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
