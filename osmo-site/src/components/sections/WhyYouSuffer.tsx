"use client";

import Image from "next/image";
import FadeUp from "@/components/ui/FadeUp";
import { FONTS } from "@/lib/constants";

export default function WhyYouSuffer() {
  return (
    <section
      className="relative z-[5]"
      style={{ padding: "clamp(56px, 9vw, 80px) 0", background: "#FFFFFF", borderBottom: "1px solid #E0E0E0" }}
    >
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10">
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
                  fontFamily: FONTS.body,
                  fontSize: "clamp(14px, 3.4vw, 18px)",
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: "#666666",
                  maxWidth: 540,
                  marginTop: "clamp(20px, 4vw, 32px)",
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
                  marginTop: "clamp(20px, 4vw, 36px)",
                  maxWidth: 540,
                }}
              >
                Ce n&apos;est pas un remède miracle.
                <br />
                <span style={{ color: "#C8963E" }}>C&apos;est de la biochimie.</span>
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
