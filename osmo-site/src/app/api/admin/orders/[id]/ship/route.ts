import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { requireAdmin } from "@/lib/admin-auth";
import { fetchOrderById } from "@/lib/admin-queries";
import { sendEmail } from "@/lib/email/send";
import { OrderShipped } from "@/lib/email/templates/OrderShipped";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const unauth = await requireAdmin(req);
  if (unauth) return unauth;

  let body: { tracking_number?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const trackingNumber =
    typeof body.tracking_number === "string"
      ? body.tracking_number.trim()
      : "";
  if (!trackingNumber) {
    return NextResponse.json(
      { error: "Numéro de suivi requis" },
      { status: 400 },
    );
  }

  const order = await fetchOrderById(params.id);
  if (!order) {
    return NextResponse.json(
      { error: "Commande introuvable" },
      { status: 404 },
    );
  }
  if (order.status === "refunded") {
    return NextResponse.json(
      { error: "Commande remboursée — expédition impossible" },
      { status: 400 },
    );
  }

  const supabase = getSupabaseAdmin();
  const wasAlreadyShipped = order.tracking_number !== null;
  const updates: Record<string, string> = { tracking_number: trackingNumber };
  if (!wasAlreadyShipped) {
    updates.shipped_at = new Date().toISOString();
  }

  const { error: updateError } = await supabase
    .from("orders")
    .update(updates)
    .eq("id", order.id);
  if (updateError) {
    console.error("ship: orders update failed", updateError);
    return NextResponse.json(
      { error: "Échec de mise à jour" },
      { status: 500 },
    );
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    req.headers.get("origin") ||
    "https://osmo-lab.fr";

  const result = await sendEmail({
    to: order.email,
    type: "order_shipped",
    subject: "📦 Ta commande OSMO est en route",
    react: OrderShipped({
      firstName: order.first_name,
      trackingNumber,
      baseUrl,
      orderId: order.id,
    }),
    meta: { order_id: order.id, tracking_number: trackingNumber },
  });

  return NextResponse.json({ ok: true, email_status: result.status });
}
