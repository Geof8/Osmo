"use client";

import { FONTS, MARQUEE_ITEMS } from "@/lib/constants";

const SEP = " ◆ ";
const text = MARQUEE_ITEMS.join(SEP) + SEP;

export default function Marquee() {
  return (
    <div
      className="relative z-[5] overflow-hidden border-b border-[var(--rule)]"
      style={{ background: "var(--ink)", padding: "14px 0" }}
      role="marquee"
      aria-label="Composition et informations produit"
    >
      <div className="marquee-track whitespace-nowrap">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="inline-block text-white"
            aria-hidden={i === 1 ? "true" : undefined}
            style={{
              fontFamily: FONTS.mono,
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {text}
          </span>
        ))}
      </div>
      <style jsx>{`
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
