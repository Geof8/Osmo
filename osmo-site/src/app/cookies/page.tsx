import type { Metadata } from "next";
import LegalLayout from "@/components/layout/LegalLayout";

export const metadata: Metadata = {
  title: "Politique de cookies — OSMO Lab",
  description:
    "Politique de cookies de OSMO Lab — cookies nécessaires, analytiques et gestion du consentement.",
};

export default function Cookies() {
  return (
    <LegalLayout title="Politique de cookies">
      <section>
        <h2>Qu&apos;est-ce qu&apos;un cookie ?</h2>
        <p>
          Un cookie est un petit fichier stocké sur votre navigateur lors de
          votre visite.
        </p>
      </section>

      <section>
        <h2>Cookies utilisés</h2>

        <h3>Cookies strictement nécessaires (pas de consentement requis)</h3>
        <ul>
          <li>Session admin : authentification dashboard</li>
          <li>Panier : mémorisation de votre commande</li>
        </ul>

        <h3>Cookies analytiques (consentement requis)</h3>
        <ul>
          <li>Mesure d&apos;audience anonymisée</li>
        </ul>
      </section>

      <section>
        <h2>Gestion des cookies</h2>
        <p>
          Vous pouvez refuser les cookies non essentiels via la bannière lors
          de votre première visite.
        </p>
        <p>
          Paramètres modifiables à tout moment dans votre navigateur.
        </p>
      </section>
    </LegalLayout>
  );
}
