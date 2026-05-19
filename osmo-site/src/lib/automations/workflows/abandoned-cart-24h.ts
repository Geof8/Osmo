import { sendEmail } from "@/lib/email/send";
import { AbandonedCart24h } from "@/lib/email/templates/AbandonedCart24h";
import { getSiteBaseUrl } from "@/lib/site-url";
import type { AutomationDef, AutomationResult } from "../types";

export const abandonedCart24h: AutomationDef = {
  id: "abandoned-cart-24h",
  name: "Relance panier 24 h",
  description:
    "Envoie une seconde relance avec un code promo aux abandons non convertis depuis 22 à 30 heures.",
  category: "loyalty",
  trigger: { event: "cron.daily", label: "Quotidien (08:00)" },
  conditionLabel: "Panier abandonné il y a 22 à 30 h · pas encore converti",
  actionLabel: "Email de relance 24 h + code promo",
  configSchema: [
    {
      key: "windowMinHours",
      label: "Délai minimum",
      type: "number",
      defaultValue: 22,
      suffix: "h",
    },
    {
      key: "windowMaxHours",
      label: "Délai maximum",
      type: "number",
      defaultValue: 30,
      suffix: "h",
    },
    {
      key: "promoCode",
      label: "Code promo à inclure",
      type: "string",
      defaultValue: "REVIENS10",
      hint: "Doit exister dans Codes promo",
    },
  ],
  defaultConfig: {
    windowMinHours: 22,
    windowMaxHours: 30,
    promoCode: "REVIENS10",
  },
  defaultActive: true,
  async run(config, ctx): Promise<AutomationResult> {
    const minH = Number(config.windowMinHours ?? 22);
    const maxH = Number(config.windowMaxHours ?? 30);
    const promoCode = String(config.promoCode ?? "REVIENS10");
    const now = Date.now();
    const upperBound = new Date(now - minH * 3600 * 1000).toISOString();
    const lowerBound = new Date(now - maxH * 3600 * 1000).toISOString();

    const { data, error } = await ctx.supabase
      .from("abandoned_carts")
      .select("id, email, first_name")
      .eq("converted", false)
      .eq("second_relance_sent", false)
      .gte("timestamp", lowerBound)
      .lte("timestamp", upperBound)
      .limit(50);
    if (error) return { status: "error", message: error.message };

    let sent = 0;
    for (const cart of data ?? []) {
      const result = await sendEmail({
        to: cart.email,
        type: "abandoned_cart_24h",
        subject: "−10 € sur votre commande OSMO",
        react: AbandonedCart24h({
          firstName: cart.first_name ?? null,
          baseUrl: getSiteBaseUrl(),
          promoCode,
        }),
      });
      if (result.status === "sent" || result.status === "skipped_no_provider") {
        await ctx.supabase
          .from("abandoned_carts")
          .update({
            second_relance_sent: true,
            second_relance_sent_at: new Date().toISOString(),
          })
          .eq("id", cart.id);
        sent += 1;
      }
    }
    return {
      status: "success",
      message: `${sent} email(s) avec code promo envoyé(s).`,
      details: { matched: data?.length ?? 0, sent, promoCode },
    };
  },
};
