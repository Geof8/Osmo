"use client";

const items = [
  "Bicarbonate de sodium · 1700 mg",
  "Citrate de potassium · 2000 mg",
  "Bisglycinate de magnésium · 1350 mg",
  "NaCl · 150 mg",
  "NAC · 600 mg",
  "Lot 001 · 300 ex.",
  "Édition fondateurs · 25 €",
  "Made in France",
];

const sep = " ◆ ";
const text = items.join(sep) + sep;

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
              fontFamily: "var(--font-mono), var(--mono)",
              fontSize: 11,
              letterSpacing: "0.16em",
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
