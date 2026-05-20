import { CTAButton, EmailLayout, H1, Highlight, P } from "./EmailLayout";

export type OrderInProductionProps = {
  firstName: string | null;
  baseUrl: string;
  orderId: string;
};

export function OrderInProduction({
  firstName,
  baseUrl,
  orderId,
}: OrderInProductionProps) {
  const greeting = firstName ? `${firstName},` : "Bonjour,";
  return (
    <EmailLayout preheader="Ton OSMO Recovery est en production.">
      <H1>🔬 Ta commande OSMO est en production</H1>
      <P>{greeting}</P>
      <P>Bonne nouvelle.</P>
      <P>Les 50 Early Adopters sont réunis.</P>
      <P>La commande vient d&apos;être passée au laboratoire.</P>
      <P>
        <strong>Ton OSMO Recovery est en production.</strong>
      </P>
      <Highlight>
        <strong>Délai estimé&nbsp;:</strong> 6 à 8 semaines.
        <br />
        Tu seras informé dès l&apos;expédition.
      </Highlight>
      <CTAButton href={`${baseUrl}/suivi?order=${orderId}`}>
        Suivre ma commande →
      </CTAButton>
    </EmailLayout>
  );
}
