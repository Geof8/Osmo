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
      className="hover:-translate-y-1 transition-[transform,box-shadow] duration-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] flex flex-col gap-[14px]"
      style={{
        padding: "28px 20px 24px",
        background: "#1A1A1A",
        borderRight: "1px solid #333333",
        borderBottom: "1px solid #333333",
      }}
    >
      <div
        className="pb-3"
        style={{
          fontFamily: FONTS.mono,
          fontSize: 10,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#AAAAAA",
          borderBottom: "1px solid #333333",
        }}
      >
        {a.ord}
      </div>
      <div className="w-11 h-11" style={{ color: "#C8963E" }}>
        {a.svg}
      </div>
      <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: "#AAAAAA" }}>
        {a.mol}
      </div>
      <div
        style={{
          fontFamily: FONTS.display,
          fontWeight: 700,
          fontSize: "clamp(18px, 1.4vw, 22px)",
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          color: "#FFFFFF",
        }}
      >
        {a.name}
      </div>
      <div
        className="pt-3"
        style={{
          fontSize: 13,
          lineHeight: 1.55,
          color: "#AAAAAA",
          borderTop: "1px dashed #333333",
        }}
      >
        {a.role}
      </div>
    </motion.article>
  );
}
