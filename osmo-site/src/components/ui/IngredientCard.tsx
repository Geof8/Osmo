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
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ ...ANIMATION_CONFIG.cardReveal.transition, delay: index * 0.1 }}
      className="formula-card group flex flex-col"
      style={{
        background: "#1A1A1A",
        border: "1px solid #2A2A2A",
        borderTop: a.highlight ? "2px solid #C8963E" : "1px solid #2A2A2A",
        borderRadius: 12,
        padding: "clamp(18px, 4vw, 24px)",
        position: "relative",
      }}
    >
      {a.highlight && (
        <span
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "rgba(200, 150, 62, 0.15)",
            color: "#C8963E",
            fontFamily: FONTS.mono,
            fontSize: 11,
            padding: "2px 8px",
            borderRadius: 50,
            letterSpacing: "0.05em",
          }}
        >
          ★ Clé
        </span>
      )}

      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: 11,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#C8963E",
          marginBottom: 8,
          paddingRight: a.highlight ? 56 : 0,
        }}
      >
        {a.tag}
      </div>

      <div
        style={{
          fontFamily: FONTS.display,
          fontSize: 20,
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
          color: "#FFFFFF",
          marginBottom: 16,
        }}
      >
        {a.name}
      </div>

      <div style={{ height: 1, background: "#333333", marginBottom: 16 }} />

      <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: 16, display: "flex", flexDirection: "column", gap: 6 }}>
        {a.bullets.map((b, i) => (
          <li
            key={i}
            style={{
              fontFamily: FONTS.display,
              fontSize: 14,
              lineHeight: 1.6,
              color: "#CCCCCC",
              display: "flex",
              gap: 8,
            }}
          >
            <span aria-hidden="true" style={{ color: "#C8963E", flexShrink: 0 }}>→</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div
        style={{
          fontFamily: FONTS.display,
          fontSize: 12,
          fontStyle: "italic",
          color: "#888888",
          lineHeight: 1.5,
          marginTop: "auto",
        }}
      >
        {a.detail}
      </div>
    </motion.article>
  );
}
