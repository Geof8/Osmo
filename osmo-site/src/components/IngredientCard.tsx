"use client";

import { motion } from "framer-motion";
import { ANIMATION_CONFIG, FONTS } from "@/lib/constants";
import { useInView } from "@/hooks/useInView";
import type { Ingredient } from "@/types";

export default function IngredientCard({
  a,
  index,
}: {
  a: Ingredient;
  index: number;
}) {
  const [ref, isInView] = useInView<HTMLElement>();

  return (
    <motion.article
      ref={ref}
      initial={ANIMATION_CONFIG.cardReveal.initial}
      animate={isInView ? { opacity: 1, y: 0 } : ANIMATION_CONFIG.cardReveal.initial}
      transition={{ ...ANIMATION_CONFIG.cardReveal.transition, delay: index * 0.1 }}
      className="hover:-translate-y-1 transition-[transform,box-shadow] duration-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] flex flex-col justify-center gap-3"
      style={{
        padding: "28px 20px",
        background: "#1A1A1A",
        borderRight: "1px solid #333333",
        borderBottom: "1px solid #333333",
      }}
    >
      <div className="w-11 h-11" style={{ color: "#C8963E" }}>
        {a.svg}
      </div>
      <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: "#CCCCCC" }}>
        {a.mol}
      </div>
      <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: "#FFFFFF" }}>
        {a.name}
      </div>
      <div style={{ borderTop: "1px dashed #333333", marginTop: 4 }} />
      <div
        style={{
          padding: "8px 12px",
          border: "1px solid #C8963E",
          fontFamily: FONTS.display,
          fontWeight: 700,
          fontSize: "clamp(14px, 1.2vw, 16px)",
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          color: "#C8963E",
        }}
      >
        {a.benefit}
      </div>
    </motion.article>
  );
}
