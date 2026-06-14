"use client";

import { Fragment } from "react";
import FadeUp from "@/components/ui/FadeUp";
import { FONTS } from "@/lib/constants";

// Comparison rows — OSMO delivers (✓), without OSMO you don't (✕).
const ROWS = [
  "Réveil clair, sans brouillard",
  "Énergie stable toute la matinée",
  "Hydratation cellulaire restaurée",
  "Foie soutenu pendant le sommeil",
  "Fini les crampes et la migraine",
  "5 actifs cliniques dosés",
  "Sans sucre · vegan · sans additifs",
  "Made in France · prêt en 10 sec",
];

function CheckIcon() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#111111"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <circle cx="12" cy="12" r="9.25" />
      <path d="M8 12.2l2.8 2.8L16.2 9" />
    </svg>
  );
}

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

        <FadeUp delay={0.1}>
          <div className="relative mx-auto" style={{ maxWidth: 880 }}>
            <div
              className="comparison-grid"
              style={{ gridTemplateRows: `repeat(${ROWS.length + 1}, auto)` }}
            >
              {/* Card background */}
              <div
                aria-hidden="true"
                style={{
                  gridColumn: "1 / -1",
                  gridRow: "1 / -1",
                  background: "#FFFFFF",
                  border: "1px solid #E8E8E8",
                  borderRadius: 24,
                  zIndex: 0,
                }}
              />

              {/* Highlighted OSMO column (amber pill, overhangs top & bottom) */}
              <div
                aria-hidden="true"
                style={{
                  gridColumn: "2 / 3",
                  gridRow: "1 / -1",
                  background: "#C8963E",
                  borderRadius: 28,
                  margin: "-16px 0",
                  boxShadow: "0 16px 40px rgba(200, 150, 62, 0.28)",
                  zIndex: 1,
                }}
              />

              {/* Header row */}
              <div
                className="cmp-cell cmp-head"
                style={{ gridColumn: 1, gridRow: 1 }}
              />
              <div
                className="cmp-cell cmp-head cmp-center"
                style={{ gridColumn: 2, gridRow: 1 }}
              >
                <span
                  style={{
                    fontFamily: FONTS.display,
                    fontWeight: 900,
                    fontSize: "clamp(18px, 4.4vw, 26px)",
                    letterSpacing: "-0.01em",
                    color: "#111111",
                  }}
                >
                  OSMO
                </span>
              </div>
              <div
                className="cmp-cell cmp-head cmp-center"
                style={{ gridColumn: 3, gridRow: 1 }}
              >
                <span
                  style={{
                    fontFamily: FONTS.body,
                    fontWeight: 600,
                    fontSize: "clamp(12px, 3vw, 15px)",
                    color: "#999999",
                  }}
                >
                  Sans OSMO
                </span>
              </div>

              {/* Data rows */}
              {ROWS.map((label, i) => (
                <Fragment key={label}>
                  <div
                    className="cmp-cell cmp-divider"
                    style={{ gridColumn: 1, gridRow: i + 2 }}
                  >
                    <span
                      style={{
                        fontFamily: FONTS.body,
                        fontWeight: 600,
                        fontSize: "clamp(13px, 2.7vw, 16px)",
                        lineHeight: 1.35,
                        color: "#111111",
                      }}
                    >
                      {label}
                    </span>
                  </div>
                  <div
                    className="cmp-cell cmp-center cmp-divider-amber"
                    style={{ gridColumn: 2, gridRow: i + 2 }}
                  >
                    <span className="cmp-icon">
                      <CheckIcon />
                    </span>
                  </div>
                  <div
                    className="cmp-cell cmp-center cmp-divider"
                    style={{ gridColumn: 3, gridRow: i + 2 }}
                    aria-label="Non"
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        fontSize: "clamp(18px, 4.5vw, 24px)",
                        fontWeight: 400,
                        color: "#C9C2B2",
                        lineHeight: 1,
                      }}
                    >
                      ✕
                    </span>
                  </div>
                </Fragment>
              ))}
            </div>

            <style jsx>{`
              .comparison-grid {
                display: grid;
                grid-template-columns: minmax(0, 1.7fr) 1fr 1fr;
                position: relative;
              }
              .cmp-cell {
                position: relative;
                z-index: 2;
                display: flex;
                align-items: center;
                padding: clamp(15px, 2.4vw, 22px) clamp(14px, 2.6vw, 32px);
                min-height: 0;
              }
              .cmp-head {
                padding-top: clamp(22px, 3vw, 30px);
                padding-bottom: clamp(22px, 3vw, 30px);
              }
              .cmp-center {
                justify-content: center;
                text-align: center;
              }
              .cmp-divider {
                border-top: 1px solid #EFEFEF;
              }
              .cmp-divider-amber {
                border-top: 1px solid rgba(17, 17, 17, 0.08);
              }
              .cmp-icon {
                width: clamp(24px, 5vw, 30px);
                height: clamp(24px, 5vw, 30px);
                display: inline-block;
              }
            `}</style>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
