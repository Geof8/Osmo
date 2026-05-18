import { NextRequest, NextResponse } from "next/server";
import { fetchCustomers, toCSV } from "@/lib/admin-queries";
import { requireAdmin } from "@/lib/admin-auth";
import { formatDate } from "@/lib/format";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const unauth = await requireAdmin(req);
  if (unauth) return unauth;

  const search = req.nextUrl.searchParams.get("q") ?? "";
  const { customers } = await fetchCustomers({ search });

  const rows = customers.map((c) => ({
    prenom: c.first_name ?? "",
    nom: c.last_name ?? "",
    email: c.email,
    derniere_commande: formatDate(c.last_order_at),
    total_eur: (c.total_cents / 100).toFixed(2),
    nb_commandes: c.orders_count,
    statut: c.status,
  }));

  const csv = toCSV(rows);
  const filename = `osmo-clients-${new Date().toISOString().slice(0, 10)}.csv`;
  return new NextResponse(`﻿${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
