"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "300", label: "unités disponibles en accès prioritaire" },
  { value: "25€", label: "tarif fondateur (29€ au lancement public)" },
  { value: "0€", label: "prélevé maintenant" },
];

export default function Founders({
  onOpenModal,
}: {
  onOpenModal: () => void;
}) {
  return (
    <section className="py-24 bg-osmo-surface grain">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display font-black text-4xl sm:text-5xl tracking-tighter text-osmo-text mb-4"
        >
          300 places. Tarif fondateur. Une seule fois.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-osmo-muted font-body mb-16 max-w-2xl"
        >
          OSMO n&apos;est pas encore en vente. Réservez votre accès prioritaire
          et soyez parmi les premiers à recevoir le produit au tarif fondateur.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white p-8 border border-osmo-border"
            >
              <span className="font-display text-5xl font-black text-osmo-accent">
                {stat.value}
              </span>
              <p className="text-osmo-muted font-body mt-3 text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <button
            onClick={onOpenModal}
            className="bg-osmo-accent hover:bg-osmo-accent-hover text-white font-medium px-10 py-4 text-sm transition-colors"
          >
            Réserver mon accès prioritaire
          </button>
        </motion.div>
      </div>
    </section>
  );
}
