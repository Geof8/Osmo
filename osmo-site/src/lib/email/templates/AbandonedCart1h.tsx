import { CTAButton, EmailLayout, H1, Highlight, P } from "./EmailLayout";

export type AbandonedCart1hProps = {
  firstName: string | null;
  baseUrl: string;
};

export function AbandonedCart1h({ firstName, baseUrl }: AbandonedCart1hProps) {
  const greeting = firstName ? `Bonjour ${firstName},` : "Bonjour,";
  return (
    <EmailLayout preheader="Ta place Early Adopter t'attend encore.">
      <H1>Ta place Early Adopter t'attend encore</H1>
      <P>{greeting}</P>
      <P>
        Tu as commencé à réserver ta place dans le Lot N°001 — mais le paiement
        n'a pas été finalisé.
      </P>
      <Highlight>
        Le Lot N°001 est limité à <strong>50 personnes</strong>. Le tarif Early
        Adopter (20€ au lieu de 30€) ne sera plus disponible une fois les
        places épuisées.
      </Highlight>
      <P>Reprends ta réservation en un clic :</P>
      <CTAButton href={`${baseUrl}/#reserve`}>Reprendre ma réservation</CTAButton>
    </EmailLayout>
  );
}
