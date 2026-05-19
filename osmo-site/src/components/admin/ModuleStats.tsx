import type { ReactNode } from "react";

export type ModuleStat = {
  label: string;
  value: string;
  hint?: string;
  accent?: boolean;
  tone?: "default" | "positive" | "negative" | "amber";
};

export default function ModuleStats({
  stats,
  trailing,
}: {
  stats: ModuleStat[];
  trailing?: ReactNode;
}) {
  return (
    <div
      className="admin-card"
      style={{
        padding: "14px 18px",
        marginBottom: 18,
        display: "flex",
        alignItems: "center",
        gap: 24,
        flexWrap: "wrap",
      }}
    >
      {stats.map((s, i) => {
        const color =
          s.tone === "positive"
            ? "#1E7A3A"
            : s.tone === "negative"
              ? "#B23131"
              : s.tone === "amber" || s.accent
                ? "#C8963E"
                : "#111111";
        return (
          <div
            key={`${s.label}-${i}`}
            style={{
              display: "flex",
              flexDirection: "column",
              minWidth: 110,
              borderLeft: i === 0 ? "none" : "1px solid #ECECEC",
              paddingLeft: i === 0 ? 0 : 24,
            }}
          >
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#888888",
                marginBottom: 4,
              }}
            >
              {s.label}
            </div>
            <div
              style={{
                fontFamily: "var(--body)",
                fontWeight: 700,
                fontSize: 20,
                color,
                letterSpacing: "-0.01em",
                lineHeight: 1.1,
              }}
            >
              {s.value}
            </div>
            {s.hint && (
              <div
                style={{
                  fontSize: 11,
                  color: "#888888",
                  marginTop: 2,
                }}
              >
                {s.hint}
              </div>
            )}
          </div>
        );
      })}
      {trailing && <div style={{ marginLeft: "auto" }}>{trailing}</div>}
    </div>
  );
}
