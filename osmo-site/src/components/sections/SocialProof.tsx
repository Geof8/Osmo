"use client";

import CountUp from "@/components/CountUp";
import FadeUp from "@/components/FadeUp";
import { FONTS } from "@/lib/constants";

const STATS = [
  { num: 500, suffix: "", label: "places fondateurs disponibles" },
  { num: 15, suffix: " €", label: "tarif fondateur (-50%)" },
  { num: 6, suffix: " mois", label: "délai d'expédition maximum" },
];

export default function SocialProof() {
  return (
    <section
      className="bg-[var(--paper-2)] border-b border-[var(--rule)] relative z-[5]"
      style={{ padding: "80px 0" }}
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-10">
        <FadeUp>
          <h2
            style={{
              fontFamily: FONTS.display,
              fontWeight: 800,
              fontSize: "clamp(36px, 5vw, 72px)",
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              marginBottom: "clamp(32px, 4vw, 56px)",
            }}
          >
            Avant les 500
            <br />
            <span className="text-[#C8963E]">fondateurs.</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p
            className="text-[var(--ink-2)]"
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(16px, 1.3vw, 20px)",
              lineHeight: 1.65,
              maxWidth: 640,
              marginBottom: "clamp(40px, 5vw, 64px)",
            }}
          >
            OSMO a d&apos;abord été testé en cercle fermé.
            Famille, amis, collègues. Une vingtaine de personnes
            sur plusieurs mois. La quasi-totalité a demandé
            à être prévenue au lancement.
            Certains ont déjà leur place réservée.
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <blockquote
            className="text-center"
            style={{
              fontFamily: FONTS.playfair,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(24px, 3vw, 42px)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: "#C8963E",
              margin: "0 auto",
              maxWidth: 700,
              padding: "clamp(32px, 4vw, 56px) 0",
            }}
          >
            &ldquo;Dès que c&apos;est dispo, tu m&apos;en mets de côté.&rdquo;
          </blockquote>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="border-t border-[var(--rule)] pt-10 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 text-center">
            {STATS.map((stat) => (
              <div key={stat.value}>
                <div
                  style={{
                    fontFamily: FONTS.display,
                    fontWeight: 800,
                    fontSize: "clamp(28px, 3vw, 44px)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    marginBottom: 8,
                  }}
                >
                  <CountUp target={stat.num} />{stat.suffix}
                </div>
                <div
                  className="text-[var(--ink-2)]"
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
