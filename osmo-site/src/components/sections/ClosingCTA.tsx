"use client";

import { motion } from "framer-motion";

export default function ClosingCTA({
  onOpenModal,
}: {
  onOpenModal: () => void;
}) {
  return (
    <section id="cta" className="py-24 bg-osmo-dark">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tighter text-white mb-6"
        >
          Parce que demain matin, tu n&apos;as pas le choix.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-gray-400 font-body mb-10 text-lg"
        >
          Rejoignez les 300 premiers. Tarif fondateur garanti. Aucun paiement
          maintenant.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button
            onClick={onOpenModal}
            className="bg-osmo-accent hover:bg-osmo-accent-hover text-white font-medium px-10 py-4 text-sm transition-colors w-full sm:w-auto"
          >
            Réserver mon accès prioritaire
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="text-gray-500 text-xs font-body mt-6"
        >
          Vous serez contacté en priorité dès que le stock est disponible.
        </motion.p>
      </div>
    </section>
  );
}
