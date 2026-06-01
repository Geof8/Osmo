"use client";

import { useCart } from "@/context/CartContext";
import { FONTS, PRODUCT } from "@/lib/constants";

/**
 * Full-width promo bar pinned to the bottom of the viewport. Stays visible on
 * scroll and is hidden while the side cart drawer is open.
 */
export default function StickyBar() {
  const { open, addToCartAndNavigate } = useCart();

  if (open) return null;

  return (
    <div
      className="sticky-bar"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        background: "#111111",
        color: "#FFFFFF",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      <span
        className="sticky-bar-text"
        style={{
          fontFamily: FONTS.body,
          fontSize: 14,
          lineHeight: 1.4,
        }}
      >
        🎁 -15% sur ta première commande · Code : BIENVENUE15
      </span>

      <button
        onClick={addToCartAndNavigate}
        className="cta-pill sticky-bar-cta active:scale-[0.97]"
        style={{
          flexShrink: 0,
          padding: "10px 20px",
          minHeight: 40,
          fontFamily: FONTS.mono,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        Réserver — {PRODUCT.earlyPrice}€
      </button>

      <style jsx>{`
        @media (max-width: 640px) {
          .sticky-bar {
            flex-direction: column;
            gap: 10px;
            padding: 12px 16px;
          }
          .sticky-bar-text {
            text-align: center;
            font-size: 12px;
          }
          .sticky-bar-cta {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
