import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { sendEmail } from "@/lib/email/send";
import { WaitlistWelcome } from "@/lib/email/templates/WaitlistWelcome";

let cached: SupabaseClient | null = null;
function getSupabase(): SupabaseClient {
  if (cached) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set");
  }
  cached = createClient(url, key);
  return cached;
}

export async function POST(req: NextRequest) {
  try {
    const { email, phone, firstName, lastName, source } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    // firstName/lastName required for the regular waitlist signup,
    // optional for the maintenance-mode email-only capture.
    const isMaintenanceCapture = source === "maintenance";
    if (!isMaintenanceCapture && (!firstName || !lastName)) {
      return NextResponse.json({ error: "Nom et prénom requis" }, { status: 400 });
    }

    const { error } = await getSupabase().from("waitlist").insert({
      email,
      phone: phone || null,
      first_name: firstName || null,
      last_name: lastName || null,
      source: source || "website",
    });

    if (error) {
      console.error("Supabase insert error:", error);
      if (error.code === "23505") {
        return NextResponse.json({ error: "Cet email est déjà inscrit" }, { status: 409 });
      }
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }

    // Best-effort welcome email. Never block the response on email failure —
    // signup is the contract, the email is a nice-to-have.
    const mail = await sendEmail({
      to: email,
      type: "waitlist_welcome",
      subject: "Bienvenue chez OSMO 👋",
      react: WaitlistWelcome(),
      meta: { source: source || "website" },
    });
    if (mail.status !== "sent") {
      console.warn("Waitlist welcome email:", mail.status, mail.error);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }
}
