"use client";

import { STAGE_ORDER, ugcTokenForOrder, type FulfillmentStage } from "@/lib/fulfillment";

type Step = {
  stage: FulfillmentStage;
  emoji: string;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    stage: "paid",
    emoji: "✅",
    title: "Commande confirmée",
    description: "Ta commande est enregistrée et ton paiement confirmé.",
  },
  {
    stage: "in_production",
    emoji: "🔬",
    title: "En production",
    description: "Ton OSMO est en cours de fabrication au laboratoire.",
  },
  {
    stage: "shipped",
    emoji: "📦",
    title: "Expédié",
    description: "Ton colis est en route.",
  },
  {
    stage: "delivered",
    emoji: "🎉",
    title: "Livré",
    description: "Ton OSMO est arrivé !",
  },
];

const AMBER = "#C8963E";
const INK = "#111111";
const GREY = "#D6D6D6";
const SOFT_GREY = "#F4F4F4";

export default function TrackingTimeline({
  stage,
  trackingNumber,
  trackingUrl,
  carrierLabel,
  orderId,
}: {
  stage: FulfillmentStage;
  trackingNumber: string | null;
  trackingUrl: string | null;
  carrierLabel: string | null;
  orderId: string;
}) {
  const currentIdx = STAGE_ORDER.indexOf(stage);

  return (
    <>
      <style>{`
        @keyframes osmo-pulse {
          0% { box-shadow: 0 0 0 0 rgba(200,150,62,0.55); }
          70% { box-shadow: 0 0 0 14px rgba(200,150,62,0); }
          100% { box-shadow: 0 0 0 0 rgba(200,150,62,0); }
        }
        .osmo-timeline {
          display: grid;
          gap: 20px;
        }
        .osmo-timeline-step {
          display: grid;
          grid-template-columns: 56px 1fr;
          gap: 18px;
          align-items: flex-start;
          position: relative;
        }
        .osmo-timeline-step:not(:last-child)::before {
          content: "";
          position: absolute;
          left: 27px;
          top: 56px;
          bottom: -20px;
          width: 2px;
          background: ${GREY};
        }
        .osmo-timeline-step.is-completed:not(:last-child)::before {
          background: ${AMBER};
        }
        .osmo-circle {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          line-height: 1;
          background: ${SOFT_GREY};
          border: 2px solid ${GREY};
          color: #999;
          transition: all 0.2s ease;
        }
        .osmo-circle.is-completed {
          background: ${AMBER};
          border-color: ${AMBER};
          color: #FFFFFF;
        }
        .osmo-circle.is-current {
          background: ${AMBER};
          border-color: ${AMBER};
          color: #FFFFFF;
          animation: osmo-pulse 1.8s ease-out infinite;
        }
        .osmo-step-title {
          font-family: var(--font-fraunces), var(--display);
          font-weight: 700;
          font-size: 20px;
          color: ${INK};
          margin: 0 0 4px;
        }
        .osmo-step-desc {
          font-family: var(--font-dm-sans), var(--body);
          font-size: 14px;
          color: #555;
          margin: 0;
        }
        .osmo-step-future .osmo-step-title { color: #999; }
        .osmo-step-future .osmo-step-desc { color: #AAA; }
        .osmo-step-extra {
          margin-top: 10px;
          padding: 12px 14px;
          background: ${SOFT_GREY};
          border-radius: 8px;
          font-family: var(--font-dm-sans), var(--body);
          font-size: 13px;
          color: ${INK};
        }
        .osmo-step-cta {
          display: inline-block;
          margin-top: 12px;
          padding: 10px 20px;
          border-radius: 50px;
          background: ${INK};
          color: #FFFFFF;
          text-decoration: none;
          font-family: var(--font-dm-sans), var(--body);
          font-size: 13px;
          font-weight: 600;
        }
        .osmo-step-cta.is-amber {
          background: ${AMBER};
        }

        @media (min-width: 768px) {
          .osmo-timeline {
            grid-template-columns: repeat(4, 1fr);
            gap: 0;
            margin-top: 16px;
          }
          .osmo-timeline-step {
            grid-template-columns: 1fr;
            gap: 14px;
            justify-items: center;
            text-align: center;
            padding: 0 12px;
          }
          .osmo-timeline-step:not(:last-child)::before {
            top: 27px;
            left: calc(50% + 28px);
            right: calc(-50% + 28px);
            bottom: auto;
            width: auto;
            height: 2px;
            background: ${GREY};
          }
          .osmo-timeline-step.is-completed:not(:last-child)::before {
            background: ${AMBER};
          }
          .osmo-step-title { font-size: 16px; }
          .osmo-step-desc { font-size: 13px; }
        }
      `}</style>

      <ol className="osmo-timeline" style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {STEPS.map((step, idx) => {
          const isCompleted = idx < currentIdx;
          const isCurrent = idx === currentIdx;
          const isFuture = idx > currentIdx;
          const circleClass = isCurrent
            ? "is-current"
            : isCompleted
              ? "is-completed"
              : "";
          const stepClass = isFuture
            ? "osmo-step-future"
            : isCompleted
              ? "is-completed"
              : "";

          return (
            <li key={step.stage} className={`osmo-timeline-step ${stepClass}`}>
              <div className={`osmo-circle ${circleClass}`} aria-hidden>
                {step.emoji}
              </div>
              <div>
                <h3 className="osmo-step-title">{step.title}</h3>
                <p className="osmo-step-desc">{step.description}</p>

                {step.stage === "shipped" && (isCurrent || isCompleted) && trackingNumber && (
                  <>
                    <div className="osmo-step-extra">
                      {carrierLabel ? <strong>{carrierLabel} · </strong> : null}
                      <span style={{ fontFamily: "var(--font-mono), monospace" }}>
                        {trackingNumber}
                      </span>
                    </div>
                    {trackingUrl && (
                      <a
                        href={trackingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="osmo-step-cta is-amber"
                      >
                        Suivre mon colis →
                      </a>
                    )}
                  </>
                )}

                {step.stage === "delivered" && isCurrent && (
                  <>
                    <div className="osmo-step-extra">
                      1 dose le soir · 1 dose le matin
                    </div>
                    <a
                      href={`/ugc/${ugcTokenForOrder(orderId)}`}
                      className="osmo-step-cta is-amber"
                    >
                      Donner mon avis →
                    </a>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}
