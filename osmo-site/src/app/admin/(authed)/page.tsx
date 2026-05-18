import AdminPageHeader from "@/components/admin/AdminPageHeader";
import KpiCard from "@/components/admin/KpiCard";
import MilestoneProgress from "@/components/admin/MilestoneProgress";
import RecentOrdersTable from "@/components/admin/RecentOrdersTable";
import { fetchKPIs, fetchRecentOrders } from "@/lib/admin-queries";
import { formatEuros } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [kpis, recent] = await Promise.all([fetchKPIs(), fetchRecentOrders(10)]);

  return (
    <>
      <AdminPageHeader title="Bonjour" showDate />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <KpiCard label="Revenus total" value={formatEuros(kpis.revenueCents)} />
        <KpiCard
          label="Commandes total"
          value={kpis.ordersCount.toString()}
          hint={kpis.ordersCount === 0 ? "Aucune commande encore" : undefined}
        />
        <KpiCard
          label="Early Adopters restants"
          value={kpis.earlyAdoptersRemaining.toString()}
          accent
          hint={`${kpis.earlyAdoptersClaimed} / ${kpis.earlyAdoptersTotal} réservés`}
        />
        <KpiCard
          label="Paniers abandonnés (7j)"
          value={kpis.abandonedThisWeek.toString()}
        />
      </div>

      <div style={{ marginBottom: 24 }}>
        <MilestoneProgress
          claimed={kpis.earlyAdoptersClaimed}
          total={kpis.earlyAdoptersTotal}
        />
      </div>

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
          Dernières commandes
        </h2>
        <RecentOrdersTable orders={recent} />
      </section>
    </>
  );
}
