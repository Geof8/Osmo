"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CaptureModal from "@/components/CaptureModal";
import Footer from "@/components/Footer";
import {
  CrystalIcon,
  LightningIcon,
  WaveIcon,
  ShieldIcon,
  DropIcon,
} from "@/components/icons/IngredientIcons";
import {
  PourIcon,
  MixIcon,
  MoonIcon,
  SunriseIcon,
} from "@/components/icons/StepIcons";

const benefits = [
  {
    title: "Réhydratation rapide",
    desc: "Les électrolytes restaurent l'équilibre hydrique en quelques heures.",
  },
  {
    title: "Réduit la fatigue",
    desc: "Magnésium et potassium soutiennent la fonction musculaire et nerveuse.",
  },
  {
    title: "Soutien hépatique",
    desc: "La NAC (N-Acétyl-Cystéine) aide le foie à traiter l'acétaldéhyde produit par la métabolisation de l'alcool. Un actif sérieux, pas un gadget.",
  },
  {
    title: "Qualité du sommeil",
    desc: "Le bisglycinate de magnésium favorise un sommeil profond et récupérateur.",
  },
];

const ingredients = [
  {
    icon: <CrystalIcon />,
    name: "Bicarbonate de sodium",
    dosage: "1700mg",
    benefit: "Équilibre acido-basique",
  },
  {
    icon: <LightningIcon />,
    name: "Citrate de potassium",
    dosage: "2000mg",
    benefit: "Fonction musculaire",
  },
  {
    icon: <WaveIcon />,
    name: "Bisglycinate de magnésium",
    dosage: "1350mg",
    benefit: "Récupération & sommeil",
  },
  {
    icon: <ShieldIcon />,
    name: "N-Acétyl-Cystéine",
    dosage: "600mg",
    benefit: "Soutien hépatique après alcool",
  },
  {
    icon: <DropIcon />,
    name: "Chlorure de sodium",
    dosage: "150mg",
    benefit: "Hydratation cellulaire",
  },
];

const steps = [
  {
    num: "01",
    icon: <PourIcon />,
    label: "Versez une dose",
    sub: "8g dans un grand verre d'eau (400ml)",
  },
  {
    num: "02",
    icon: <MixIcon />,
    label: "Mélangez",
    sub: "Remuez jusqu'à dissolution complète",
  },
  {
    num: "03",
    icon: <MoonIcon />,
    label: "Le soir, avant de dormir",
    sub: "Pas le matin — c'est là toute la différence",
  },
  {
    num: "04",
    icon: <SunriseIcon />,
    label: "Le matin, vous êtes prêt",
    sub: "Réveil fonctionnel. Tête claire.",
  },
];

const faqTeaser = [
  {
    q: "Est-ce que ça fonctionne vraiment contre la gueule de bois ?",
    a: "OSMO Recovery ne prétend pas être un remède miracle. C'est un complexe d'électrolytes conçu pour restaurer l'hydratation et soutenir la fonction hépatique après une consommation d'alcool. Les actifs sont dosés selon la littérature scientifique.",
  },
  {
    q: "Pourquoi prendre OSMO le soir et pas le matin ?",
    a: "La déshydratation commence pendant la nuit. En agissant avant le sommeil, les électrolytes ont le temps de restaurer l'équilibre hydrique. Le matin, il est souvent trop tard.",
  },
  {
    q: "Qu'est-ce que l'accès prioritaire ?",
    a: "C'est une pré-inscription sans paiement. Vous serez contacté en priorité dès que le stock est disponible, au tarif fondateur de 25€ au lieu de 29€.",
  },
];

