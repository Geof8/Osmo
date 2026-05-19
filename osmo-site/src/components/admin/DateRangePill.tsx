"use client";

import { useRouter, useSearchParams } from "next/navigation";

const OPTIONS = [
  { value: "7", label: "7 derniers jours" },
  { value: "30", label: "30 derniers jours" },
  { value: "90", label: "90 derniers jours" },
  { value: "365", label: "12 derniers mois" },
];

export default function DateRangePill({ paramName = "range" }: { paramName?: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const current = params?.get(paramName) ?? "30";

  function setRange(v: string) {
    const sp = new URLSearchParams(params?.toString() ?? "");
    if (v === "30") sp.delete(paramName);
    else sp.set(paramName, v);
    const qs = sp.toString();
    router.replace(qs ? `?${qs}` : "?");
  }

  return (
    <div
      style={{
        display: "inline-flex",
        background: "#FFFFFF",
        border: "1px solid #DDDDDD",
        borderRadius: 999,
        padding: 3,
        gap: 2,
      }}
    >
      {OPTIONS.map((o) => {
        const active = current === o.value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => setRange(o.value)}
            style={{
              padding: "6px 14px",
              borderRadius: 999,
              border: "none",
              background: active ? "#111111" : "transparent",
              color: active ? "#FFFFFF" : "#444444",
              fontFamily: "var(--body)",
              fontSize: 12,
              fontWeight: active ? 600 : 500,
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              if (!active) e.currentTarget.style.background = "#F4F4F4";
            }}
            onMouseLeave={(e) => {
              if (!active) e.currentTarget.style.background = "transparent";
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
