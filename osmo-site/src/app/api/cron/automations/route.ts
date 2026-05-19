import { NextRequest, NextResponse } from "next/server";
import { ensureAutomationsSeeded, runCronDaily } from "@/lib/automations/runner";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // Vercel cron sends header `Authorization: Bearer ${CRON_SECRET}`
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const header = req.headers.get("authorization") ?? "";
    const expected = `Bearer ${cronSecret}`;
    if (header !== expected) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }
  await ensureAutomationsSeeded();
  const result = await runCronDaily();
  return NextResponse.json(result);
}
