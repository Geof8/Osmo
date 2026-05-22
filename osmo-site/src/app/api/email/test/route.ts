import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');

    if (secret !== process.env.EMAIL_TEST_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await sendEmail({
      to: 'g.debrion@orange.fr',
      subject: '✅ Osmo — Test Resend depuis Vercel',
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h1 style="color: #000;">Osmo Recovery</h1>
          <p>Si tu lis cet email, la chaîne complète fonctionne :</p>
          <ul>
            <li>✅ DNS Vercel configurés</li>
            <li>✅ Domaine osmo-lab.fr vérifié dans Resend</li>
            <li>✅ Variables d'env Vercel actives</li>
            <li>✅ Helper lib/email.ts opérationnel</li>
          </ul>
          <p style="color: #888; font-size: 14px;">Envoyé à ${new Date().toLocaleString('fr-FR')}</p>
        </div>
      `,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      id: result.id,
      message: 'Email envoyé, check ta boîte (et tes spams au cas où).',
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
