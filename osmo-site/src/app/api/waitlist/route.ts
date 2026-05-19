import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

    const { error } = await supabase.from("waitlist").insert({
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

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }
}
