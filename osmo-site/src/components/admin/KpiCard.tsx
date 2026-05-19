import type { ReactNode } from "react";

export type KpiDelta = {
  value: number;
  direction: "up" | "down" | "flat";
  label?: string;
};

export default function KpiCard({
  label,
  value,
  hint,
  accent,
  footer,
  delta,
}: {
  label: string;
  value: string;
  hint?: string;
  accent?: boolean;
  footer?: ReactNode;
  delta?: KpiDelta;
}) {
  return (
    <div className="admin-card admin-card-padded" style={{ minHeight: 128 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <div className="admin-kpi-label">{label}</div>
        {delta && <DeltaBadge delta={delta} />}
      </div>
      <div
        className="admin-kpi-value"
        style={{ marginTop: 10, color: accent ? "#C8963E" : "#111111" }}
      >
        {value}
      </div>
      {hint && (
        <div
          style={{
            marginTop: 6,
            fontSize: 12,
            color: "#888888",
            fontFamily: "var(--body)",
          }}
        >
          {hint}
        </div>
      )}
      {footer && <div style={{ marginTop: 12 }}>{footer}</div>}
    </div>
  );
}

function DeltaBadge({ delta }: { delta: KpiDelta }) {
  const isUp = delta.direction === "up";
  const isFlat = delta.direction === "flat";
  const color = isFlat ? "#888888" : isUp ? "#1E7A3A" : "#B23131";
  const bg = isFlat ? "#F4F4F4" : isUp ? "#E6F4EA" : "#FBEAEA";
  const arrow = isFlat ? "→" : isUp ? "↑" : "↓";
  const sign = isFlat ? "" : isUp ? "+" : "−";
  return (
    <span
      title={delta.label}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "3px 8px",
        borderRadius: 999,
        background: bg,
        color,
        fontFamily: "var(--mono)",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ fontSize: 10 }}>{arrow}</span>
      {sign}
      {Math.abs(delta.value).toFixed(1)}%
    </span>
  );
}
