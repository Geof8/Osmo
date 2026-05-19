import { sendEmail } from "@/lib/email/send";
import { InventoryAlert } from "@/lib/email/templates/InventoryAlert";
import { computeRemaining } from "@/lib/supabase";
import { PRODUCT } from "@/lib/constants";
import type { AutomationDef, AutomationResult } from "../types";

export const lowStockAlert: AutomationDef = {
  id: "low-stock-alert",
  name: "Alerte stock Early Adopters",
  description:
    "Envoie une alerte admin quand le nombre de places restantes passe sous le seuil.",
  category: "inventory",
  trigger: { event: "order.paid", label: "Commande payée" },
  conditionLabel: "Places restantes ≤ seuil (et n'a pas déjà alerté à ce palier)",
  actionLabel: "Email admin",
  configSchema: [
    {
      key: "threshold",
      label: "Seuil d'alerte",
      type: "number",
      defaultValue: 30,
      suffix: "places",
    },
    {
      key: "adminEmail",
      label: "Email admin destinataire",
      type: "email",
      defaultValue: "g.debrion@orange.fr",
    },
  ],
  defaultConfig: { threshold: 30, adminEmail: "g.debrion@orange.fr" },
  defaultActive: true,
  async run(config, ctx): Promise<AutomationResult> {
    const threshold = Number(config.threshold ?? 30);
    const adminEmail = String(config.adminEmail ?? "g.debrion@orange.fr");
    const { count, error } = await ctx.supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "paid");
    if (error) return { status: "error", message: error.message };
    const { remaining, displayedSold } = computeRemaining(count ?? 0);
    if (remaining > threshold) {
      return {
        status: "skipped",
        message: `Stock restant ${remaining} > seuil ${threshold}.`,
      };
    }
    await sendEmail({
      to: adminEmail,
      type: "inventory_alert",
      subject: `⚠️ Plus que ${remaining} places Early Adopters`,
      react: InventoryAlert({
        remaining,
        threshold,
        totalClaimed: displayedSold,
      }),
      meta: { workflow: "low-stock-alert", remaining, threshold },
    });
    return {
      status: "success",
      message: `Alerte stock envoyée (${remaining}/${PRODUCT.maxEarlyAdopters}).`,
      details: { remaining, threshold, totalClaimed: displayedSold },
    };
  },
};
