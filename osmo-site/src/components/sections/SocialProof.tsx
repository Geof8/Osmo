"use client";

import CountUp from "@/components/CountUp";
import FadeUp from "@/components/FadeUp";
import { FONTS } from "@/lib/constants";

const STATS = [
  { num: 100, suffix: "+", label: "testeurs en cercle fermé", value: "~100" },
  { num: 0, suffix: "", label: "de développement en laboratoire", value: "18 mois" },
  { num: 1, suffix: "", label: "unanime", value: "1 retour" },
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
            Validé en laboratoire.
            <br />
            <span className="text-[#C8963E]">Testé par l&apos;entourage.</span>
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
            La formule OSMO a été développée avec un laboratoire français
            spécialisé en compléments alimentaires, puis testée en cercle fermé.
            Famille, amis, collègues — une centaine de personnes
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
                  {stat.value || <><CountUp target={stat.num} />{stat.suffix}</>}
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
