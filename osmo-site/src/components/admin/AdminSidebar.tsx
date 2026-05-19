"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavLeaf = {
  href: string;
  label: string;
  icon: string;
};

type NavSection = {
  id: string;
  label: string;
  icon: string;
  href?: string;
  children?: NavLeaf[];
};

const NAV: NavSection[] = [
  { id: "home", label: "Accueil", icon: "🏠", href: "/admin" },
  {
    id: "orders",
    label: "Commandes",
    icon: "📦",
    children: [
      { href: "/admin/commandes", label: "Toutes les commandes", icon: "•" },
      { href: "/admin/abandons", label: "Paniers abandonnés", icon: "•" },
    ],
  },
  { id: "customers", label: "Clients", icon: "👥", href: "/admin/clients" },
  {
    id: "marketing",
    label: "Marketing",
    icon: "🎯",
    children: [
      { href: "/admin/codes-promo", label: "Codes promo", icon: "•" },
      { href: "/admin/newsletter", label: "Newsletter", icon: "•" },
      { href: "/admin/emails", label: "Emails transactionnels", icon: "•" },
    ],
  },
  {
    id: "settings",
    label: "Paramètres",
    icon: "⚙️",
    href: "/admin/parametres",
  },
];

function isLeafActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isSectionActive(pathname: string, section: NavSection): boolean {
  if (section.href && isLeafActive(pathname, section.href)) return true;
  if (section.children?.some((c) => isLeafActive(pathname, c.href))) return true;
  return false;
}

export default function AdminSidebar() {
  const pathname = usePathname() ?? "";
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const next: Record<string, boolean> = {};
    for (const s of NAV) {
      if (s.children && isSectionActive(pathname, s)) next[s.id] = true;
    }
    setOpenSections((prev) => ({ ...prev, ...next }));
  }, [pathname]);

  function toggle(id: string) {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <aside
      style={{
        position: "fixed",
        top: 56,
        left: 0,
        bottom: 0,
        width: 240,
        background: "#FAFAFA",
        borderRight: "1px solid #ECECEC",
        display: "flex",
        flexDirection: "column",
        zIndex: 10,
      }}
    >
      <nav style={{ flex: 1, padding: "16px 8px", overflowY: "auto" }}>
        {NAV.map((section) => {
          const active = isSectionActive(pathname, section);
          if (!section.children) {
            return (
              <Link
                key={section.id}
                href={section.href!}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "9px 12px",
                  marginBottom: 2,
                  borderRadius: 8,
                  color: active ? "#111111" : "#444444",
                  background: active ? "#EFE9DC" : "transparent",
                  fontFamily: "var(--body)",
                  fontSize: 14,
                  fontWeight: active ? 600 : 500,
                  textDecoration: "none",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.background = "#F0F0F0";
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.background = "transparent";
                }}
              >
                <span style={{ fontSize: 15, lineHeight: 1, width: 18 }}>
                  {section.icon}
                </span>
                <span>{section.label}</span>
              </Link>
            );
          }

          const isOpen = openSections[section.id] ?? active;
          return (
            <div key={section.id} style={{ marginBottom: 2 }}>
              <button
                type="button"
                onClick={() => toggle(section.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "9px 12px",
                  borderRadius: 8,
                  background: active ? "#EFE9DC" : "transparent",
                  border: "none",
                  color: active ? "#111111" : "#444444",
                  fontFamily: "var(--body)",
                  fontSize: 14,
                  fontWeight: active ? 600 : 500,
                  cursor: "pointer",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.background = "#F0F0F0";
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.background = "transparent";
                }}
              >
                <span style={{ fontSize: 15, lineHeight: 1, width: 18 }}>
                  {section.icon}
                </span>
                <span style={{ flex: 1 }}>{section.label}</span>
                <span
                  style={{
                    color: "#888888",
                    fontSize: 11,
                    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.15s ease",
                  }}
                >
                  ▶
                </span>
              </button>

              {isOpen && (
                <div style={{ marginTop: 2, marginBottom: 4 }}>
                  {section.children.map((child) => {
                    const childActive = isLeafActive(pathname, child.href);
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "7px 12px 7px 40px",
                          borderRadius: 8,
                          color: childActive ? "#111111" : "#666666",
                          background: childActive ? "#EFE9DC" : "transparent",
                          fontFamily: "var(--body)",
                          fontSize: 13,
                          fontWeight: childActive ? 600 : 400,
                          textDecoration: "none",
                          transition: "background 0.15s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (!childActive)
                            e.currentTarget.style.background = "#F0F0F0";
                        }}
                        onMouseLeave={(e) => {
                          if (!childActive)
                            e.currentTarget.style.background = "transparent";
                        }}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div
        style={{
          padding: "14px 16px",
          borderTop: "1px solid #ECECEC",
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#999999",
        }}
      >
        OSMO Recovery · v1
      </div>
    </aside>
  );
}
