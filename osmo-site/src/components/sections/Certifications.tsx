"use client";

import FadeUp from "@/components/FadeUp";

type Cert = {
  label: string;
  svg: React.ReactNode;
};

const ICON_PROPS = {
  width: 32,
  height: 32,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const CERTS: Cert[] = [
  {
    label: "Sans sucre",
    svg: (
      <svg {...ICON_PROPS}>
        <path d="M11 3c0 4-4 5-4 9a5 5 0 0 0 10 0c0-2-1-3-2-4" />
        <path d="M11 3c2 2 3 4 3 6" />
      </svg>
    ),
  },
  {
    label: "Sans colorant",
    svg: (
      <svg {...ICON_PROPS}>
        <path d="M12 3c-3 5-6 8-6 12a6 6 0 0 0 12 0c0-4-3-7-6-12z" />
      </svg>
    ),
  },
  {
    label: "Vegan",
    svg: (
      <svg {...ICON_PROPS}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    label: "Made in France 🇫🇷",
    svg: (
      <svg {...ICON_PROPS}>
        <path d="M4 21V4" />
        <path d="M4 4h12l-2 4 2 4H4" />
      </svg>
    ),
  },
];

export default function Certifications() {
  return (
    <section
      className="relative z-[5]"
      style={{
        background: "#F4F4F4",
        padding: "24px 0",
        width: "100%",
      }}
      aria-label="Certifications"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-10">
        <FadeUp>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 items-start justify-items-center">
            {CERTS.map((cert) => (
              <div
                key={cert.label}
                className="flex flex-col items-center gap-2"
                style={{ color: "#444444" }}
              >
                {cert.svg}
                <div
                  style={{
                    fontFamily: "var(--font-dm-sans), var(--body)",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#444444",
                    textAlign: "center",
                  }}
                >
                  {cert.label}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
