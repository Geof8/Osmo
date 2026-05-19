import type { AutomationDef, AutomationResult } from "../types";

export const promoExhaustedDisable: AutomationDef = {
  id: "promo-exhausted-disable",
  name: "Désactivation auto codes épuisés",
  description:
    "Désactive automatiquement les codes promo dont la limite d'usage est atteinte.",
  category: "marketing",
  trigger: { event: "cron.daily", label: "Quotidien (08:00)" },
  conditionLabel: "usage_count ≥ usage_limit && active = true",
  actionLabel: "Désactive le code (DB + Stripe)",
  configSchema: [],
  defaultConfig: {},
  defaultActive: true,
  async run(_config, ctx): Promise<AutomationResult> {
    const { data, error } = await ctx.supabase
      .from("promo_codes")
      .select("id, code, usage_count, usage_limit, active")
      .eq("active", true)
      .not("usage_limit", "is", null);
    if (error) return { status: "error", message: error.message };
    type Row = {
      id: string;
      code: string;
      usage_count: number;
      usage_limit: number | null;
      active: boolean;
    };
    const exhausted = ((data ?? []) as Row[]).filter(
      (p) => p.usage_limit != null && p.usage_count >= p.usage_limit,
    );
    if (exhausted.length === 0) {
      return { status: "skipped", message: "Aucun code épuisé à désactiver." };
    }
    let disabled = 0;
    for (const p of exhausted) {
      const { error: upErr } = await ctx.supabase
        .from("promo_codes")
        .update({ active: false })
        .eq("id", p.id);
      if (!upErr) disabled += 1;
    }
    return {
      status: "success",
      message: `${disabled} code(s) désactivé(s).`,
      details: { codes: exhausted.map((p) => p.code) },
    };
  },
};
