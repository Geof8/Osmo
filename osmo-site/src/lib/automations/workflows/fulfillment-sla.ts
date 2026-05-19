import { sendEmail } from "@/lib/email/send";
import { InventoryAlert } from "@/lib/email/templates/InventoryAlert";
import type { AutomationDef, AutomationResult } from "../types";

export const fulfillmentSla: AutomationDef = {
  id: "fulfillment-sla",
  name: "SLA d'expédition",
  description:
    "Alerte l'admin si des commandes payées ne sont pas expédiées au-delà du délai SLA.",
  category: "fulfillment",
  trigger: { event: "cron.daily", label: "Quotidien (08:00)" },
  conditionLabel: "Commande payée depuis N jours · sans shipped_at",
  actionLabel: "Email admin résumant les retards",
  configSchema: [
    {
      key: "slaDays",
      label: "Délai SLA",
      type: "number",
      defaultValue: 5,
      suffix: "jours",
    },
    {
      key: "adminEmail",
      label: "Email admin destinataire",
      type: "email",
      defaultValue: "g.debrion@orange.fr",
    },
  ],
  defaultConfig: { slaDays: 5, adminEmail: "g.debrion@orange.fr" },
  defaultActive: true,
  async run(config, ctx): Promise<AutomationResult> {
    const slaDays = Number(config.slaDays ?? 5);
    const adminEmail = String(config.adminEmail ?? "g.debrion@orange.fr");
    const cutoff = new Date(Date.now() - slaDays * 24 * 3600 * 1000).toISOString();
    const { data, error } = await ctx.supabase
      .from("orders")
      .select("id, email, first_name, last_name, amount_cents, created_at")
      .eq("status", "paid")
      .is("shipped_at", null)
      .lt("created_at", cutoff);
    if (error) return { status: "error", message: error.message };
    const late = data ?? [];
    if (late.length === 0) {
      return { status: "skipped", message: "Aucune commande en retard." };
    }
    // Reuse InventoryAlert email shell (just need a notification format)
    await sendEmail({
      to: adminEmail,
      type: "inventory_alert",
      subject: `⚠️ ${late.length} commande(s) en retard d'expédition`,
      react: InventoryAlert({
        remaining: late.length,
        threshold: slaDays,
        totalClaimed: late.length,
      }),
      meta: { workflow: "fulfillment-sla", lateOrderIds: late.map((o) => o.id) },
    });
    return {
      status: "success",
      message: `${late.length} commande(s) en retard signalée(s) à ${adminEmail}.`,
      details: { lateCount: late.length, slaDays },
    };
  },
};
