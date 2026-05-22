import type { ReactNode } from "react";

const AMBER = "#C8963E";
const INK = "#111111";
const PAPER = "#FFFFFF";
const SOFT = "#F4F4F4";
const RULE = "#E5E5E5";

export function EmailLayout({
  preheader,
  children,
}: {
  preheader?: string;
  children: ReactNode;
}) {
  return (
    <html lang="fr">
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        {preheader && (
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
            {preheader}
          </div>
        )}
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
                  width="560"
                  cellPadding={0}
                  cellSpacing={0}
                  style={{
                    maxWidth: 560,
                    width: "100%",
                    background: PAPER,
                    borderRadius: 12,
                    overflow: "hidden",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{
                          background: INK,
                          padding: "20px 32px",
                          color: PAPER,
                          fontSize: 14,
                          letterSpacing: "0.18em",
                          fontWeight: 600,
                          textTransform: "uppercase",
                        }}
                      >
                        OSMO
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "32px" }}>{children}</td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "20px 32px",
                          background: SOFT,
                          fontSize: 12,
                          color: "#666666",
                          borderTop: `1px solid ${RULE}`,
                        }}
                      >
                        OSMO Recovery · Made in France
                        <br />
                        <a
                          href="https://osmo-lab.fr"
                          style={{ color: "#666666", textDecoration: "underline" }}
                        >
                          osmo-lab.fr
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

export function H1({ children }: { children: ReactNode }) {
  return (
    <h1
      style={{
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: 24,
        fontWeight: 600,
        lineHeight: 1.25,
        margin: "0 0 16px",
        color: INK,
      }}
    >
      {children}
    </h1>
  );
}

export function P({ children }: { children: ReactNode }) {
  return (
    <p style={{ margin: "0 0 16px", fontSize: 15, color: INK }}>{children}</p>
  );
}

export function CTAButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <table role="presentation" cellPadding={0} cellSpacing={0}>
      <tbody>
        <tr>
          <td
            style={{
              background: AMBER,
              borderRadius: 999,
              padding: "12px 24px",
            }}
          >
            <a
              href={href}
              style={{
                color: PAPER,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.02em",
              }}
            >
              {children}
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export function Highlight({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        background: SOFT,
        borderLeft: `3px solid ${AMBER}`,
        padding: "16px 20px",
        margin: "20px 0",
        fontSize: 14,
        color: INK,
      }}
    >
      {children}
    </div>
  );
}
