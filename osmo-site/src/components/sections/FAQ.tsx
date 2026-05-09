"use client";

import FadeUp from "@/components/FadeUp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    q: "Qu'est-ce qu'OSMO Recovery exactement ?",
    a: "Un complexe d'électrolytes en poudre, goût citron, conçu pour être pris le soir après une consommation d'alcool. Bicarbonate de sodium, citrate de potassium, bisglycinate de magnésium, NAC et chlorure de sodium — dosés pour restaurer l'hydratation et soutenir la fonction hépatique.",
  },
  {
    q: "Quelle différence avec un isotonique classique ?",
    a: "Les boissons isotoniques sont conçues pour l'effort sportif. OSMO Recovery est formulé pour la récupération post-alcool, avec de la NAC qui soutient la fonction hépatique — un actif absent des boissons sportives.",
  },
  {
    q: "Pourquoi le soir et pas le matin ?",
    a: "La déshydratation commence pendant la nuit. En agissant avant le sommeil, les électrolytes ont le temps de restaurer l'équilibre hydrique. Le matin, il est souvent trop tard.",
  },
  {
    q: "Est-ce un médicament ?",
    a: "Non. OSMO Recovery est un complément alimentaire. Il ne se substitue pas à une alimentation variée et équilibrée.",
  },
  {
    q: "Qu'est-ce que l'accès prioritaire ?",
    a: "Une pré-inscription sans paiement. Vous serez contacté en priorité dès que le stock est disponible, au tarif fondateur de 25€ au lieu de 29€.",
  },
  {
    q: "Est-ce que je serai débité maintenant ?",
    a: "Non. Aucun paiement n'est demandé. Vous ne paierez que si vous décidez d'acheter au moment de la disponibilité.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="scroll-mt-20 border-b border-[var(--rule)] relative z-[5]"
      style={{ padding: "clamp(80px, 10vw, 140px) 0" }}
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start">
          <FadeUp>
            <div
              className="text-[var(--ink-2)] mb-5 lg:mb-7"
              style={{
                fontFamily: "var(--font-mono), var(--mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              FAQ
            </div>
            <h2
              style={{
                fontFamily: "var(--font-barlow), var(--display)",
                fontWeight: 800,
                fontSize: "clamp(40px, 6vw, 96px)",
                lineHeight: 0.92,
                letterSpacing: "-0.035em",
              }}
            >
              Questions
              <br />
              <span
                style={{
                  fontFamily: "var(--font-barlow), var(--display)",
                  fontWeight: 800,
                  fontStyle: "normal",
                }}
              >
                fréquentes.
              </span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.15}>
            <Accordion type="single" collapsible className="border-t border-[var(--rule)]">
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger>
                    <span
                      style={{
                        fontFamily: "var(--font-barlow), var(--display)",
                        fontWeight: 600,
                        fontSize: "clamp(18px, 1.4vw, 22px)",
                        letterSpacing: "-0.02em",
                        color: "var(--ink)",
                      }}
                    >
                      {item.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p
                      className="text-[var(--ink-2)]"
                      style={{
                        maxWidth: 620,
                        fontSize: 15,
                        lineHeight: 1.65,
                      }}
                    >
                      {item.a}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
