"use client";

import { useRouter, useSearchParams } from "next/navigation";

export type StatusTab = {
  value: string;
  label: string;
  count?: number;
};

export default function StatusTabs({
  tabs,
  paramName = "status",
}: {
  tabs: StatusTab[];
  paramName?: string;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const current = params?.get(paramName) ?? "all";

  function setStatus(v: string) {
    const sp = new URLSearchParams(params?.toString() ?? "");
    if (v === "all") sp.delete(paramName);
    else sp.set(paramName, v);
    sp.delete("page");
    const qs = sp.toString();
    router.replace(qs ? `?${qs}` : "?");
  }

  return (
    <div
      role="tablist"
      style={{
        display: "flex",
        gap: 4,
        borderBottom: "1px solid #ECECEC",
        marginBottom: 16,
        overflowX: "auto",
      }}
    >
      {tabs.map((t) => {
        const active = (current === "all" && t.value === "all") || current === t.value;
        return (
          <button
            key={t.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => setStatus(t.value)}
            style={{
              padding: "10px 14px",
              background: "transparent",
              border: "none",
              borderBottom: `2px solid ${active ? "#111111" : "transparent"}`,
              marginBottom: -1,
              fontFamily: "var(--body)",
              fontSize: 13,
              fontWeight: active ? 600 : 500,
              color: active ? "#111111" : "#666666",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              whiteSpace: "nowrap",
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              if (!active) e.currentTarget.style.color = "#111111";
            }}
            onMouseLeave={(e) => {
              if (!active) e.currentTarget.style.color = "#666666";
            }}
          >
            {t.label}
            {typeof t.count === "number" && (
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  padding: "2px 7px",
                  borderRadius: 999,
                  background: active ? "#111111" : "#F0F0F0",
                  color: active ? "#FFFFFF" : "#666666",
                  fontWeight: 600,
                }}
              >
                {t.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
