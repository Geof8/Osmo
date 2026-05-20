"use client";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import KpiCard from "@/components/admin/KpiCard";
import { useLiveActiveSubscribers } from "./useLiveActiveSubscribers";

export default function NewsletterCountsLive({
  initialActive,
  initialTotal,
  sentCount,
}: {
  initialActive: number;
  initialTotal: number;
  sentCount: number;
}) {
  const { active, total } = useLiveActiveSubscribers(
    initialActive,
    initialTotal,
  );
  const unsubscribed = Math.max(0, total - active);

  return (
    <>
      <AdminPageHeader
        title="Newsletter"
        subtitle={`${active} abonné${active === 1 ? "" : "s"} actif${active === 1 ? "" : "s"}`}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          marginBottom: 28,
        }}
      >
        <KpiCard
          label="Abonnés actifs"
          value={active.toString()}
          accent
          hint={`${total} inscription${total === 1 ? "" : "s"} total`}
        />
        <KpiCard label="Newsletters envoyées" value={sentCount.toString()} />
        <KpiCard label="Désabonnés" value={unsubscribed.toString()} />
      </div>
    </>
  );
}
