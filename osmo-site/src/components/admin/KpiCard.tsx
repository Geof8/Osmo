import type { ReactNode } from "react";

export default function KpiCard({
  label,
  value,
  hint,
  accent,
  footer,
}: {
  label: string;
  value: string;
  hint?: string;
  accent?: boolean;
  footer?: ReactNode;
}) {
  return (
    <div className="admin-card admin-card-padded" style={{ minHeight: 124 }}>
      <div className="admin-kpi-label">{label}</div>
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
