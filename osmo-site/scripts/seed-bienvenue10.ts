/**
 * Sync the BIENVENUE10 promo row in `promo_codes` with Stripe.
 *
 * The row is seeded in 0001_admin_backoffice.sql with NULL Stripe IDs, so
 * /api/promo/validate rejects it with `not_synced`. This script creates the
 * matching Stripe coupon + promotion code and updates the row.
 *
 * Run once locally (or in CI) AFTER STRIPE_SECRET_KEY + Supabase service-role
 * env vars are populated:
 *   pnpm tsx osmo-site/scripts/seed-bienvenue10.ts
 *   # or
 *   npx tsx osmo-site/scripts/seed-bienvenue10.ts
 *
 * Idempotent: if Stripe IDs already exist on the row, the script no-ops.
 */
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

const CODE = "BIENVENUE10";

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
      `Row for ${CODE} not found. Apply 0001_admin_backoffice.sql first.`,
    );
  }

  const row = data as PromoRow;
  if (row.stripe_promotion_code_id && row.stripe_coupon_id) {
    console.log(
      `[seed-bienvenue10] ${CODE} already synced (promotion_code=${row.stripe_promotion_code_id}). No-op.`,
    );
    return;
  }

  console.log(`[seed-bienvenue10] Creating Stripe coupon for ${CODE}…`);
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

  console.log(
    `[seed-bienvenue10] Creating Stripe promotion code (coupon=${coupon.id})…`,
  );
  const promotionCode = await stripe.promotionCodes.create({
    coupon: coupon.id,
    code: CODE,
    metadata: { code: CODE },
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
    `[seed-bienvenue10] Done. coupon=${coupon.id} promotion_code=${promotionCode.id}`,
  );
}

main().catch((err) => {
  console.error("[seed-bienvenue10] FAILED:", err);
  process.exit(1);
});
