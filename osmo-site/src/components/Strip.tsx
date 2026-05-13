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
        fontSize: 10,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
      }}
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-10 flex justify-between gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="w-[6px] h-[6px] bg-white rounded-full animate-pulse" aria-hidden="true" />
          Pré-lancement · Lot N°001 · 500 places
        </div>
        <div className="hidden md:block">OSMO Lab — Paris, France</div>
        <div className="hidden sm:block">Tarif fondateur · 15 € · Paiement sécurisé</div>
      </div>
    </motion.div>
  );
}
