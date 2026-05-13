"use client";

import FadeUp from "@/components/FadeUp";
import { FONTS, OBSERVATIONS } from "@/lib/constants";

export default function Empathy() {
  return (
    <section id="observations" className="scroll-mt-20 bg-[var(--paper-2)] border-b border-[var(--rule)] relative z-[5]" style={{ padding: "clamp(80px, 10vw, 140px) 0" }}>
      <div className="max-w-[1380px] mx-auto px-5 sm:px-10">
        <FadeUp>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end mb-16 lg:mb-24">
            <div>
              <div
                className="text-[var(--ink-2)] mb-5 lg:mb-7"
                style={{ fontFamily: FONTS.mono, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" }}
              >
                Pourquoi OSMO
              </div>
              <h2
                style={{
                  fontFamily: FONTS.display,
                  fontWeight: 800,
                  fontSize: "clamp(40px, 5.5vw, 88px)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.035em",
                }}
              >
                Tu connais
                <br />
                <span className="text-[#C8963E]" style={{ fontFamily: FONTS.display, fontWeight: 800, fontStyle: "normal" }}>
                  ce matin-là.
                </span>
              </h2>
            </div>
            <p className="text-[var(--ink-2)]" style={{ fontSize: "clamp(16px, 1.3vw, 20px)", lineHeight: 1.6, maxWidth: 460 }}>
              <em
                style={{
                  fontFamily: FONTS.display,
                  fontStyle: "normal",
                  fontWeight: 700,
                  color: "var(--ink)",
                  letterSpacing: "-0.02em",
                }}
              >
                Pas un état. Une équation.
              </em>{" "}
              Le sommeil amputé, l&apos;hydratation effondrée, le foie en retard. OSMO travaille la nuit pour que demain redevienne fonctionnel.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="border-t border-[var(--rule)] pt-8">
            <div className="mb-7">
              <div
                className="text-[var(--ink-2)]"
                style={{ fontFamily: FONTS.mono, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}
              >
                05 · Observations
              </div>
            </div>

            <div
              className="scrollbar-hide flex gap-5 sm:gap-7 pb-4 overflow-x-auto"
              role="region"
              aria-label="Témoignages d'utilisation"
              tabIndex={0}
              style={{
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {OBSERVATIONS.map((obs) => (
                <article
                  key={obs.num}
                  className="flex-shrink-0 flex flex-col gap-6 p-6 sm:p-8 min-h-[320px] sm:min-h-[360px] bg-white border border-[var(--rule)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] basis-[85%] sm:basis-[45%] lg:basis-[calc((100%-56px)/3)]"
                  style={{
                    scrollSnapAlign: "start",
                    minWidth: 260,
                  }}
                >
                  <div
                    className="flex justify-between w-full pb-4 border-b border-[var(--rule)] text-[var(--ink-2)]"
                    style={{ fontFamily: FONTS.mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" }}
                  >
                    <span>Obs. {obs.num}</span>
                    <span>{obs.time}</span>
                  </div>
                  <div className="flex-1 flex items-center">
                    <p
                      style={{
                        fontFamily: FONTS.display,
                        fontWeight: 700,
                        fontSize: "clamp(24px, 2vw, 30px)",
                        lineHeight: 1.1,
                        letterSpacing: "-0.025em",
                      }}
                    >
                      {obs.quote}{" "}
                      <em
                        style={{
                          fontFamily: FONTS.display,
                          fontStyle: "normal",
                          fontWeight: 700,
                          color: "var(--ink)",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {obs.em}
                      </em>
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div
              className="mt-4 flex items-center justify-end gap-2 text-[var(--ink-2)]"
              aria-hidden="true"
              style={{
                fontFamily: FONTS.mono,
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              <span>Swipe</span>
              <span style={{ fontSize: 14 }}>→</span>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="mt-16 lg:mt-24 pt-10 lg:pt-14 border-t border-[var(--rule)] grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-14 items-baseline">
            <div
              style={{
                fontFamily: FONTS.display,
                fontWeight: 700,
                fontSize: "clamp(24px, 3.6vw, 52px)",
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
              }}
            >
              OSMO n&apos;est pas un remède miracle.
              <br />
              <span className="text-[#C8963E]"
                style={{
                  fontFamily: FONTS.display,
                  fontStyle: "normal",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                C&apos;est de la biochimie.
              </span>
            </div>
            <div
              className="text-[var(--ink-2)] lg:text-right"
              style={{ fontFamily: FONTS.mono, fontSize: 10, lineHeight: 1.7, letterSpacing: "0.16em", textTransform: "uppercase" }}
            >
              Pas de plantes obscures
              <br />
              Pas de &ldquo;détox&rdquo;
              <br />
              Cinq actifs · un timing
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
