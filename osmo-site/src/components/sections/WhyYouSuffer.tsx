"use client";

import FadeUp from "@/components/FadeUp";
import { FONTS } from "@/lib/constants";

export default function WhyYouSuffer() {
  return (
    <section
      className="bg-[var(--paper-2)] border-b border-[var(--rule)] relative z-[5]"
      style={{ padding: "clamp(80px, 10vw, 140px) 0" }}
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-10">
        <FadeUp>
          <h2
            style={{
              fontFamily: FONTS.display,
              fontWeight: 900,
              fontSize: "clamp(36px, 5vw, 72px)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              marginBottom: "clamp(32px, 4vw, 56px)",
            }}
          >
            Pourquoi tu souffres
            <br />
            <span className="text-[#C8963E]">le lendemain.</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p
            className="text-[var(--ink-2)]"
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(16px, 1.3vw, 20px)",
              lineHeight: 1.7,
              maxWidth: 640,
              marginBottom: "clamp(32px, 4vw, 48px)",
            }}
          >
            L&apos;alcool est un diurétique. En quelques heures,
            il force ton corps à éliminer ce dont il a besoin
            pour fonctionner&nbsp;: sodium, potassium, magnésium.
            Ces trois minéraux sont à la base de tout —
            contraction musculaire, fonction nerveuse,
            hydratation cellulaire.
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <p
            className="text-[var(--ink-2)]"
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(16px, 1.3vw, 20px)",
              lineHeight: 1.7,
              maxWidth: 640,
              marginBottom: "clamp(40px, 5vw, 64px)",
            }}
          >
            Sans eux, ton cerveau tourne au ralenti.
            Tes muscles sont lourds. Ta tête est dans le brouillard.
            Ce n&apos;est pas dans ta tête. C&apos;est de la biochimie.
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div
            style={{
              borderLeft: "3px solid #C8963E",
              backgroundColor: "#F4F4F4",
              padding: "clamp(24px, 3vw, 40px)",
              maxWidth: 720,
            }}
          >
            <p
              style={{
                fontFamily: FONTS.display,
                fontWeight: 600,
                fontSize: "clamp(15px, 1.2vw, 18px)",
                lineHeight: 1.7,
                letterSpacing: "-0.01em",
                color: "var(--ink)",
              }}
            >
              Ce que tu appelles gueule de bois, c&apos;est en réalité
              une déplétion électrolytique aiguë.
              La solution n&apos;est pas du paracétamol.
              C&apos;est de reconstituer ce que ton corps a perdu.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
