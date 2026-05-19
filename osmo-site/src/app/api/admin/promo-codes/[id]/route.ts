import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { requireAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function fetchRow(id: string) {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("promo_codes")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  return data as
    | {
        id: string;
        code: string;
        active: boolean;
        stripe_coupon_id: string | null;
        stripe_promotion_code_id: string | null;
      }
    | null;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const unauth = await requireAdmin(req);
  if (unauth) return unauth;

  let body: { active?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (typeof body.active !== "boolean") {
    return NextResponse.json(
      { error: "Champ `active` requis (boolean)" },
      { status: 400 },
    );
  }

  const row = await fetchRow(params.id);
  if (!row) {
    return NextResponse.json({ error: "Code introuvable" }, { status: 404 });
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("promo_codes")
    .update({ active: body.active })
    .eq("id", row.id);
  if (error) {
    console.error("promo-codes PATCH:", error);
    return NextResponse.json({ error: "Échec de mise à jour" }, { status: 500 });
  }

  // Mirror to Stripe so the promotion code can't be redeemed while inactive.
  if (row.stripe_promotion_code_id) {
    try {
      const stripe = getStripe();
      await stripe.promotionCodes.update(row.stripe_promotion_code_id, {
        active: body.active,
      });
    } catch (err) {
      console.error("promo-codes PATCH Stripe sync:", err);
      // DB already updated; surface a soft warning but keep the change.
      return NextResponse.json({
        ok: true,
        warning: "Mise à jour DB OK, mais synchronisation Stripe échouée",
      });
    }
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const unauth = await requireAdmin(req);
  if (unauth) return unauth;

  const row = await fetchRow(params.id);
  if (!row) {
    return NextResponse.json({ error: "Code introuvable" }, { status: 404 });
  }

  // Stripe doesn't allow deleting promotion codes; deactivate it first.
  if (row.stripe_promotion_code_id) {
    try {
      const stripe = getStripe();
      await stripe.promotionCodes.update(row.stripe_promotion_code_id, {
        active: false,
      });
    } catch (err) {
      console.error("promo-codes DELETE Stripe deactivate:", err);
    }
  }
  if (row.stripe_coupon_id) {
    try {
      const stripe = getStripe();
      await stripe.coupons.del(row.stripe_coupon_id);
    } catch (err) {
      console.error("promo-codes DELETE Stripe coupon:", err);
    }
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("promo_codes")
    .delete()
    .eq("id", row.id);
  if (error) {
    console.error("promo-codes DELETE:", error);
    return NextResponse.json({ error: "Suppression impossible" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
