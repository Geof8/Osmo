import { CTAButton, EmailLayout, H1, Highlight, P } from "./EmailLayout";

export type OrderShippedProps = {
  firstName: string | null;
  trackingNumber: string;
  baseUrl: string;
  orderId: string;
};

export function OrderShipped({
  firstName,
  trackingNumber,
  baseUrl,
  orderId,
}: OrderShippedProps) {
  const greeting = firstName ? `Bonjour ${firstName},` : "Bonjour,";
  return (
    <EmailLayout preheader="Ta commande OSMO est en route.">
      <H1>Ta commande est en route 📦</H1>
      <P>{greeting}</P>
      <P>
        Bonne nouvelle — ta commande OSMO Recovery vient d&apos;être expédiée.
      </P>
      <Highlight>
        <strong>Numéro de suivi</strong>
        <br />
        <span style={{ fontFamily: "Menlo, Consolas, monospace", fontSize: 15 }}>
          {trackingNumber}
        </span>
      </Highlight>
      <CTAButton href={`${baseUrl}/suivi?order=${orderId}`}>
        Suivre ma livraison
      </CTAButton>
      <p style={{ color: "#666666", fontSize: 13, margin: "24px 0 0" }}>
        À réception, tu as 30 jours pour tester. Satisfait ou remboursé, sans
        condition.
      </p>
    </EmailLayout>
  );
}
