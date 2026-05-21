"use client";

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
    title: "Foie soutenu",
    desc: "La N-Acétyl-Cystéine recharge le glutathion, principal antioxydant du foie, pour métaboliser l'alcool plus vite.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 16 Q10 10 18 10 Q26 10 28 16 Q34 12 38 18 Q42 26 36 32 Q30 38 22 36 Q14 38 10 30 Q6 22 10 16 Z" />
        <path d="M20 22 Q24 26 28 22" />
        <circle cx="22" cy="20" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Hydratation profonde",
    desc: "Sodium, potassium et bicarbonate restaurent l'équilibre cellulaire que l'alcool a vidé pendant la soirée.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M24 6 Q16 18 16 26 A8 8 0 0 0 32 26 Q32 18 24 6 Z" />
        <path d="M20 26 Q22 30 26 30" />
      </svg>
    ),
  },
  {
    title: "Sommeil réparateur",
    desc: "Le magnésium bisglycinate favorise un sommeil profond malgré la soirée, et limite les réveils nocturnes.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M32 8 A16 16 0 1 0 40 26 Q32 28 28 22 Q24 16 32 8 Z" />
        <circle cx="14" cy="12" r="0.9" fill="currentColor" />
        <circle cx="22" cy="6" r="0.7" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Réveil clair",
    desc: "Tu te lèves frais, l'esprit net, le corps stable. Sans coup de mou ni mal de crâne pour saboter ta journée.",
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
      className="flex flex-col items-center text-center"
    >
      <div className="w-10 h-10 mb-5" style={{ color: "#C8963E" }}>
        {benefit.icon}
      </div>
      <h3
        style={{
          fontFamily: FONTS.display,
          fontWeight: 700,
          fontSize: "clamp(18px, 1.6vw, 22px)",
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
          color: "#111111",
          marginBottom: 10,
        }}
      >
        {benefit.title}
      </h3>
      <p
        style={{
          fontFamily: FONTS.body,
          fontSize: "clamp(14px, 1.05vw, 15px)",
          lineHeight: 1.6,
          color: "#444444",
          fontWeight: 400,
          maxWidth: 320,
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Photo placeholder — à remplir plus tard */}
          <FadeUp>
            <div
              className="relative aspect-square w-full max-w-[560px] mx-auto lg:mx-0"
              style={{
                background: "#FFFFFF",
                border: "1px dashed #D4D4D4",
                borderRadius: 24,
              }}
              aria-hidden="true"
            >
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 11,
                  fontWeight: 400,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#BBBBBB",
                }}
              >
                Photo à venir
              </div>
            </div>
          </FadeUp>

          {/* Bénéfices */}
          <div>
            <FadeUp>
              <div
                className="mb-3"
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 12,
                  fontWeight: 400,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#999999",
                }}
              >
                Les bienfaits
              </div>
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
                <span style={{ fontStyle: "italic", color: "#111111" }}>à chaque verre.</span>
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

            <div className="mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
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
