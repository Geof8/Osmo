import type {
  CtaStat,
  FaqItem,
  FooterColumn,
  HeroStat,
  Observation,
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
  capacity: "300 / 300 places",
  cta: "Réserver",
  ctaArrow: "→",
} as const;

export const HERO_STATS: HeroStat[] = [
  { k: 5, label: "5", v: "Actifs cliniques", count: true },
  { k: 15, label: "15", v: "Doses · 120g", count: true },
  { k: 25, label: "25 €", v: "Tarif fondateur", amber: true, count: false },
  { k: 300, label: "300", v: "Places · Mai 2026", count: true },
];

export const CTA_STATS: CtaStat[] = [
  { k: "300", v: "Places", em: true },
  { k: "25 €", v: "Fondateur", em: false },
  { k: "29 €", v: "Public", em: false },
  { k: "0 €", v: "Maintenant", em: false },
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
  "Lot 001 · 300 ex.",
  "Édition fondateurs · 25 €",
  "Made in France",
];

export const OBSERVATIONS: Observation[] = [
  {
    num: "01",
    time: "Vendredi · 22:14",
    quote: "Trois verres hier soir. Réunion à 9h.",
    em: "Les deux sont réels.",
  },
  {
    num: "02",
    time: "Mardi · 23:47",
    quote: "Un dîner qui s'est prolongé. Les enfants se lèvent à 7h.",
    em: "Sans exception.",
  },
  {
    num: "03",
    time: "Jeudi · 00:12",
    quote: "La semaine a été longue. Le week-end",
    em: "doit quand même tenir.",
  },
  {
    num: "04",
    time: "Samedi · 02:31",
    quote: "Mariage d'un ami. Brunch en famille à 11h.",
    em: "Pas négociable.",
  },
  {
    num: "05",
    time: "Mercredi · 01:08",
    quote: "Soirée client qui s'éternise. Pitch important demain.",
    em: "Tout repose dessus.",
  },
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
    a: "Une pré-inscription sans paiement. Vous serez contacté en priorité dès que le stock est disponible, au tarif fondateur de 25€ au lieu de 29€.",
  },
  {
    q: "Est-ce que je serai débité maintenant ?",
    a: "Non. Aucun paiement n'est demandé. Vous ne paierez que si vous décidez d'acheter au moment de la disponibilité.",
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
