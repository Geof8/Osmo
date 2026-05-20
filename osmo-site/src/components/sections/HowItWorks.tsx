"use client";

import { motion } from "framer-motion";
import FadeUp from "@/components/ui/FadeUp";
import MobileCardCarousel from "@/components/ui/MobileCardCarousel";
import { useInView } from "@/hooks/useInView";
import { ANIMATION_CONFIG, FONTS } from "@/lib/constants";
import type { Step } from "@/types";

const steps: Step[] = [
  {
    num: "01",
    sub: "Le soir",
    label: "Dose 1 — Après la dernière boisson",
    labelEm: true,
    desc: "Dissoudre 1 dose dans 250ml d'eau froide. Les actifs travaillent pendant votre sommeil — foie, minéraux, hydratation cellulaire.",
    timing: "⌁ avant de dormir",
    svg: (
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={1.2} aria-hidden="true">
        <path d="M40 8 A22 22 0 1 0 48 38 A18 18 0 0 1 40 8 Z" />
        <circle cx="46" cy="16" r="0.9" fill="currentColor" />
        <circle cx="50" cy="26" r="0.7" fill="currentColor" />
      </svg>
    ),
  },
  {
    num: "02",
    sub: "Le matin",
    label: "Dose 2 — Au réveil",
    labelEm: true,
    desc: "Dissoudre 1 dose dans 250ml d'eau froide. Finalise la récupération, réhydrate, relance le métabolisme.",
    timing: "⌁ à jeun",
    svg: (
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="28" cy="28" r="8" />
        <line x1="28" y1="6" x2="28" y2="12" />
        <line x1="28" y1="44" x2="28" y2="50" />
        <line x1="6" y1="28" x2="12" y2="28" />
        <line x1="44" y1="28" x2="50" y2="28" />
        <line x1="12" y1="12" x2="16" y2="16" />
        <line x1="40" y1="40" x2="44" y2="44" />
        <line x1="12" y1="44" x2="16" y2="40" />
        <line x1="40" y1="16" x2="44" y2="12" />
      </svg>
    ),
  },
  {
    num: "03",
    sub: "Le résultat",
    label: "Le lendemain matin, tu assures.",
    labelEm: true,
    desc: "Le protocole OSMO agit en continu pendant 8 heures. Pas de compromis sur ta journée du lendemain.",
    timing: "⌁ garanti",
    svg: (
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="28" cy="28" r="20" />
        <path d="M18 28 L26 36 L40 20" />
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
      className="howitworks-card p-5 sm:p-8 min-h-[340px] sm:min-h-[420px] bg-white border border-[var(--rule)] rounded-[16px] flex flex-col gap-5 sm:gap-7 relative"
    >
      <div>
        <div
          style={{
            fontFamily: FONTS.display,
            fontWeight: 800,
            fontSize: "clamp(56px, 14vw, 96px)",
            lineHeight: 0.85,
            letterSpacing: "-0.02em",
            color: "var(--ink)",
          }}
        >
          {step.num}
        </div>
        <div
          className="mt-3"
          style={{
            fontFamily: FONTS.mono,
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#C8963E",
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
      <p className="text-[var(--ink-2)]" style={{ fontSize: 14, lineHeight: 1.6, maxWidth: 280 }}>
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
    <section id="protocole" className="scroll-mt-20 border-b border-[var(--rule)] relative z-[5]" style={{ padding: "clamp(56px, 9vw, 80px) 0" }}>
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10">
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
                  fontSize: "clamp(28px, 7vw, 72px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.02em",
                }}
              >
                Le protocole{" "}
                <span className="text-[#C8963E]" style={{ fontFamily: FONTS.display, fontWeight: 800, fontStyle: "normal" }}>
                  OSMO.
                </span>
              </h2>
            </div>
            <p className="text-[var(--ink-2)]" style={{ fontSize: "clamp(16px, 1.3vw, 20px)", lineHeight: 1.65, maxWidth: 460 }}>
              Pas juste un électrolyte.{" "}
              <em style={{ fontFamily: FONTS.display, fontStyle: "normal", fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em" }}>
                Un protocole de récupération en 2 étapes.
              </em>
            </p>
          </div>
        </FadeUp>

        {/* Mobile: Framer Motion swipe carousel */}
        <MobileCardCarousel
          items={steps}
          renderItem={(step, i) => <StepCard step={step} index={i} />}
          getKey={(step) => step.num}
          ariaLabel="Protocole d'utilisation — étapes 1, 2, 3"
          dotColor="#C8963E"
          dotInactiveColor="#DDDDDD"
        />

        {/* Desktop / tablet: 3-column grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-5 sm:gap-7">
          {steps.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
