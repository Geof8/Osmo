import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { searchEverything } from "@/lib/admin-queries";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";
  const results = await searchEverything(q);
  return NextResponse.json({ results });
}
