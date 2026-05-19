"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RunNowButton({ automationId }: { automationId: string }) {
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  async function run() {
    setRunning(true);
    setMessage(null);
    try {
      const res = await fetch(
        `/api/admin/automations/${automationId}/run`,
        { method: "POST" },
      );
      const data = await res.json();
      const result = data?.result as
        | { status: string; message: string }
        | undefined;
      setMessage(
        result
          ? `${result.status} — ${result.message}`
          : "Exécution déclenchée",
      );
      router.refresh();
    } catch {
      setMessage("Erreur lors de l'exécution");
    } finally {
      setRunning(false);
    }
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {message && (
        <span
          style={{
            fontFamily: "var(--body)",
            fontSize: 12,
            color: message.startsWith("success") ? "#1E7A3A" : "#666666",
          }}
        >
          {message}
        </span>
      )}
      <button
        type="button"
        onClick={run}
        disabled={running}
        className="admin-pill-btn admin-pill-btn-amber"
        style={{ opacity: running ? 0.6 : 1 }}
      >
        {running ? "Exécution…" : "▶ Exécuter maintenant"}
      </button>
    </div>
  );
}
