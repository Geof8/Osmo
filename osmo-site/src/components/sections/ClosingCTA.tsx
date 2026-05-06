"use client";

import { motion } from "framer-motion";

export default function ClosingCTA({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section id="reserve" className="bg-[var(--ink)] text-white relative overflow-hidden" style={{ padding: "180px 0 120px" }}>
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="max-w-[1380px] mx-auto px-10 relative">
        <div
          className="text-[var(--ink-2)] mb-12 flex items-center gap-[14px]"
          style={{ fontFamily: "var(--font-mono), var(--mono)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase" }}
        >
          <span className="w-7 h-px bg-white/40" />
          Vol. 01 · Édition fondateurs · 300 ex.
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "var(--font-barlow), var(--display)",
            fontWeight: 800,
            fontSize: "clamp(72px, 10vw, 168px)",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            textWrap: "balance" as never,
          }}
        >
          Parce que demain
          <br />
          matin, tu n&apos;as
          <br />
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-24 pt-8 border-t border-white/[0.16] grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-14 items-end"
        >
          <div className="flex gap-14 flex-wrap">
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
                    fontSize: 48,
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
            className="inline-flex items-center gap-3 px-[22px] py-[14px] bg-[var(--amber)] text-white border border-[var(--amber)] hover:bg-[var(--ink)] hover:border-[var(--ink)] transition-colors duration-200"
            style={{
              fontFamily: "var(--font-mono), var(--mono)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Réserver mon accès prioritaire <span>→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
