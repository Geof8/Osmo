import type { ReactNode } from "react";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { FONTS } from "@/lib/constants";

type Props = {
  title: string;
  updatedAt?: string;
  children: ReactNode;
};

export default function LegalLayout({ title, updatedAt, children }: Props) {
  return (
    <>
      <main className="bg-[var(--paper)] min-h-screen">
        <div
          className="mx-auto"
          style={{
            maxWidth: 800,
            padding: "80px 24px",
          }}
        >
          <Link
            href="/"
            className="inline-flex items-center transition-colors hover:text-[var(--ink)]"
            style={{
              fontFamily: FONTS.mono,
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--ink-2)",
              marginBottom: 48,
            }}
          >
            ← Retour
          </Link>

          <h1
            style={{
              fontFamily: FONTS.display,
              fontWeight: 700,
              fontSize: "clamp(34px, 6vw, 48px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#111111",
            }}
          >
            {title}
          </h1>

          {updatedAt ? (
            <p
              style={{
                fontFamily: FONTS.mono,
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--ink-3)",
                marginTop: 12,
              }}
            >
              Mise à jour : {updatedAt}
            </p>
          ) : null}

          <div className="legal-content">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
