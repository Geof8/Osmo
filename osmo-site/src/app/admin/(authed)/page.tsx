import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DateRangePill from "@/components/admin/DateRangePill";
import KpiCard from "@/components/admin/KpiCard";
import MilestoneProgress from "@/components/admin/MilestoneProgress";
import RecentOrdersTable from "@/components/admin/RecentOrdersTable";
import RevenueChart from "@/components/admin/RevenueChart";
import {
  fetchKPIs,
  fetchRecentOrders,
  fetchRevenueSeries,
} from "@/lib/admin-queries";
import { formatEuros } from "@/lib/format";

export const dynamic = "force-dynamic";

const ALLOWED_RANGES = new Set([7, 30, 90, 365]);

function parseRange(raw: string | string[] | undefined): number {
  const n = Number.parseInt(Array.isArray(raw) ? raw[0] : raw ?? "30", 10);
  return ALLOWED_RANGES.has(n) ? n : 30;
}

function deltaFor(value: number, label: string) {
  if (!Number.isFinite(value) || Math.abs(value) < 0.0001) {
    return { value: 0, direction: "flat" as const, label };
  }
  return {
    value: value * 100,
    direction:
      value > 0 ? ("up" as const) : value < 0 ? ("down" as const) : ("flat" as const),
    label,
  };
}

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: { range?: string };
}) {
  const range = parseRange(searchParams.range);
  const [kpis, recent, series] = await Promise.all([
    fetchKPIs(range),
    fetchRecentOrders(8),
    fetchRevenueSeries(range),
  ]);

  const rangeLabel =
    range === 7
      ? "vs 7 jours précédents"
      : range === 90
        ? "vs 90 jours précédents"
        : range === 365
          ? "vs 12 mois précédents"
          : "vs 30 jours précédents";

  return (
    <>
      <AdminPageHeader
        title="Vue d'ensemble"
        showDate
        actions={<DateRangePill />}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          marginBottom: 20,
        }}
      >
        <KpiCard
          label="Revenus total"
          value={formatEuros(kpis.revenueCents)}
          delta={deltaFor(kpis.revenueDelta, rangeLabel)}
        />
        <KpiCard
          label="Commandes total"
          value={kpis.ordersCount.toString()}
          hint={kpis.ordersCount === 0 ? "Aucune commande encore" : undefined}
          delta={deltaFor(kpis.ordersDelta, rangeLabel)}
        />
        <KpiCard
          label="Early Adopters restants"
          value={kpis.earlyAdoptersRemaining.toString()}
          accent
          hint={`${kpis.earlyAdoptersClaimed} / ${kpis.earlyAdoptersTotal} réservés`}
        />
        <KpiCard
          label={`Paniers abandonnés (${range}j)`}
          value={kpis.abandonedThisWeek.toString()}
          delta={deltaFor(kpis.abandonedDelta, rangeLabel)}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 1fr)",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <RevenueChart
          data={series}
          title={`Évolution sur ${range} derniers jours`}
        />
        <MilestoneProgress
          claimed={kpis.earlyAdoptersClaimed}
          total={kpis.earlyAdoptersTotal}
        />
      </div>

      <section>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 14,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--display)",
              fontWeight: 600,
              fontSize: 18,
              color: "#111111",
            }}
          >
            Dernières commandes
          </h2>
          <a
            href="/admin/commandes"
            style={{
              fontFamily: "var(--body)",
              fontSize: 13,
              color: "#111111",
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
          >
            Voir tout →
          </a>
        </div>
        <RecentOrdersTable orders={recent} />
      </section>
    </>
  );
}
