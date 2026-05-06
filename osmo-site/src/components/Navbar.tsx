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
            className="relative pr-[14px]"
            style={{
              fontFamily: "var(--font-barlow), var(--display)",
              fontWeight: 900,
              fontSize: 32,
              lineHeight: 1,
              letterSpacing: "-0.045em",
            }}
          >
            Osmo
            <span className="absolute bottom-[6px] right-0 w-[7px] h-[7px] bg-[var(--ink)] rounded-full" />
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
