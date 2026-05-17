"use client";

import FadeUp from "@/components/FadeUp";
import { FONTS } from "@/lib/constants";

const STATS = [
  { value: "1 an et demi", label: "de développement" },
  { value: "50+", label: "testeurs" },
  { value: "1 retour", label: "unanime" },
];

export default function SocialProof() {
  return (
    <section
      className="bg-[var(--paper-2)] border-b border-[var(--rule)] relative z-[5]"
      style={{ padding: "clamp(56px, 9vw, 80px) 0" }}
    >
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10">
        <FadeUp>
          <h2
            style={{
              fontFamily: FONTS.display,
              fontWeight: 800,
              fontSize: "clamp(28px, 7vw, 72px)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              marginBottom: "clamp(28px, 4vw, 56px)",
            }}
          >
            Développé en laboratoire.
            <br />
            <span className="text-[#C8963E]">Validé par l&apos;entourage.</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p
            className="text-[var(--ink-2)]"
            style={{
              fontFamily: FONTS.body,
              fontSize: "clamp(15px, 3.6vw, 20px)",
              lineHeight: 1.65,
              maxWidth: 640,
              marginBottom: 0,
            }}
          >
            La formule OSMO a été développée avec un laboratoire français
            spécialisé en compléments alimentaires, puis affinée pendant
            un an et demi en laboratoire. Le retour de l&apos;entourage
            est unanime — la quasi-totalité a demandé à être prévenue
            au lancement. Certains ont déjà leur place réservée.
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <blockquote
            className="text-center"
            style={{
              fontFamily: FONTS.playfair,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(20px, 5vw, 42px)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: "#C8963E",
              margin: "0 auto",
              maxWidth: 700,
              padding: "clamp(20px, 2.5vw, 32px) 0 clamp(32px, 4vw, 56px) 0",
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
                    fontWeight: 900,
                    fontSize: "clamp(26px, 6vw, 44px)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    marginBottom: 8,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-[var(--ink-2)]"
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 13,
                    color: "#666666",
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
