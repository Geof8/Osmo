"use client";

import { useMemo, useState } from "react";

export type ChartPoint = {
  date: string;
  revenueCents: number;
  orders: number;
};

const FRENCH_SHORT = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
});

const FRENCH_LONG = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatEuros(cents: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export default function RevenueChart({
  data,
  title = "Évolution du chiffre d'affaires",
}: {
  data: ChartPoint[];
  title?: string;
}) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const { revPath, ordPath, maxRev, maxOrd, xs, ys, ordYs, width, height } =
    useMemo(() => {
      const w = 720;
      const h = 220;
      const pad = { l: 48, r: 16, t: 16, b: 28 };
      const innerW = w - pad.l - pad.r;
      const innerH = h - pad.t - pad.b;
      const maxR = Math.max(1, ...data.map((d) => d.revenueCents));
      const maxO = Math.max(1, ...data.map((d) => d.orders));
      const n = Math.max(1, data.length - 1);
      const xList = data.map((_, i) => pad.l + (i / n) * innerW);
      const yList = data.map(
        (d) => pad.t + innerH - (d.revenueCents / maxR) * innerH,
      );
      const oyList = data.map(
        (d) => pad.t + innerH - (d.orders / maxO) * innerH,
      );
      const rev =
        data.length > 0
          ? xList.map((x, i) => `${i === 0 ? "M" : "L"}${x},${yList[i]}`).join(" ")
          : "";
      const ord =
        data.length > 0
          ? xList.map((x, i) => `${i === 0 ? "M" : "L"}${x},${oyList[i]}`).join(" ")
          : "";
      return {
        revPath: rev,
        ordPath: ord,
        maxRev: maxR,
        maxOrd: maxO,
        xs: xList,
        ys: yList,
        ordYs: oyList,
        width: w,
        height: h,
      };
    }, [data]);

  if (data.length === 0) {
    return (
      <div className="admin-card admin-card-padded" style={{ minHeight: 280 }}>
        <div className="admin-kpi-label">{title}</div>
        <div
          style={{
            marginTop: 40,
            color: "#888888",
            fontFamily: "var(--body)",
            fontSize: 13,
            textAlign: "center",
          }}
        >
          Pas encore de données. Le graphique apparaîtra dès les premières
          commandes.
        </div>
      </div>
    );
  }

  const hovered = hoverIdx != null ? data[hoverIdx] : null;

  return (
    <div className="admin-card admin-card-padded">
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 12,
          gap: 12,
        }}
      >
        <div>
          <div className="admin-kpi-label">{title}</div>
          <div
            style={{
              marginTop: 8,
              display: "flex",
              gap: 18,
              fontFamily: "var(--body)",
              fontSize: 12,
              color: "#666666",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  width: 10,
                  height: 2,
                  background: "#C8963E",
                  borderRadius: 2,
                }}
              />
              CA
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  width: 10,
                  height: 2,
                  background: "#4A5BD8",
                  borderRadius: 2,
                  borderTop: "1px dashed #4A5BD8",
                }}
              />
              Commandes
            </span>
          </div>
        </div>
      </div>

      <div style={{ position: "relative", width: "100%" }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width="100%"
          height={height}
          style={{ display: "block", overflow: "visible" }}
          onMouseLeave={() => setHoverIdx(null)}
        >
          {[0.25, 0.5, 0.75, 1].map((t) => {
            const y = 16 + (height - 16 - 28) * (1 - t);
            return (
              <g key={t}>
                <line
                  x1={48}
                  x2={width - 16}
                  y1={y}
                  y2={y}
                  stroke="#F0F0F0"
                  strokeWidth={1}
                />
                <text
                  x={42}
                  y={y + 4}
                  textAnchor="end"
                  fontSize={10}
                  fontFamily="var(--mono)"
                  fill="#999999"
                >
                  {formatEuros(maxRev * t)}
                </text>
              </g>
            );
          })}

          <path
            d={revPath}
            fill="none"
            stroke="#C8963E"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            d={ordPath}
            fill="none"
            stroke="#4A5BD8"
            strokeWidth={1.5}
            strokeDasharray="4 3"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {data.map((d, i) => (
            <g key={d.date}>
              {i % Math.ceil(data.length / 6) === 0 && (
                <text
                  x={xs[i]}
                  y={height - 8}
                  textAnchor="middle"
                  fontSize={10}
                  fontFamily="var(--mono)"
                  fill="#888888"
                >
                  {FRENCH_SHORT.format(new Date(d.date))}
                </text>
              )}
              <rect
                x={xs[i] - (xs[1] - xs[0] || 12) / 2}
                y={16}
                width={xs[1] - xs[0] || 12}
                height={height - 16 - 28}
                fill="transparent"
                onMouseEnter={() => setHoverIdx(i)}
                style={{ cursor: "crosshair" }}
              />
              {hoverIdx === i && (
                <>
                  <line
                    x1={xs[i]}
                    x2={xs[i]}
                    y1={16}
                    y2={height - 28}
                    stroke="#888888"
                    strokeDasharray="3 3"
                    strokeWidth={1}
                  />
                  <circle cx={xs[i]} cy={ys[i]} r={4} fill="#C8963E" />
                  <circle cx={xs[i]} cy={ordYs[i]} r={3.5} fill="#4A5BD8" />
                </>
              )}
            </g>
          ))}
        </svg>

        {hovered && hoverIdx != null && (
          <div
            style={{
              position: "absolute",
              top: 8,
              left: Math.min(
                Math.max(8, xs[hoverIdx] - 80),
                width - 180,
              ),
              background: "#FFFFFF",
              border: "1px solid #ECECEC",
              borderRadius: 10,
              boxShadow: "0 8px 18px rgba(17,17,17,0.10)",
              padding: "10px 12px",
              fontFamily: "var(--body)",
              fontSize: 12,
              pointerEvents: "none",
              minWidth: 160,
            }}
          >
            <div
              style={{
                fontWeight: 600,
                color: "#111111",
                marginBottom: 6,
              }}
            >
              {FRENCH_LONG.format(new Date(hovered.date))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <span style={{ color: "#888888" }}>— CA</span>
              <strong style={{ color: "#111111" }}>
                {formatEuros(hovered.revenueCents)}
              </strong>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <span style={{ color: "#888888" }}>· Commandes</span>
              <strong style={{ color: "#111111" }}>{hovered.orders}</strong>
            </div>
          </div>
        )}
      </div>
      {/* maxOrd is computed and used for axis scaling */}
      <span style={{ display: "none" }}>{maxOrd}</span>
    </div>
  );
}
