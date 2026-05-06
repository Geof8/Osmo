"use client";

import { motion } from "framer-motion";

const cards = [
  "3 verres hier soir. Réunion à 9h ce matin. Les deux sont réels.",
  "Un dîner qui s'est prolongé. Les enfants se lèvent à 7h. Sans exception.",
  "La semaine a été longue. Le week-end doit quand même tenir.",
];

export default function Empathy() {
  return (
    <section id="empathy" className="py-24 bg-osmo-surface grain">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display font-black text-4xl sm:text-5xl tracking-tighter text-osmo-text mb-16"
        >
          Tu connais ce matin-là.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white p-8 border border-osmo-border"
            >
              <p className="font-body text-osmo-text text-base leading-relaxed">
                {text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
