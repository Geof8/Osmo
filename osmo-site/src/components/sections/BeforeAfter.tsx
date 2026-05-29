"use client";

import FadeUp from "@/components/ui/FadeUp";
import { FONTS } from "@/lib/constants";

const BEFORE_BULLETS = [
  "Réveil brutal à 6h du matin",
  "Tête qui tourne, bouche sèche",
  "Café sur café pour tenir",
  "Concentration au sol jusqu'à midi",
  "Tu survives. Tu n'assures pas.",
];

const AFTER_BULLETS = [
  "Tu te réveilles. Vraiment.",
  "Tête claire dès le premier café",
  "Énergie stable toute la matinée",
  "Réunion à 9h — tu es là",
  "Le lendemain matin, tu assures.",
];

export default function BeforeAfter() {
  return (
    <section
      id="before-after"
      className="scroll-mt-20 relative z-[5]"
      style={{
        padding: "clamp(72px, 10vw, 100px) 0",
        background: "#FFFFFF",
        borderBottom: "1px solid #E8E8E8",
      }}
    >
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
        <FadeUp>
          <div
            className="mb-10 lg:mb-14"
            style={{
              fontFamily: FONTS.mono,
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#999999",
            }}
          >
            Avant · Après
          </div>
        </FadeUp>

        <FadeUp delay={0.05}>
          <h2
            className="mb-10 lg:mb-16"
            style={{
              fontFamily: FONTS.display,
              fontWeight: 800,
              fontSize: "clamp(28px, 7vw, 64px)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: "#111111",
              maxWidth: 880,
            }}
          >
            Deux lendemains.{" "}
            <span style={{ fontStyle: "italic", fontWeight: 800 }}>
              Un seul que tu choisis.
            </span>
          </h2>
        </FadeUp>

        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ borderTop: "1px solid #E8E8E8" }}
        >
          {/* BEFORE — dark column */}
          <FadeUp delay={0.1}>
            <div
              style={{
                background: "#111111",
                padding: "clamp(32px, 5vw, 48px)",
                minHeight: 360,
                borderRight: "1px solid #E8E8E8",
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 12,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#CC3333",
                  fontWeight: 600,
                  marginBottom: 24,
                }}
              >
                Sans OSMO
              </div>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
              >
                {BEFORE_BULLETS.map((line, i) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: "clamp(15px, 3.6vw, 17px)",
                      lineHeight: 1.55,
                      color: "#999999",
                      display: "flex",
                      gap: 14,
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        color: "#CC3333",
                        fontWeight: 700,
                        flexShrink: 0,
                        lineHeight: 1.55,
                      }}
                    >
                      ✕
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>

          {/* AFTER — white column with amber accent */}
          <FadeUp delay={0.15}>
            <div
              style={{
                background: "#FFFFFF",
                padding: "clamp(32px, 5vw, 48px)",
                minHeight: 360,
                borderLeft: "3px solid #C8963E",
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 12,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#111111",
                  fontWeight: 600,
                  marginBottom: 24,
                }}
              >
                Avec OSMO
              </div>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
              >
                {AFTER_BULLETS.map((line, i) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: "clamp(15px, 3.6vw, 17px)",
                      lineHeight: 1.55,
                      color: "#111111",
                      display: "flex",
                      gap: 14,
                      alignItems: "flex-start",
                      fontWeight: i === AFTER_BULLETS.length - 1 ? 600 : 400,
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        color: "#C8963E",
                        fontWeight: 700,
                        flexShrink: 0,
                        lineHeight: 1.55,
                      }}
                    >
                      ✓
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
