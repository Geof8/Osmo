"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { FONTS, PRODUCT } from "@/lib/constants";

const STORAGE_KEY = "popup_shown";
const PROMO_CODE = "BIENVENUE15";

/**
 * Welcome-offer popup. Only armed once the Lot N°001 is sold out (`soldOut`).
 * While places remain, the early-adopter price (25€ au lieu de 35€) stands on
 * its own and the popup never appears. Once sold out, it shows after 8s OR once
 * the user has scrolled 30% of the page — whichever comes first, once per session.
 */
export default function PromoPopup({ soldOut = false }: { soldOut?: boolean }) {
  const { openCart } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!soldOut) return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      sessionStorage.setItem(STORAGE_KEY, "1");
      setVisible(true);
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };

    const timer = window.setTimeout(reveal, 8000);

    const onScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable >= 0.3) reveal();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [soldOut]);

  useEffect(() => {
    if (!visible) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVisible(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [visible]);

  function close() {
    setVisible(false);
  }

  function handleCta() {
    setVisible(false);
    openCart();
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="promo-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Offre de bienvenue"
        >
          <motion.div
            key="promo-card"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#FFFFFF",
              borderRadius: 20,
              padding: 48,
              maxWidth: 480,
              width: "90%",
              textAlign: "center",
              position: "relative",
            }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Fermer"
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "transparent",
                border: "none",
                fontSize: 20,
                color: "#999999",
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              ✕
            </button>

            <div
              style={{
                fontFamily: FONTS.body,
                fontSize: 11,
                color: "#999999",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
              }}
            >
              Offre de bienvenue
            </div>

            <h2
              style={{
                fontFamily: FONTS.display,
                fontSize: 32,
                fontWeight: 900,
                color: "#111111",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                margin: "16px 0 0",
              }}
            >
              -15% sur ta première commande
            </h2>

            <p
              style={{
                fontFamily: FONTS.body,
                fontSize: 15,
                color: "#666666",
                lineHeight: 1.6,
                margin: "12px 0 0",
              }}
            >
              Utilise le code ci-dessous au moment du paiement.
            </p>

            <div
              style={{
                background: "#F4F4F4",
                borderRadius: 8,
                padding: "12px 24px",
                fontFamily: FONTS.body,
                fontSize: 20,
                fontWeight: 900,
                letterSpacing: "0.2em",
                color: "#111111",
                margin: "24px auto 0",
                display: "inline-block",
              }}
            >
              {PROMO_CODE}
            </div>

            <button
              onClick={handleCta}
              className="cta-pill active:scale-[0.98]"
              style={{
                display: "block",
                width: "100%",
                minHeight: 52,
                marginTop: 24,
                fontFamily: FONTS.body,
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              Réserver ma place — {PRODUCT.earlyPrice}€
            </button>

            <p
              style={{
                fontFamily: FONTS.body,
                fontSize: 12,
                color: "#999999",
                margin: "12px 0 0",
              }}
            >
              ✓ 30 jours satisfait ou remboursé
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
