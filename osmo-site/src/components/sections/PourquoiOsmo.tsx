"use client";

import FadeUp from "@/components/FadeUp";
import { FONTS } from "@/lib/constants";

type IconKey = "sleep" | "lab" | "clean" | "guarantee" | "shipping" | "support";

type Item = { id: IconKey; title: string; desc: string };

const ITEMS: Item[] = [
  {
    id: "sleep",
    title: "Agit pendant ton sommeil",
    desc: "Les électrolytes et la NAC reconstituent ce que l'alcool a éliminé pendant la nuit.",
  },
  {
    id: "lab",
    title: "Développé en laboratoire",
    desc: "Formulé avec un laboratoire français certifié. 5 actifs dosés scientifiquement.",
  },
  {
    id: "clean",
    title: "Sans sucre. Sans colorant.",
    desc: "Vegan, made in France, conforme aux apports ANSES.",
  },
  {
    id: "guarantee",
    title: "60 jours satisfait ou remboursé",
    desc: "À réception, 60 jours pour être convaincu. Sinon remboursé.",
  },
  {
    id: "shipping",
    title: "Expédition suivie",
    desc: "Numéro de suivi envoyé dès l'expédition. Tu sais où est ton colis.",
  },
  {
    id: "support",
    title: "Support disponible",
    desc: "Une question ? On répond. contact@osmo-lab.fr",
  },
];

const ICON_PROPS = {
  width: 44,
  height: 44,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#111111",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Icon({ name }: { name: IconKey }) {
  switch (name) {
    case "sleep":
      return (
        <svg {...ICON_PROPS} aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      );
    case "lab":
      return (
        <svg {...ICON_PROPS} aria-hidden="true">
          <path d="M9 3h6" />
          <path d="M10 3v6.5L4.5 19a2 2 0 0 0 1.74 3h11.52a2 2 0 0 0 1.74-3L14 9.5V3" />
          <path d="M7.5 14h9" />
        </svg>
      );
    case "clean":
      return (
        <svg {...ICON_PROPS} aria-hidden="true">
          <path d="M11 20A7 7 0 0 1 4 13c0-3.5 2.5-6.5 6-9 .5 3 2 5 4.5 6.5C17 12 18 14 18 16a4 4 0 0 1-4 4" />
          <path d="M7 20c2-4 5-7 9-9" />
        </svg>
      );
    case "guarantee":
      return (
        <svg {...ICON_PROPS} aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "shipping":
      return (
        <svg {...ICON_PROPS} aria-hidden="true">
          <path d="M1 3h15v13H1z" />
          <path d="M16 8h4l3 3v5h-7z" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      );
    case "support":
      return (
        <svg {...ICON_PROPS} aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
  }
}

export default function PourquoiOsmo() {
  return (
    <section
      className="relative z-[5]"
      style={{ padding: "96px 0", background: "#F4F4F4", borderBottom: "1px solid #E0E0E0" }}
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-10">
        <div className="text-center max-w-[720px] mx-auto">
          <FadeUp>
            <h2
              style={{
                fontFamily: FONTS.display,
                fontWeight: 900,
                fontSize: "clamp(36px, 5vw, 64px)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                color: "#111111",
              }}
            >
              Pourquoi OSMO.
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p
              style={{
                fontFamily: FONTS.body,
                fontSize: 16,
                lineHeight: 1.55,
                color: "#666666",
                marginTop: 16,
              }}
            >
              La formule qui travaille pendant que tu dors.
              <br />
              Le service qui t&apos;accompagne jusqu&apos;à réception.
            </p>
          </FadeUp>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
          style={{ columnGap: 24, rowGap: 56, marginTop: 72 }}
        >
          {ITEMS.map((item, i) => (
            <FadeUp key={item.id} delay={0.2 + i * 0.08}>
              <div className="flex flex-col items-center text-center px-2">
                <Icon name={item.id} />
                <h3
                  style={{
                    fontFamily: FONTS.body,
                    fontWeight: 700,
                    fontSize: 14,
                    lineHeight: 1.3,
                    color: "#111111",
                    marginTop: 20,
                    letterSpacing: "-0.005em",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 13,
                    lineHeight: 1.5,
                    color: "#666666",
                    marginTop: 8,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
