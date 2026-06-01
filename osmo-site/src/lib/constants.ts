import type {
  FaqItem,
  FooterColumn,
  HeroStat,
  Ingredient,
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
  display: "var(--font-fraunces), var(--display)",
  body: "var(--font-dm-sans), var(--body)",
  mono: "var(--font-mono), var(--mono)",
  playfair: "var(--font-playfair), 'Playfair Display', serif",
} as const;

export const GUARANTEE_LINE =
  "✓ À réception du produit, 30 jours satisfait ou remboursé";

export const REASSURANCE_LINE =
  "✓ Laboratoire français certifié · ✓ Essai clinique · ✓ 30 jours satisfait ou remboursé";

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

export const HERO_STATS: HeroStat[] = [
  { k: 5, label: "5", v: "Actifs cliniques", count: true },
  { k: 15, label: "15", v: "Doses · 120g", count: true },
  { k: 25, label: "25 €", v: "Tarif Early Adopter (-29%)", amber: true, count: false },
  { k: 50, label: "50", v: "Places Early Adopters", count: true },
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
  "Early Adopters · 25 €",
  "PROTOCOLE QUOTIDIEN · SOIR + MATIN",
  "LOT N°001",
  "EARLY ADOPTERS",
  "EXPÉDITION SOUS 6 MOIS",
  "Made in France",
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Qu'est-ce qu'OSMO Recovery exactement ?",
    a: "Un complexe d'électrolytes en poudre, goût citron, conçu pour la récupération après une consommation d'alcool. Bicarbonate de sodium, citrate de potassium, bisglycinate de magnésium, NAC et chlorure de sodium, dosés pour restaurer l'hydratation et soutenir la fonction hépatique.",
  },
  {
    q: "Quelle différence avec un isotonique classique ?",
    a: "Les boissons isotoniques sont conçues pour l'effort sportif. OSMO Recovery est formulé pour la récupération post-alcool, avec de la NAC qui soutient la fonction hépatique, un actif absent des boissons sportives.",
  },
  {
    q: "Comment utiliser OSMO Recovery ?",
    a: "Le principe est simple : ton corps récupère pendant le sommeil, pas après. Dose 1 le soir active la récupération. Dose 2 le matin la finalise.\n\nConcrètement, une dose d'OSMO Recovery dans 250ml d'eau, à boire deux fois par jour — une fois le soir avant de dormir et une fois au réveil, idéalement accompagné d'un repas. Goût citron franc, dissolution immédiate.",
  },
  {
    q: "Est-ce un médicament ?",
    a: "Non. OSMO Recovery est un complément alimentaire. Il ne se substitue pas à une alimentation variée et équilibrée.",
  },
  {
    q: "Qu'est-ce que l'accès prioritaire ?",
    a: "En devenant Early Adopter à 25€ (au lieu de 35€), tu fais partie du Lot N°001, les 50 premières personnes à recevoir OSMO Recovery. Expédition estimée sous 6 mois.",
  },
  {
    q: "Est-ce que je serai débité maintenant ?",
    a: "Le paiement de 25€ est effectué au moment de ta réservation. Il confirme ta place dans le Lot N°001 et déclenche, une fois les 50 places réunies, la commande de production. En cas d'annulation du projet, tu seras intégralement remboursé.",
  },
];

export const PRODUCT = {
  name: "OSMO Recovery",
  weight: "120g",
  doses: 15,
  image: "/osmo-hero.png",
  earlyPrice: 25,
  publicPrice: 35,
  currency: "EUR",
  maxEarlyAdopters: 50,
} as const;

export const INGREDIENTS: Ingredient[] = [
  {
    tag: "Soutien hépatique",
    name: "N-Acétyl-Cystéine",
    bullets: [
      "Précurseur du glutathion, principal antioxydant du foie",
      "Utilisé en milieu hospitalier pour les crises hépatiques",
    ],
    detail: "Actif méconnu du grand public. Redoutablement efficace.",
    highlight: true,
  },
  {
    tag: "Sommeil & récupération",
    name: "Bisglycinate de Magnésium",
    bullets: [
      "Favorise un sommeil profond et réparateur",
      "Réduit les crampes musculaires nocturnes",
    ],
    detail: "Forme hautement biodisponible du magnésium.",
  },
  {
    tag: "Fonction musculaire",
    name: "Citrate de Potassium",
    bullets: [
      "Soutient la contraction musculaire et cardiaque",
      "Prévient les crampes liées à la déshydratation",
    ],
    detail: "Sel minéral essentiel éliminé en priorité par l'alcool.",
  },
  {
    tag: "Réhydratation rapide",
    name: "Bicarbonate de Sodium",
    bullets: [
      "Restaure l'équilibre acido-basique post-alcool",
      "Accélère la réhydratation au niveau cellulaire",
    ],
    detail: "Tampon naturel des fluides corporels.",
  },
  {
    tag: "Hydratation cellulaire",
    name: "Chlorure de Sodium",
    bullets: [
      "Régule l'équilibre hydrique intracellulaire",
      "Active la transmission nerveuse et musculaire",
    ],
    detail: "Le sel essentiel, ni trop, ni pas assez.",
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
      { label: "Notre Histoire", href: "/notre-histoire" },
      { label: "Notre approche", href: "#observations" },
      { label: "Lot 001", href: "#reserve" },
      { label: "Analyses", href: "#formule" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "CGV", href: "/cgv" },
      { label: "Confidentialité", href: "/confidentialite" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];

export const LEGAL_LINKS = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "CGV", href: "/cgv" },
  { label: "Confidentialité", href: "/confidentialite" },
  { label: "Cookies", href: "/cookies" },
] as const;
