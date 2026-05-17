"use client";

import FadeUp from "@/components/FadeUp";
import { FONTS } from "@/lib/constants";

type Stat = {
  value: string;
  label: string;
  amber?: boolean;
};

const STATS: Stat[] = [
  { value: "90%", label: "des testeurs ont constaté une différence" },
  { value: "18 mois", label: "de développement" },
  { value: "5 actifs", label: "sélectionnés cliniquement" },
  { value: "60 jours", label: "satisfait ou remboursé", amber: true },
];

export default function Stats() {
  return (
    <section
      className="relative z-[5] border-b border-[var(--rule)]"
      style={{ background: "#FFFFFF", padding: "clamp(64px, 8vw, 96px) 0" }}
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-10">
        <FadeUp>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 text-center">
            {STATS.map((stat) => (
              <div
                key={stat.value}
                style={{
                  borderRadius: 12,
                  border: "1px solid var(--soft)",
                  background: "#FFFFFF",
                  padding: "clamp(20px, 2.5vw, 32px) clamp(16px, 2vw, 24px)",
                }}
              >
                <div
                  style={{
                    fontFamily: FONTS.display,
                    fontWeight: 900,
                    fontSize: "clamp(36px, 4vw, 56px)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    color: stat.amber ? "#C8963E" : "#111111",
                    marginBottom: 12,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 13,
                    lineHeight: 1.5,
                    color: "#666666",
                    maxWidth: 220,
                    margin: "0 auto",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
