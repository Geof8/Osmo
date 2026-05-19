import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AutomationCard from "@/components/admin/AutomationCard";
import ModuleStats from "@/components/admin/ModuleStats";
import StatusTabs from "@/components/admin/StatusTabs";
import { AUTOMATIONS, type AutomationCategory } from "@/lib/automations";
import {
  ensureAutomationsSeeded,
  listAutomations,
  type AutomationRow,
} from "@/lib/automations/runner";

export const dynamic = "force-dynamic";

const CATEGORIES: Array<{ value: AutomationCategory | "all"; label: string }> = [
  { value: "all", label: "Tous" },
  { value: "loyalty", label: "Fidélisation" },
  { value: "fulfillment", label: "Expédition" },
  { value: "fraud", label: "Anti-fraude" },
  { value: "inventory", label: "Stock" },
  { value: "marketing", label: "Marketing" },
];

export default async function AutomatisationsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  await ensureAutomationsSeeded();
  const rows = await listAutomations();
  const byId = new Map(rows.map((r) => [r.id, r]));

  // Si la table n'est pas encore migrée, on rend quand même les workflows
  // depuis la lib (active=defaultActive, stats à zéro)
  const merged = AUTOMATIONS.map((def) => {
    const row = byId.get(def.id);
    return {
      def,
      row:
        row ??
        ({
          id: def.id,
          name: def.name,
          description: def.description,
          category: def.category,
          trigger_label: def.trigger.label,
          condition_label: def.conditionLabel,
          action_label: def.actionLabel,
          active: def.defaultActive,
          config: def.defaultConfig,
          last_run_at: null,
          last_run_status: null,
          total_runs: 0,
          success_runs: 0,
        } as AutomationRow),
    };
  });

  const category = (searchParams.category as AutomationCategory | "all") ?? "all";
  const filtered =
    category === "all"
      ? merged
      : merged.filter((m) => m.def.category === category);

  const tabs = CATEGORIES.map((c) => ({
    value: c.value,
    label: c.label,
    count:
      c.value === "all"
        ? merged.length
        : merged.filter((m) => m.def.category === c.value).length,
  }));

  const activeCount = merged.filter((m) => m.row.active).length;
  const totalRuns = merged.reduce((sum, m) => sum + m.row.total_runs, 0);
  const successRuns = merged.reduce((sum, m) => sum + m.row.success_runs, 0);
  const successRate =
    totalRuns > 0 ? Math.round((successRuns / totalRuns) * 100) : 0;
  const lastRun = merged
    .map((m) => m.row.last_run_at)
    .filter((d): d is string => Boolean(d))
    .sort()
    .at(-1);

  return (
    <>
      <AdminPageHeader
        title="Automatisations"
        subtitle="Vos workflows pré-installés, façon Shopify Flow. 1 h de réglage pour des heures gagnées."
      />

      <ModuleStats
        stats={[
          {
            label: "Workflows actifs",
            value: `${activeCount}`,
            hint: `sur ${merged.length}`,
            accent: true,
          },
          {
            label: "Exécutions totales",
            value: totalRuns.toLocaleString("fr-FR"),
          },
          {
            label: "Taux de succès",
            value: totalRuns > 0 ? `${successRate} %` : "—",
            tone: successRate >= 90 ? "positive" : "default",
          },
          {
            label: "Dernière exécution",
            value: lastRun
              ? new Intl.DateTimeFormat("fr-FR", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(lastRun))
              : "—",
          },
        ]}
      />

      <StatusTabs tabs={tabs} paramName="category" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 14,
        }}
      >
        {filtered.map(({ def, row }) => (
          <AutomationCard
            key={def.id}
            id={def.id}
            name={def.name}
            description={def.description}
            category={def.category}
            triggerLabel={def.trigger.label}
            conditionLabel={def.conditionLabel}
            actionLabel={def.actionLabel}
            active={row.active}
            lastRunAt={row.last_run_at}
            lastRunStatus={row.last_run_status}
            totalRuns={row.total_runs}
            successRuns={row.success_runs}
          />
        ))}
      </div>
    </>
  );
}
