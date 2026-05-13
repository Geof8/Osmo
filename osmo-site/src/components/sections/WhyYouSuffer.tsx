"use client";

import Image from "next/image";
import FadeUp from "@/components/FadeUp";
import { FONTS } from "@/lib/constants";

export default function WhyYouSuffer() {
  return (
    <section
      className="bg-[var(--paper-2)] border-b border-[var(--rule)] relative z-[5]"
      style={{ padding: "80px 0" }}
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-20 items-center">
          {/* Left column — text */}
          <div>
            <FadeUp>
              <h2
                style={{
                  fontFamily: FONTS.display,
                  fontWeight: 900,
                  fontSize: "clamp(36px, 5vw, 72px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.02em",
                }}
              >
                Pourquoi tu souffres
                <br />
                <span className="text-[#C8963E]">le lendemain.</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 17,
                  lineHeight: 1.7,
                  color: "#444444",
                  marginTop: 32,
                  marginBottom: 40,
                  maxWidth: 540,
                }}
              >
                L&apos;alcool est un diurétique. En quelques heures,
                il élimine sodium, potassium et magnésium —
                les minéraux essentiels au fonctionnement
                de ton corps. Sans eux, ton cerveau tourne
                au ralenti. Tes muscles sont lourds.
              </p>
            </FadeUp>

            <FadeUp delay={0.15}>
              <blockquote
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 24,
                  fontWeight: 700,
                  lineHeight: 1.4,
                  color: "#111111",
                  borderLeft: "3px solid #C8963E",
                  paddingLeft: 20,
                  marginBottom: 32,
                  maxWidth: 540,
                }}
              >
                Ce n&apos;est pas un remède miracle.
                <br />
                C&apos;est de la biochimie.
              </blockquote>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div
                style={{
                  backgroundColor: "#FFF8EE",
                  borderLeft: "3px solid #C8963E",
                  padding: "20px 24px",
                  maxWidth: 540,
                }}
              >
                <p
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 15,
                    fontWeight: 500,
                    color: "#111111",
                    lineHeight: 1.6,
                  }}
                >
                  OSMO rétablit l&apos;équilibre — 5 actifs cliniques
                  reconstituent ce que l&apos;alcool a éliminé,
                  pendant votre sommeil.
                </p>
              </div>
            </FadeUp>
          </div>

          {/* Right column — infographic */}
          <FadeUp delay={0.2}>
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-[320px] lg:max-w-[420px]">
                <Image
                  src="/images/infographic.png"
                  alt="Schéma explicatif — problème et solution OSMO"
                  width={420}
                  height={420}
                  className="w-full h-auto"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
