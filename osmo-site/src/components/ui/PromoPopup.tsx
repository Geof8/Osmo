"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { FONTS } from "@/lib/constants";

const STORAGE_KEY = "popup_shown";
const BAR_KEY = "promo_bar_shown";
const PROMO_CODE = "BIENVENUE15";
const PUBLIC_PRICE = 35;
const PROMO_PRICE = 30;

export default function PromoPopup({ soldOut: _soldOut }: { soldOut?: boolean }) {
  void _soldOut;
  const { openCart } = useCart();
  const [visible, setVisible] = useState(false);
  const [barVisible, setBarVisible] = useState(false);

  // Restore sticky bar if it was already triggered this session
  useEffect(() => {
    if (sessionStorage.getItem(BAR_KEY)) setBarVisible(true);
  }, []);

  // Show popup after 5s, once per session
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const timer = window.setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setVisible(true);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  function dismiss() {
    setVisible(false);
    setBarVisible(true);
    sessionStorage.setItem(BAR_KEY, "1");
  }

  function handleCta() {
    dismiss();
    openCart();
  }

  return (
    <>
      {/* ── Popup ── */}
      <AnimatePresence>
        {visible && (
          <motion.div
            key="promo-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={dismiss}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
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
                onClick={dismiss}
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
                −15% sur ta première commande
              </h2>

              {/* Price display */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  marginTop: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 18,
                    color: "#999999",
                    textDecoration: "line-through",
                  }}
                >
                  {PUBLIC_PRICE}€
                </span>
                <span
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 36,
                    fontWeight: 900,
                    color: "#C8963E",
                  }}
                >
                  {PROMO_PRICE}€
                </span>
              </div>

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
                  margin: "20px auto 0",
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
                Réserver ma place — {PROMO_PRICE}€
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

      {/* ── Sticky promo bar (appears after popup is dismissed) ── */}
      <AnimatePresence>
        {barVisible && !visible && (
          <motion.div
            key="promo-bar"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 999,
              background: "#111111",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              padding: "14px 24px",
            }}
          >
            <p
              style={{
                fontFamily: FONTS.body,
                fontSize: 14,
                color: "#FFFFFF",
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              🎁 <strong>−15%</strong> sur ta première commande · Code&nbsp;
              <span
                style={{
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#C8963E",
                }}
              >
                {PROMO_CODE}
              </span>
              <span style={{ color: "#999999", marginLeft: 8 }}>
                · {PUBLIC_PRICE}€ → {PROMO_PRICE}€
              </span>
            </p>

            <button
              onClick={handleCta}
              className="cta-pill active:scale-[0.98]"
              style={{
                fontFamily: FONTS.body,
                fontSize: 14,
                fontWeight: 700,
                padding: "10px 20px",
                minHeight: 0,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              Réserver — {PROMO_PRICE}€
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
