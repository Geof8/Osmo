"use client";

import FadeUp from "@/components/FadeUp";
import { FONTS } from "@/lib/constants";

export default function WhyYouSuffer() {
  return (
    <section
      className="bg-[var(--paper-2)] border-b border-[var(--rule)] relative z-[5]"
      style={{ padding: "80px 0" }}
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-20 items-start">
          {/* Left column — text */}
          <div>
            <FadeUp>
              <h2
                style={{
                  fontFamily: FONTS.display,
                  fontWeight: 900,
                  fontSize: "clamp(36px, 5vw, 72px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.02em",
                  marginBottom: "clamp(32px, 4vw, 48px)",
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
                  maxWidth: 540,
                  marginBottom: "clamp(28px, 3vw, 40px)",
                }}
              >
                L&apos;alcool est un diurétique. En quelques heures,
                il élimine sodium, potassium et magnésium —
                les minéraux essentiels au fonctionnement
                de ton corps.
              </p>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div
                className="flex flex-col gap-4"
                style={{ maxWidth: 540 }}
              >
                <div
                  style={{
                    borderLeft: "3px solid #C8963E",
                    backgroundColor: "#F4F4F4",
                    padding: "clamp(20px, 2.5vw, 32px)",
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
                    Ce que tu appelles gueule de bois,
                    c&apos;est une déplétion électrolytique aiguë.
                  </p>
                </div>

                <div
                  style={{
                    borderLeft: "3px solid #C8963E",
                    backgroundColor: "#FFF8EE",
                    padding: "clamp(20px, 2.5vw, 32px)",
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
                    OSMO rétablit l&apos;équilibre. 5 actifs cliniques
                    reconstituent ce que l&apos;alcool a éliminé —
                    pendant votre sommeil.
                  </p>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p
                className="mt-6"
                style={{
                  fontFamily: FONTS.display,
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "clamp(14px, 1.1vw, 16px)",
                  lineHeight: 1.6,
                  color: "#C8963E",
                }}
              >
                Ce n&apos;est pas un remède miracle. C&apos;est de la biochimie.
              </p>
            </FadeUp>
          </div>

          {/* Right column — infographic placeholder */}
          <FadeUp delay={0.2}>
            <div className="flex justify-center lg:justify-end">
              <div
                className="relative w-full flex items-center justify-center"
                style={{
                  maxWidth: 420,
                  minHeight: 480,
                  backgroundColor: "#F4F4F4",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/infographic.png"
                  alt="Schéma explicatif — problème et solution OSMO"
                  className="w-full h-auto absolute inset-0 object-contain"
                  style={{ display: "block" }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <span
                  className="text-[var(--ink-3)] select-none pointer-events-none"
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  Infographie
                </span>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
