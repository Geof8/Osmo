"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import FadeUp from "@/components/ui/FadeUp";
import { useInView } from "@/hooks/useInView";
import { ANIMATION_CONFIG, FONTS } from "@/lib/constants";
import type { ReactNode } from "react";

type Benefit = {
  title: string;
  desc: string;
  icon: ReactNode;
};

const benefits: Benefit[] = [
  {
    title: "Ton foie travaille pendant que tu dors",
    desc: "NAC 300mg — précurseur du glutathion, l'antioxydant clé que ton foie utilise pour métaboliser l'alcool.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 16 Q10 10 18 10 Q26 10 28 16 Q34 12 38 18 Q42 26 36 32 Q30 38 22 36 Q14 38 10 30 Q6 22 10 16 Z" />
        <path d="M20 22 Q24 26 28 22" />
        <circle cx="22" cy="20" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Réhydraté au niveau cellulaire",
    desc: "Bicarbonate + Sodium — restaurent l'équilibre acido-basique que l'alcool a vidé pendant la soirée.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M24 6 Q16 18 16 26 A8 8 0 0 0 32 26 Q32 18 24 6 Z" />
        <path d="M20 26 Q22 30 26 30" />
      </svg>
    ),
  },
  {
    title: "Un sommeil qui répare vraiment",
    desc: "Magnésium bisglycinate — soutient la qualité du sommeil profond et limite les réveils nocturnes.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M32 8 A16 16 0 1 0 40 26 Q32 28 28 22 Q24 16 32 8 Z" />
        <circle cx="14" cy="12" r="0.9" fill="currentColor" />
        <circle cx="22" cy="6" r="0.7" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Plus jamais de crampes à 4h du matin",
    desc: "Potassium + Magnésium — soutiennent la fonction musculaire et préviennent les crampes nocturnes.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="24" cy="26" r="7" />
        <line x1="24" y1="10" x2="24" y2="14" />
        <line x1="24" y1="38" x2="24" y2="42" />
        <line x1="10" y1="26" x2="14" y2="26" />
        <line x1="34" y1="26" x2="38" y2="26" />
        <line x1="14" y1="16" x2="16.8" y2="18.8" />
        <line x1="31.2" y1="33.2" x2="34" y2="36" />
        <line x1="34" y1="16" x2="31.2" y2="18.8" />
        <line x1="16.8" y1="33.2" x2="14" y2="36" />
      </svg>
    ),
  },
];

function BenefitItem({ benefit, index }: { benefit: Benefit; index: number }) {
  const [ref, isInView] = useInView<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      initial={ANIMATION_CONFIG.cardReveal.initial}
      animate={isInView ? { opacity: 1, y: 0 } : ANIMATION_CONFIG.cardReveal.initial}
      transition={{ ...ANIMATION_CONFIG.cardReveal.transition, delay: index * 0.08 }}
      className="flex flex-col items-center text-center p-4 sm:p-0"
    >
      <div className="w-6 h-6 sm:w-10 sm:h-10 mb-3 sm:mb-5" style={{ color: "#C8963E" }}>
        {benefit.icon}
      </div>
      <h3
        style={{
          fontFamily: FONTS.display,
          fontWeight: 600,
          fontSize: "clamp(13px, 1.6vw, 22px)",
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
          color: "#111111",
          marginBottom: 8,
        }}
      >
        {benefit.title}
      </h3>
      <p
        style={{
          fontFamily: FONTS.body,
          fontSize: "clamp(12px, 1.05vw, 15px)",
          lineHeight: 1.5,
          color: "#444444",
          fontWeight: 400,
          maxWidth: 320,
          overflowWrap: "break-word",
        }}
      >
        {benefit.desc}
      </p>
    </motion.div>
  );
}

export default function Benefits() {
  return (
    <section
      id="bienfaits"
      className="scroll-mt-20 relative z-[5]"
      style={{ padding: "clamp(72px, 10vw, 100px) 0", background: "#F4F4F4", borderBottom: "1px solid #E8E8E8" }}
    >
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-10 lg:gap-20 items-stretch">
          {/* Photo bénéfices */}
          <FadeUp>
            <div
              className="relative w-full h-full min-h-[320px] lg:min-h-[520px] overflow-hidden"
              style={{ borderRadius: 16 }}
            >
              <Image
                src="/images/benefits.png"
                alt="Un verre d'OSMO Recovery en cours de dissolution, effervescence et lumière naturelle"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                style={{ objectFit: "cover" }}
                priority={false}
              />
            </div>
          </FadeUp>

          {/* Bénéfices */}
          <div>
            <FadeUp>
              <h2
                style={{
                  fontFamily: FONTS.display,
                  fontWeight: 800,
                  fontSize: "clamp(28px, 5.5vw, 56px)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.02em",
                  color: "#111111",
                }}
              >
                Des bienfaits{" "}
                <span style={{ fontStyle: "italic", color: "#111111" }}>à chaque prise.</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p
                className="mt-6"
                style={{
                  fontFamily: FONTS.body,
                  fontSize: "clamp(14px, 1.1vw, 16px)",
                  lineHeight: 1.65,
                  color: "#444444",
                  maxWidth: 480,
                  fontWeight: 400,
                }}
              >
                Chaque dose travaille sur quatre fronts en parallèle.
                Le résultat&nbsp;: tu te lèves comme si la soirée n&apos;avait jamais eu lieu.
              </p>
            </FadeUp>

            <div className="mt-10 lg:mt-12 grid grid-cols-2 gap-3 sm:gap-x-8 sm:gap-y-10">
              {benefits.map((b, i) => (
                <BenefitItem key={b.title} benefit={b} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
