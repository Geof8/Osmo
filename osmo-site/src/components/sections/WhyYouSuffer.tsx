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

        <div className="grid grid-cols-[1.4fr_1fr] lg:grid-cols-[55fr_45fr] gap-5 sm:gap-10 lg:gap-16 items-center mt-6 lg:mt-10">
          {/* Left column — text */}
          <div>
            <FadeUp delay={0.1}>
              <p
                style={{
                  fontFamily: FONTS.body,
                  fontSize: "clamp(13px, 3.2vw, 17px)",
                  fontWeight: 400,
                  lineHeight: 1.55,
                  color: "#666666",
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
                  fontFamily: FONTS.body,
                  fontSize: "clamp(15px, 3.8vw, 22px)",
                  fontWeight: 700,
                  lineHeight: 1.35,
                  marginTop: "clamp(16px, 4vw, 32px)",
                  maxWidth: 540,
                }}
              >
                Ce n&apos;est pas un remède miracle.
                <br />
                <span style={{ color: "#C8963E" }}>C&apos;est de la biochimie.</span>
              </p>
            </FadeUp>
          </div>

          {/* Right column — infographic */}
          <FadeUp delay={0.2}>
            <div className="flex justify-center self-center">
              <div
                className="w-full max-w-[360px] mx-auto overflow-hidden"
                style={{ borderRadius: 12 }}
              >
                <Image
                  src="/images/infographic.png"
                  alt="Schéma explicatif — problème et solution OSMO"
                  width={360}
                  height={360}
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
