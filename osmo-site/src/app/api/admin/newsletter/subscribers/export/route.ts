import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { fetchSubscribers } from "@/lib/admin-newsletter";
import { toCSV } from "@/lib/admin-queries";
import { formatDate } from "@/lib/format";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const unauth = await requireAdmin(req);
  if (unauth) return unauth;

  const subscribers = await fetchSubscribers();
  const rows = subscribers.map((s) => ({
    email: s.email,
    date_inscription: formatDate(s.subscribed_at),
    statut: s.active ? "actif" : "désabonné",
    promo_envoyé: s.promo_sent ? "oui" : "non",
  }));

  const csv = toCSV(rows);
  const filename = `osmo-newsletter-${new Date().toISOString().slice(0, 10)}.csv`;
  return new NextResponse(`﻿${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
