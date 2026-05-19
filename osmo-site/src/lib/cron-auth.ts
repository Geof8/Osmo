import type { NextRequest } from "next/server";

/**
 * Vercel cron requests include `Authorization: Bearer <CRON_SECRET>`.
 * Returns true when the header matches the env secret, or when no secret
 * is configured (dev/local). In production, set CRON_SECRET to lock it down.
 */
export function isAuthorizedCron(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  const header = req.headers.get("authorization") || "";
  return header === `Bearer ${secret}`;
}
