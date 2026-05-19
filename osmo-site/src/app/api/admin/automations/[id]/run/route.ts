import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getAutomationDef } from "@/lib/automations";
import { getAutomation, runAutomation } from "@/lib/automations/runner";

export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;
  const def = getAutomationDef(params.id);
  if (!def) {
    return NextResponse.json({ error: "Unknown automation" }, { status: 404 });
  }
  const row = await getAutomation(params.id);
  const result = await runAutomation(def, row, {
    event: "manual.test",
  });
  return NextResponse.json({ result });
}