export default function ProduitPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Navbar onOpenModal={() => setModalOpen(true)} />
      <main className="pt-16">
        {/* Product Hero */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative aspect-square bg-osmo-surface"
            >
              <Image
                src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80"
                alt="Pot OSMO Recovery et verre préparé au citron"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-block bg-osmo-accent/10 text-osmo-accent text-xs font-bold font-display uppercase tracking-wider px-3 py-1.5 mb-6">
                Accès Prioritaire — Lot Fondateur
              </span>
              <h1 className="font-display font-black text-4xl sm:text-5xl tracking-tighter text-osmo-text mb-4">
                OSMO Recovery
              </h1>
              <p className="text-osmo-muted font-body text-lg mb-6">
                Complexe d&apos;électrolytes. Goût citron. 15 doses.
              </p>
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-osmo-muted line-through text-lg">
                  29€
                </span>
                <span className="font-display font-black text-4xl text-osmo-accent">
                  25€
                </span>
                <span className="text-sm text-osmo-muted">
                  tarif fondateur
                </span>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="w-full bg-osmo-accent hover:bg-osmo-accent-hover text-white font-medium py-4 text-sm transition-colors mb-4"
              >
                Réserver mon accès prioritaire
              </button>
              <p className="text-xs text-osmo-muted text-center">
                Aucun paiement maintenant · Vous serez contacté à la
                disponibilité
              </p>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-24 bg-osmo-surface grain">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white p-8 border border-osmo-border"
                >
                  <h3 className="font-display text-xl font-bold text-osmo-text mb-3">
                    {b.title}
                  </h3>
                  <p className="text-osmo-muted font-body leading-relaxed">
                    {b.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Full Formulation */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display font-black text-4xl tracking-tighter text-osmo-text mb-12"
            >
              Formulation complète.
            </motion.h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {ingredients.map((ing, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-white border border-osmo-border p-6 text-center"
                >
                  <div className="flex justify-center mb-4">{ing.icon}</div>
                  <p className="font-display font-bold text-sm text-osmo-text mb-1">
                    {ing.name}
                  </p>
                  <p className="text-osmo-accent font-bold text-lg mb-1">
                    {ing.dosage}
                  </p>
                  <p className="text-osmo-muted text-xs">{ing.benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Usage Instructions */}
        <section className="py-24 bg-osmo-surface grain">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display font-black text-4xl tracking-tighter text-osmo-text mb-12"
            >
              Comment prendre OSMO.
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-center"
                >
                  <span className="font-display text-3xl font-black text-osmo-accent">
                    {step.num}
                  </span>
                  <div className="flex justify-center my-4">{step.icon}</div>
                  <p className="font-display font-bold text-osmo-text mb-1">
                    {step.label}
                  </p>
                  <p className="text-osmo-muted text-sm font-body">
                    {step.sub}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 bg-white border border-osmo-border p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="font-display font-bold text-osmo-text mb-2">
                    Dose soir (recommandée)
                  </p>
                  <p className="text-osmo-muted font-body text-sm">
                    1 dose dans 400ml d&apos;eau, avant de se coucher
                  </p>
                </div>
                <div>
                  <p className="font-display font-bold text-osmo-text mb-2">
                    Dose matin (optionnelle)
                  </p>
                  <p className="text-osmo-muted font-body text-sm">
                    1 dose dans 400ml d&apos;eau au réveil si nécessaire
                  </p>
                </div>
              </div>
              <p className="text-xs text-osmo-muted mt-6 italic">
                Ne pas dépasser 2 doses par 24h
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Teaser */}
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display font-black text-4xl tracking-tighter text-osmo-text mb-12"
            >
              Questions fréquentes.
            </motion.h2>

            <div className="space-y-0 border border-osmo-border">
              {faqTeaser.map((item, i) => (
                <div
                  key={i}
                  className={
                    i < faqTeaser.length - 1
                      ? "border-b border-osmo-border"
                      : ""
                  }
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left p-6 flex justify-between items-center gap-4 hover:bg-osmo-surface/50 transition-colors"
                  >
                    <span className="font-display font-bold text-osmo-text text-sm">
                      {item.q}
                    </span>
                    <span className="text-osmo-muted text-xl shrink-0">
                      {openFaq === i ? "−" : "+"}
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6">
                      <p className="text-osmo-muted font-body text-sm leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/faq"
                className="text-osmo-accent hover:text-osmo-accent-hover font-medium text-sm underline underline-offset-4 transition-colors"
              >
                Voir toutes les questions →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CaptureModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        source="product_page"
      />
    </>
  );
}
