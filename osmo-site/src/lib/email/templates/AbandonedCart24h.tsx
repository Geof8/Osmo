import { CTAButton, EmailLayout, H1, Highlight, P } from "./EmailLayout";

export type AbandonedCart24hProps = {
  firstName: string | null;
  baseUrl: string;
  promoCode?: string;
};

export function AbandonedCart24h({
  firstName,
  baseUrl,
  promoCode,
}: AbandonedCart24hProps) {
  const greeting = firstName ? `${firstName},` : "Bonjour,";
  return (
    <EmailLayout preheader="Dernière chance pour le Lot N°001.">
      <H1>Dernière chance pour le Lot N°001</H1>
      <P>{greeting}</P>
      <P>
        Le Lot N°001 part vite. Les places restantes ne seront bientôt plus
        disponibles au tarif Early Adopter.
      </P>
      <Highlight>
        <strong>20€ au lieu de 30€</strong> — uniquement pour les 50 premiers.
        <br />
        Garantie 30 jours satisfait ou remboursé à réception.
        {promoCode && (
          <>
            <br />
            <br />
            <strong>Code promo : {promoCode}</strong> à saisir au checkout.
          </>
        )}
      </Highlight>
      <CTAButton
        href={
          promoCode
            ? `${baseUrl}/#reserve?promo=${encodeURIComponent(promoCode)}`
            : `${baseUrl}/#reserve`
        }
      >
        Finaliser ma réservation
      </CTAButton>
      <p style={{ color: "#666666", fontSize: 13, margin: "24px 0 0" }}>
        Si tu n&apos;es plus intéressé, tu peux ignorer cet email — c&apos;est la
        dernière relance.
      </p>
    </EmailLayout>
  );
}
