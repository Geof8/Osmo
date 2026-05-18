"use client";

import { useState } from "react";

export default function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!password) {
      setError("Mot de passe requis");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data: { ok?: boolean; error?: string } = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Connexion impossible");
        setSubmitting(false);
        return;
      }
      const safeRedirect =
        redirectTo.startsWith("/admin") && !redirectTo.startsWith("//")
          ? redirectTo
          : "/admin";
      window.location.href = safeRedirect;
    } catch {
      setError("Connexion impossible");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label
        htmlFor="admin-password"
        style={{
          display: "block",
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#999999",
          marginBottom: 8,
        }}
      >
        Mot de passe
      </label>
      <input
        id="admin-password"
        type="password"
        autoComplete="current-password"
        autoFocus
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: 8,
          border: `1px solid ${error ? "#C8963E" : "#333333"}`,
          background: "#0F0F0F",
          color: "#FFFFFF",
          fontFamily: "var(--body)",
          fontSize: 15,
          outline: "none",
        }}
      />
      {error && (
        <p
          role="alert"
          style={{
            color: "#C8963E",
            fontSize: 12,
            marginTop: 8,
          }}
        >
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="cta-pill"
        style={{
          width: "100%",
          height: 48,
          marginTop: 20,
          fontWeight: 700,
          fontSize: 14,
          fontFamily: "var(--body)",
          letterSpacing: "0.02em",
          cursor: submitting ? "default" : "pointer",
          opacity: submitting ? 0.7 : 1,
        }}
      >
        {submitting ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
