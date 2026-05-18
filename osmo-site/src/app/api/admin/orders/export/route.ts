import { NextRequest, NextResponse } from "next/server";
import { fetchOrders, toCSV, type OrderRow } from "@/lib/admin-queries";
import { requireAdmin } from "@/lib/admin-auth";
import { customerName, formatDate } from "@/lib/format";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normaliseStatus(s: string | null): OrderRow["status"] | "all" {
  if (s === "paid" || s === "refunded" || s === "pending") return s;
  return "all";
}

export async function GET(req: NextRequest) {
  const unauth = await requireAdmin(req);
  if (unauth) return unauth;

  const search = req.nextUrl.searchParams.get("q") ?? "";
  const status = normaliseStatus(req.nextUrl.searchParams.get("status"));

  // Fetch all matching orders in pages of 500.
  const all: OrderRow[] = [];
  let page = 1;
  while (true) {
    const { orders, total, pageSize } = await fetchOrders({ search, status, page });
    all.push(...orders);
    if (all.length >= total || orders.length < pageSize) break;
    page += 1;
    if (page > 50) break; // safety cap (1000 rows)
  }

  const rows = all.map((o) => ({
    id: o.id,
    date: formatDate(o.created_at),
    nom: customerName(o.first_name, o.last_name),
    email: o.email,
    montant_eur: (o.amount_cents / 100).toFixed(2),
    code_promo: o.promo_code ?? "",
    statut: o.status,
    suivi: o.tracking_number ?? "",
    stripe_session_id: o.stripe_session_id,
  }));

  const csv = toCSV(rows);
  const filename = `osmo-commandes-${new Date().toISOString().slice(0, 10)}.csv`;
  return new NextResponse(`﻿${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
