import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import {
  ensureAutomationsSeeded,
  listAutomations,
} from "@/lib/automations/runner";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;
  await ensureAutomationsSeeded();
  const automations = await listAutomations();
  return NextResponse.json({ automations });
}
