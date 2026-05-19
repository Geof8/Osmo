const AMBER = "#C8963E";
const INK = "#111111";
const PAPER = "#FFFFFF";
const SOFT = "#F4F4F4";
const RULE = "#E5E5E5";

export type NewsletterProps = {
  title: string;
  content: string;
  unsubscribeUrl: string;
  previewBanner?: { previewUrl: string };
};

function paragraphs(content: string): string[] {
  return content
    .split(/\n{2,}/g)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
}

export function Newsletter({
  title,
  content,
  unsubscribeUrl,
  previewBanner,
}: NewsletterProps) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          background: SOFT,
          fontFamily: '"DM Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
          color: INK,
          lineHeight: 1.5,
        }}
      >
        <table
          role="presentation"
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          style={{ background: SOFT, padding: "32px 16px" }}
        >
          <tbody>
            <tr>
              <td align="center">
                <table
                  role="presentation"
                  width="640"
                  cellPadding={0}
                  cellSpacing={0}
                  style={{
                    maxWidth: 640,
                    width: "100%",
                    background: PAPER,
                    borderRadius: 12,
                    overflow: "hidden",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                  }}
                >
                  <tbody>
                    {previewBanner && (
                      <tr>
                        <td
                          style={{
                            background: AMBER,
                            color: INK,
                            padding: "16px 24px",
                            fontSize: 13,
                            lineHeight: 1.5,
                            fontWeight: 600,
                          }}
                        >
                          APERÇU AVANT ENVOI
                          <br />
                          <span style={{ fontWeight: 400 }}>
                            Cette newsletter sera envoyée demain à 9h à tous
                            les abonnés actifs.
                          </span>
                          <br />
                          <a
                            href={previewBanner.previewUrl}
                            style={{
                              color: INK,
                              textDecoration: "underline",
                              fontWeight: 600,
                            }}
                          >
                            Pour annuler : osmo-lab.fr/admin/newsletter
                          </a>
                        </td>
                      </tr>
                    )}

                    <tr>
                      <td
                        style={{
                          background: INK,
                          padding: "24px 32px",
                          color: PAPER,
                          fontSize: 18,
                          letterSpacing: "0.22em",
                          fontWeight: 700,
                          textTransform: "uppercase",
                        }}
                      >
                        OSMO
                      </td>
                    </tr>

                    <tr>
                      <td style={{ height: 3, background: AMBER, padding: 0 }} />
                    </tr>

                    <tr>
                      <td style={{ padding: "40px 32px 8px" }}>
                        <h1
                          style={{
                            fontFamily:
                              'Georgia, "Times New Roman", serif',
                            fontSize: 28,
                            fontWeight: 700,
                            lineHeight: 1.2,
                            margin: "0 0 24px",
                            color: INK,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {title}
                        </h1>
                      </td>
                    </tr>

                    <tr>
                      <td style={{ padding: "0 32px 32px" }}>
                        {paragraphs(content).map((p, i) => (
                          <p
                            key={i}
                            style={{
                              margin: "0 0 18px",
                              fontSize: 16,
                              lineHeight: 1.8,
                              color: "#333333",
                            }}
                          >
                            {p}
                          </p>
                        ))}
                      </td>
                    </tr>

                    {previewBanner && (
                      <tr>
                        <td style={{ padding: "0 32px 32px" }}>
                          <table
                            role="presentation"
                            cellPadding={0}
                            cellSpacing={0}
                          >
                            <tbody>
                              <tr>
                                <td
                                  style={{
                                    background: "#B23131",
                                    borderRadius: 999,
                                    padding: "12px 24px",
                                  }}
                                >
                                  <a
                                    href={previewBanner.previewUrl}
                                    style={{
                                      color: PAPER,
                                      textDecoration: "none",
                                      fontSize: 14,
                                      fontWeight: 700,
                                      letterSpacing: "0.04em",
                                    }}
                                  >
                                    Annuler cet envoi →
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}

                    <tr>
                      <td style={{ height: 1, background: AMBER, padding: 0 }} />
                    </tr>

                    <tr>
                      <td
                        style={{
                          padding: "24px 32px",
                          background: SOFT,
                          fontSize: 12,
                          color: "#666666",
                          borderTop: `1px solid ${RULE}`,
                        }}
                      >
                        <div style={{ marginBottom: 6 }}>
                          <strong>OSMO Lab</strong> ·{" "}
                          <a
                            href="https://osmo-lab.fr"
                            style={{
                              color: "#666666",
                              textDecoration: "underline",
                            }}
                          >
                            osmo-lab.fr
                          </a>
                        </div>
                        <div style={{ marginBottom: 10 }}>
                          Tu reçois cet email car tu es abonné à la newsletter
                          OSMO Recovery.
                        </div>
                        <div>
                          <a
                            href={unsubscribeUrl}
                            style={{
                              color: "#666666",
                              textDecoration: "underline",
                            }}
                          >
                            Se désabonner
                          </a>
                        </div>
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
