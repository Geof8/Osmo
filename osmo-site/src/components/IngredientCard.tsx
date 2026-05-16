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
        position: "relative",
      }}
    >
      {a.badge && (
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            border: "1px solid #C8963E",
            color: "#C8963E",
            fontSize: 11,
            padding: "2px 8px",
            fontFamily: FONTS.mono,
            letterSpacing: "0.05em",
          }}
        >
          {a.badge}
        </div>
      )}
      <div className="w-11 h-11" style={{ color: "#C8963E", marginTop: a.badge ? 20 : 0 }}>
        {a.svg}
      </div>
      <div
        style={{
          fontFamily: FONTS.display,
          fontWeight: 700,
          fontSize: "clamp(16px, 1.4vw, 20px)",
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
          color: "#FFFFFF",
        }}
      >
        {a.benefit}
      </div>
      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: 11,
          fontWeight: 400,
          color: "#666666",
        }}
      >
        {a.name}
      </div>
      <div
        style={{
          fontFamily: FONTS.display,
          fontSize: 12,
          fontWeight: 300,
          fontStyle: "italic",
          color: "#888888",
          lineHeight: 1.4,
          maxWidth: 200,
        }}
      >
        {a.detail}
      </div>
    </motion.article>
  );
}
