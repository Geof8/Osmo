"use client";

import { motion } from "framer-motion";
import { FONTS } from "@/lib/constants";
import type { OpenModalProps } from "@/types";

export default function Navbar({ onOpenModal }: OpenModalProps) {
  return (
    <motion.nav
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 bg-[var(--paper)] border-b border-[var(--rule)]"
      aria-label="Navigation principale"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-10 grid grid-cols-3 items-center h-[64px] sm:h-[78px]">
        {/* Left — Logo */}
        <div className="flex items-baseline gap-4">
          <a
            href="/"
            aria-label="OSMO — retour en haut"
            className="relative"
            style={{
              fontFamily: FONTS.playfair,
              fontWeight: 600,
              fontSize: 30,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            <span className="relative inline-block">
              <span
                className="absolute left-1/2 -translate-x-1/2"
                aria-hidden="true"
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
          </a>
          <span
            className="hidden lg:inline text-[var(--ink-2)]"
            style={{
              fontFamily: FONTS.display,
              fontWeight: 500,
              fontStyle: "normal",
              fontSize: 15,
              letterSpacing: "-0.01em",
            }}
          >
            Recovery — édition fondateurs
          </span>
        </div>

        {/* Center — Notre Histoire */}
        <div className="flex justify-center">
          <a
            href="/notre-histoire"
            className="inline-flex items-center justify-center px-5 min-h-[38px] border border-[var(--rule)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white transition-colors duration-200"
            style={{
              fontFamily: FONTS.mono,
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Notre Histoire
          </a>
        </div>

        {/* Right — CTA */}
        <div className="flex items-center justify-end gap-4">
          <span
            className="hidden sm:inline text-[var(--ink-2)]"
            style={{
              fontFamily: FONTS.mono,
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            500 / 500 places
          </span>
          <button
            onClick={onOpenModal}
            className="inline-flex items-center gap-3 px-5 min-h-[44px] bg-[var(--amber)] text-white border border-[var(--amber)] hover:bg-[var(--ink)] hover:border-[var(--ink)] transition-colors duration-200 active:scale-[0.97]"
            style={{
              fontFamily: FONTS.mono,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Devenir fondateur
            <span aria-hidden="true" className="inline-block">→</span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
