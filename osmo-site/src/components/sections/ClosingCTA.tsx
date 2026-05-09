"use client";

import { motion } from "framer-motion";
import FadeUp from "@/components/FadeUp";

export default function ClosingCTA({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section id="reserve" className="scroll-mt-20 bg-[var(--ink)] text-white relative overflow-hidden" style={{ padding: "clamp(100px, 14vw, 180px) 0 clamp(80px, 10vw, 120px)" }}>
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        aria-hidden="true"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="max-w-[1380px] mx-auto px-5 sm:px-10 relative">
        <FadeUp>
          <div
            className="text-[var(--ink-2)] mb-8 lg:mb-12 flex items-center gap-[14px]"
            style={{ fontFamily: "var(--font-mono), var(--mono)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase" }}
          >
            <span className="w-7 h-px bg-white/40" aria-hidden="true" />
            Vol. 01 · Édition fondateurs · 300 ex.
          </div>
        </FadeUp>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "var(--font-barlow), var(--display)",
            fontWeight: 800,
            fontSize: "clamp(40px, 7vw, 110px)",
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
          }}
        >
          Parce que demain matin,{" "}
          tu n&apos;as{" "}
          <span
            style={{
              fontFamily: "var(--font-barlow), var(--display)",
              fontWeight: 800,
              fontStyle: "normal",
              color: "var(--amber)",
            }}
          >
            pas le choix.
          </span>
        </motion.h2>

        <FadeUp delay={0.2}>
          <div className="mt-16 lg:mt-24 pt-8 border-t border-white/[0.16] grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-14 items-end">
            <div className="flex gap-8 sm:gap-14 flex-wrap">
              {[
                { k: "300", v: "Places", em: true },
                { k: "25 €", v: "Fondateur", em: false },
                { k: "29 €", v: "Public", em: false },
                { k: "0 €", v: "Maintenant", em: false },
              ].map((stat, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontFamily: "var(--font-barlow), var(--display)",
                      fontWeight: 800,
                      fontSize: "clamp(36px, 4vw, 48px)",
                      letterSpacing: "-0.025em",
                      lineHeight: 1,
                      ...(stat.em ? { fontStyle: "normal" } : {}),
                    }}
                  >
                    {stat.k}
                  </div>
                  <div
                    className="mt-[10px]"
                    style={{
                      fontFamily: "var(--font-mono), var(--mono)",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "rgba(255,248,232,0.55)",
                    }}
                  >
                    {stat.v}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={onOpenModal}
              className="inline-flex items-center gap-3 px-5 min-h-[48px] bg-[var(--amber)] text-white border border-[var(--amber)] hover:bg-white hover:text-[var(--ink)] hover:border-white transition-all duration-200 active:scale-[0.97]"
              style={{
                fontFamily: "var(--font-mono), var(--mono)",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Réserver mon accès prioritaire <span aria-hidden="true">→</span>
            </button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
