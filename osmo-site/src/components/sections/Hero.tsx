"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black tracking-tighter leading-[0.92] text-osmo-text"
            style={{ fontSize: "clamp(80px, 10vw, 130px)", fontWeight: 900 }}
          >
            Le lendemain
            <br />
            matin, tu assures.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-lg text-osmo-muted font-body max-w-xl leading-relaxed"
          >
            OSMO Recovery — complexe d&apos;électrolytes formulé pour récupérer
            vite après une soirée alcoolisée, une semaine chargée, ou les deux.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={onOpenModal}
              className="bg-osmo-accent hover:bg-osmo-accent-hover text-white font-medium px-8 py-4 text-sm transition-colors"
            >
              Pré-commander — 25€
            </button>
            <button
              onClick={onOpenModal}
              className="border border-osmo-text text-osmo-text font-medium px-8 py-4 text-sm hover:bg-osmo-text hover:text-white transition-colors"
            >
              Rejoindre la liste d&apos;attente
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative w-full aspect-[3/4] lg:translate-x-8">
            <Image
              src="https://images.unsplash.com/photo-1631390573381-734a5b2cf498?w=800&q=80"
              alt="Pot OSMO Recovery — complexe d'électrolytes goût citron"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
