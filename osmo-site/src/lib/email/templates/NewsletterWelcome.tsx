const AMBER = "#C8963E";
const INK = "#111111";
const PAPER = "#FFFFFF";
const SOFT = "#F4F4F4";
const RULE = "#E5E5E5";

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
    <html lang="fr">
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light only" />
        <meta name="supported-color-schemes" content="light only" />
        <title>OSMO</title>
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          background: SOFT,
          fontFamily:
            '"Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif',
          color: INK,
          lineHeight: 1.5,
        }}
      >
        <div
          style={{
            display: "none",
            fontSize: 1,
            color: SOFT,
            lineHeight: 1,
            maxHeight: 0,
            maxWidth: 0,
            opacity: 0,
            overflow: "hidden",
          }}
        >
          {`Ton code -15% : ${promoCode}`}
        </div>

        <table
          role="presentation"
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          style={{ background: SOFT, padding: "24px 12px" }}
        >
          <tbody>
            <tr>
              <td align="center">
                <table
                  role="presentation"
                  cellPadding={0}
                  cellSpacing={0}
                  style={{
                    maxWidth: 560,
                    width: "100%",
                    background: PAPER,
                    borderRadius: 12,
                    overflow: "hidden",
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        align="center"
                        style={{
                          background: INK,
                          padding: "22px 24px",
                          color: PAPER,
                          fontSize: 16,
                          letterSpacing: "0.22em",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          textAlign: "center",
                        }}
                      >
                        <span style={{ color: PAPER }}>OSMO</span>
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          padding: "32px 24px 8px",
                        }}
                      >
                        <h1
                          style={{
                            fontFamily:
                              'Georgia, "Times New Roman", serif',
                            fontSize: 26,
                            fontWeight: 700,
                            lineHeight: 1.2,
                            margin: "0 0 16px",
                            color: INK,
                          }}
                        >
                          Bienvenue.
                        </h1>
                        <p
                          style={{
                            margin: "0 0 16px",
                            fontSize: 16,
                            lineHeight: 1.6,
                            color: INK,
                          }}
                        >
                          Voici ton code :
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td align="center" style={{ padding: "0 24px 8px" }}>
                        <table
                          role="presentation"
                          cellPadding={0}
                          cellSpacing={0}
                          style={{ width: "100%" }}
                        >
                          <tbody>
                            <tr>
                              <td
                                align="center"
                                style={{
                                  background: SOFT,
                                  borderRadius: 12,
                                  padding: "20px 16px",
                                  textAlign: "center",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily:
                                      '"IBM Plex Mono", "SFMono-Regular", Menlo, Consolas, monospace',
                                    fontSize: 26,
                                    letterSpacing: "0.12em",
                                    fontWeight: 700,
                                    color: AMBER,
                                  }}
                                >
                                  {promoCode}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    <tr>
                      <td style={{ padding: "16px 24px 8px" }}>
                        <p
                          style={{
                            margin: "0 0 16px",
                            fontSize: 16,
                            lineHeight: 1.6,
                            color: INK,
                          }}
                        >
                          <strong>15% de réduction</strong> sur ta première
                          commande OSMO.
                          <br />
                          Valable une fois · Sans date d&apos;expiration.
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td align="center" style={{ padding: "8px 24px 24px" }}>
                        <table
                          role="presentation"
                          cellPadding={0}
                          cellSpacing={0}
                        >
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
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          height: 1,
                          background: RULE,
                          padding: 0,
                          lineHeight: 1,
                          fontSize: 1,
                        }}
                      >
                        &nbsp;
                      </td>
                    </tr>

                    <tr>
                      <td style={{ padding: "24px 24px 8px" }}>
                        <p
                          style={{
                            margin: "0 0 16px",
                            fontSize: 16,
                            lineHeight: 1.6,
                            color: INK,
                          }}
                        >
                          Dans 15 jours, tu recevras notre première newsletter.
                          On y parle électrolytes, récupération, alcool — ce
                          que la science dit vraiment.
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          padding: "16px 24px 24px",
                          fontSize: 12,
                          color: "#666666",
                        }}
                      >
                        <a
                          href={unsubscribeUrl}
                          style={{
                            color: "#666666",
                            textDecoration: "underline",
                          }}
                        >
                          Se désabonner
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}
