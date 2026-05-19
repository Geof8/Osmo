"use client";

import { useEffect, useRef, useState } from "react";
import GlobalSearch from "./GlobalSearch";
import NotificationsBell from "./NotificationsBell";

export default function AdminTopbar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!profileRef.current) return;
      if (!profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 56,
        background: "#111111",
        borderBottom: "1px solid #1F1F1F",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        zIndex: 20,
      }}
    >
      <div
        style={{
          width: 220,
          color: "#FFFFFF",
          fontFamily: "var(--display)",
          fontWeight: 700,
          fontSize: 20,
          letterSpacing: "0.04em",
        }}
      >
        OSMO
        <span
          style={{
            marginLeft: 8,
            fontFamily: "var(--mono)",
            fontSize: 9,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#888888",
          }}
        >
          Admin
        </span>
      </div>

      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <GlobalSearch />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          minWidth: 220,
          justifyContent: "flex-end",
        }}
      >
        <NotificationsBell />

        <div ref={profileRef} style={{ position: "relative" }}>
          <button
            type="button"
            onClick={() => setProfileOpen((o) => !o)}
            aria-label="Profil"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#C8963E",
              color: "#111111",
              border: "none",
              fontFamily: "var(--body)",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            O
          </button>
          {profileOpen && (
            <div
              style={{
                position: "absolute",
                top: 40,
                right: 0,
                width: 200,
                background: "#FFFFFF",
                border: "1px solid #ECECEC",
                borderRadius: 10,
                boxShadow: "0 8px 24px rgba(17,17,17,0.12)",
                overflow: "hidden",
                zIndex: 30,
              }}
            >
              <div
                style={{
                  padding: "12px 14px",
                  borderBottom: "1px solid #F0F0F0",
                  fontFamily: "var(--body)",
                  fontSize: 12,
                  color: "#666666",
                }}
              >
                Connecté en tant que
                <div
                  style={{
                    color: "#111111",
                    fontWeight: 600,
                    marginTop: 2,
                  }}
                >
                  OSMO Admin
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "10px 14px",
                  background: "transparent",
                  border: "none",
                  fontFamily: "var(--body)",
                  fontSize: 13,
                  color: "#111111",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#FAFAFA")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
