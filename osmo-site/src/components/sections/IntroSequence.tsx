"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { FONTS } from "@/lib/constants";

/**
 * Desktop-only intro sequence (v7).
 *
 * Architecture :
 *  - Outer <div> 300vh : réserve la plage de scroll.
 *  - Wrapper `motion.div` en `position: fixed` z-1, TOUJOURS monté
 *    (pas de snap-cut, pas de remount → pas de "tagline fondue" au scroll-back).
 *    Son opacity fade 1→0 sur [0.93, 1.0]. Le Hero (z-5 + bg-white opaque)
 *    masque le wrapper invisible une fois sorti du container.
 *  - Navbar (z-50) et AnnouncementBar (z-10) restent visibles toute l'intro.
 *
 * Timings :
 *  - OSMO    : opacity 0→1→0 sur [0, 0.05, 0.18, 0.26]  (rapide)
 *  - Tagline : opacity 0→1→0 sur [0.30, 0.36, 0.86, 0.92] (hold sur 50% du scroll)
 *  - Wrapper : opacity 1→0 sur [0.93, 1.0]
 *  - Pointer-events: "none" passé à 0.97 (clics passent au Hero)
 *
 * La tagline a aussi un scale 0.94→1.0 sur entrée pour attirer l'œil.
 */
export default function IntroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // STEP 1 — OSMO wordmark (rapide, libère la place pour la tagline)
  const step1Opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.18, 0.26],
    [0, 1, 1, 0]
  );
  const step1Y = useTransform(scrollYProgress, [0, 0.08], [30, 0]);

  // STEP 2 — Tagline (hold sur 50% du scroll = ~1200px de lecture)
  const step2Opacity = useTransform(
    scrollYProgress,
    [0.30, 0.36, 0.86, 0.92],
    [0, 1, 1, 0]
  );
  const step2Y = useTransform(scrollYProgress, [0.30, 0.40], [30, 0]);
  const step2Scale = useTransform(scrollYProgress, [0.30, 0.40], [0.94, 1.0]);

  // Wrapper fade vers Hero (transition douce, pas de snap-cut)
  const wrapperOpacity = useTransform(scrollYProgress, [0.93, 1.0], [1, 0]);
  const wrapperPE = useTransform(scrollYProgress, [0.97, 1.0], ["auto", "none"]);

  // Progress dots
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.26) setActiveStep(0);
    else if (v < 0.92) setActiveStep(1);
    else setActiveStep(2);
  });

  // Refresh / hash deep link → skip intro
  useEffect(() => {
    if (window.scrollY > window.innerHeight * 0.5) {
      setHidden(true);
    }
  }, []);

  const handleSkip = () => {
    const containerHeight = containerRef.current?.offsetHeight ?? 0;
    const containerTop = containerRef.current?.offsetTop ?? 0;
    setHidden(true);
    window.scrollTo({ top: containerTop + containerHeight, behavior: "auto" });
  };

  if (hidden) return null;

  return (
    <div
      ref={containerRef}
      className="hidden md:block relative"
      style={{ height: "300vh" }}
      aria-hidden="true"
    >
      <motion.div
        className="bg-black overflow-hidden"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          // z-1 = sous AnnouncementBar (z-10) et Navbar (z-50)
          zIndex: 1,
          opacity: wrapperOpacity,
          pointerEvents: wrapperPE,
          willChange: "opacity",
        }}
      >
        {/* Ken Burns background image */}
        <motion.div
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute inset-0"
          style={{ willChange: "transform" }}
        >
          <Image
            src="/images/intro-hero.png"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </motion.div>

        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 1,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.75) 100%)",
          }}
        />

        {/* Radial vignette — boost contraste tagline */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 1,
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 60%)",
            pointerEvents: "none",
          }}
        />

        {/* Skip button */}
        <button
          type="button"
          onClick={handleSkip}
          className="absolute"
          style={{
            top: 24,
            right: 32,
            zIndex: 10,
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "#FFFFFF",
            borderRadius: 50,
            padding: "8px 20px",
            fontSize: 12,
            letterSpacing: "0.1em",
            fontFamily: FONTS.body,
            cursor: "pointer",
          }}
        >
          Passer l&apos;intro →
        </button>

        {/* Step 1 — OSMO wordmark */}
        <motion.div
          style={{
            opacity: step1Opacity,
            y: step1Y,
            zIndex: 5,
            willChange: "opacity, transform",
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <span
            style={{
              fontFamily: FONTS.display,
              fontWeight: 900,
              fontSize: "clamp(80px, 15vw, 180px)",
              color: "#FFFFFF",
              letterSpacing: "0.05em",
              lineHeight: 1,
              textShadow: "0 6px 32px rgba(0, 0, 0, 0.55)",
            }}
          >
            OSMO
          </span>
        </motion.div>

        {/* Step 2 — Tagline (avec scale subtil sur entrée) */}
        <motion.div
          style={{
            opacity: step2Opacity,
            y: step2Y,
            scale: step2Scale,
            zIndex: 5,
            willChange: "opacity, transform",
          }}
          className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none"
        >
          <p
            style={{
              fontFamily: FONTS.display,
              fontWeight: 800,
              fontSize: "clamp(32px, 4.4vw, 58px)",
              color: "#FFFFFF",
              textAlign: "center",
              maxWidth: 740,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              textShadow: "0 4px 28px rgba(0, 0, 0, 0.7), 0 2px 12px rgba(0, 0, 0, 0.5)",
            }}
          >
            Parce que demain matin,
            <br />
            tu n&apos;as pas le choix.
          </p>
        </motion.div>

        {/* Progress dots */}
        <div
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3"
          style={{ bottom: 32, zIndex: 10 }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: activeStep === i ? "#FFFFFF" : "transparent",
                border: "1px solid #FFFFFF",
                transition: "background 0.3s ease",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
