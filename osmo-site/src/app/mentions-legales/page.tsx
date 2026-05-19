import type { Metadata } from "next";
import LegalLayout from "@/components/layout/LegalLayout";

export const metadata: Metadata = {
  title: "Mentions légales — OSMO Lab",
  description:
    "Mentions légales du site osmo-lab.fr — éditeur, hébergement, propriété intellectuelle et données personnelles.",
};

export default function MentionsLegales() {
  return (
    <LegalLayout title="Mentions légales">
      <section>
        <h2>Éditeur du site</h2>
        <p>
          Debrion Geoffrey
          <br />
          Micro-entrepreneur
          <br />
          SIRET : 821 165 917 00039
          <br />
          Adresse : 4 rue du Château, 36190 Cuzion
          <br />
          Email :{" "}
          <a href="mailto:contact@osmo-lab.fr">contact@osmo-lab.fr</a>
          <br />
          Site :{" "}
          <a href="https://osmo-lab.fr">https://osmo-lab.fr</a>
        </p>
      </section>

      <section>
        <h2>Hébergement</h2>
        <p>
          Vercel Inc.
          <br />
          340 Pine Street, Suite 701
          <br />
          San Francisco, CA 94104, USA
          <br />
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://vercel.com
          </a>
        </p>
      </section>

      <section>
        <h2>Directeur de la publication</h2>
        <p>Debrion Geoffrey</p>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble du contenu de ce site (textes, images, visuels,
          logo) est la propriété exclusive de OSMO Lab. Toute reproduction
          est interdite sans autorisation préalable.
        </p>
      </section>

      <section>
        <h2>Données personnelles</h2>
        <p>
          Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
          rectification et de suppression de vos données personnelles. Pour
          exercer ce droit :{" "}
          <a href="mailto:contact@osmo-lab.fr">contact@osmo-lab.fr</a>
        </p>
      </section>
    </LegalLayout>
  );
}
