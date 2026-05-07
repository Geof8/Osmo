"use client";

import FadeUp from "@/components/FadeUp";

const observations = [
  { num: "01", time: "Vendredi · 22:14", quote: "Trois verres hier soir. Réunion à 9h.", em: "Les deux sont réels." },
  { num: "02", time: "Mardi · 23:47", quote: "Un dîner qui s'est prolongé. Les enfants se lèvent à 7h.", em: "Sans exception." },
  { num: "03", time: "Jeudi · 00:12", quote: "La semaine a été longue. Le week-end", em: "doit quand même tenir." },
  { num: "04", time: "Samedi · 02:31", quote: "Mariage d'un ami. Brunch en famille à 11h.", em: "Pas négociable." },
  { num: "05", time: "Mercredi · 01:08", quote: "Soirée client qui s'éternise. Pitch important demain.", em: "Tout repose dessus." },
];

export default function Empathy() {
  return (
    <section id="observations" className="scroll-mt-20 bg-[var(--paper-2)] border-b border-[var(--rule)] relative z-[5]" style={{ padding: "140px 0" }}>
      <div className="max-w-[1380px] mx-auto px-10">
        <FadeUp>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-20 items-end mb-24">
            <div>
              <div
                className="text-[var(--ink-2)] mb-7"
                style={{ fontFamily: "var(--font-mono), var(--mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" }}
              >
                Pourquoi OSMO
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-barlow), var(--display)",
                  fontWeight: 800,
                  fontSize: "clamp(48px, 5.5vw, 88px)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.035em",
                }}
              >
                Tu connais
                <br />
                <span className="text-[#C8963E]" style={{ fontFamily: "var(--font-barlow), var(--display)", fontWeight: 800, fontStyle: "normal" }}>
                  ce matin-là.
                </span>
              </h2>
            </div>
            <p className="text-[var(--ink-2)]" style={{ fontSize: 20, lineHeight: 1.55, maxWidth: 460 }}>
              <em
                style={{
                  fontFamily: "var(--font-barlow), var(--display)",
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
                style={{ fontFamily: "var(--font-mono), var(--mono)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}
              >
                05 · Observations
              </div>
            </div>

            <div
              className="empathy-track flex gap-7 pb-4"
              style={{
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              <style>{`.empathy-track::-webkit-scrollbar { display: none; }`}</style>
              {observations.map((obs) => (
                <article
                  key={obs.num}
                  className="flex-shrink-0 flex flex-col gap-6 p-8 min-h-[360px] bg-white border border-[var(--rule)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                  style={{
                    flex: "0 0 calc((100% - 56px) / 3)",
                    scrollSnapAlign: "start",
                    minWidth: 280,
                  }}
                >
                  <div
                    className="flex justify-between w-full pb-4 border-b border-[var(--rule)] text-[var(--ink-2)]"
                    style={{ fontFamily: "var(--font-mono), var(--mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" }}
                  >
                    <span>Obs. {obs.num}</span>
                    <span>{obs.time}</span>
                  </div>
                  <div className="flex-1 flex items-center">
                    <p
                      style={{
                        fontFamily: "var(--font-barlow), var(--display)",
                        fontWeight: 700,
                        fontSize: 30,
                        lineHeight: 1.05,
                        letterSpacing: "-0.025em",
                      }}
                    >
                      {obs.quote}{" "}
                      <em
                        style={{
                          fontFamily: "var(--font-barlow), var(--display)",
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
              style={{
                fontFamily: "var(--font-mono), var(--mono)",
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
          <div className="mt-24 pt-14 border-t border-[var(--rule)] grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-14 items-baseline">
            <div
              style={{
                fontFamily: "var(--font-barlow), var(--display)",
                fontWeight: 700,
                fontSize: "clamp(28px, 3.6vw, 52px)",
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
              }}
            >
              OSMO n&apos;est pas un remède miracle.
              <br />
              <span className="text-[#C8963E]"
                style={{
                  fontFamily: "var(--font-barlow), var(--display)",
                  fontStyle: "normal",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                C&apos;est de la biochimie.
              </span>
            </div>
            <div
              className="text-[var(--ink-2)] text-right"
              style={{ fontFamily: "var(--font-mono), var(--mono)", fontSize: 10, lineHeight: 1.7, letterSpacing: "0.16em", textTransform: "uppercase" }}
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
