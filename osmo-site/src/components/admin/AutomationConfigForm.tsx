"use client";

import { useState } from "react";
import type { AutomationConfigField } from "@/lib/automations";

export default function AutomationConfigForm({
  automationId,
  fields,
  initialConfig,
}: {
  automationId: string;
  fields: AutomationConfigField[];
  initialConfig: Record<string, string | number | boolean>;
}) {
  const [values, setValues] = useState<Record<string, string | number | boolean>>(
    () => {
      const merged: Record<string, string | number | boolean> = {};
      for (const f of fields) {
        merged[f.key] = initialConfig[f.key] ?? f.defaultValue;
      }
      return merged;
    },
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (fields.length === 0) {
    return (
      <div
        style={{
          fontFamily: "var(--body)",
          fontSize: 13,
          color: "#888888",
          padding: "12px 0",
        }}
      >
        Ce workflow n&apos;a pas de paramètres configurables.
      </div>
    );
  }

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/automations/${automationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config: values }),
      });
      if (res.ok) {
        setMessage("Paramètres enregistrés ✓");
      } else {
        setMessage("Erreur lors de la sauvegarde");
      }
    } catch {
      setMessage("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {fields.map((f) => (
        <div key={f.key}>
          <label className="admin-label">{f.label}</label>
          {f.type === "boolean" ? (
            <input
              type="checkbox"
              checked={Boolean(values[f.key])}
              onChange={(e) =>
                setValues({ ...values, [f.key]: e.target.checked })
              }
            />
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type={
                  f.type === "number"
                    ? "number"
                    : f.type === "email"
                      ? "email"
                      : "text"
                }
                value={String(values[f.key])}
                onChange={(e) =>
                  setValues({
                    ...values,
                    [f.key]:
                      f.type === "number"
                        ? Number(e.target.value)
                        : e.target.value,
                  })
                }
                className="admin-input"
                style={{ maxWidth: 360 }}
              />
              {f.suffix && (
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 12,
                    color: "#888888",
                  }}
                >
                  {f.suffix}
                </span>
              )}
            </div>
          )}
          {f.hint && (
            <div
              style={{
                fontSize: 12,
                color: "#888888",
                marginTop: 4,
                fontFamily: "var(--body)",
              }}
            >
              {f.hint}
            </div>
          )}
        </div>
      ))}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginTop: 8,
        }}
      >
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="admin-pill-btn admin-pill-btn-amber"
          style={{ opacity: saving ? 0.6 : 1 }}
        >
          {saving ? "Enregistrement…" : "Enregistrer"}
        </button>
        {message && (
          <span
            style={{
              fontFamily: "var(--body)",
              fontSize: 13,
              color: message.startsWith("Erreur") ? "#B23131" : "#1E7A3A",
            }}
          >
            {message}
          </span>
        )}
      </div>
    </div>
  );
}
