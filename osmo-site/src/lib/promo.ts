import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export type PromoDiscountType = "percent" | "amount";

export type PromoRow = {
  id: string;
  code: string;
  stripe_promotion_code_id: string | null;
  stripe_coupon_id: string | null;
  discount_type: PromoDiscountType;
  discount_value: number;
  usage_count: number;
  usage_limit: number | null;
  expires_at: string | null;
  active: boolean;
  created_at: string;
};

export type ValidatedPromo = {
  id: string;
  code: string;
  discount_type: PromoDiscountType;
  discount_value: number;
  stripe_promotion_code_id: string;
};

export type ValidationError =
  | "unknown_code"
  | "inactive"
  | "expired"
  | "exhausted"
  | "not_synced";

export type ValidationResult =
  | { valid: true; promo: ValidatedPromo }
  | { valid: false; reason: ValidationError };

export function normaliseCode(input: string): string {
  return input.trim().toUpperCase();
}

export async function validatePromoCode(
  rawCode: string,
): Promise<ValidationResult> {
  const code = normaliseCode(rawCode);
  if (!code) return { valid: false, reason: "unknown_code" };

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("promo_codes")
    .select("*")
    .eq("code", code)
    .maybeSingle();

  if (error || !data) return { valid: false, reason: "unknown_code" };
  const row = data as PromoRow;

  if (!row.active) return { valid: false, reason: "inactive" };
  if (row.expires_at && new Date(row.expires_at).getTime() <= Date.now()) {
    return { valid: false, reason: "expired" };
  }
  if (
    row.usage_limit !== null &&
    row.usage_count >= row.usage_limit
  ) {
    return { valid: false, reason: "exhausted" };
  }
  if (!row.stripe_promotion_code_id) {
    return { valid: false, reason: "not_synced" };
  }

  return {
    valid: true,
    promo: {
      id: row.id,
      code: row.code,
      discount_type: row.discount_type,
      discount_value: row.discount_value,
      stripe_promotion_code_id: row.stripe_promotion_code_id,
    },
  };
}

export const VALIDATION_REASON_LABELS: Record<ValidationError, string> = {
  unknown_code: "Code invalide",
  inactive: "Code désactivé",
  expired: "Code expiré",
  exhausted: "Code épuisé",
  not_synced: "Code non synchronisé avec Stripe",
};
