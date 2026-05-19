import Link from "next/link";
import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AutomationConfigForm from "@/components/admin/AutomationConfigForm";
import AutomationRunHistory from "@/components/admin/AutomationRunHistory";
import RunNowButton from "./RunNowButton";
import { getAutomationDef } from "@/lib/automations";
import {
  ensureAutomationsSeeded,
  getAutomation,
  listAutomationRuns,
} from "@/lib/automations/runner";

export const dynamic = "force-dynamic";

const CATEGORY_LABELS: Record<string, string> = {
  loyalty: "Fidélisation",
  fulfillment: "Expédition",
  fraud: "Anti-fraude",
  inventory: "Stock",
  marketing: "Marketing",
};

export default async function AutomationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const def = getAutomationDef(params.id);
  if (!def) notFound();

  await ensureAutomationsSeeded();
  const [row, runs] = await Promise.all([
    getAutomation(params.id),
    listAutomationRuns(params.id, 20),
  ]);

  const config = (row?.config ?? def.defaultConfig) as Record<
    string,
    string | number | boolean
  >;

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Link
          href="/admin/automatisations"
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.08em",
            color: "#888888",
            textDecoration: "none",
          }}
        >
          ← Toutes les automatisations
        </Link>
      </div>

      <AdminPageHeader
        title={def.name}
        subtitle={def.description}
        actions={<RunNowButton automationId={def.id} />}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 1fr)",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div
          className="admin-card admin-card-padded"
          style={{ display: "flex", flexDirection: "column", gap: 14 }}
        >
          <div className="admin-kpi-label">Workflow</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr auto 1fr",
              alignItems: "center",
              gap: 12,
            }}
          >
            <FlowBox
              tag="Trigger"
              title={def.trigger.label}
              hint="Évènement déclencheur"
            />
            <Arrow />
            <FlowBox
              tag="Condition"
              title={def.conditionLabel}
              hint="Doit être vrai pour exécuter"
            />
            <Arrow />
            <FlowBox
              tag="Action"
              title={def.actionLabel}
              hint="Ce que fait le workflow"
            />
          </div>
        </div>

        <div className="admin-card admin-card-padded">
          <div className="admin-kpi-label">Méta</div>
          <dl style={{ marginTop: 12, fontFamily: "var(--body)", fontSize: 13 }}>
            <MetaRow
              label="Catégorie"
              value={CATEGORY_LABELS[def.category] ?? def.category}
            />
            <MetaRow
              label="Statut"
              value={(row?.active ?? def.defaultActive) ? "Actif" : "Inactif"}
            />
            <MetaRow
              label="Exécutions"
              value={`${row?.total_runs ?? 0}`}
            />
            <MetaRow
              label="Réussites"
              value={
                row?.total_runs
                  ? `${row.success_runs} (${Math.round(
                      (row.success_runs / row.total_runs) * 100,
                    )} %)`
                  : "—"
              }
            />
            <MetaRow
              label="Dernière exécution"
              value={
                row?.last_run_at
                  ? new Intl.DateTimeFormat("fr-FR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(new Date(row.last_run_at))
                  : "Jamais"
              }
            />
          </dl>
        </div>
      </div>

      <section style={{ marginBottom: 24 }}>
        <h2
          style={{
            fontFamily: "var(--display)",
            fontWeight: 600,
            fontSize: 18,
            color: "#111111",
            marginBottom: 14,
          }}
        >
          Paramètres
        </h2>
        <div className="admin-card admin-card-padded">
          <AutomationConfigForm
            automationId={def.id}
            fields={def.configSchema}
            initialConfig={config}
          />
        </div>
      </section>

      <section>
        <h2
          style={{
            fontFamily: "var(--display)",
            fontWeight: 600,
            fontSize: 18,
            color: "#111111",
            marginBottom: 14,
          }}
        >
          Historique d&apos;exécution
        </h2>
        <AutomationRunHistory runs={runs} />
      </section>
    </>
  );
}

function FlowBox({
  tag,
  title,
  hint,
}: {
  tag: string;
  title: string;
  hint: string;
}) {
  return (
    <div
      style={{
        background: "#FAFAFA",
        border: "1px solid #ECECEC",
        borderRadius: 10,
        padding: 14,
        minHeight: 88,
      }}
    >
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 9,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#C8963E",
          marginBottom: 6,
          fontWeight: 600,
        }}
      >
        {tag}
      </div>
      <div
        style={{
          fontFamily: "var(--body)",
          fontSize: 13,
          color: "#111111",
          fontWeight: 600,
          marginBottom: 4,
          lineHeight: 1.35,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 11, color: "#888888" }}>{hint}</div>
    </div>
  );
}

function Arrow() {
  return (
    <span
      aria-hidden
      style={{
        fontFamily: "var(--mono)",
        fontSize: 18,
        color: "#C8963E",
        fontWeight: 700,
      }}
    >
      →
    </span>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 12,
        padding: "6px 0",
        borderBottom: "1px solid #F4F4F4",
      }}
    >
      <dt style={{ color: "#888888" }}>{label}</dt>
      <dd style={{ color: "#111111", fontWeight: 500 }}>{value}</dd>
    </div>
  );
}
