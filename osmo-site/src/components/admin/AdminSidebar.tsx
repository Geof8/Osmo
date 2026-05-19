"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  icon: string;
};

const NAV: NavItem[] = [
  { href: "/admin", label: "Vue d'ensemble", icon: "📊" },
  { href: "/admin/commandes", label: "Commandes", icon: "📦" },
  { href: "/admin/clients", label: "Clients", icon: "👥" },
  { href: "/admin/codes-promo", label: "Codes promo", icon: "🎟️" },
  { href: "/admin/emails", label: "Emails", icon: "📧" },
  { href: "/admin/newsletter", label: "Newsletter", icon: "📰" },
  { href: "/admin/abandons", label: "Paniers abandonnés", icon: "📈" },
  { href: "/admin/parametres", label: "Paramètres", icon: "⚙️" },
];

export default function AdminSidebar() {
  const pathname = usePathname() ?? "";
  const router = useRouter();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: 240,
        background: "#111111",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        zIndex: 10,
      }}
    >
      <div style={{ padding: "28px 24px 16px" }}>
        <Link
          href="/admin"
          style={{
            fontFamily: "var(--display)",
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: "0.04em",
            color: "#FFFFFF",
            textDecoration: "none",
          }}
        >
          OSMO
        </Link>
        <div
          style={{
            marginTop: 4,
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#888888",
          }}
        >
          Back-office
        </div>
      </div>

      <nav style={{ flex: 1, padding: "12px 0", overflowY: "auto" }}>
        {NAV.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 24px",
                color: active ? "#FFFFFF" : "#BBBBBB",
                background: active ? "#1A1A1A" : "transparent",
                borderLeft: `3px solid ${active ? "#C8963E" : "transparent"}`,
                fontFamily: "var(--body)",
                fontSize: 14,
                textDecoration: "none",
                transition: "background 0.15s ease, color 0.15s ease",
              }}
            >
              <span style={{ fontSize: 16, lineHeight: 1 }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: "16px 24px 24px", borderTop: "1px solid #1F1F1F" }}>
        <button
          type="button"
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: 8,
            background: "transparent",
            border: "1px solid #2A2A2A",
            color: "#BBBBBB",
            fontFamily: "var(--body)",
            fontSize: 13,
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#1A1A1A";
            e.currentTarget.style.color = "#FFFFFF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#BBBBBB";
          }}
        >
          ← Déconnexion
        </button>
      </div>
    </aside>
  );
}
