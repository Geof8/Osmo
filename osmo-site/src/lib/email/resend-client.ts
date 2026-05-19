import { Resend } from "resend";

let _resend: Resend | null = null;
let _resolved = false;

export function getResend(): Resend | null {
  if (_resolved) return _resend;
  _resolved = true;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  _resend = new Resend(key);
  return _resend;
}

export function getFromEmail(): string {
  return process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
}

export function getReplyTo(): string | undefined {
  return process.env.RESEND_REPLY_TO || undefined;
}
