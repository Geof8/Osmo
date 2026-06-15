"use client";

import { useEffect, useState } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export default function ParametresPage() {
  const [remaining, setRemaining] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    fetch("/api/admin/settings?key=early_adopters_remaining")
      .then((r) => r.json())
      .then((d) => setRemaining(d.value ?? "47"))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "early_adopters_remaining", value: remaining }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Paramètres"
        subtitle="Configuration manuelle des éléments affichés sur le site."
      />

      <div style={{ maxWidth: 560, marginTop: 32 }}>
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E8E8E8",
            borderRadius: 12,
            padding: "28px 32px",
          }}
        >
          <form onSubmit={handleSave}>
            <label
              htmlFor="remaining"
              style={{
                display: "block",
                fontFamily: "var(--mono)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#666666",
                marginBottom: 8,
              }}
            >
              Places Early Adopters restantes (affiché sur le site)
            </label>

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <input
                id="remaining"
                type="number"
                min={0}
                max={999}
                required
                value={remaining}
                onChange={(e) => setRemaining(e.target.value)}
                disabled={loading}
                style={{
                  width: 120,
                  padding: "10px 14px",
                  fontFamily: "var(--mono)",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#111111",
                  background: "#F4F4F4",
                  border: "1.5px solid transparent",
                  borderRadius: 8,
                  outline: "none",
                  textAlign: "center",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#C8963E")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "transparent")}
              />

              <button
                type="submit"
                disabled={saving || loading}
                style={{
                  padding: "10px 24px",
                  background: saving ? "#999999" : "#111111",
                  color: "#FFFFFF",
                  fontFamily: "var(--mono)",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderRadius: 50,
                  border: "none",
                  cursor: saving ? "not-allowed" : "pointer",
                  transition: "background 0.2s",
                }}
              >
                {saving ? "Sauvegarde…" : "Sauvegarder"}
              </button>

              {status === "success" && (
                <span style={{ color: "#1F7A4D", fontSize: 13, fontFamily: "var(--body)" }}>
                  ✓ Mis à jour
                </span>
              )}
              {status === "error" && (
                <span style={{ color: "#B23131", fontSize: 13, fontFamily: "var(--body)" }}>
                  ✗ Erreur
                </span>
              )}
            </div>

            <p
              style={{
                marginTop: 12,
                fontFamily: "var(--body)",
                fontSize: 12,
                color: "#999999",
                lineHeight: 1.5,
              }}
            >
              Ce compteur est affiché tel quel sur le site.
              <br />
              Modifiez-le manuellement selon vos besoins.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
