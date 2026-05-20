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
  const [ref, isInView] = useInView<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      initial={ANIMATION_CONFIG.cardReveal.initial}
      animate={isInView ? { opacity: 1, y: 0 } : ANIMATION_CONFIG.cardReveal.initial}
      transition={{ ...ANIMATION_CONFIG.cardReveal.transition, delay: index * 0.1 }}
    >
      <article
        className="formula-card group flex flex-col h-full"
        style={{
          background: "#1A1A1A",
          border: "1px solid #2A2A2A",
          borderRadius: 16,
          padding: "clamp(24px, 4vw, 32px)",
          position: "relative",
        }}
      >
        {a.highlight && (
          <span
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "#C8963E",
              color: "#111111",
              fontFamily: FONTS.mono,
              fontSize: 10,
              fontWeight: 500,
              padding: "3px 10px",
              borderRadius: 50,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            ★ Clé
          </span>
        )}

        <div
          style={{
            display: "inline-block",
            alignSelf: "flex-start",
            background: "#C8963E",
            color: "#111111",
            fontFamily: FONTS.mono,
            fontSize: 11,
            fontWeight: 500,
            padding: "4px 10px",
            borderRadius: 50,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 16,
            maxWidth: a.highlight ? "calc(100% - 70px)" : "100%",
          }}
        >
          {a.tag}
        </div>

        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 22,
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            color: "#FFFFFF",
            marginBottom: 20,
          }}
        >
          {a.name}
        </div>

        <div style={{ height: 1, background: "#2A2A2A", marginBottom: 20 }} />

        <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: 20, display: "flex", flexDirection: "column", gap: 8 }}>
          {a.bullets.map((b, i) => (
            <li
              key={i}
              style={{
                fontFamily: FONTS.body,
                fontSize: 14,
                lineHeight: 1.6,
                color: "#CCCCCC",
                display: "flex",
                gap: 10,
                fontWeight: 400,
              }}
            >
              <span aria-hidden="true" style={{ color: "#FFFFFF", flexShrink: 0 }}>→</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 13,
            fontStyle: "italic",
            color: "#999999",
            lineHeight: 1.5,
            marginTop: "auto",
          }}
        >
          {a.detail}
        </div>
      </article>
    </motion.div>
  );
}
