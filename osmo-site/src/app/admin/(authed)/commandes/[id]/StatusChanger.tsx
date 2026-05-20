"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  CARRIER_LABELS,
  STAGE_EMOJI,
  STAGE_LABELS,
  STAGE_ORDER,
  type Carrier,
  type FulfillmentStage,
} from "@/lib/fulfillment";

const CARRIERS: Carrier[] = ["colissimo", "chronopost", "dhl", "other"];

export default function StatusChanger({
  orderId,
  email,
  currentStage,
  disabled,
}: {
  orderId: string;
  email: string;
  currentStage: FulfillmentStage;
  disabled?: boolean;
}) {
  const router = useRouter();
  const [pendingStage, setPendingStage] = useState<FulfillmentStage | null>(
    null,
  );
  const [trackingNumber, setTrackingNumber] = useState("");
  const [carrier, setCarrier] = useState<Carrier>("colissimo");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const availableStages = useMemo(() => {
    const idx = STAGE_ORDER.indexOf(currentStage);
    return STAGE_ORDER.slice(idx + 1);
  }, [currentStage]);

  function openModal(stage: FulfillmentStage) {
    setError(null);
    setSuccess(null);
    setTrackingNumber("");
    setCarrier("colissimo");
    setPendingStage(stage);
  }

  function closeModal() {
    if (submitting) return;
    setPendingStage(null);
  }

  async function confirm() {
    if (!pendingStage) return;
    if (pendingStage === "shipped" && trackingNumber.trim() === "") {
      setError("Numéro de suivi requis");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/fulfillment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stage: pendingStage,
          ...(pendingStage === "shipped"
            ? {
                tracking_number: trackingNumber.trim(),
                carrier,
              }
            : {}),
        }),
      });
      const data: { ok?: boolean; error?: string; email_status?: string } =
        await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Mise à jour impossible");
        setSubmitting(false);
        return;
      }
      const stageLabel = STAGE_LABELS[pendingStage];
      const emailNote =
        data.email_status === "sent"
          ? `Email envoyé à ${email}.`
          : data.email_status === "skipped_no_provider"
            ? "Email non envoyé (Resend non configuré)."
            : data.email_status === "failed"
              ? "Email NON envoyé (échec Resend — voir logs)."
              : "";
      setSuccess(`Étape changée en « ${stageLabel} ». ${emailNote}`);
      setPendingStage(null);
      setSubmitting(false);
      router.refresh();
    } catch {
      setError("Mise à jour impossible");
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <span
          className="admin-kpi-label"
          style={{ fontSize: 10, marginRight: 4 }}
        >
          Étape actuelle
        </span>
        <strong style={{ fontFamily: "var(--body)", fontSize: 14 }}>
          {STAGE_EMOJI[currentStage]} {STAGE_LABELS[currentStage]}
        </strong>
      </div>

      {availableStages.length === 0 ? (
        <p
          style={{
            marginTop: 12,
            fontSize: 13,
            color: "#666666",
            fontFamily: "var(--body)",
          }}
        >
          Cette commande a atteint la dernière étape.
        </p>
      ) : (
        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            marginTop: 14,
          }}
        >
          {availableStages.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => openModal(s)}
              disabled={disabled}
              className="admin-pill-btn"
              style={{
                background: s === "delivered" ? "#1E7A3A" : "#C8963E",
                borderColor: s === "delivered" ? "#1E7A3A" : "#C8963E",
                color: "#FFFFFF",
                opacity: disabled ? 0.5 : 1,
                cursor: disabled ? "not-allowed" : "pointer",
              }}
            >
              {STAGE_EMOJI[s]} Passer à « {STAGE_LABELS[s]} »
            </button>
          ))}
        </div>
      )}

      {success && (
        <p
          style={{
            color: "#1F7A4D",
            fontSize: 13,
            marginTop: 14,
            fontFamily: "var(--body)",
          }}
        >
          {success}
        </p>
      )}

      {pendingStage && (
        <ConfirmModal
          stage={pendingStage}
          email={email}
          trackingNumber={trackingNumber}
          carrier={carrier}
          submitting={submitting}
          error={error}
          onTrackingChange={setTrackingNumber}
          onCarrierChange={setCarrier}
          onCancel={closeModal}
          onConfirm={confirm}
        />
      )}
    </div>
  );
}

function ConfirmModal({
  stage,
  email,
  trackingNumber,
  carrier,
  submitting,
  error,
  onTrackingChange,
  onCarrierChange,
  onCancel,
  onConfirm,
}: {
  stage: FulfillmentStage;
  email: string;
  trackingNumber: string;
  carrier: Carrier;
  submitting: boolean;
  error: string | null;
  onTrackingChange: (v: string) => void;
  onCarrierChange: (v: Carrier) => void;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const isShipping = stage === "shipped";
  const title = isShipping
    ? `${STAGE_EMOJI.shipped} Confirmer l'expédition`
    : `${STAGE_EMOJI[stage]} Passer à « ${STAGE_LABELS[stage]} » ?`;
  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(17,17,17,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #ECECEC",
          borderRadius: 12,
          width: "100%",
          maxWidth: 520,
          padding: 24,
          boxShadow: "0 24px 48px rgba(17,17,17,0.20)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--display)",
            fontSize: 18,
            fontWeight: 600,
            margin: "0 0 12px",
            color: "#111111",
          }}
        >
          {title}
        </h2>

        <p
          style={{
            fontFamily: "var(--body)",
            fontSize: 14,
            color: "#444444",
            margin: "0 0 18px",
          }}
        >
          Un email sera envoyé automatiquement à{" "}
          <strong>{email}</strong>.
        </p>

        {isShipping && (
          <>
            <label
              className="admin-kpi-label"
              style={{ fontSize: 10, display: "block", marginBottom: 6 }}
            >
              Transporteur
            </label>
            <select
              value={carrier}
              onChange={(e) => onCarrierChange(e.target.value as Carrier)}
              disabled={submitting}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #DDDDDD",
                fontFamily: "var(--body)",
                fontSize: 14,
                color: "#111111",
                background: "#FFFFFF",
                marginBottom: 14,
              }}
            >
              {CARRIERS.map((c) => (
                <option key={c} value={c}>
                  {CARRIER_LABELS[c]}
                </option>
              ))}
            </select>

            <label
              className="admin-kpi-label"
              style={{ fontSize: 10, display: "block", marginBottom: 6 }}
            >
              Numéro de suivi
            </label>
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => onTrackingChange(e.target.value)}
              placeholder="ex. LX123456789FR"
              disabled={submitting}
              autoFocus
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #DDDDDD",
                fontFamily: "var(--body)",
                fontSize: 14,
                color: "#111111",
                background: "#FFFFFF",
              }}
            />
          </>
        )}

        {error && (
          <p
            role="alert"
            style={{
              color: "#B23131",
              fontSize: 13,
              marginTop: 12,
              fontFamily: "var(--body)",
            }}
          >
            {error}
          </p>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            marginTop: 20,
          }}
        >
          <button
            type="button"
            onClick={onCancel}
            className="admin-pill-btn admin-pill-btn-ghost"
            disabled={submitting}
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="admin-pill-btn"
            disabled={submitting}
            style={{
              background: "#C8963E",
              borderColor: "#C8963E",
              color: "#FFFFFF",
              opacity: submitting ? 0.7 : 1,
            }}
          >
            {submitting
              ? "Envoi…"
              : isShipping
                ? "Confirmer l'expédition"
                : `Confirmer · ${STAGE_LABELS[stage]}`}
          </button>
        </div>
      </div>
    </div>
  );
}
