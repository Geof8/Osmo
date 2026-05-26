import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { fetchWaitlistForExport } from "@/lib/admin-waitlist";
import { toCSV } from "@/lib/admin-queries";
import { formatDate } from "@/lib/format";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function formatSource(s: string) {
  if (s === "maintenance") return "Page maintenance";
  if (s === "lot2-waitlist") return "Liste d'attente Lot 2";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export async function GET(req: NextRequest) {
  const unauth = await requireAdmin(req);
  if (unauth) return unauth;

  const q = req.nextUrl.searchParams.get("q") ?? undefined;
  const entries = await fetchWaitlistForExport({ q: q ?? undefined });
  const rows = entries.map((r) => ({
    date: formatDate(r.created_at),
    email: r.email,
    source: formatSource(r.source),
  }));

  const csv = toCSV(rows);
  const filename = `osmo-waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
  return new NextResponse(`﻿${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
