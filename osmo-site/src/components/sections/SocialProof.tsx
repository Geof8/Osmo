"use client";

import FadeUp from "@/components/ui/FadeUp";
import { FONTS } from "@/lib/constants";

const STATS = [
  { value: "1 an et demi", label: "de développement" },
  { value: "50+", label: "testeurs" },
  { value: "1 retour", label: "unanime" },
];

export default function SocialProof() {
  return (
    <section
      className="relative z-[5]"
      style={{
        background: "#F4F4F4",
        color: "#111111",
        padding: "clamp(72px, 10vw, 100px) 0",
        borderBottom: "1px solid #E8E8E8",
      }}
    >
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
        <FadeUp>
          <h2
            style={{
              fontFamily: FONTS.display,
              fontWeight: 800,
              fontSize: "clamp(28px, 7vw, 72px)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              marginBottom: "clamp(32px, 4vw, 56px)",
              color: "#111111",
            }}
          >
            Développé en laboratoire.
            <br />
            <span style={{ fontStyle: "italic", color: "#111111" }}>Validé par l&apos;entourage.</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: "clamp(15px, 3.6vw, 16px)",
              lineHeight: 1.7,
              maxWidth: 640,
              marginBottom: 0,
              color: "#444444",
              fontWeight: 400,
            }}
          >
            La formule OSMO a été développée avec un laboratoire français
            spécialisé en compléments alimentaires, puis testée sur moi
            d&apos;abord, sur mes amis et ma famille ensuite. Le retour
            est unanime : la quasi-totalité a demandé à être prévenue
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
              padding: "clamp(32px, 4vw, 48px) 0 clamp(40px, 5vw, 64px) 0",
            }}
          >
            &ldquo;Dès que c&apos;est dispo, tu m&apos;en mets de côté.&rdquo;
          </blockquote>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div
            className="pt-10 grid grid-cols-3 gap-3 sm:gap-6 text-center"
            style={{ borderTop: "1px solid #E8E8E8" }}
          >
            {STATS.map((stat) => (
              <div key={stat.value} className="min-w-0">
                <div
                  style={{
                    fontFamily: FONTS.display,
                    fontWeight: 900,
                    fontSize: "clamp(18px, 5.2vw, 44px)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                    marginBottom: 8,
                    color: "#111111",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 12,
                    fontWeight: 400,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    lineHeight: 1.35,
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
