import { Resend } from 'resend';

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Osmo <contact@osmo-lab.fr>';
const REPLY_TO = process.env.RESEND_REPLY_TO || 'contact@osmo-lab.fr';

let resendClient: Resend | null = null;
function getResend(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error('RESEND_API_KEY is not defined');
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

interface SendEmailResult {
  success: boolean;
  id?: string;
  error?: string;
}

export async function sendEmail({
  to,
  subject,
  html,
  replyTo = REPLY_TO,
}: SendEmailParams): Promise<SendEmailResult> {
  try {
    const { data, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      replyTo,
    });

    if (error) {
      console.error('[email] Resend error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[email] Send failed:', message);
    return { success: false, error: message };
  }
}
