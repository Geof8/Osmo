"use client";

import { motion } from "framer-motion";

export default function MilestoneProgress({
  claimed,
  total,
}: {
  claimed: number;
  total: number;
}) {
  const pct = total > 0 ? Math.min(100, Math.round((claimed / total) * 100)) : 0;

  return (
    <div className="admin-card admin-card-padded">
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <div>
          <div className="admin-kpi-label">Early Adopters</div>
          <div className="admin-kpi-value" style={{ marginTop: 8 }}>
            {claimed} <span style={{ color: "#888888", fontWeight: 500 }}>/ {total}</span>
          </div>
        </div>
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 13,
            color: "#C8963E",
            fontWeight: 600,
            letterSpacing: "0.06em",
          }}
        >
          {pct}%
        </div>
      </div>
      <div
        style={{
          height: 10,
          width: "100%",
          background: "#F0EBE0",
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #C8963E 0%, #A8762E 100%)",
            borderRadius: 999,
          }}
        />
      </div>
    </div>
  );
}
