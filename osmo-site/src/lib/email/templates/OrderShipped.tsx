import { CTAButton, EmailLayout, H1, Highlight, P } from "./EmailLayout";

const RULE = "#E5E5E5";

export type OrderShippedProps = {
  firstName: string | null;
  trackingNumber: string;
  trackingUrl: string | null;
  carrierLabel: string | null;
  baseUrl: string;
  orderId: string;
};

export function OrderShipped({
  firstName,
  trackingNumber,
  trackingUrl,
  carrierLabel,
  baseUrl,
  orderId,
}: OrderShippedProps) {
  const greeting = firstName ? `${firstName},` : "Bonjour,";
  return (
    <EmailLayout preheader="Ton OSMO est en route.">
      <H1>📦 Ton OSMO est en route&nbsp;!</H1>
      <P>{greeting}</P>
      <P>Ton OSMO Recovery vient d&apos;être expédié.</P>
      <Highlight>
        <strong>Numéro de suivi</strong>
        {carrierLabel ? (
          <>
            {" · "}
            <span style={{ color: "#666666" }}>{carrierLabel}</span>
          </>
        ) : null}
        <br />
        <span style={{ fontFamily: "Menlo, Consolas, monospace", fontSize: 15 }}>
          {trackingNumber}
        </span>
      </Highlight>
      {trackingUrl ? (
        <CTAButton href={trackingUrl}>Suivre mon colis →</CTAButton>
      ) : null}
      <p style={{ color: "#666666", fontSize: 13, margin: "16px 0 0" }}>
        Livraison estimée&nbsp;: 2 à 5 jours ouvrés.
      </p>

      <hr
        style={{
          border: 0,
          borderTop: `1px solid ${RULE}`,
          margin: "28px 0",
        }}
      />

      <P>
        <strong>Rappel protocole&nbsp;:</strong>
      </P>
      <P>→ Dose 1 — Le soir avant de dormir</P>
      <P>→ Dose 2 — Le matin au réveil</P>
      <P>Dissoudre dans 250&nbsp;ml d&apos;eau froide.</P>

      <div style={{ marginTop: 24 }}>
        <CTAButton href={`${baseUrl}/suivi?order=${orderId}`}>
          Voir ma page de suivi →
        </CTAButton>
      </div>
    </EmailLayout>
  );
}
