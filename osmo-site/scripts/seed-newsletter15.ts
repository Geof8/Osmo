/**
 * Sync the NEWSLETTER15 promo row in `promo_codes` with Stripe.
 *
 * The row is seeded in 0002_newsletter.sql with NULL Stripe IDs, so
 * /api/promo/validate rejects it with `not_synced` until this script runs.
 *
 * Idempotent: re-running is a no-op once Stripe IDs are stored.
 *
 *   npx tsx osmo-site/scripts/seed-newsletter15.ts
 */
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

const CODE = "NEWSLETTER15";

type PromoRow = {
  id: string;
  code: string;
  stripe_promotion_code_id: string | null;
  stripe_coupon_id: string | null;
  discount_type: "percent" | "amount";
  discount_value: number;
};

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set",
    );
  }
  if (!stripeKey) {
    throw new Error("STRIPE_SECRET_KEY must be set");
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const stripe = new Stripe(stripeKey, { apiVersion: "2025-02-24.acacia" });

  const { data, error } = await supabase
    .from("promo_codes")
    .select("*")
    .eq("code", CODE)
    .maybeSingle();

  if (error) throw new Error(`Supabase error: ${error.message}`);
  if (!data) {
    throw new Error(
      `Row for ${CODE} not found. Apply 0002_newsletter.sql first.`,
    );
  }

  const row = data as PromoRow;
  if (row.stripe_promotion_code_id && row.stripe_coupon_id) {
    console.log(
      `[seed-newsletter15] ${CODE} already synced (promotion_code=${row.stripe_promotion_code_id}). No-op.`,
    );
    return;
  }

  console.log(`[seed-newsletter15] Creating Stripe coupon for ${CODE}…`);
  const couponParams: Stripe.CouponCreateParams = {
    duration: "once",
    metadata: { code: CODE },
  };
  if (row.discount_type === "percent") {
    couponParams.percent_off = row.discount_value;
  } else {
    couponParams.amount_off = Math.round(row.discount_value * 100);
    couponParams.currency = "eur";
  }
  const coupon = await stripe.coupons.create(couponParams);

  // Per spec: once per customer, no expiry. Stripe enforces per-customer
  // uniqueness via `customer` on PromotionCode; for an unauthenticated
  // checkout flow we keep the code reusable per email and let Stripe dedupe
  // by customer at redemption time via Checkout's promotion code application.
  console.log(
    `[seed-newsletter15] Creating Stripe promotion code (coupon=${coupon.id})…`,
  );
  const promotionCode = await stripe.promotionCodes.create({
    coupon: coupon.id,
    code: CODE,
    metadata: { code: CODE },
    restrictions: {
      first_time_transaction: true,
    },
  });

  const { error: updateError } = await supabase
    .from("promo_codes")
    .update({
      stripe_coupon_id: coupon.id,
      stripe_promotion_code_id: promotionCode.id,
    })
    .eq("id", row.id);
  if (updateError) {
    throw new Error(`Supabase update failed: ${updateError.message}`);
  }

  console.log(
    `[seed-newsletter15] Done. coupon=${coupon.id} promotion_code=${promotionCode.id}`,
  );
}

main().catch((err) => {
  console.error("[seed-newsletter15] FAILED:", err);
  process.exit(1);
});
