import Link from "next/link";
import type { Metadata } from "next";
import { FONTS } from "@/lib/constants";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Désabonnement · OSMO",
  robots: { index: false, follow: false },
};

type Status = "ok" | "invalid" | "missing" | "error";

function copy(status: Status): { title: string; body: string } {
  switch (status) {
    case "ok":
      return {
        title: "Tu es désabonné.",
        body: "Tu peux te réabonner à tout moment depuis osmo-lab.fr.",
      };
    case "invalid":
      return {
        title: "Lien invalide.",
        body: "Ce lien de désabonnement n'est plus valide. Si tu ne souhaites plus recevoir d'emails, écris-nous à contact@osmo-lab.fr.",
      };
    case "missing":
      return {
        title: "Lien incomplet.",
        body: "Le token de désabonnement est manquant. Utilise le lien présent dans l'email reçu.",
      };
    case "error":
    default:
      return {
        title: "Une erreur est survenue.",
        body: "Réessaie dans quelques instants ou écris-nous à contact@osmo-lab.fr.",
      };
  }
}

export default function UnsubscribePage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const raw = (searchParams.status ?? "ok").toLowerCase();
  const status: Status =
    raw === "ok" || raw === "invalid" || raw === "missing" || raw === "error"
      ? (raw as Status)
      : "ok";
  const { title, body } = copy(status);

  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
      }}
    >
      <div style={{ maxWidth: 520, textAlign: "center" }}>
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#999999",
            marginBottom: 24,
            fontWeight: 400,
          }}
        >
          OSMO · Newsletter
        </div>
        <h1
          style={{
            fontFamily: FONTS.display,
            fontWeight: 800,
            fontSize: "clamp(28px, 5vw, 40px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#111111",
            margin: 0,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 16,
            lineHeight: 1.7,
            color: "#444444",
            marginTop: 16,
          }}
        >
          {body}
        </p>
        <Link
          href="/"
          className="cta-pill"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 32,
            padding: "12px 28px",
            fontFamily: FONTS.body,
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Retour à osmo-lab.fr
        </Link>
      </div>
    </main>
  );
}
