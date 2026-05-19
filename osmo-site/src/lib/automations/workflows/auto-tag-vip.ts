import type { AutomationDef, AutomationResult } from "../types";

export const autoTagVip: AutomationDef = {
  id: "auto-tag-vip",
  name: "Tag automatique VIP",
  description:
    "Ajoute le tag « vip » dès la deuxième commande payée d'un même client.",
  category: "loyalty",
  trigger: { event: "order.paid", label: "Commande payée" },
  conditionLabel: "Nombre de commandes payées ≥ seuil",
  actionLabel: "Ajouter le tag « vip »",
  configSchema: [
    {
      key: "minOrders",
      label: "Nombre de commandes minimum",
      type: "number",
      defaultValue: 2,
    },
    {
      key: "tag",
      label: "Tag à ajouter",
      type: "string",
      defaultValue: "vip",
    },
  ],
  defaultConfig: { minOrders: 2, tag: "vip" },
  defaultActive: true,
  async run(config, ctx): Promise<AutomationResult> {
    if (!ctx.order) {
      return { status: "skipped", message: "Pas de commande dans le contexte." };
    }
    const minOrders = Number(config.minOrders ?? 2);
    const tag = String(config.tag ?? "vip");
    const { count, error } = await ctx.supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("email", ctx.order.email)
      .eq("status", "paid");
    if (error) return { status: "error", message: error.message };
    if ((count ?? 0) < minOrders) {
      return {
        status: "skipped",
        message: `Seulement ${count ?? 0} commande(s) payée(s), seuil = ${minOrders}.`,
      };
    }
    // Apply tag to all orders of this email
    const { data: ordersData, error: fetchErr } = await ctx.supabase
      .from("orders")
      .select("id, customer_tags")
      .eq("email", ctx.order.email);
    if (fetchErr) return { status: "error", message: fetchErr.message };

    let updated = 0;
    for (const row of (ordersData ?? []) as Array<{
      id: string;
      customer_tags: string[] | null;
    }>) {
      const existing = row.customer_tags ?? [];
      if (existing.includes(tag)) continue;
      const next = Array.from(new Set([...existing, tag]));
      const { error: upErr } = await ctx.supabase
        .from("orders")
        .update({ customer_tags: next })
        .eq("id", row.id);
      if (!upErr) updated += 1;
    }
    return {
      status: "success",
      message: `Tag « ${tag} » appliqué (${updated} ligne(s)).`,
      details: { email: ctx.order.email, ordersCount: count, updated },
    };
  },
};
