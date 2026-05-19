import { EmailLayout, H1, Highlight, P } from "./EmailLayout";

export type MilestoneReachedProps = {
  totalAdopters: number;
  revenueLabel: string;
};

export function MilestoneReached({
  totalAdopters,
  revenueLabel,
}: MilestoneReachedProps) {
  return (
    <EmailLayout preheader={`Les ${totalAdopters} Early Adopters sont réunis.`}>
      <H1>🎉 Les {totalAdopters} Early Adopters sont réunis</H1>
      <P>
        Le Lot N°001 est complet. La production peut être lancée.
      </P>
      <Highlight>
        <strong>{totalAdopters}</strong> places réservées
        <br />
        <strong>{revenueLabel}</strong> de chiffre d'affaires
      </Highlight>
      <P>
        Prochaine étape : lancement de la production. Les clients reçoivent
        une mise à jour à chaque étape.
      </P>
    </EmailLayout>
  );
}
