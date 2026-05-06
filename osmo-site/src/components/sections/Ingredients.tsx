"use client";

import { motion } from "framer-motion";

const ingredients = [
  {
    name: "Bicarbonate de sodium",
    dosage: "1700mg",
    role: "Équilibre acido-basique",
  },
  {
    name: "Citrate de potassium",
    dosage: "2000mg",
    role: "Fonction musculaire, crampes",
  },
  {
    name: "Bisglycinate de magnésium",
    dosage: "1350mg",
    role: "Récupération & sommeil",
  },
  {
    name: "NAC (N-Acétyl-Cystéine)",
    dosage: "600mg",
    role: "Soutien hépatique — particulièrement actif après une consommation d'alcool",
  },
  {
    name: "Chlorure de sodium",
    dosage: "150mg",
    role: "Hydratation cellulaire",
  },
];

export default function Ingredients() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display font-black text-4xl sm:text-5xl tracking-tighter text-osmo-text mb-4"
        >
          La formule.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-osmo-muted font-body mb-12"
        >
          Pas de remplissage. Juste les actifs qui font le travail.
        </motion.p>

        <div className="border border-osmo-border">
          <div className="grid grid-cols-12 gap-0 bg-osmo-text text-white p-4 text-sm font-display font-bold">
            <div className="col-span-4">Ingrédient</div>
            <div className="col-span-2">Dosage</div>
            <div className="col-span-6">Rôle</div>
          </div>
          {ingredients.map((ing, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`grid grid-cols-12 gap-0 p-4 text-sm font-body ${
                i < ingredients.length - 1 ? "border-b border-osmo-border" : ""
              }`}
            >
              <div className="col-span-4 font-medium text-osmo-text">
                {ing.name}
              </div>
              <div className="col-span-2 text-osmo-accent font-bold">
                {ing.dosage}
              </div>
              <div className="col-span-6 text-osmo-muted">{ing.role}</div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 text-sm text-osmo-muted font-body"
        >
          Sans sucre ajouté · Sans édulcorant · Sans colorant artificiel
        </motion.p>
      </div>
    </section>
  );
}
