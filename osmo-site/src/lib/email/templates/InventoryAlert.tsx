import { EmailLayout, H1, Highlight, P } from "./EmailLayout";

export type InventoryAlertProps = {
  remaining: number;
  threshold: number;
  totalClaimed: number;
};

export function InventoryAlert({
  remaining,
  threshold,
  totalClaimed,
}: InventoryAlertProps) {
  return (
    <EmailLayout preheader={`Plus que ${remaining} places Early Adopters.`}>
      <H1>⚠️ Stock Early Adopters bas</H1>
      <P>
        Il reste <strong>{remaining}</strong> places sur le Lot N°001 — sous le
        seuil d&apos;alerte de {threshold}.
      </P>
      <Highlight>
        <strong>{totalClaimed}</strong> places réservées
        <br />
        <strong>{remaining}</strong> places restantes
      </Highlight>
      <P>
        Pense à préparer la production ou à activer une campagne d&apos;acquisition
        pour terminer le Lot.
      </P>
    </EmailLayout>
  );
}
