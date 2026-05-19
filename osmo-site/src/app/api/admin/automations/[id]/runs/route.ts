import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { listAutomationRuns } from "@/lib/automations/runner";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;
  const runs = await listAutomationRuns(params.id, 50);
  return NextResponse.json({ runs });
}
