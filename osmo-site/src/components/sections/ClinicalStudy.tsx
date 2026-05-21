"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { FONTS } from "@/lib/constants";

const STATS = [
  { value: "OMS", label: "Médicament essentiel" },
  { value: "+GSH", label: "Précurseur du glutathion" },
  { value: "40 ans", label: "D'utilisation clinique" },
] as const;

const STUDY_URL =
  "https://www.revmed.ch/view/423640/3672706/RMS_590_146.pdf";

export default function ClinicalStudy() {
  const [ref, isInView] = useInView<HTMLElement>({ margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-label="Données cliniques sur la N-Acétyl-Cystéine"
      className="relative z-[5] overflow-hidden"
      style={{
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        height: "100vh",
        minHeight: 640,
        background: "#0A0A0A",
      }}
    >
      {/* Background: solid dark + subtle noise grain (no dark lifestyle image available) */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        initial={{ scale: 1.05 }}
        animate={isInView ? { scale: 1 } : { scale: 1.05 }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          background: "#0A0A0A",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.78  0 0 0 0 0.59  0 0 0 0 0.24  0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "320px 320px",
        }}
      />

      {/* Diagonal gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Content container */}
      <div className="relative h-full max-w-[1380px] mx-auto px-6 sm:px-10 flex items-end lg:items-center justify-center lg:justify-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full lg:max-w-[560px] mb-12 lg:mb-0"
          style={{
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 20,
            padding: "clamp(32px, 4.5vw, 48px)",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              fontFamily: FONTS.body,
              fontSize: 11,
              letterSpacing: "0.2em",
              color: "#C8963E",
              fontWeight: 500,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Données cliniques
          </div>

          {/* Headline */}
          <h2
            style={{
              fontFamily: FONTS.display,
              fontWeight: 700,
              fontSize: "clamp(24px, 6vw, 32px)",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              color: "#FFFFFF",
            }}
          >
            L&apos;actif que les urgentistes
            <br />
            utilisent depuis 40 ans.
          </h2>

          {/* Body */}
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: 16,
              lineHeight: 1.7,
              color: "#CCCCCC",
              marginTop: 24,
              fontWeight: 400,
            }}
          >
            La N-Acétyl-Cystéine est inscrite sur la liste des médicaments
            essentiels de l&apos;OMS. Utilisée en milieu hospitalier pour les
            crises hépatiques et les intoxications au paracétamol, elle agit
            comme précurseur du glutathion — le principal antioxydant du foie.
          </p>
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: 16,
              lineHeight: 1.7,
              color: "#CCCCCC",
              marginTop: 16,
              fontWeight: 400,
            }}
          >
            OSMO Recovery intègre la NAC pour accélérer la détoxification
            hépatique pendant votre sommeil, au moment où votre corps en a le
            plus besoin.
          </p>

          {/* Stats row */}
          <div
            className="grid grid-cols-3 gap-4 sm:gap-6"
            style={{
              marginTop: 32,
              paddingTop: 32,
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.value}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
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
                    fontSize: "clamp(20px, 4.5vw, 28px)",
                    lineHeight: 1,
                    color: "#C8963E",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: "clamp(11px, 2.8vw, 12px)",
                    lineHeight: 1.4,
                    color: "#999999",
                    marginTop: 8,
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
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#FFFFFF",
              borderRadius: 50,
              padding: "12px 24px",
              fontSize: 14,
              fontFamily: FONTS.body,
              fontWeight: 500,
              textDecoration: "none",
              transition: "background 0.25s ease, border-color 0.25s ease",
            }}
          >
            Lire l&apos;étude clinique →
          </a>

          {/* Disclaimer */}
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: 11,
              color: "#666666",
              fontStyle: "italic",
              marginTop: 16,
              lineHeight: 1.5,
            }}
          >
            Source&nbsp;: Revue Médicale Suisse, 2018 · N-acétylcystéine et
            hépatologie
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        .clinical-cta:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.6) !important;
        }
      `}</style>
    </section>
  );
}
