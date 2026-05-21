"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { FONTS } from "@/lib/constants";

const STATS = [
  { value: "OMS", label: "Médicament essentiel" },
  { value: "40 ans", label: "D'utilisation clinique" },
] as const;

const STUDY_URL =
  "https://www.revmed.ch/view/423640/3672706/RMS_590_146.pdf";

export default function ClinicalStudy() {
  const [ref, isInView] = useInView<HTMLElement>({ margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-label="Étude clinique sur la N-Acétyl-Cystéine"
      className="relative z-[5] overflow-hidden"
      style={{
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        background: "#F4F4F4",
        padding: "clamp(48px, 8vw, 80px) 0",
      }}
    >
      <div className="relative max-w-[1380px] mx-auto px-6 sm:px-10">
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: 20,
            minHeight: "clamp(560px, 72vh, 760px)",
          }}
        >
          {/* Background — soft lifestyle gradient (placeholder, photo to upload later) */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-0"
            initial={{ scale: 1.05 }}
            animate={isInView ? { scale: 1 } : { scale: 1.05 }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              background:
                "radial-gradient(120% 80% at 80% 50%, #E5E5E5 0%, #ECECEC 40%, #DCDCDC 80%, #C8C8C8 100%)",
            }}
          />
          {/* Very subtle grain to mimic a photo background */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.04 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
              backgroundSize: "320px 320px",
              mixBlendMode: "multiply",
            }}
          />

          {/* Card — top-left on desktop, full-width inset on mobile */}
          <div className="relative h-full flex items-start justify-start p-6 sm:p-10 lg:p-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="w-full lg:max-w-[560px]"
              style={{
                background: "#FFFFFF",
                borderRadius: 20,
                padding: "clamp(28px, 4vw, 48px)",
              }}
            >
              {/* Title */}
              <h2
                style={{
                  fontFamily: FONTS.display,
                  fontWeight: 700,
                  fontSize: "clamp(28px, 5vw, 44px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: "#111111",
                }}
              >
                L&apos;étude clinique sur la NAC détaillée
              </h2>

              {/* Body */}
              <p
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: "#444444",
                  marginTop: 24,
                  fontWeight: 400,
                }}
              >
                <strong style={{ fontWeight: 600, color: "#111111" }}>
                  L&apos;étude clinique sur la N-Acétyl-Cystéine
                </strong>
                , inscrite sur la liste des médicaments essentiels de l&apos;OMS,
                documente son rôle de précurseur du glutathion — le principal
                antioxydant du foie.
              </p>
              <p
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: "#444444",
                  marginTop: 16,
                  fontWeight: 400,
                }}
              >
                <strong style={{ fontWeight: 600, color: "#111111" }}>
                  OSMO Recovery
                </strong>{" "}
                reprend cette NAC pour soutenir la détoxification hépatique
                pendant votre sommeil.
              </p>

              {/* Stats — 2 columns, large numbers */}
              <div
                className="grid grid-cols-2 gap-6 sm:gap-8"
                style={{
                  marginTop: 32,
                  paddingTop: 32,
                  borderTop: "1px solid #E8E8E8",
                }}
              >
                {STATS.map((stat, i) => (
                  <motion.div
                    key={stat.value}
                    initial={{ opacity: 0, y: 12 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
                    }
                    transition={{
                      duration: 0.5,
                      delay: 0.6 + i * 0.1,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    <div
                      style={{
                        fontFamily: FONTS.display,
                        fontWeight: 700,
                        fontSize: "clamp(36px, 6vw, 56px)",
                        lineHeight: 1,
                        color: "#111111",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontFamily: FONTS.body,
                        fontSize: 13,
                        lineHeight: 1.45,
                        color: "#666666",
                        marginTop: 10,
                        fontWeight: 400,
                      }}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <a
                href={STUDY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="clinical-cta inline-block"
                style={{
                  marginTop: 32,
                  background: "transparent",
                  border: "1px solid #111111",
                  color: "#111111",
                  borderRadius: 50,
                  padding: "12px 28px",
                  fontSize: 14,
                  fontFamily: FONTS.body,
                  fontWeight: 500,
                  textDecoration: "none",
                  transition:
                    "background 0.25s ease, color 0.25s ease, border-color 0.25s ease",
                }}
              >
                Voir l&apos;étude clinique
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .clinical-cta:hover {
          background: #111111;
          color: #ffffff;
        }
      `}</style>
    </section>
  );
}
