import { CTAButton, EmailLayout, H1, P } from "./EmailLayout";

const RULE = "#E5E5E5";

export type OrderDeliveredProps = {
  firstName: string | null;
  baseUrl: string;
  ugcToken: string;
};

export function OrderDelivered({
  firstName,
  baseUrl,
  ugcToken,
}: OrderDeliveredProps) {
  const greeting = firstName ? `${firstName},` : "Bonjour,";
  return (
    <EmailLayout preheader="Ton OSMO est arrivé.">
      <H1>✅ Ton OSMO est arrivé&nbsp;!</H1>
      <P>{greeting}</P>
      <P>Ton OSMO Recovery est livré.</P>
      <P>
        <strong>Rappel protocole&nbsp;:</strong>
      </P>
      <P>→ 1 dose le soir après la dernière boisson</P>
      <P>→ 1 dose au réveil le matin</P>
      <P>Dissoudre dans 250&nbsp;ml d&apos;eau froide.</P>

      <hr
        style={{
          border: 0,
          borderTop: `1px solid ${RULE}`,
          margin: "28px 0",
        }}
      />

      <P>Tu fais partie des tout premiers utilisateurs.</P>
      <P>
        <strong>Ton retour compte vraiment.</strong>
      </P>
      <CTAButton href={`${baseUrl}/ugc/${ugcToken}`}>
        Donner mon avis →
      </CTAButton>
      <p style={{ color: "#666666", fontSize: 13, margin: "16px 0 0" }}>
        En échange&nbsp;: -20&nbsp;% sur ta prochaine commande.
      </p>
    </EmailLayout>
  );
}
