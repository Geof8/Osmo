"use client";

import FadeUp from "@/components/ui/FadeUp";
import { useCart } from "@/context/CartContext";
import { FONTS } from "@/lib/constants";

const TRUST_LINE =
  "✓ Laboratoire français · ✓ Essai clinique · ✓ 30 jours satisfait ou remboursé";

/**
 * Standalone conversion CTA inserted between content sections.
 * Amber pill + reassurance line, centered. Opens the side cart on click.
 */
export default function InlineCTA({ label }: { label: string }) {
  const { addToCartAndNavigate } = useCart();

  return (
    <section
      className="relative z-[5]"
      style={{
        background: "#FFFFFF",
        padding: "clamp(40px, 7vw, 64px) 0",
        borderBottom: "1px solid #E8E8E8",
      }}
    >
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
        <FadeUp>
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={addToCartAndNavigate}
              className="cta-pill inline-flex items-center justify-center gap-3 px-8 min-h-[52px] active:scale-[0.97] w-full sm:w-auto"
              style={{
                fontFamily: FONTS.mono,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              {label}
            </button>
            <p
              style={{
                fontFamily: FONTS.body,
                fontSize: 11,
                color: "#666666",
                textAlign: "center",
                margin: 0,
              }}
            >
              {TRUST_LINE}
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
