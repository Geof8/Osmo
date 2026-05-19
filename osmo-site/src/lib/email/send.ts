import "server-only";
import type { ReactElement } from "react";
import { getResend, getFromEmail, getReplyTo } from "./resend-client";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

// Next.js's SWC loader rejects a static `import` of react-dom/server because
// it could end up in a client bundle. This file is server-only (see the
// `server-only` import above), so resolve react-dom/server through a dynamic
// require that the static analyzer ignores.
function renderEmailHtml(react: ReactElement): string {
  const mod = eval("require")("react-dom/server") as {
    renderToStaticMarkup: (el: ReactElement) => string;
  };
  return mod.renderToStaticMarkup(react);
}

export type EmailType =
  | "order_confirmation"
  | "abandoned_cart_1h"
  | "abandoned_cart_24h"
  | "milestone_reached"
  | "order_shipped"
  | "inventory_alert";

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
    await supabase.from("email_logs").insert({
      recipient,
      type,
      status,
      meta: meta ?? null,
    });
  } catch (err) {
    console.error("email_logs insert failed:", err);
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

  const html = renderEmailHtml(react);
  const from = getFromEmail();
  const replyTo = getReplyTo();

  try {
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
