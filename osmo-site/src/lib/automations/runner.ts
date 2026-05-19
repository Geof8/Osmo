import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { AUTOMATIONS, getAutomationDef } from "./index";
import type {
  AutomationContext,
  AutomationDef,
  AutomationEvent,
  AutomationResult,
} from "./types";

export type AutomationRow = {
  id: string;
  name: string;
  description: string;
  category: AutomationDef["category"];
  trigger_label: string;
  condition_label: string;
  action_label: string;
  active: boolean;
  config: Record<string, string | number | boolean>;
  last_run_at: string | null;
  last_run_status: string | null;
  total_runs: number;
  success_runs: number;
};

function isMissingTable(error: { code?: string; message?: string } | null) {
  if (!error) return false;
  if (error.code === "42P01") return true;
  return /relation .* does not exist/i.test(error.message ?? "");
}

export async function listAutomations(): Promise<AutomationRow[]> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("automations")
      .select("*")
      .order("category")
      .order("name");
    if (error) {
      if (isMissingTable(error)) return [];
      console.error("listAutomations:", error);
      return [];
    }
    return (data ?? []) as AutomationRow[];
  } catch (err) {
    console.error("listAutomations (caught):", err);
    return [];
  }
}

export async function getAutomation(id: string): Promise<AutomationRow | null> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("automations")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) {
      if (isMissingTable(error)) return null;
      console.error("getAutomation:", error);
      return null;
    }
    return (data as AutomationRow | null) ?? null;
  } catch (err) {
    console.error("getAutomation (caught):", err);
    return null;
  }
}

export type AutomationRunRow = {
  id: string;
  automation_id: string;
  status: "success" | "error" | "skipped";
  started_at: string;
  finished_at: string | null;
  result: Record<string, unknown> | null;
  error: string | null;
};

export async function listAutomationRuns(
  automationId: string,
  limit = 20,
): Promise<AutomationRunRow[]> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("automation_runs")
      .select("*")
      .eq("automation_id", automationId)
      .order("started_at", { ascending: false })
      .limit(limit);
    if (error) {
      if (isMissingTable(error)) return [];
      console.error("listAutomationRuns:", error);
      return [];
    }
    return (data ?? []) as AutomationRunRow[];
  } catch (err) {
    console.error("listAutomationRuns (caught):", err);
    return [];
  }
}

async function logRun(
  automationId: string,
  status: AutomationResult["status"],
  startedAt: string,
  result: AutomationResult,
  errorMessage: string | null,
) {
  const supabase = getSupabaseAdmin();
  try {
    await supabase.from("automation_runs").insert({
      automation_id: automationId,
      status,
      started_at: startedAt,
      finished_at: new Date().toISOString(),
      result: (result.details ?? null) as Record<string, unknown> | null,
      error: errorMessage,
    });
    const { data: row } = await supabase
      .from("automations")
      .select("total_runs, success_runs")
      .eq("id", automationId)
      .maybeSingle();
    const totals = (row ?? { total_runs: 0, success_runs: 0 }) as {
      total_runs: number;
      success_runs: number;
    };
    await supabase
      .from("automations")
      .update({
        last_run_at: new Date().toISOString(),
        last_run_status: status,
        total_runs: (totals.total_runs ?? 0) + 1,
        success_runs:
          (totals.success_runs ?? 0) + (status === "success" ? 1 : 0),
        updated_at: new Date().toISOString(),
      })
      .eq("id", automationId);
  } catch (e) {
    console.error("logRun failed:", e);
  }
}

export async function runAutomation(
  def: AutomationDef,
  row: AutomationRow | null,
  ctx: Omit<AutomationContext, "supabase">,
): Promise<AutomationResult> {
  const startedAt = new Date().toISOString();
  const supabase = getSupabaseAdmin();
  const config = (row?.config ?? def.defaultConfig) as Record<
    string,
    string | number | boolean
  >;
  try {
    const result = await def.run(config, { ...ctx, supabase });
    await logRun(def.id, result.status, startedAt, result, null);
    return result;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    await logRun(
      def.id,
      "error",
      startedAt,
      { status: "error", message },
      message,
    );
    return { status: "error", message };
  }
}

export async function triggerAutomations(
  ctx: Omit<AutomationContext, "supabase"> & { event: AutomationEvent },
): Promise<void> {
  const rows = await listAutomations();
  const byId = new Map(rows.map((r) => [r.id, r]));
  for (const def of AUTOMATIONS) {
    if (def.trigger.event !== ctx.event) continue;
    const row = byId.get(def.id);
    if (row && !row.active) continue;
    await runAutomation(def, row ?? null, ctx);
  }
}

export async function runCronDaily(): Promise<{
  ran: number;
  results: Array<{ id: string; status: string; message: string }>;
}> {
  const rows = await listAutomations();
  const byId = new Map(rows.map((r) => [r.id, r]));
  const ctx: Omit<AutomationContext, "supabase"> = { event: "cron.daily" };
  const results: Array<{ id: string; status: string; message: string }> = [];
  for (const def of AUTOMATIONS) {
    if (def.trigger.event !== "cron.daily") continue;
    const row = byId.get(def.id);
    if (row && !row.active) continue;
    const r = await runAutomation(def, row ?? null, ctx);
    results.push({ id: def.id, status: r.status, message: r.message });
  }
  return { ran: results.length, results };
}

export async function ensureAutomationsSeeded(): Promise<void> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.from("automations").select("id");
    if (error) {
      if (!isMissingTable(error))
        console.error("ensureAutomationsSeeded:", error);
      return;
    }
    const existing = new Set(
      ((data ?? []) as Array<{ id: string }>).map((r) => r.id),
    );
    const toInsert = AUTOMATIONS.filter((a) => !existing.has(a.id)).map((a) => ({
      id: a.id,
      name: a.name,
      description: a.description,
      category: a.category,
      trigger_label: a.trigger.label,
      condition_label: a.conditionLabel,
      action_label: a.actionLabel,
      active: a.defaultActive,
      config: a.defaultConfig,
    }));
    if (toInsert.length === 0) return;
    const { error: insErr } = await supabase.from("automations").insert(toInsert);
    if (insErr) console.error("ensureAutomationsSeeded insert:", insErr);
  } catch (err) {
    console.error("ensureAutomationsSeeded (caught):", err);
  }
}

export { getAutomationDef };
