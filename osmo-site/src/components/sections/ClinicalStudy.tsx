"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { FONTS } from "@/lib/constants";

const STATS = [
  { value: "+16%", label: "Augmentation du glutathion hépatique" },
  { value: "−12%", label: "Réduction de l'inflammation (CRP)" },
  { value: "8 sem.", label: "Durée de l'essai clinique" },
] as const;

const STUDY_URL = "https://pmc.ncbi.nlm.nih.gov/articles/PMC12718416";

export default function ClinicalStudy() {
  const [ref, isInView] = useInView<HTMLElement>({ margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-label="Étude clinique sur la N-Acétyl-Cystéine"
      className="relative z-[5] overflow-hidden clinical-study-section"
      style={{
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        background: "#0A0A0A",
      }}
    >
      {/* Background photo */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ zIndex: 0 }}
        initial={{ scale: 1.05 }}
        animate={isInView ? { scale: 1 } : { scale: 1.05 }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Image
          src="/images/study-background.png"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </motion.div>

      {/* Dark gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.50) 100%)",
        }}
      />

      {/* Content container */}
      <div
        className="relative h-full max-w-[1380px] mx-auto px-6 sm:px-10 flex items-center justify-center lg:justify-start clinical-content"
        style={{ zIndex: 2 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="clinical-card w-full lg:max-w-[560px]"
          style={{
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 20,
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
            className="clinical-body"
            style={{
              fontFamily: FONTS.body,
              lineHeight: 1.8,
              color: "#CCCCCC",
              marginTop: 24,
              fontWeight: 400,
            }}
          >
            L&apos;alcool détruit le glutathion, le principal bouclier
            antioxydant de votre foie. Dans un essai clinique randomisé en
            double aveugle sur 69 patients, la NAC a augmenté significativement
            les taux de glutathion et réduit les marqueurs d&apos;inflammation.
          </p>
          <p
            className="clinical-body"
            style={{
              fontFamily: FONTS.body,
              lineHeight: 1.8,
              color: "#CCCCCC",
              marginTop: 16,
              fontWeight: 400,
            }}
          >
            OSMO intègre la NAC pour reconstituer ce bouclier pendant votre
            sommeil.
          </p>

          {/* Stats row */}
          <div
            className="grid grid-cols-3"
            style={{
              gap: 32,
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
                  className="clinical-stat-value"
                  style={{
                    fontFamily: FONTS.display,
                    fontWeight: 900,
                    lineHeight: 1,
                    color: "#C8963E",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="clinical-stat-label"
                  style={{
                    fontFamily: FONTS.body,
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
        </motion.div>
      </div>

      <style jsx>{`
        .clinical-cta:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.6) !important;
        }
        /* Desktop / tablet (≥ 768px): keep the full-bleed cinematic format */
        @media (min-width: 768px) {
          .clinical-study-section {
            height: 100vh;
            min-height: 640px;
          }
          .clinical-card {
            padding: 64px;
            margin-bottom: 0;
          }
          .clinical-content {
            align-items: center;
          }
          .clinical-body {
            font-size: 16px;
            line-height: 1.8;
          }
          .clinical-stat-value {
            font-size: clamp(20px, 4.5vw, 28px);
          }
          .clinical-stat-label {
            font-size: 12px;
          }
          .clinical-quote {
            font-size: 11px;
          }
        }
        /* Mobile (< 768px): natural height, generous inner padding */
        @media (max-width: 767.98px) {
          .clinical-study-section {
            min-height: 0;
          }
          .clinical-card {
            padding: 40px;
            margin: 72px 0;
          }
          .clinical-content {
            align-items: center;
            padding-top: 40px;
            padding-bottom: 40px;
          }
          .clinical-body {
            font-size: 15px;
            line-height: 1.8;
          }
          .clinical-stat-value {
            font-size: 24px;
          }
          .clinical-stat-label {
            font-size: 11px;
            line-height: 1.4;
          }
          .clinical-quote {
            font-size: 12px;
          }
        }
      `}</style>
    </section>
  );
}
