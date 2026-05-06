"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqSection {
  title: string;
  items: FaqItem[];
}

const faqData: FaqSection[] = [
  {
    title: "Le produit",
    items: [
      {
        q: "Qu'est-ce qu'OSMO Recovery exactement ?",
        a: "Un complexe d'électrolytes en poudre, goût citron, conçu pour être pris le soir après une consommation d'alcool. Bicarbonate de sodium, citrate de potassium, bisglycinate de magnésium, NAC et chlorure de sodium — dosés pour restaurer l'hydratation et soutenir la fonction hépatique.",
      },
      {
        q: "Quelle est la différence avec une boisson isotonique classique ?",
        a: "Les boissons isotoniques sont conçues pour l'effort sportif. OSMO Recovery est formulé pour la récupération post-alcool, avec de la NAC (N-Acétyl-Cystéine) qui soutient la fonction hépatique — un actif absent des boissons sportives classiques.",
      },
      {
        q: "Est-ce que ça fonctionne vraiment ?",
        a: "OSMO Recovery ne prétend pas être un remède miracle. C'est un complexe d'électrolytes qui restaure l'hydratation cellulaire et soutient la fonction hépatique. Les actifs sont dosés selon la littérature scientifique.",
      },
      {
        q: "Y a-t-il du sucre dans OSMO Recovery ?",
        a: "Non. Pas de sucre ajouté, pas d'édulcorant, pas de colorant artificiel. Le goût citron provient d'un arôme naturel.",
      },
      {
        q: "Est-ce un médicament ?",
        a: "Non. OSMO Recovery est un complément alimentaire. Il ne se substitue pas à une alimentation variée et équilibrée.",
      },
    ],
  },
  {
    title: "Utilisation",
    items: [
      {
        q: "Quand faut-il le prendre ?",
        a: "Le soir, avant de vous coucher. La déshydratation commence pendant la nuit. En agissant avant le sommeil, les électrolytes ont le temps de restaurer l'équilibre hydrique.",
      },
      {
        q: "Comment préparer la boisson ?",
        a: "Dissoudre une dose (8g) dans un grand verre d'eau (400ml). Remuer jusqu'à dissolution complète. Boire avant de se coucher.",
      },
      {
        q: "Peut-on prendre deux doses par jour ?",
        a: "Oui, en cas de besoin : une dose le soir et une dose le matin. Ne pas dépasser 2 doses par 24h.",
      },
    ],
  },
  {
    title: "Accès prioritaire",
    items: [
      {
        q: "Qu'est-ce que l'accès prioritaire ?",
        a: "Une pré-inscription sans paiement. Vous serez contacté en priorité dès que le stock est disponible, au tarif fondateur de 25€ au lieu de 29€.",
      },
      {
        q: "Est-ce que je serai débité maintenant ?",
        a: "Non. Aucun paiement n'est demandé. Vous ne paierez que si vous décidez d'acheter au moment de la disponibilité.",
      },
      {
        q: "Quand serai-je contacté ?",
        a: "Dès que le premier lot est prêt. Les inscrits en accès prioritaire sont toujours contactés avant la mise en vente publique.",
      },
    ],
  },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display font-black text-4xl sm:text-5xl tracking-tighter text-osmo-text mb-16"
        >
          Questions fréquentes.
        </motion.h2>

        {faqData.map((section, sIdx) => (
          <motion.div
            key={sIdx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: sIdx * 0.1 }}
            className="mb-12"
          >
            <h3 className="font-display font-bold text-xl text-osmo-text mb-4">
              {section.title}
            </h3>
            <div className="border border-osmo-border">
              {section.items.map((item, iIdx) => {
                const key = `${sIdx}-${iIdx}`;
                return (
                  <div
                    key={key}
                    className={
                      iIdx < section.items.length - 1
                        ? "border-b border-osmo-border"
                        : ""
                    }
                  >
                    <button
                      onClick={() => toggleItem(key)}
                      className="w-full text-left p-5 flex justify-between items-center gap-4 hover:bg-osmo-surface/50 transition-colors"
                    >
                      <span className="font-body font-medium text-osmo-text text-sm">
                        {item.q}
                      </span>
                      <span className="text-osmo-muted text-xl shrink-0">
                        {openItems[key] ? "−" : "+"}
                      </span>
                    </button>
                    {openItems[key] && (
                      <div className="px-5 pb-5">
                        <p className="text-osmo-muted font-body text-sm leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
