"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Le soir, avant de dormir",
    desc: "Dissoudre une dose dans un grand verre d'eau. Boire avant de se coucher.",
  },
  {
    num: "02",
    title: "La formule agit pendant votre sommeil",
    desc: "Les électrolytes restaurent l'hydratation cellulaire pendant que vous dormez — pas le lendemain matin quand il est trop tard.",
  },
  {
    num: "03",
    title: "Le matin, vous êtes prêt",
    desc: "Réveil fonctionnel. Tête claire. Journée possible.",
  },
];

export default function HowItWorks() {
  return (
    <section id="protocole" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display font-black text-4xl sm:text-5xl tracking-tighter text-osmo-text mb-16"
        >
          Le protocole. Le soir. Pas le matin.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <span className="font-display text-5xl font-black text-osmo-accent">
                {step.num}
              </span>
              <h3 className="font-display text-xl font-bold text-osmo-text mt-4 mb-3">
                {step.title}
              </h3>
              <p className="text-osmo-muted font-body leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 border-l-4 border-osmo-accent bg-osmo-surface p-6"
        >
          <p className="text-osmo-text font-body italic leading-relaxed">
            Pourquoi le soir ? Parce que la déshydratation commence pendant la
            nuit. Agir avant, c&apos;est agir au bon moment.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
