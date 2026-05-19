"use client";

import { useState, FormEvent } from "react";
import { FONTS } from "@/lib/constants";

type Status = "idle" | "loading" | "success" | "error";

export default function MaintenancePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "maintenance",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data?.error || "Erreur. Réessaye dans un instant.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Erreur réseau. Réessaye.");
    }
  }

  return (
    <main
      style={{
        background: "#111111",
        color: "#FFFFFF",
        minHeight: "100dvh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        fontFamily: FONTS.body,
      }}
    >
      {/* Top — logo */}
      <header
        style={{
          width: "100%",
          padding: "32px 24px 0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <span
          aria-label="OSMO"
          style={{
            position: "relative",
            display: "inline-block",
            fontFamily: FONTS.playfair,
            fontWeight: 600,
            fontSize: 28,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
          }}
        >
          <span style={{ position: "relative", display: "inline-block" }}>
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                top: -10,
                width: 6,
                height: 8,
                background: "#FFFFFF",
                borderRadius: "50% 50% 50% 50% / 30% 30% 70% 70%",
              }}
            />
            O
          </span>
          smo
        </span>
      </header>

      {/* Center — content */}
      <section
        style={{
          minHeight: "calc(100dvh - 120px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 24px 96px",
          textAlign: "center",
          gap: 28,
        }}
      >
        <h1
          style={{
            fontFamily: FONTS.display,
            fontWeight: 900,
            color: "#FFFFFF",
            fontSize: "clamp(72px, 16vw, 156px)",
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            margin: 0,
          }}
        >
          Bientôt.
        </h1>

        <div
          style={{
            color: "#666666",
            fontSize: 16,
            lineHeight: 1.6,
            maxWidth: 520,
            fontFamily: FONTS.body,
          }}
        >
          <p style={{ margin: 0 }}>OSMO Recovery arrive très prochainement.</p>
          <p style={{ margin: 0 }}>
            Complexe d&apos;électrolytes · Lot N°001 · Early Adopters
          </p>
        </div>

        {/* Amber pulsing dot */}
        <div
          aria-hidden="true"
          style={{
            position: "relative",
            width: 14,
            height: 14,
            marginTop: 4,
          }}
        >
          <span
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: "#C8963E",
              boxShadow: "0 0 18px rgba(200, 150, 62, 0.55)",
            }}
          />
          <span
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: "#C8963E",
              opacity: 0.55,
              animation: "osmoPulse 1.8s ease-out infinite",
            }}
          />
        </div>

        {/* Email capture */}
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            maxWidth: 460,
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
          aria-label="Inscription waitlist"
        >
          {status === "success" ? (
            <p
              role="status"
              style={{
                color: "#C8963E",
                fontFamily: FONTS.body,
                fontSize: 16,
                margin: 0,
                padding: "16px 0",
              }}
            >
              ✓ Tu seras parmi les premiers.
            </p>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  width: "100%",
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ton email pour être prévenu en premier"
                  disabled={status === "loading"}
                  aria-label="Adresse email"
                  style={{
                    width: "100%",
                    height: 52,
                    padding: "0 18px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    color: "#FFFFFF",
                    borderRadius: 10,
                    fontFamily: FONTS.body,
                    fontSize: 15,
                    outline: "none",
                    transition: "border-color .15s ease, background .15s ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#C8963E";
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.14)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }}
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    width: "100%",
                    height: 52,
                    background: "#C8963E",
                    color: "#111111",
                    border: "none",
                    borderRadius: 10,
                    fontFamily: FONTS.body,
                    fontWeight: 600,
                    fontSize: 15,
                    letterSpacing: "0.01em",
                    cursor: status === "loading" ? "wait" : "pointer",
                    transition: "filter .15s ease, transform .1s ease",
                    opacity: status === "loading" ? 0.7 : 1,
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = "translateY(1px)";
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = "brightness(1.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {status === "loading" ? "Inscription…" : "Me prévenir →"}
                </button>
              </div>
              {status === "error" && errorMsg && (
                <p
                  role="alert"
                  style={{
                    color: "#E5675A",
                    fontSize: 13,
                    margin: 0,
                    fontFamily: FONTS.body,
                  }}
                >
                  {errorMsg}
                </p>
              )}
            </>
          )}
        </form>
      </section>

      {/* Bottom */}
      <footer
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          textAlign: "center",
          padding: "0 24px 28px",
          color: "#444444",
          fontSize: 12,
          fontFamily: FONTS.body,
          letterSpacing: "0.02em",
        }}
      >
        osmo-lab.fr · Paris, France · 2026
      </footer>

      <style jsx>{`
        @keyframes osmoPulse {
          0% {
            transform: scale(1);
            opacity: 0.55;
          }
          70% {
            transform: scale(2.6);
            opacity: 0;
          }
          100% {
            transform: scale(2.6);
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          :global([aria-hidden="true"]) > span:last-child {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}
