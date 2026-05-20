"use client";

import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { FONTS } from "@/lib/constants";
import type { SoldOutProps } from "@/types";

export default function Navbar({ soldOut = false }: SoldOutProps) {
  const { addToCartAndNavigate } = useCart();
  return (
    <motion.nav
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 bg-white border-b border-[#E8E8E8]"
      aria-label="Navigation principale"
    >
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10 grid grid-cols-[auto_1fr_auto] sm:grid-cols-3 items-center gap-3 h-[60px] sm:h-[78px]">
        {/* Left — Logo (wordmark only) */}
        <div className="flex items-baseline gap-4 min-w-0">
          <a
            href="/"
            aria-label="OSMO — retour en haut"
            className="inline-block"
            style={{
              fontFamily: FONTS.display,
              fontWeight: 900,
              fontSize: "clamp(26px, 6vw, 32px)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              color: "#111111",
            }}
          >
            Osmo
          </a>
          <span
            className="hidden lg:inline"
            style={{
              fontFamily: FONTS.display,
              fontWeight: 500,
              fontStyle: "normal",
              fontSize: 15,
              letterSpacing: "-0.01em",
              color: "#666666",
            }}
          >
            Recovery · Lot N°001
          </span>
        </div>

        {/* Center — Notre Histoire (hidden on small screens to free room for CTA) */}
        <div className="hidden sm:flex justify-center">
          <a
            href="/notre-histoire"
            className="inline-flex items-center justify-center min-h-[44px] transition-colors duration-200"
            style={{
              fontFamily: FONTS.mono,
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#444444",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#444444")}
          >
            Notre Histoire
          </a>
        </div>

        {/* Right — CTA (amber preserved) */}
        <div className="flex items-center justify-end gap-4">
          <button
            onClick={addToCartAndNavigate}
            className="cta-pill inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 min-h-[44px] active:scale-[0.97] whitespace-nowrap"
            style={{
              fontFamily: FONTS.mono,
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            <span className="sm:hidden" style={{ fontSize: 11 }}>
              {soldOut ? "Liste d’attente" : "Réserver · 20€"}
            </span>
            <span className="hidden sm:inline" style={{ fontSize: 11, letterSpacing: "0.18em" }}>
              {soldOut ? "Liste d’attente · Lot N°002" : "Devenir Early Adopter"}
            </span>
            <span aria-hidden="true" className="inline-block">→</span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
