import Link from "next/link";
import type { Metadata } from "next";
import { FONTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Bienvenue dans le Lot N°001 — OSMO Recovery",
  robots: { index: false, follow: false },
};

export default function MerciPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(32px, 8vw, 80px) 20px",
      }}
    >
      <div style={{ maxWidth: 640, width: "100%", textAlign: "center" }}>
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 12,
            fontWeight: 400,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#999999",
            marginBottom: 24,
          }}
        >
          Paiement confirmé · Lot N°001
        </div>

        <h1
          style={{
            fontFamily: FONTS.display,
            fontWeight: 700,
            fontSize: "clamp(34px, 7vw, 56px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#111111",
            marginBottom: 24,
          }}
        >
          Bienvenue dans le Lot N°001
        </h1>

        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 17,
            lineHeight: 1.6,
            color: "#444444",
            marginBottom: 16,
          }}
        >
          Tu fais partie des 50 Early Adopters qui recevront OSMO Recovery
          en avant-première.
        </p>

        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 15,
            lineHeight: 1.6,
            color: "#666666",
            marginBottom: 40,
          }}
        >
          Tu recevras un reçu par email dans les prochaines minutes.
          Expédition estimée sous 6 mois — on te tient au courant à chaque étape.
        </p>

        <hr
          style={{
            border: "none",
            borderTop: "1px solid #E0E0E0",
            margin: "0 auto 40px",
            maxWidth: 120,
          }}
        />

        <Link
          href="/"
          style={{
            display: "inline-block",
            fontFamily: FONTS.mono,
            fontSize: 13,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#111111",
            textDecoration: "underline",
            textUnderlineOffset: "4px",
          }}
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
