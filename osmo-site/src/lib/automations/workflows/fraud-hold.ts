import type { AutomationDef, AutomationResult } from "../types";

export const fraudHold: AutomationDef = {
  id: "fraud-hold",
  name: "Mise en attente fraude",
  description:
    "Ajoute un tag de revue et notifie l'admin pour les commandes à risque élevé Stripe.",
  category: "fraud",
  trigger: { event: "order.paid", label: "Commande payée" },
  conditionLabel: "Stripe risk_level == « elevated » ou « highest »",
  actionLabel: "Tag « fraud-review » + email admin",
  configSchema: [
    {
      key: "minRiskLevel",
      label: "Niveau de risque minimum",
      type: "string",
      defaultValue: "elevated",
      hint: "elevated ou highest",
    },
    {
      key: "tag",
      label: "Tag à ajouter",
      type: "string",
      defaultValue: "fraud-review",
    },
  ],
  defaultConfig: { minRiskLevel: "elevated", tag: "fraud-review" },
  defaultActive: true,
  async run(config, ctx): Promise<AutomationResult> {
    if (!ctx.order) {
      return { status: "skipped", message: "Pas de commande dans le contexte." };
    }
    const minLevel = String(config.minRiskLevel ?? "elevated");
    const tag = String(config.tag ?? "fraud-review");
    const orderRisk = ctx.order.risk_level ?? null;
    const dangerous = orderRisk === "highest" ||
      (minLevel === "elevated" && (orderRisk === "elevated" || orderRisk === "highest"));
    if (!dangerous) {
      return {
        status: "skipped",
        message: `Risk « ${orderRisk ?? "n/a"} » sous le seuil « ${minLevel} ».`,
      };
    }
    const existing = ctx.order.customer_tags ?? [];
    const next = Array.from(new Set([...existing, tag]));
    await ctx.supabase
      .from("orders")
      .update({ customer_tags: next })
      .eq("id", ctx.order.id);
    return {
      status: "success",
      message: `Commande ${ctx.order.id} mise en revue (risk « ${orderRisk} »).`,
      details: { orderId: ctx.order.id, riskLevel: orderRisk, tag },
    };
  },
};
