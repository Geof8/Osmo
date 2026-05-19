import type { Metadata } from "next";
import LegalLayout from "@/components/layout/LegalLayout";

export const metadata: Metadata = {
  title: "Politique de confidentialité — OSMO Lab",
  description:
    "Politique de confidentialité de OSMO Lab — données collectées, finalités, durée de conservation et vos droits RGPD.",
};

export default function Confidentialite() {
  return (
    <LegalLayout title="Politique de confidentialité">
      <section>
        <h2>Responsable du traitement</h2>
        <p>
          Debrion Geoffrey — OSMO Lab
          <br />
          <a href="mailto:contact@osmo-lab.fr">contact@osmo-lab.fr</a>
        </p>
      </section>

      <section>
        <h2>Données collectées</h2>
        <ul>
          <li>Prénom, nom, email : lors d&apos;une commande</li>
          <li>Email : lors d&apos;une inscription newsletter</li>
          <li>Données de navigation : cookies techniques</li>
        </ul>
      </section>

      <section>
        <h2>Finalités</h2>
        <ul>
          <li>Traitement et suivi des commandes</li>
          <li>Envoi d&apos;emails transactionnels</li>
          <li>Newsletter (avec consentement)</li>
          <li>Amélioration du site</li>
        </ul>
      </section>

      <section>
        <h2>Base légale</h2>
        <ul>
          <li>Commandes : exécution du contrat</li>
          <li>Newsletter : consentement</li>
          <li>Cookies analytiques : consentement</li>
        </ul>
      </section>

      <section>
        <h2>Durée de conservation</h2>
        <ul>
          <li>Données de commande : 5 ans (obligation légale)</li>
          <li>Newsletter : jusqu&apos;au désabonnement</li>
          <li>Cookies : 13 mois maximum</li>
        </ul>
      </section>

      <section>
        <h2>Vos droits</h2>
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul>
          <li>Accès à vos données</li>
          <li>Rectification</li>
          <li>Suppression (« droit à l&apos;oubli »)</li>
          <li>Opposition au traitement</li>
          <li>Portabilité</li>
        </ul>
        <p>
          Pour exercer vos droits :{" "}
          <a href="mailto:contact@osmo-lab.fr">contact@osmo-lab.fr</a>
          <br />
          Réponse sous 30 jours.
        </p>
      </section>

      <section>
        <h2>Sous-traitants</h2>
        <ul>
          <li>
            Stripe (paiement) — politique :{" "}
            <a
              href="https://stripe.com/fr/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              stripe.com/fr/privacy
            </a>
          </li>
          <li>Supabase (base de données) — UE compliant</li>
          <li>
            Resend (emails) — politique :{" "}
            <a
              href="https://resend.com/legal/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              resend.com/legal/privacy
            </a>
          </li>
          <li>
            Vercel (hébergement) — politique :{" "}
            <a
              href="https://vercel.com/legal/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              vercel.com/legal/privacy
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2>Transferts hors UE</h2>
        <p>
          Certains sous-traitants sont basés aux USA. Des garanties appropriées
          sont en place (clauses contractuelles types UE).
        </p>
      </section>
    </LegalLayout>
  );
}
