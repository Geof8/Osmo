import { sendEmail } from "@/lib/email/send";
import { GenericMessage } from "@/lib/email/templates/GenericMessage";
import { ugcTokenForOrder } from "@/lib/fulfillment";
import type { AutomationDef, AutomationResult } from "../types";

export const ugcRequestD30: AutomationDef = {
  id: "ugc-request-d30",
  name: "Demande UGC J+30 post-livraison",
  description:
    "Envoie un email de demande d'avis 30 jours après la livraison, avec un lien /ugc/[token] et la promo -20 %.",
  category: "loyalty",
  trigger: { event: "cron.daily", label: "Quotidien (08:00)" },
  conditionLabel: "delivered_at = aujourd'hui − 30 jours · ugc_request_sent_at vide",
  actionLabel: "Email « Donner mon avis »",
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
  defaultActive: true,
  async run(config, ctx): Promise<AutomationResult> {
    const days = Number(config.daysAfter ?? 30);
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://osmo-lab.fr";
    const now = Date.now();
    const lower = new Date(now - (days + 1) * 24 * 3600 * 1000).toISOString();
    const upper = new Date(now - days * 24 * 3600 * 1000).toISOString();

    const { data, error } = await ctx.supabase
      .from("orders")
      .select("id, email, first_name, delivered_at, ugc_request_sent_at")
      .gte("delivered_at", lower)
      .lt("delivered_at", upper)
      .is("ugc_request_sent_at", null);
    if (error) return { status: "error", message: error.message };

    let sent = 0;
    for (const o of (data ?? []) as Array<{
      id: string;
      email: string;
      first_name: string | null;
    }>) {
      const r = await sendEmail({
        to: o.email,
        type: "order_delivered",
        subject: `${o.first_name ?? "Toi"}, ton retour sur OSMO ?`,
        react: GenericMessage({
          preheader: "Ton avis vaut -20 % sur ta prochaine commande",
          title: "Comment ça se passe avec OSMO ?",
          greeting: o.first_name ? `${o.first_name},` : "Bonjour,",
          body: [
            "Cela fait un mois que ton OSMO Recovery est arrivé. On serait curieux de savoir ce que tu en penses.",
            `Donne ton avis ici : ${baseUrl}/ugc/${ugcTokenForOrder(o.id)}`,
            "En échange : -20 % sur ta prochaine commande.",
          ],
        }),
        meta: { workflow: "ugc-request-d30", orderId: o.id, dayOffset: days },
      });
      if (r.status === "sent" || r.status === "skipped_no_provider") {
        sent += 1;
        await ctx.supabase
          .from("orders")
          .update({ ugc_request_sent_at: new Date().toISOString() })
          .eq("id", o.id);
      }
    }
    return {
      status: "success",
      message: `${sent} demande(s) UGC J+${days} envoyée(s).`,
      details: { matched: data?.length ?? 0, sent },
    };
  },
};
