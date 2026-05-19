import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { fetchAdminNotifications } from "@/lib/admin-queries";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const notifications = await fetchAdminNotifications();
  return NextResponse.json({ notifications });
}
