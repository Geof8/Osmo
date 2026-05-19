import "server-only";

export const NEWSLETTER_PROMO_CODE = "NEWSLETTER15";

export const NEWSLETTER_THEMES = [
  "Ce que l'alcool fait vraiment à ton corps la nuit",
  "Pourquoi le magnésium change tout pour le sommeil",
  "Le mythe du verre d'eau avant de dormir",
  "NAC : l'actif que les médecins utilisent mais que personne ne connaît",
  "Pourquoi tu as faim le lendemain d'une soirée",
  "Sodium, potassium, magnésium : le trio que tu perds chaque soirée",
  "Récupération vs guérison : la différence que peu de gens font",
  "Les électrolytes ne sont pas que pour le sport",
] as const;

export function siteBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") ||
    "https://osmo-lab.fr"
  );
}

export function unsubscribeUrl(token: string): string {
  return `${siteBaseUrl()}/api/newsletter/unsubscribe?token=${encodeURIComponent(token)}`;
}

export type NewsletterQueueRow = {
  id: string;
  theme: string;
  subject: string;
  title: string;
  content: string;
  generated_at: string;
  preview_sent_at: string | null;
  sent_at: string | null;
  cancelled: boolean;
  subscribers_count: number | null;
};

export type NewsletterSubscriberRow = {
  id: string;
  email: string;
  subscribed_at: string;
  active: boolean;
  promo_sent: boolean;
  unsubscribe_token: string;
};

type ClaudeMessage = {
  role: "user";
  content: string;
};

type ClaudeResponse = {
  content: Array<{ type: string; text?: string }>;
};

const SYSTEM_PROMPT = `Tu es le rédacteur de la newsletter OSMO Recovery.
Tu écris des newsletters courtes (300-400 mots max)
sur les thèmes: électrolytes, récupération, alcool,
fatigue, sommeil, biochimie, hydratation.

RÈGLES DE STYLE ABSOLUES:
- Direct, factuel, sans promesse miracle
- Zéro tirets en cascade
- Zéro listes à rallonge
- Zéro phrase commençant par 'Il est important de'
- Zéro jargon IA générique
- Ton adulte, intelligent, comme un ami médecin
- Pas de pub directe pour OSMO — juste éducatif
- Maximum 4 paragraphes
- Une conclusion naturelle avec un lien subtil vers OSMO

FORMAT DE RÉPONSE:
SUJET: [sujet email accrocheur]
TITRE: [titre dans la newsletter]
CONTENU: [le texte complet]`;

export type GeneratedNewsletter = {
  subject: string;
  title: string;
  content: string;
};

export async function generateNewsletterFromClaude(
  theme: string,
): Promise<GeneratedNewsletter> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not set");
  }

  const messages: ClaudeMessage[] = [
    { role: "user", content: `Génère une newsletter sur le thème: ${theme}` },
  ];

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Claude API error ${res.status}: ${text.slice(0, 200)}`);
  }

  const data = (await res.json()) as ClaudeResponse;
  const text = data.content
    .map((block) => (block.type === "text" ? block.text ?? "" : ""))
    .join("\n")
    .trim();

  return parseGeneratedNewsletter(text);
}

export function parseGeneratedNewsletter(raw: string): GeneratedNewsletter {
  const subjectMatch = raw.match(/^\s*SUJET\s*:\s*(.+?)\s*$/im);
  const titleMatch = raw.match(/^\s*TITRE\s*:\s*(.+?)\s*$/im);
  const contentMatch = raw.match(
    /(?:^|\n)\s*CONTENU\s*:\s*([\s\S]+?)\s*$/i,
  );

  const subject = subjectMatch?.[1]?.trim() ?? "";
  const title = titleMatch?.[1]?.trim() ?? "";
  const content = contentMatch?.[1]?.trim() ?? "";

  if (!subject || !title || !content) {
    throw new Error(
      "Newsletter generation failed: missing SUJET/TITRE/CONTENU in Claude response",
    );
  }

  return { subject, title, content };
}
