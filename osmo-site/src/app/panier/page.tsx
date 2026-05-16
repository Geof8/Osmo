"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { usePrice } from "@/hooks/usePrice";
import { PRODUCT, FONTS, ANIMATION_CONFIG } from "@/lib/constants";

interface ShippingForm {
  email: string;
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface FormErrors {
  [key: string]: string;
}

function validateForm(form: ShippingForm): FormErrors {
  const errors: FormErrors = {};
  if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Email invalide";
  }
  if (!form.fullName || form.fullName.length < 2) {
    errors.fullName = "Nom requis (min. 2 caractères)";
  }
  if (!form.address || form.address.length < 5) {
    errors.address = "Adresse requise (min. 5 caractères)";
  }
  if (!form.city || form.city.length < 2) {
    errors.city = "Ville requise";
  }
  if (!form.postalCode || !/^\d{5}$/.test(form.postalCode)) {
    errors.postalCode = "Code postal invalide (5 chiffres)";
  }
  if (!form.country) {
    errors.country = "Pays requis";
  }
  return errors;
}

export default function PanierPage() {
  const { quantity, increment, decrement, setQuantity } = useCart();
  const { unitPrice, isEarlyAdopter, loading: priceLoading } = usePrice();
  const [form, setForm] = useState<ShippingForm>({
    email: "",
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "France",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const total = quantity * unitPrice;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    const payload = {
      ...form,
      quantity,
      unitPrice,
      total,
    };
    // Placeholder pour Stripe Checkout
    console.log("Stripe checkout payload:", payload);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitting(false);
  }

  if (quantity === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-5">
        <p
          className="text-[var(--ink-2)]"
          style={{ fontFamily: FONTS.mono, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase" }}
        >
          Votre panier est vide
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 min-h-[48px] bg-[var(--amber)] text-white border border-[var(--amber)] hover:bg-[var(--ink)] hover:border-[var(--ink)] transition-all duration-200"
          style={{ fontFamily: FONTS.mono, fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase" }}
        >
          ← Retour à l&apos;accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <div className="max-w-2xl mx-auto px-5 py-16 sm:py-24">
        {/* Header */}
        <motion.div {...ANIMATION_CONFIG.fadeUp}>
          <Link
            href="/"
            className="text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors"
            style={{ fontFamily: FONTS.mono, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}
          >
            ← Retour
          </Link>
          <h1
            className="mt-6"
            style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1, letterSpacing: "-0.02em" }}
          >
            Votre commande
          </h1>
        </motion.div>

        <form onSubmit={handleCheckout} className="mt-10 flex flex-col gap-10">
          {/* Product Recap */}
          <motion.section
            {...ANIMATION_CONFIG.fadeUp}
            className="border border-[var(--rule)] p-6 sm:p-8"
          >
            <div className="flex gap-6 items-center">
              <Image
                src={PRODUCT.image}
                alt={`${PRODUCT.name} — ${PRODUCT.weight}`}
                width={100}
                height={100}
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h2
                  style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 18 }}
                >
                  {PRODUCT.name} · {PRODUCT.weight}
                </h2>
                <div className="mt-1 flex items-center gap-2">
                  {priceLoading ? (
                    <span className="text-[var(--ink-2)]" style={{ fontFamily: FONTS.mono, fontSize: 12 }}>…</span>
                  ) : (
                    <>
                      <span style={{ fontFamily: FONTS.mono, fontSize: 14, fontWeight: 500 }}>{unitPrice} €</span>
                      <span
                        className="px-2 py-0.5 text-white"
                        style={{
                          fontFamily: FONTS.mono,
                          fontSize: 9,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          backgroundColor: isEarlyAdopter ? "var(--amber)" : "var(--ink)",
                        }}
                      >
                        {isEarlyAdopter ? "Early Adopter" : "Public"}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Quantity selector */}
            <div className="mt-6 pt-6 border-t border-[var(--rule)] flex items-center gap-4">
              <span
                className="text-[var(--ink-2)]"
                style={{ fontFamily: FONTS.mono, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}
              >
                Quantité
              </span>
              <div className="flex items-center border border-[var(--rule)]">
                <button
                  type="button"
                  onClick={decrement}
                  disabled={quantity <= 1}
                  className="w-10 h-10 flex items-center justify-center text-[var(--ink)] hover:bg-[var(--paper-2)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ fontFamily: FONTS.mono, fontSize: 16 }}
                >
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 h-10 text-center border-x border-[var(--rule)] bg-transparent outline-none"
                  style={{ fontFamily: FONTS.mono, fontSize: 14 }}
                />
                <button
                  type="button"
                  onClick={increment}
                  className="w-10 h-10 flex items-center justify-center text-[var(--ink)] hover:bg-[var(--paper-2)] transition-colors"
                  style={{ fontFamily: FONTS.mono, fontSize: 16 }}
                >
                  +
                </button>
              </div>
            </div>
          </motion.section>

          {/* Shipping Form */}
          <motion.section {...ANIMATION_CONFIG.fadeUp} className="flex flex-col gap-5">
            <h2
              style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 20 }}
            >
              Livraison
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block mb-1.5" style={{ fontFamily: FONTS.mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-2)" }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  className="w-full h-12 px-4 border border-[var(--rule)] bg-transparent outline-none focus:border-[var(--amber)] transition-colors"
                  style={{ fontFamily: FONTS.mono, fontSize: 13 }}
                  aria-invalid={!!errors.email}
                />
                {errors.email && <p className="mt-1 text-red-600" style={{ fontFamily: FONTS.mono, fontSize: 11 }}>{errors.email}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block mb-1.5" style={{ fontFamily: FONTS.mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-2)" }}>
                  Nom complet
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Prénom Nom"
                  className="w-full h-12 px-4 border border-[var(--rule)] bg-transparent outline-none focus:border-[var(--amber)] transition-colors"
                  style={{ fontFamily: FONTS.mono, fontSize: 13 }}
                  aria-invalid={!!errors.fullName}
                />
                {errors.fullName && <p className="mt-1 text-red-600" style={{ fontFamily: FONTS.mono, fontSize: 11 }}>{errors.fullName}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block mb-1.5" style={{ fontFamily: FONTS.mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-2)" }}>
                  Adresse
                </label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="12 rue de la Paix"
                  className="w-full h-12 px-4 border border-[var(--rule)] bg-transparent outline-none focus:border-[var(--amber)] transition-colors"
                  style={{ fontFamily: FONTS.mono, fontSize: 13 }}
                  aria-invalid={!!errors.address}
                />
                {errors.address && <p className="mt-1 text-red-600" style={{ fontFamily: FONTS.mono, fontSize: 11 }}>{errors.address}</p>}
              </div>

              <div>
                <label className="block mb-1.5" style={{ fontFamily: FONTS.mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-2)" }}>
                  Ville
                </label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Paris"
                  className="w-full h-12 px-4 border border-[var(--rule)] bg-transparent outline-none focus:border-[var(--amber)] transition-colors"
                  style={{ fontFamily: FONTS.mono, fontSize: 13 }}
                  aria-invalid={!!errors.city}
                />
                {errors.city && <p className="mt-1 text-red-600" style={{ fontFamily: FONTS.mono, fontSize: 11 }}>{errors.city}</p>}
              </div>

              <div>
                <label className="block mb-1.5" style={{ fontFamily: FONTS.mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-2)" }}>
                  Code postal
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  placeholder="75001"
                  className="w-full h-12 px-4 border border-[var(--rule)] bg-transparent outline-none focus:border-[var(--amber)] transition-colors"
                  style={{ fontFamily: FONTS.mono, fontSize: 13 }}
                  aria-invalid={!!errors.postalCode}
                />
                {errors.postalCode && <p className="mt-1 text-red-600" style={{ fontFamily: FONTS.mono, fontSize: 11 }}>{errors.postalCode}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block mb-1.5" style={{ fontFamily: FONTS.mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-2)" }}>
                  Pays
                </label>
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full h-12 px-4 border border-[var(--rule)] bg-transparent outline-none focus:border-[var(--amber)] transition-colors appearance-none"
                  style={{ fontFamily: FONTS.mono, fontSize: 13 }}
                >
                  <option value="France">France</option>
                  <option value="Belgique">Belgique</option>
                  <option value="Suisse">Suisse</option>
                  <option value="Luxembourg">Luxembourg</option>
                  <option value="Canada">Canada</option>
                </select>
                {errors.country && <p className="mt-1 text-red-600" style={{ fontFamily: FONTS.mono, fontSize: 11 }}>{errors.country}</p>}
              </div>
            </div>
          </motion.section>

          {/* Order Summary */}
          <motion.section {...ANIMATION_CONFIG.fadeUp} className="border-t border-[var(--rule)] pt-8">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between" style={{ fontFamily: FONTS.mono, fontSize: 13 }}>
                <span className="text-[var(--ink-2)]">{quantity} × {unitPrice} €</span>
                <span>{total} €</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-[var(--rule)]" style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 20 }}>
                <span>Total</span>
                <span>{total} €</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || priceLoading}
              className="mt-8 w-full inline-flex items-center justify-center gap-3 px-5 min-h-[56px] bg-[var(--amber)] text-white border border-[var(--amber)] hover:bg-[var(--ink)] hover:border-[var(--ink)] transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                fontFamily: FONTS.mono,
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              {submitting ? "Traitement..." : `Payer · ${total} €`}
              {!submitting && <span aria-hidden="true">→</span>}
            </button>

            <p className="mt-4 text-center text-[var(--ink-2)]" style={{ fontFamily: FONTS.mono, fontSize: 10, letterSpacing: "0.1em" }}>
              Paiement sécurisé · Expédition sous 6 mois max.
            </p>
          </motion.section>
        </form>
      </div>
    </div>
  );
}
