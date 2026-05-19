import { sendEmail } from "@/lib/email/send";
import { AbandonedCart1h } from "@/lib/email/templates/AbandonedCart1h";
import { getSiteBaseUrl } from "@/lib/site-url";
import type { AutomationDef, AutomationResult } from "../types";

export const abandonedCart1h: AutomationDef = {
  id: "abandoned-cart-1h",
  name: "Relance panier 1 h",
  description:
    "Envoie un email de relance aux paniers abandonnés il y a environ 1 heure et non encore convertis.",
  category: "loyalty",
  trigger: { event: "cron.daily", label: "Quotidien (08:00)" },
  conditionLabel: "Panier abandonné il y a 30 à 120 min · pas encore converti",
  actionLabel: "Email de relance 1 h",
  configSchema: [
    {
      key: "windowMinMinutes",
      label: "Délai minimum",
      type: "number",
      defaultValue: 30,
      suffix: "min",
    },
    {
      key: "windowMaxMinutes",
      label: "Délai maximum",
      type: "number",
      defaultValue: 120,
      suffix: "min",
    },
  ],
  defaultConfig: { windowMinMinutes: 30, windowMaxMinutes: 120 },
  defaultActive: true,
  async run(config, ctx): Promise<AutomationResult> {
    const minMin = Number(config.windowMinMinutes ?? 30);
    const maxMin = Number(config.windowMaxMinutes ?? 120);
    const now = Date.now();
    const upperBound = new Date(now - minMin * 60 * 1000).toISOString();
    const lowerBound = new Date(now - maxMin * 60 * 1000).toISOString();

    const { data, error } = await ctx.supabase
      .from("abandoned_carts")
      .select("id, email, first_name")
      .eq("converted", false)
      .eq("relance_sent", false)
      .gte("timestamp", lowerBound)
      .lte("timestamp", upperBound)
      .limit(50);
    if (error) {
      return { status: "error", message: error.message };
    }

    let sent = 0;
    for (const cart of data ?? []) {
      const result = await sendEmail({
        to: cart.email,
        type: "abandoned_cart_1h",
        subject: "Votre OSMO vous attend",
        react: AbandonedCart1h({
          firstName: cart.first_name ?? null,
          baseUrl: getSiteBaseUrl(),
        }),
      });
      if (result.status === "sent" || result.status === "skipped_no_provider") {
        await ctx.supabase
          .from("abandoned_carts")
          .update({ relance_sent: true, relance_sent_at: new Date().toISOString() })
          .eq("id", cart.id);
        sent += 1;
      }
    }

    return {
      status: "success",
      message: `${sent} email(s) de relance envoyé(s).`,
      details: { matched: data?.length ?? 0, sent },
    };
  },
};
