"use client";

import Link from "next/link";
import { useState } from "react";
import type { AutomationCategory } from "@/lib/automations";

const CATEGORY_COLORS: Record<AutomationCategory, { bg: string; fg: string }> = {
  fulfillment: { bg: "#E6F4EA", fg: "#1E7A3A" },
  fraud: { bg: "#FBEAEA", fg: "#B23131" },
  loyalty: { bg: "#EFE9DC", fg: "#8A6310" },
  inventory: { bg: "#E8F1FA", fg: "#1A5BA8" },
  marketing: { bg: "#F0E8F8", fg: "#5B2A8A" },
};

export type AutomationCardProps = {
  id: string;
  name: string;
  description: string;
  category: AutomationCategory;
  triggerLabel: string;
  conditionLabel: string;
  actionLabel: string;
  active: boolean;
  lastRunAt: string | null;
  lastRunStatus: string | null;
  totalRuns: number;
  successRuns: number;
};

function formatRelative(iso: string | null): string {
  if (!iso) return "Jamais exécuté";
  const then = new Date(iso).getTime();
  const diffMin = Math.round((Date.now() - then) / 60000);
  if (diffMin < 1) return "À l'instant";
  if (diffMin < 60) return `Il y a ${diffMin} min`;
  const diffH = Math.round(diffMin / 60);
  if (diffH < 24) return `Il y a ${diffH} h`;
  const diffD = Math.round(diffH / 24);
  return `Il y a ${diffD} j`;
}

export default function AutomationCard(props: AutomationCardProps) {
  const [active, setActive] = useState(props.active);
  const [pending, setPending] = useState(false);
  const palette = CATEGORY_COLORS[props.category];

  async function toggle() {
    setPending(true);
    const next = !active;
    setActive(next);
    try {
      const res = await fetch(`/api/admin/automations/${props.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: next }),
      });
      if (!res.ok) setActive(!next);
    } catch {
      setActive(!next);
    } finally {
      setPending(false);
    }
  }

  return (
    <div
      className="admin-card"
      style={{
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        opacity: active ? 1 : 0.72,
        transition: "opacity 0.15s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 6,
            }}
          >
            <span
              style={{
                display: "inline-flex",
                padding: "2px 8px",
                borderRadius: 999,
                background: palette.bg,
                color: palette.fg,
                fontFamily: "var(--mono)",
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              {props.category}
            </span>
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: active ? "#1E7A3A" : "#999999",
                fontWeight: 600,
              }}
            >
              {active ? "● Actif" : "○ Inactif"}
            </span>
          </div>
          <Link
            href={`/admin/automatisations/${props.id}`}
            style={{
              fontFamily: "var(--display)",
              fontSize: 17,
              fontWeight: 600,
              color: "#111111",
              textDecoration: "none",
            }}
          >
            {props.name}
          </Link>
          <p
            style={{
              fontFamily: "var(--body)",
              fontSize: 13,
              color: "#666666",
              marginTop: 4,
              lineHeight: 1.45,
            }}
          >
            {props.description}
          </p>
        </div>
        <button
          type="button"
          onClick={toggle}
          disabled={pending}
          aria-label={active ? "Désactiver" : "Activer"}
          style={{
            width: 42,
            height: 24,
            borderRadius: 999,
            background: active ? "#C8963E" : "#DDDDDD",
            border: "none",
            position: "relative",
            cursor: pending ? "wait" : "pointer",
            flexShrink: 0,
            transition: "background 0.15s ease",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: 2,
              left: active ? 20 : 2,
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "#FFFFFF",
              boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
              transition: "left 0.15s ease",
            }}
          />
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr auto 1fr",
          alignItems: "center",
          gap: 8,
          padding: "12px",
          background: "#FAFAFA",
          borderRadius: 8,
          border: "1px solid #ECECEC",
        }}
      >
        <FlowBlock label="Trigger" value={props.triggerLabel} />
        <FlowArrow />
        <FlowBlock label="Condition" value={props.conditionLabel} />
        <FlowArrow />
        <FlowBlock label="Action" value={props.actionLabel} />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          fontFamily: "var(--body)",
          fontSize: 12,
          color: "#666666",
          paddingTop: 4,
        }}
      >
        <span>
          Dernière exécution : <strong style={{ color: "#111111" }}>{formatRelative(props.lastRunAt)}</strong>
          {props.lastRunStatus && (
            <span style={{ marginLeft: 6, color: statusColor(props.lastRunStatus) }}>
              · {props.lastRunStatus}
            </span>
          )}
        </span>
        <span>
          {props.totalRuns} exécutions ·{" "}
          {props.totalRuns > 0
            ? `${Math.round((props.successRuns / props.totalRuns) * 100)} % réussites`
            : "—"}
        </span>
      </div>
    </div>
  );
}

function FlowBlock({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ minWidth: 0 }}>
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 9,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#888888",
          marginBottom: 2,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--body)",
          fontSize: 12,
          color: "#111111",
          fontWeight: 500,
          lineHeight: 1.35,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <span
      aria-hidden
      style={{
        fontFamily: "var(--mono)",
        fontSize: 14,
        color: "#C8963E",
        fontWeight: 600,
      }}
    >
      →
    </span>
  );
}

function statusColor(status: string): string {
  if (status === "success") return "#1E7A3A";
  if (status === "error") return "#B23131";
  if (status === "skipped") return "#888888";
  return "#888888";
}
