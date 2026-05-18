import type { ReactNode } from "react";

const FRENCH_DATE = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function AdminPageHeader({
  title,
  subtitle,
  showDate,
  actions,
}: {
  title: string;
  subtitle?: string;
  showDate?: boolean;
  actions?: ReactNode;
}) {
  const dateLabel = showDate ? FRENCH_DATE.format(new Date()) : null;

  return (
    <header
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 24,
        marginBottom: 28,
        flexWrap: "wrap",
      }}
    >
      <div>
        <h1
          style={{
            fontFamily: "var(--display)",
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: "-0.01em",
            color: "#111111",
            lineHeight: 1.15,
          }}
        >
          {title}
        </h1>
        {(subtitle || dateLabel) && (
          <p
            style={{
              marginTop: 6,
              fontFamily: "var(--body)",
              fontSize: 14,
              color: "#666666",
            }}
          >
            {subtitle ?? dateLabel}
          </p>
        )}
      </div>
      {actions && <div style={{ display: "flex", gap: 12 }}>{actions}</div>}
    </header>
  );
}
