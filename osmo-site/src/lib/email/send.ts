import "server-only";
import type { ReactElement } from "react";
import { getResend, getFromEmail, getReplyTo } from "./resend-client";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

// SWC rejects a static `import` of react-dom/server in any file that could
// be reached from a client boundary. This file is server-only, so we resolve
// via async `import()` — Vercel's @vercel/nft can trace this form (unlike
// `eval("require")`), which keeps react-dom in the lambda bundle.
async function renderEmailHtml(react: ReactElement): Promise<string> {
  const mod = await import("react-dom/server");
  return mod.renderToStaticMarkup(react);
}

export type EmailType =
  | "order_confirmation"
  | "abandoned_cart_1h"
  | "abandoned_cart_24h"
  | "milestone_reached"
  | "order_in_production"
  | "order_shipped"
  | "order_delivered"
  | "delivery_late_alert"
  | "inventory_alert"
  | "waitlist_welcome"
  | "newsletter_welcome"
  | "newsletter_preview"
  | "newsletter_send";

export type EmailStatus = "sent" | "failed" | "skipped_no_provider";

type SendArgs = {
  to: string;
  type: EmailType;
  subject: string;
  react: ReactElement;
  meta?: Record<string, unknown>;
};

type SendResult = {
  status: EmailStatus;
  error?: string;
  id?: string;
};

async function logAttempt(
  recipient: string,
  type: EmailType,
  status: EmailStatus,
  meta: Record<string, unknown> | undefined,
) {
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("email_logs").insert({
      recipient,
      type,
      status,
      meta: meta ?? null,
    });
    if (error) {
      console.error("email_logs insert returned error:", error);
    }
  } catch (err) {
    console.error("email_logs insert threw:", err);
  }
}

export async function sendEmail({
  to,
  type,
  subject,
  react,
  meta,
}: SendArgs): Promise<SendResult> {
  const resend = getResend();
  if (!resend) {
    await logAttempt(to, type, "skipped_no_provider", { subject, ...meta });
    return { status: "skipped_no_provider" };
  }

  const from = getFromEmail();
  const replyTo = getReplyTo();

  try {
    const html = await renderEmailHtml(react);
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });
    if (error) {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message: unknown }).message)
          : "Resend error";
      await logAttempt(to, type, "failed", { subject, error: message, ...meta });
      return { status: "failed", error: message };
    }
    await logAttempt(to, type, "sent", {
      subject,
      resend_id: data?.id ?? null,
      ...meta,
    });
    return { status: "sent", id: data?.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown send error";
    await logAttempt(to, type, "failed", { subject, error: message, ...meta });
    return { status: "failed", error: message };
  }
}
