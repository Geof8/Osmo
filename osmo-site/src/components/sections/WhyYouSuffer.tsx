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
                  fontWeight: 400,
                  lineHeight: 1.8,
                  color: "#666666",
                  marginTop: 32,
                  maxWidth: 540,
                }}
              >
                L&apos;alcool est un diurétique. En quelques heures,
                il élimine sodium, potassium et magnésium —
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
                  fontSize: 22,
                  fontWeight: 700,
                  lineHeight: 1.4,
                  color: "#C8963E",
                  marginTop: 40,
                  maxWidth: 540,
                }}
              >
                Ce n&apos;est pas un remède miracle.
                <br />
                C&apos;est de la biochimie.
              </p>
            </FadeUp>
          </div>

          {/* Right column — infographic */}
          <FadeUp delay={0.2}>
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-[320px] lg:max-w-[420px]">
                <Image
                  src="/images/infographic.svg"
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
