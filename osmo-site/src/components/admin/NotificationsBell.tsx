"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Notification = {
  id: string;
  kind: "order" | "abandoned" | "promo" | "newsletter" | "info";
  title: string;
  body: string;
  href: string;
  created_at: string;
  unread: boolean;
};

const KIND_DOT: Record<Notification["kind"], string> = {
  order: "#1E7A3A",
  abandoned: "#C8963E",
  promo: "#4A5BD8",
  newsletter: "#8A6310",
  info: "#888888",
};

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffMin = Math.round((now - then) / 60000);
  if (diffMin < 1) return "À l'instant";
  if (diffMin < 60) return `Il y a ${diffMin} min`;
  const diffH = Math.round(diffMin / 60);
  if (diffH < 24) return `Il y a ${diffH} h`;
  const diffD = Math.round(diffH / 24);
  return `Il y a ${diffD} j`;
}

export default function NotificationsBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Notification[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/admin/notifications", {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = (await res.json()) as { notifications: Notification[] };
        if (!cancelled) setItems(data.notifications ?? []);
      } catch {
        // ignore
      }
    }
    load();
    const id = setInterval(load, 60_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const unreadCount = items.filter((i) => i.unread).length;

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Notifications"
        style={{
          width: 34,
          height: 34,
          borderRadius: 8,
          background: "transparent",
          border: "1px solid #2A2A2A",
          color: "#DDDDDD",
          cursor: "pointer",
          position: "relative",
          fontSize: 16,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#1A1A1A")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        🔔
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: -4,
              right: -4,
              minWidth: 18,
              height: 18,
              padding: "0 5px",
              borderRadius: 999,
              background: "#C8963E",
              color: "#111111",
              fontFamily: "var(--mono)",
              fontSize: 10,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #111111",
            }}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: 42,
            right: 0,
            width: 360,
            maxHeight: 480,
            background: "#FFFFFF",
            border: "1px solid #ECECEC",
            borderRadius: 12,
            boxShadow: "0 12px 32px rgba(17,17,17,0.16)",
            overflow: "hidden",
            zIndex: 30,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "14px 16px",
              borderBottom: "1px solid #F0F0F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontFamily: "var(--display)",
                fontWeight: 700,
                fontSize: 15,
                color: "#111111",
              }}
            >
              Notifications
            </div>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#888888",
              }}
            >
              {unreadCount} non lue{unreadCount > 1 ? "s" : ""}
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {items.length === 0 ? (
              <div
                style={{
                  padding: "32px 16px",
                  textAlign: "center",
                  fontFamily: "var(--body)",
                  fontSize: 13,
                  color: "#888888",
                }}
              >
                Rien à signaler pour le moment.
              </div>
            ) : (
              items.map((n) => (
                <Link
                  key={n.id}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  style={{
                    display: "flex",
                    gap: 10,
                    padding: "12px 16px",
                    borderBottom: "1px solid #F4F4F4",
                    textDecoration: "none",
                    color: "#111111",
                    background: n.unread ? "#FFFBF2" : "transparent",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#FAFAFA")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = n.unread
                      ? "#FFFBF2"
                      : "transparent")
                  }
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: KIND_DOT[n.kind],
                      marginTop: 6,
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: "var(--body)",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#111111",
                        marginBottom: 2,
                      }}
                    >
                      {n.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--body)",
                        fontSize: 12,
                        color: "#666666",
                        marginBottom: 4,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {n.body}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 10,
                        color: "#999999",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {formatRelative(n.created_at)}
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
