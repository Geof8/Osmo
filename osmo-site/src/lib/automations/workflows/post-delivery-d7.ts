import { sendEmail } from "@/lib/email/send";
import { GenericMessage } from "@/lib/email/templates/GenericMessage";
import type { AutomationDef, AutomationResult } from "../types";

export const postDeliveryD7: AutomationDef = {
  id: "post-delivery-d7",
  name: "Suivi J+7 post-livraison",
  description:
    "Envoie un email de suivi 7 jours après la livraison pour recueillir les premières impressions.",
  category: "loyalty",
  trigger: { event: "cron.daily", label: "Quotidien (08:00)" },
  conditionLabel: "delivered_at = aujourd'hui − 7 jours",
  actionLabel: "Email « Comment vous le vivez ? »",
  configSchema: [
    {
      key: "daysAfter",
      label: "Délai après livraison",
      type: "number",
      defaultValue: 7,
      suffix: "jours",
    },
  ],
  defaultConfig: { daysAfter: 7 },
  defaultActive: true,
  async run(config, ctx): Promise<AutomationResult> {
    const days = Number(config.daysAfter ?? 7);
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
        subject: `Comment vous le vivez, ${o.first_name ?? "Fondateur"} ?`,
        react: GenericMessage({
          preheader: "Une semaine plus tard, on aimerait avoir votre retour",
          title: "Une semaine avec OSMO 🌿",
          greeting: o.first_name
            ? `Bonjour ${o.first_name},`
            : "Bonjour,",
          body: [
            "Cela fait sept jours que votre commande OSMO est arrivée. On espère que les premières utilisations vous ont apporté ce qu'il fallait.",
            "On serait curieux de savoir comment vous le vivez. Une réponse à cet email atterrit directement chez nous.",
          ],
        }),
        meta: { workflow: "post-delivery-d7", orderId: o.id, dayOffset: days },
      });
      if (r.status === "sent" || r.status === "skipped_no_provider") sent += 1;
    }
    return {
      status: "success",
      message: `${sent} email(s) J+${days} envoyé(s).`,
      details: { matched: data?.length ?? 0, sent },
    };
  },
};
