import { EmailLayout, P } from "./EmailLayout";

const AMBER = "#C8963E";
const INK = "#111111";
const PAPER = "#FFFFFF";
const SOFT = "#F4F4F4";

export type NewsletterWelcomeProps = {
  promoCode: string;
  unsubscribeUrl: string;
};

export function NewsletterWelcome({
  promoCode,
  unsubscribeUrl,
}: NewsletterWelcomeProps) {
  const ctaHref = `https://osmo-lab.fr/?promo=${encodeURIComponent(promoCode)}`;
  return (
    <EmailLayout preheader={`Ton code -15% : ${promoCode}`}>
      <h1
        style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: 24,
          fontWeight: 700,
          margin: "0 0 8px",
          color: INK,
        }}
      >
        Bienvenue.
      </h1>
      <P>Voici ton code :</P>

      <table
        role="presentation"
        width="100%"
        cellPadding={0}
        cellSpacing={0}
        style={{ margin: "20px 0" }}
      >
        <tbody>
          <tr>
            <td align="center">
              <div
                style={{
                  display: "inline-block",
                  padding: "18px 28px",
                  background: SOFT,
                  borderRadius: 12,
                  border: `2px dashed ${AMBER}`,
                }}
              >
                <span
                  style={{
                    fontFamily:
                      '"IBM Plex Mono", "SFMono-Regular", Menlo, monospace',
                    fontSize: 28,
                    letterSpacing: "0.12em",
                    fontWeight: 700,
                    color: AMBER,
                  }}
                >
                  {promoCode}
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <P>
        <strong>15% de réduction</strong> sur ta première commande OSMO.
        <br />
        Valable une fois · Sans date d&apos;expiration.
      </P>

      <table role="presentation" cellPadding={0} cellSpacing={0} style={{ margin: "20px 0" }}>
        <tbody>
          <tr>
            <td
              style={{
                background: AMBER,
                borderRadius: 999,
                padding: "14px 28px",
              }}
            >
              <a
                href={ctaHref}
                style={{
                  color: PAPER,
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                }}
              >
                Utiliser mon code →
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      <hr
        style={{
          border: "none",
          borderTop: `1px solid ${AMBER}`,
          opacity: 0.4,
          margin: "32px 0",
        }}
      />

      <P>
        Dans 15 jours, tu recevras notre première newsletter. On y parle
        électrolytes, récupération, alcool — ce que la science dit vraiment.
      </P>
      <P>Pas de bullshit. Juste des faits.</P>

      <p
        style={{
          marginTop: 32,
          fontSize: 12,
          color: "#888888",
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        }}
      >
        <a
          href={unsubscribeUrl}
          style={{ color: "#888888", textDecoration: "underline" }}
        >
          Se désabonner
        </a>
      </p>
    </EmailLayout>
  );
}
