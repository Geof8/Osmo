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
  tagline: "Recovery — édition fondateurs",
  capacity: "500 / 500 places",
  cta: "Devenir fondateur",
  ctaArrow: "→",
} as const;

export const HERO_STATS: HeroStat[] = [
  { k: 5, label: "5", v: "Actifs cliniques", count: true },
  { k: 15, label: "15", v: "Doses · 120g", count: true },
  { k: 15, label: "15 €", v: "Tarif fondateur (-50%)", amber: true, count: false },
  { k: 500, label: "500", v: "Places fondateurs", count: true },
];

export const CTA_STATS: CtaStat[] = [
  { k: "500", v: "Places", em: true },
  { k: "15 €", v: "Fondateur", em: false },
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
  "Bicarbonate de sodium · 1700 mg",
  "Citrate de potassium · 2000 mg",
  "Bisglycinate de magnésium · 1350 mg",
  "NaCl · 150 mg",
  "NAC · 600 mg",
  "Lot 001 · 500 ex.",
  "Édition fondateurs · 15 €",
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
    a: "En devenant fondateur à 15€ (au lieu de 30€ au lancement), vous permettez à OSMO de lancer sa première production. La commande au laboratoire sera passée une fois les 500 fondateurs réunis. Expédition estimée dans un délai de 6 mois maximum. Vous serez tenus informés à chaque étape.",
  },
  {
    q: "Est-ce que je serai débité maintenant ?",
    a: "Le paiement de 15€ est effectué au moment de votre réservation. Il confirme votre place dans l'édition fondateurs et déclenche, une fois les 500 places réunies, la commande de production. En cas d'annulation du projet, vous serez intégralement remboursé.",
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
