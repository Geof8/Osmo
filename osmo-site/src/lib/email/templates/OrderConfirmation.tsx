import { CTAButton, EmailLayout, H1, Highlight, P } from "./EmailLayout";

export type OrderConfirmationProps = {
  firstName: string | null;
  amountLabel: string;
  baseUrl: string;
  orderId: string;
};

export function OrderConfirmation({
  firstName,
  amountLabel,
  baseUrl,
  orderId,
}: OrderConfirmationProps) {
  const greeting = firstName ? `Bonjour ${firstName},` : "Bonjour,";
  return (
    <EmailLayout preheader="Ta place dans le Lot N°001 est confirmée.">
      <H1>✓ Ta place dans le Lot N°001 est confirmée</H1>
      <P>{greeting}</P>
      <P>
        Paiement reçu — <strong>{amountLabel}</strong>. Tu fais officiellement
        partie des 50 Early Adopters du Lot N°001.
      </P>
      <Highlight>
        <strong>Et maintenant ?</strong>
        <br />
        Une fois les 50 places réunies, on lance la production. Expédition
        estimée sous 6 mois. Tu seras notifié à chaque étape (production,
        expédition, livraison).
      </Highlight>
      <P>Tu peux suivre l&apos;avancée de ta commande à tout moment :</P>
      <CTAButton href={`${baseUrl}/suivi?order=${orderId}`}>
        Suivre ma commande
      </CTAButton>
      <p
        style={{
          color: "#666666",
          fontSize: 13,
          margin: "24px 0 0",
        }}
      >
        Une question ? Réponds simplement à cet email.
      </p>
    </EmailLayout>
  );
}
