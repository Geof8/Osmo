import type { Metadata } from "next";
import LegalLayout from "@/components/layout/LegalLayout";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente — OSMO Lab",
  description:
    "Conditions Générales de Vente de OSMO Lab — commande, paiement, rétractation et livraison.",
};

export default function CGV() {
  return (
    <LegalLayout title="Conditions Générales de Vente">
      <section>
        <h2>Article 1 — Objet</h2>
        <p>
          Les présentes CGV régissent les ventes de compléments alimentaires
          OSMO Recovery réalisées sur{" "}
          <a href="https://osmo-lab.fr">https://osmo-lab.fr</a> par Debrion
          Geoffrey (SIRET 821 165 917 00039).
        </p>
      </section>

      <section>
        <h2>Article 2 — Produits</h2>
        <p>
          OSMO Recovery — Complexe d&apos;électrolytes en poudre, goût citron,
          120g, 15 doses.
        </p>
        <p>
          Complément alimentaire — ne se substitue pas à un traitement médical.
        </p>
      </section>

      <section>
        <h2>Article 3 — Prix</h2>
        <p>
          Prix Early Adopters (Lot N°001) : 20€ TTC
          <br />
          Prix public : 30€ TTC
          <br />
          Prix incluant TVA applicable.
        </p>
        <p>
          OSMO Lab se réserve le droit de modifier ses prix à tout moment.
        </p>
      </section>

      <section>
        <h2>Article 4 — Commande</h2>
        <p>
          La commande est validée après paiement complet via Stripe. Un email
          de confirmation est envoyé immédiatement après paiement.
        </p>
      </section>

      <section>
        <h2>Article 5 — Pré-lancement</h2>
        <p>
          OSMO Recovery est en phase de pré-lancement. La commande au
          laboratoire sera lancée une fois les 50 Early Adopters réunis.
        </p>
        <p>
          Délai d&apos;expédition estimé : 6 mois maximum à compter de la date
          de commande.
        </p>
        <p>
          Le client sera informé par email à chaque étape : confirmation
          laboratoire, production, expédition.
        </p>
      </section>

      <section>
        <h2>Article 6 — Paiement</h2>
        <p>
          Paiement sécurisé via Stripe. Moyens acceptés : carte bancaire, Apple
          Pay, Google Pay.
        </p>
        <p>
          Le débit est effectué immédiatement à la validation de la commande.
        </p>
      </section>

      <section>
        <h2>Article 7 — Droit de rétractation</h2>
        <p>
          Conformément à l&apos;article L221-18 du Code de la consommation,
          vous disposez d&apos;un délai de 14 jours à compter de la réception du
          produit pour exercer votre droit de rétractation.
        </p>
        <p>
          OSMO Lab offre une garantie étendue de 30 jours satisfait ou
          remboursé à compter de la réception du produit.
        </p>
        <p>
          Pour exercer ce droit :{" "}
          <a href="mailto:contact@osmo-lab.fr">contact@osmo-lab.fr</a>
          <br />
          Remboursement sous 14 jours après réception du produit retourné.
        </p>
      </section>

      <section>
        <h2>Article 8 — Remboursement</h2>
        <p>
          En cas d&apos;annulation du projet OSMO Lab avant expédition, le
          client sera intégralement remboursé dans un délai de 14 jours.
        </p>
      </section>

      <section>
        <h2>Article 9 — Responsabilité</h2>
        <p>OSMO Recovery est un complément alimentaire.</p>
        <p>
          Il ne constitue pas un médicament et ne peut se substituer à un
          traitement médical.
        </p>
        <ul>
          <li>Ne pas dépasser la dose journalière recommandée.</li>
          <li>Tenir hors de portée des enfants.</li>
          <li>Déconseillé aux femmes enceintes ou allaitantes.</li>
        </ul>
      </section>

      <section>
        <h2>Article 10 — Litiges</h2>
        <p>
          En cas de litige, une solution amiable sera recherchée en priorité. À
          défaut, les tribunaux français seront compétents.
        </p>
        <p>Droit applicable : droit français.</p>
      </section>

      <section>
        <h2>Article 11 — Médiation</h2>
        <p>
          Conformément à l&apos;ordonnance n°2015-1033, en cas de litige non
          résolu, vous pouvez recourir gratuitement au médiateur de la
          consommation :{" "}
          <a
            href="https://www.mediation-conso.fr"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.mediation-conso.fr
          </a>
        </p>
      </section>
    </LegalLayout>
  );
}
