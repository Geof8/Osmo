"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type SearchResult = {
  type: "order" | "customer" | "promo";
  label: string;
  hint: string;
  href: string;
};

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
        setTimeout(() => inputRef.current?.focus(), 30);
      }
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    const term = query.trim();
    if (term.length < 2) {
      setResults([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    const id = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/admin/search?q=${encodeURIComponent(term)}`,
          { cache: "no-store" },
        );
        if (!res.ok) {
          if (!cancelled) setResults([]);
          return;
        }
        const data = (await res.json()) as { results: SearchResult[] };
        if (!cancelled) setResults(data.results ?? []);
      } catch {
        if (!cancelled) setResults([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 200);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [query]);

  const grouped = useMemo(() => {
    const g: Record<SearchResult["type"], SearchResult[]> = {
      order: [],
      customer: [],
      promo: [],
    };
    for (const r of results) g[r.type].push(r);
    return g;
  }, [results]);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", maxWidth: 520 }}
    >
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setTimeout(() => inputRef.current?.focus(), 30);
        }}
        style={{
          width: "100%",
          height: 34,
          padding: "0 14px",
          background: "#1F1F1F",
          border: "1px solid #2A2A2A",
          borderRadius: 8,
          color: "#888888",
          fontFamily: "var(--body)",
          fontSize: 13,
          display: "flex",
          alignItems: "center",
          gap: 10,
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{ opacity: 0.8 }}>🔍</span>
        <span style={{ flex: 1 }}>
          Rechercher commande, client, code promo…
        </span>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            padding: "2px 6px",
            border: "1px solid #2A2A2A",
            borderRadius: 4,
            color: "#888888",
          }}
        >
          ⌘K
        </span>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: 42,
            left: 0,
            right: 0,
            background: "#FFFFFF",
            border: "1px solid #ECECEC",
            borderRadius: 12,
            boxShadow: "0 12px 32px rgba(17,17,17,0.16)",
            overflow: "hidden",
            zIndex: 30,
          }}
        >
          <div
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid #F0F0F0",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ color: "#888888" }}>🔍</span>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher dans le back-office"
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontFamily: "var(--body)",
                fontSize: 14,
                color: "#111111",
                background: "transparent",
              }}
              autoFocus
            />
            {loading && (
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  color: "#888888",
                }}
              >
                ...
              </span>
            )}
          </div>

          <div
            style={{
              maxHeight: 420,
              overflowY: "auto",
              fontFamily: "var(--body)",
            }}
          >
            {query.trim().length < 2 && (
              <div
                style={{
                  padding: "20px 16px",
                  fontSize: 13,
                  color: "#888888",
                }}
              >
                Tape au moins 2 caractères pour chercher.
              </div>
            )}

            {query.trim().length >= 2 && results.length === 0 && !loading && (
              <div
                style={{
                  padding: "20px 16px",
                  fontSize: 13,
                  color: "#888888",
                }}
              >
                Aucun résultat pour <strong>{query}</strong>.
              </div>
            )}

            {(["order", "customer", "promo"] as const).map((type) => {
              const items = grouped[type];
              if (items.length === 0) return null;
              const labels: Record<typeof type, string> = {
                order: "Commandes",
                customer: "Clients",
                promo: "Codes promo",
              };
              return (
                <div key={type}>
                  <div
                    style={{
                      padding: "10px 16px 6px",
                      fontFamily: "var(--mono)",
                      fontSize: 10,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#888888",
                    }}
                  >
                    {labels[type]}
                  </div>
                  {items.map((r) => (
                    <Link
                      key={`${type}-${r.href}`}
                      href={r.href}
                      onClick={() => setOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 16px",
                        textDecoration: "none",
                        color: "#111111",
                        fontSize: 13,
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#FAFAFA")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <span style={{ fontWeight: 500 }}>{r.label}</span>
                      <span style={{ color: "#888888", fontSize: 12 }}>
                        {r.hint}
                      </span>
                    </Link>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
