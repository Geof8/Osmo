"use client";

import { useEffect, useState } from "react";

const COOKIE_NAME = "cookie_consent";
const THIRTEEN_MONTHS_SECONDS = 60 * 60 * 24 * 30 * 13;

function readConsentCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function writeConsentCookie(value: "accepted" | "refused") {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${value}; Max-Age=${THIRTEEN_MONTHS_SECONDS}; Path=/; SameSite=Lax${secure}`;
}

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!readConsentCookie()) {
      setVisible(true);
    }
  }, []);

  if (!mounted || !visible) return null;

  const handle = (value: "accepted" | "refused") => () => {
    writeConsentCookie(value);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Consentement aux cookies"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        background: "#111111",
        color: "#FFFFFF",
        padding: "16px 24px",
        boxShadow: "0 -8px 24px rgba(0,0,0,0.2)",
      }}
    >
      <div
        className="mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        style={{ maxWidth: 1380 }}
      >
        <p
          style={{
            fontFamily: "var(--font-dm-sans), var(--body)",
            fontSize: 14,
            lineHeight: 1.5,
            color: "#FFFFFF",
            margin: 0,
          }}
        >
          Ce site utilise des cookies nécessaires à son fonctionnement.
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handle("refused")}
            style={{
              fontFamily: "var(--font-mono), var(--mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              background: "transparent",
              border: "1px solid #FFFFFF",
              borderRadius: 999,
              padding: "10px 20px",
              cursor: "pointer",
              transition: "background 0.18s ease, color 0.18s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#FFFFFF";
              e.currentTarget.style.color = "#111111";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#FFFFFF";
            }}
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={handle("accepted")}
            style={{
              fontFamily: "var(--font-mono), var(--mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#111111",
              background: "var(--amber)",
              border: "1px solid var(--amber)",
              borderRadius: 999,
              padding: "10px 20px",
              cursor: "pointer",
              transition: "background 0.18s ease, border-color 0.18s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--amber-hover)";
              e.currentTarget.style.borderColor = "var(--amber-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--amber)";
              e.currentTarget.style.borderColor = "var(--amber)";
            }}
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
