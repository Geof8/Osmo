import { sendEmail } from "@/lib/email/send";
import { GenericMessage } from "@/lib/email/templates/GenericMessage";
import type { AutomationDef, AutomationResult } from "../types";

export const npsD30: AutomationDef = {
  id: "nps-d30",
  name: "NPS J+30 post-livraison",
  description:
    "Demande un NPS aux clients 30 jours après livraison. Inactif par défaut.",
  category: "loyalty",
  trigger: { event: "cron.daily", label: "Quotidien (08:00)" },
  conditionLabel: "delivered_at = aujourd'hui − 30 jours",
  actionLabel: "Email NPS",
  configSchema: [
    {
      key: "daysAfter",
      label: "Délai après livraison",
      type: "number",
      defaultValue: 30,
      suffix: "jours",
    },
  ],
  defaultConfig: { daysAfter: 30 },
  defaultActive: false,
  async run(config, ctx): Promise<AutomationResult> {
    const days = Number(config.daysAfter ?? 30);
    const now = Date.now();
    const lower = new Date(now - (days + 1) * 24 * 3600 * 1000).toISOString();
    const upper = new Date(now - days * 24 * 3600 * 1000).toISOString();
    const { data, error } = await ctx.supabase
      .from("orders")
      .select("id, email, first_name, delivered_at")
      .gte("delivered_at", lower)
      .lt("delivered_at", upper);
    if (error) return { status: "error", message: error.message };
    let sent = 0;
    for (const o of (data ?? []) as Array<{
      id: string;
      email: string;
      first_name: string | null;
    }>) {
      const r = await sendEmail({
        to: o.email,
        type: "order_shipped",
        subject: "On a besoin d'une minute de votre temps",
        react: GenericMessage({
          preheader: "Un mois plus tard, comment vous le vivez ?",
          title: "Un mois avec OSMO",
          greeting: o.first_name
            ? `${o.first_name},`
            : "Bonjour,",
          body: [
            "Cela fait un mois que votre commande est arrivée. Si vous deviez recommander OSMO à un proche sur une échelle de 0 à 10, où seriez-vous ?",
            "Répondez simplement à cet email avec votre note. On répond personnellement à chaque retour.",
          ],
        }),
        meta: { workflow: "nps-d30", orderId: o.id, dayOffset: days },
      });
      if (r.status === "sent" || r.status === "skipped_no_provider") sent += 1;
    }
    return {
      status: "success",
      message: `${sent} email(s) NPS J+${days} envoyé(s).`,
      details: { matched: data?.length ?? 0, sent },
    };
  },
};
