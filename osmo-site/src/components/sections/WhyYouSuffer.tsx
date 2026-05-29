"use client";

import Image from "next/image";
import FadeUp from "@/components/ui/FadeUp";
import { FONTS } from "@/lib/constants";

export default function WhyYouSuffer() {
  return (
    <section
      className="relative z-[5]"
      style={{ padding: "clamp(72px, 10vw, 100px) 0", background: "#FFFFFF", borderBottom: "1px solid #E8E8E8" }}
    >
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left column: title + text + tagline */}
          <div>
            <FadeUp>
              <h2
                style={{
                  fontFamily: FONTS.display,
                  fontWeight: 800,
                  fontSize: "clamp(28px, 7vw, 72px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.02em",
                  color: "#111111",
                }}
              >
                Pourquoi tu souffres
                <br />
                <span style={{ fontStyle: "italic", color: "#111111" }}>le lendemain.</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.08}>
              <p
                style={{
                  fontFamily: FONTS.display,
                  fontSize: "clamp(18px, 4.2vw, 22px)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  lineHeight: 1.45,
                  color: "#111111",
                  letterSpacing: "-0.01em",
                  maxWidth: 540,
                  marginTop: "clamp(24px, 4vw, 32px)",
                  paddingLeft: 16,
                  borderLeft: "2px solid #C8963E",
                }}
              >
                Il est 7h30. Tu regardes ton téléphone.
                <br />
                Réunion dans 2 heures. Tête qui tourne.
                <br />
                Bouche sèche. Tout pour être au top.
                <br />
                Rien pour l&apos;être vraiment.
              </p>
            </FadeUp>

            <FadeUp delay={0.12}>
              <p
                style={{
                  fontFamily: FONTS.body,
                  fontSize: "clamp(14px, 3.4vw, 16px)",
                  fontWeight: 400,
                  lineHeight: 1.65,
                  color: "#444444",
                  maxWidth: 540,
                  marginTop: "clamp(20px, 3vw, 28px)",
                }}
              >
                L&apos;alcool est un diurétique. En quelques heures,
                il élimine sodium, potassium et magnésium,
                les minéraux dont ton corps a besoin pour fonctionner.
                Sans eux, ton cerveau tourne au ralenti,
                tes muscles sont lourds. OSMO reconstitue
                ce que l&apos;alcool a éliminé, pendant ton sommeil.
              </p>
            </FadeUp>

            <FadeUp delay={0.15}>
              <p
                style={{
                  fontFamily: FONTS.display,
                  fontSize: "clamp(20px, 5vw, 32px)",
                  fontWeight: 800,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  marginTop: "clamp(24px, 4vw, 36px)",
                  maxWidth: 540,
                  color: "#111111",
                }}
              >
                Ce n&apos;est pas un remède miracle.
                <br />
                <span style={{ color: "#111111", fontWeight: 900 }}>C&apos;est de la biochimie.</span>
              </p>
            </FadeUp>
          </div>

          {/* Right column: infographic, aligned to top */}
          <FadeUp delay={0.2}>
            <div className="flex justify-center">
              <div
                className="w-full max-w-[340px] lg:max-w-[560px] mx-auto overflow-hidden"
                style={{ borderRadius: 12 }}
              >
                <Image
                  src="/images/infographic.png"
                  alt="Schéma explicatif, problème et solution OSMO"
                  width={560}
                  height={560}
                  className="w-full h-auto mx-auto"
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
