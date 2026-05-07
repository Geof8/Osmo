"use client";

import { motion } from "framer-motion";

export default function Navbar({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <motion.nav
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 bg-[var(--paper)] border-b border-[var(--rule)]"
    >
      <div className="max-w-[1380px] mx-auto px-10 flex items-center justify-between h-[78px]">
        <div className="flex items-baseline gap-4">
          <span
            className="relative"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontWeight: 600,
              fontSize: 30,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            <span className="relative inline-block">
              <span
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                  top: -10,
                  width: 6,
                  height: 8,
                  background: "var(--ink)",
                  borderRadius: "50% 50% 50% 50% / 30% 30% 70% 70%",
                }}
              />
              O
            </span>
            smo
          </span>
          <span
            className="hidden md:inline text-[var(--ink-2)]"
            style={{
              fontFamily: "var(--font-barlow), var(--display)",
              fontWeight: 500,
              fontStyle: "normal",
              fontSize: 15,
              letterSpacing: "-0.01em",
            }}
          >
            Recovery — édition fondateurs
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span
            className="hidden sm:inline text-[var(--ink-2)]"
            style={{
              fontFamily: "var(--font-mono), var(--mono)",
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase" as const,
            }}
          >
            300 / 300 places
          </span>
          <button
            onClick={onOpenModal}
            className="inline-flex items-center gap-3 px-[22px] py-[14px] bg-[var(--amber)] text-white border border-[var(--amber)] hover:bg-[var(--ink)] hover:border-[var(--ink)] transition-colors duration-200"
            style={{
              fontFamily: "var(--font-mono), var(--mono)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
            }}
          >
            Réserver
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
