import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ALLOWED_COUNTRIES: Array<
  "FR" | "BE" | "CH" | "LU" | "DE" | "ES" | "IT" | "NL" | "PT"
> = ["FR", "BE", "CH", "LU", "DE", "ES", "IT", "NL", "PT"];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const firstName: string = (body.firstName ?? "").toString().trim();
    const lastName: string = (body.lastName ?? "").toString().trim();
    const email: string = (body.email ?? "").toString().trim().toLowerCase();

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: "Prénom et nom requis" },
        { status: 400 },
      );
    }
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    const priceId = process.env.STRIPE_PRICE_ID;
    if (!priceId) {
      console.error("STRIPE_PRICE_ID is not set");
      return NextResponse.json(
        { error: "Configuration paiement manquante" },
        { status: 500 },
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ??
      req.headers.get("origin") ??
      "http://localhost:3000";

    const supabase = getSupabaseAdmin();
    const { data: inserted, error: insertError } = await supabase
      .from("waitlist")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        source: "early_adopter_purchase",
        status: "pending",
      })
      .select("id")
      .single();

    let waitlistId: string | null = inserted?.id ?? null;

    if (insertError) {
      if (insertError.code === "23505") {
        const { data: existing } = await supabase
          .from("waitlist")
          .select("id")
          .eq("email", email)
          .maybeSingle();
        waitlistId = existing?.id ?? null;
      } else {
        console.error("Supabase insert error:", insertError);
        return NextResponse.json(
          { error: "Erreur serveur" },
          { status: 500 },
        );
      }
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email,
      shipping_address_collection: { allowed_countries: ALLOWED_COUNTRIES },
      phone_number_collection: { enabled: true },
      success_url: `${baseUrl}/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/`,
      locale: "fr",
      metadata: {
        waitlist_id: waitlistId ?? "",
        first_name: firstName,
        last_name: lastName,
        source: "early_adopter_lot_001",
      },
      payment_intent_data: {
        metadata: {
          waitlist_id: waitlistId ?? "",
          source: "early_adopter_lot_001",
        },
      },
    });

    if (waitlistId) {
      await supabase
        .from("waitlist")
        .update({ stripe_session_id: session.id })
        .eq("id", waitlistId);
    }

    if (!session.url) {
      return NextResponse.json(
        { error: "Session Stripe sans URL" },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
