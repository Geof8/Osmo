import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { computeRemaining } from "@/lib/supabase";
import { sendEmail } from "@/lib/email/send";
import { InventoryAlert } from "@/lib/email/templates/InventoryAlert";

const ALERT_TYPE = "inventory_alert" as const;
const COOLDOWN_HOURS = 24;

async function getSetting(key: string): Promise<string | null> {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("settings")
    .select("value")
    .eq("key", key)
    .maybeSingle();
  return (data as { value: string } | null)?.value ?? null;
}

async function getPaidOrdersCount(): Promise<number> {
  const supabase = getSupabaseAdmin();
  const { count } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .eq("status", "paid");
  return count ?? 0;
}

async function alertSentRecently(): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const since = new Date(
    Date.now() - COOLDOWN_HOURS * 60 * 60 * 1000,
  ).toISOString();
  const { count } = await supabase
    .from("email_logs")
    .select("*", { count: "exact", head: true })
    .eq("type", ALERT_TYPE)
    .eq("status", "sent")
    .gte("sent_at", since);
  return (count ?? 0) > 0;
}

export async function checkInventoryAndAlert(): Promise<void> {
  try {
    const [thresholdRaw, contactEmail, count] = await Promise.all([
      getSetting("stock_alert_threshold"),
      getSetting("email_contact"),
      getPaidOrdersCount(),
    ]);

    const threshold = thresholdRaw ? parseInt(thresholdRaw, 10) : NaN;
    if (!Number.isFinite(threshold) || threshold <= 0) return;
    if (!contactEmail) return;

    const { remaining, displayedSold } = computeRemaining(count);
    if (remaining > threshold) return;

    if (await alertSentRecently()) return;

    await sendEmail({
      to: contactEmail,
      type: ALERT_TYPE,
      subject: `⚠️ OSMO — plus que ${remaining} places Early Adopters`,
      react: InventoryAlert({
        remaining,
        threshold,
        totalClaimed: displayedSold,
      }),
      meta: { remaining, threshold, claimed: displayedSold },
    });
  } catch (err) {
    console.error("checkInventoryAndAlert failed:", err);
  }
}
