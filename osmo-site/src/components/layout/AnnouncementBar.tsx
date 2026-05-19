"use client";

import { motion } from "framer-motion";
import { FONTS } from "@/lib/constants";

export default function Strip() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-[var(--ink)] text-white relative z-10"
      role="status"
      style={{
        padding: "9px 0",
        fontFamily: FONTS.mono,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
      }}
    >
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10 flex justify-between items-center gap-4 flex-wrap" style={{ fontSize: "clamp(10px, 2.6vw, 11px)" }}>
        <div className="flex items-center gap-2">
          <span className="w-[6px] h-[6px] bg-white rounded-full animate-pulse flex-shrink-0" aria-hidden="true" />
          <span className="sm:hidden">LOT N°001 · 50 PLACES · 20€</span>
          <span className="hidden sm:inline">LOT N°001 · 50 PLACES · EARLY ADOPTERS · 20€ · EXPÉDITION SOUS 6 MOIS</span>
        </div>
        <div className="hidden md:block">OSMO Lab · Paris, France</div>
      </div>
    </motion.div>
  );
}
