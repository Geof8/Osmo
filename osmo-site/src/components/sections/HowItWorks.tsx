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
    sub: "Préparation",
    label: "Versez la dose",
    labelEm: false,
    desc: "Une dose rase d'OSMO Recovery dans un grand verre vide.",
    timing: "⌁ 10 sec",
    svg: (
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Spoon/scoop tipping powder into a glass */}
        <path d="M10 12 Q18 8 22 14 L18 22 Q12 20 10 12 Z" />
        <line x1="22" y1="14" x2="34" y2="26" />
        <path d="M28 32 L44 32 L41 50 L31 50 Z" />
        <circle cx="33" cy="29" r="0.7" fill="currentColor" />
        <circle cx="37" cy="30" r="0.6" fill="currentColor" />
        <circle cx="36" cy="33" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    num: "02",
    sub: "Dilution",
    label: "Ajoutez 250ml d'eau",
    labelEm: false,
    desc: "Eau froide, tempérée, ou tiède — comme tu préfères.",
    timing: "⌁ 10 sec",
    svg: (
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Water droplet above a glass */}
        <path d="M28 6 Q22 16 22 20 A6 6 0 0 0 34 20 Q34 16 28 6 Z" />
        <path d="M18 28 L38 28 L35 50 L21 50 Z" />
        <path d="M19 36 Q28 34 37 36" />
      </svg>
    ),
  },
  {
    num: "03",
    sub: "Dégustation",
    label: "Mélangez et dégustez",
    labelEm: false,
    desc: "Goût citron franc, légèrement salin. Dissolution complète en quelques secondes.",
    timing: "⌁ savourez",
    svg: (
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Glass with stirring swirl + citrus slice on rim */}
        <path d="M14 14 L42 14 L38 50 L18 50 Z" />
        <path d="M18 26 Q28 22 38 26" />
        <path d="M22 36 Q28 30 34 36 Q30 42 26 36" />
        <ellipse cx="40" cy="13" rx="5" ry="2.5" />
        <line x1="35" y1="13" x2="45" y2="13" />
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
              Trois gestes simples.{" "}
              <em style={{ fontFamily: FONTS.display, fontStyle: "normal", fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em" }}>
                À prendre deux fois par jour, dont une prise le soir avant de dormir.
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
