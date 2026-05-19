import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { requireAdmin } from "@/lib/admin-auth";
import { normaliseCode } from "@/lib/promo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CODE_RE = /^[A-Z0-9_-]{3,40}$/;

type CreateBody = {
  code?: string;
  discount_type?: "percent" | "amount";
  discount_value?: number;
  usage_limit?: number | null;
  expires_at?: string | null;
};

export async function GET(req: NextRequest) {
  const unauth = await requireAdmin(req);
  if (unauth) return unauth;

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("promo_codes")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("promo-codes GET:", error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
  return NextResponse.json({ promo_codes: data ?? [] });
}

export async function POST(req: NextRequest) {
  const unauth = await requireAdmin(req);
  if (unauth) return unauth;

  let body: CreateBody;
  try {
    body = (await req.json()) as CreateBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const code = normaliseCode(String(body.code ?? ""));
  if (!CODE_RE.test(code)) {
    return NextResponse.json(
      { error: "Code invalide (3-40 caractères A-Z, 0-9, _, -)" },
      { status: 400 },
    );
  }
  if (body.discount_type !== "percent" && body.discount_type !== "amount") {
    return NextResponse.json(
      { error: "Type de remise invalide" },
      { status: 400 },
    );
  }
  const value = Number(body.discount_value);
  if (!Number.isFinite(value) || value <= 0) {
    return NextResponse.json(
      { error: "Valeur de remise invalide" },
      { status: 400 },
    );
  }
  if (body.discount_type === "percent" && value > 100) {
    return NextResponse.json(
      { error: "Le pourcentage doit être ≤ 100" },
      { status: 400 },
    );
  }
  const usageLimit =
    body.usage_limit === undefined || body.usage_limit === null
      ? null
      : Math.max(1, Math.floor(Number(body.usage_limit)));
  const expiresAt =
    body.expires_at && body.expires_at.length > 0 ? body.expires_at : null;
  if (expiresAt && Number.isNaN(new Date(expiresAt).getTime())) {
    return NextResponse.json(
      { error: "Date d'expiration invalide" },
      { status: 400 },
    );
  }

  const supabase = getSupabaseAdmin();

  // Reject duplicates locally first to avoid orphan Stripe objects
  const { data: existing } = await supabase
    .from("promo_codes")
    .select("id")
    .eq("code", code)
    .maybeSingle();
  if (existing) {
    return NextResponse.json(
      { error: "Ce code existe déjà" },
      { status: 409 },
    );
  }

  const stripe = getStripe();

  let coupon: Stripe.Coupon;
  try {
    const couponParams: Stripe.CouponCreateParams = {
      duration: "once",
      metadata: { code },
    };
    if (body.discount_type === "percent") {
      couponParams.percent_off = value;
    } else {
      couponParams.amount_off = Math.round(value * 100);
      couponParams.currency = "eur";
    }
    coupon = await stripe.coupons.create(couponParams);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur Stripe coupon";
    console.error("promo-codes POST coupon:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }

  let promotionCode: Stripe.PromotionCode;
  try {
    const params: Stripe.PromotionCodeCreateParams = {
      coupon: coupon.id,
      code,
      metadata: { code },
    };
    if (usageLimit !== null) params.max_redemptions = usageLimit;
    if (expiresAt) {
      params.expires_at = Math.floor(new Date(expiresAt).getTime() / 1000);
    }
    promotionCode = await stripe.promotionCodes.create(params);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erreur Stripe promotion code";
    console.error("promo-codes POST promotion:", err);
    // Best-effort cleanup of the orphan coupon
    try {
      await stripe.coupons.del(coupon.id);
    } catch (delErr) {
      console.error("promo-codes POST coupon cleanup failed:", delErr);
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }

  const { data: inserted, error: insertError } = await supabase
    .from("promo_codes")
    .insert({
      code,
      stripe_promotion_code_id: promotionCode.id,
      stripe_coupon_id: coupon.id,
      discount_type: body.discount_type,
      discount_value: Math.round(value),
      usage_limit: usageLimit,
      expires_at: expiresAt,
      active: true,
    })
    .select("*")
    .single();

  if (insertError) {
    console.error("promo-codes POST insert:", insertError);
    return NextResponse.json(
      { error: "Code créé dans Stripe mais échec d'insertion en DB" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, promo_code: inserted });
}
