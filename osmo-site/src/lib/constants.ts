import type {
  CtaStat,
  FaqItem,
  FooterColumn,
  HeroStat,
} from "@/types";

export const COLORS = {
  paper: "var(--paper)",
  paper2: "var(--paper-2)",
  paper3: "var(--paper-3)",
  ink: "var(--ink)",
  ink2: "var(--ink-2)",
  ink3: "var(--ink-3)",
  rule: "var(--rule)",
  soft: "var(--soft)",
  amber: "var(--amber)",
  amberHover: "var(--amber-hover)",
  amberHex: "#C8963E",
  inkHex: "#111111",
  paperHex: "#FFFFFF",
} as const;

export const FONTS = {
  display: "var(--font-barlow), var(--display)",
  mono: "var(--font-mono), var(--mono)",
  playfair: "var(--font-playfair), 'Playfair Display', serif",
} as const;

export const ANIMATION_CONFIG = {
  fadeUp: {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  inViewMargin: "-40px",
  inViewMarginLoose: "-80px",
  inViewMarginTight: "-60px",
  cardReveal: {
    initial: { opacity: 0, y: 15 },
    transition: { duration: 0.4 },
  },
  stepReveal: {
    initial: { opacity: 0, y: 24 },
    transition: { duration: 0.5 },
  },
  molecularDiagram: {
    desktopSize: 500,
    mobileSize: 300,
    pictoSize: 36,
  },
} as const;

export const COPY = {
  brand: "OSMO",
  tagline: "Recovery — Lot N°001",
  capacity: "50 / 50 · LOT N°001",
  cta: "Devenir Early Adopter",
  ctaArrow: "→",
} as const;

export const HERO_STATS: HeroStat[] = [
  { k: 5, label: "5", v: "Actifs cliniques", count: true },
  { k: 15, label: "15", v: "Doses · 120g", count: true },
  { k: 20, label: "20 €", v: "Tarif Early Adopter (-33%)", amber: true, count: false },
  { k: 50, label: "50", v: "Places Early Adopters", count: true },
];

export const CTA_STATS: CtaStat[] = [
  { k: "50", v: "Places Early Adopters", em: true },
  { k: "20 €", v: "Early Adopter", em: false },
  { k: "30 €", v: "Public", em: false },
  { k: "6 mois", v: "Expédition max.", em: false },
];

export const STAMPS = [
  "Sans sucre ajouté",
  "Sans colorant",
  "Vegan",
  "Made in France",
];

export const MARQUEE_ITEMS = [
  "Bicarbonate de sodium",
  "Citrate de potassium",
  "Bisglycinate de magnésium",
  "NaCl",
  "NAC",
  "Lot N°001 · 50 ex.",
  "Early Adopters · 20 €",
  "LOT N°001",
  "EARLY ADOPTERS",
  "Made in France",
];

export const FAQ_ITEMS: FaqItem[] = [
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
    a: "En devenant Early Adopter à 20€ (au lieu de 30€), tu fais partie du Lot N°001 — les 50 premières personnes à recevoir OSMO Recovery. Expédition estimée sous 6 mois.",
  },
  {
    q: "Est-ce que je serai débité maintenant ?",
    a: "Le paiement de 20€ est effectué au moment de ta réservation. Il confirme ta place dans le Lot N°001 et déclenche, une fois les 50 places réunies, la commande de production. En cas d'annulation du projet, tu seras intégralement remboursé.",
  },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Produit",
    links: [
      { label: "Recovery", href: "#formule" },
      { label: "Composition", href: "#formule" },
      { label: "Protocole", href: "#protocole" },
    ],
  },
  {
    title: "Atelier",
    links: [
      { label: "Notre approche", href: "#observations" },
      { label: "Lot 001", href: "#reserve" },
      { label: "Analyses", href: "#formule" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "Mentions légales", href: "#" },
      { label: "CGV", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];
