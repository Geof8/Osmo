import { NextRequest, NextResponse } from "next/server";
import {
  VALIDATION_REASON_LABELS,
  validatePromoCode,
} from "@/lib/promo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: { code?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ valid: false, error: "Invalid JSON" }, { status: 400 });
  }
  const code = typeof body.code === "string" ? body.code : "";

  const result = await validatePromoCode(code);
  if (!result.valid) {
    return NextResponse.json({
      valid: false,
      reason: result.reason,
      message: VALIDATION_REASON_LABELS[result.reason],
    });
  }

  // Do not expose the Stripe ID to the client — checkout re-validates server-side.
  return NextResponse.json({
    valid: true,
    code: result.promo.code,
    discount_type: result.promo.discount_type,
    discount_value: result.promo.discount_value,
  });
}
