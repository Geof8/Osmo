import type { AutomationDef, AutomationResult } from "../types";

export const autoTagFounder: AutomationDef = {
  id: "auto-tag-founder",
  name: "Tag automatique Fondateur",
  description:
    "Ajoute le tag « founder » à toute commande payée (édition fondateurs).",
  category: "loyalty",
  trigger: { event: "order.paid", label: "Commande payée" },
  conditionLabel: "Toute commande payée",
  actionLabel: "Ajouter le tag « founder » au client",
  configSchema: [
    {
      key: "tag",
      label: "Tag à ajouter",
      type: "string",
      defaultValue: "founder",
    },
  ],
  defaultConfig: { tag: "founder" },
  defaultActive: true,
  async run(config, ctx): Promise<AutomationResult> {
    const tag = String(config.tag ?? "founder");
    if (!ctx.order) {
      return { status: "skipped", message: "Pas de commande dans le contexte." };
    }
    const existing = ctx.order.customer_tags ?? [];
    if (existing.includes(tag)) {
      return { status: "skipped", message: `Tag « ${tag} » déjà présent.` };
    }
    const next = Array.from(new Set([...existing, tag]));
    const { error } = await ctx.supabase
      .from("orders")
      .update({ customer_tags: next })
      .eq("id", ctx.order.id);
    if (error) return { status: "error", message: error.message };
    return {
      status: "success",
      message: `Tag « ${tag} » ajouté à ${ctx.order.email}.`,
      details: { tag, email: ctx.order.email },
    };
  },
};
