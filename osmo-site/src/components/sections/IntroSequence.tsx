"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { FONTS } from "@/lib/constants";

export default function IntroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // STEP 1 — "OSMO" wordmark (0% → 33%)
  const step1Opacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.25, 0.33],
    [0, 1, 1, 0]
  );
  const step1Y = useTransform(scrollYProgress, [0, 0.12], [30, 0]);

  // STEP 2 — Tagline (33% → 66%)
  const step2Opacity = useTransform(
    scrollYProgress,
    [0.33, 0.41, 0.58, 0.66],
    [0, 1, 1, 0]
  );
  const step2Y = useTransform(scrollYProgress, [0.33, 0.45], [30, 0]);

  // Active step → progress dots (no auto-scroll)
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.33) setActiveStep(0);
    else if (v < 0.66) setActiveStep(1);
    else setActiveStep(2);
  });

  // If user lands deep in the page (refresh / hash), skip intro
  useEffect(() => {
    if (window.scrollY > window.innerHeight * 0.5) {
      setHidden(true);
    }
  }, []);

  const handleSkip = () => {
    const containerHeight = containerRef.current?.offsetHeight ?? 0;
    const containerTop = containerRef.current?.offsetTop ?? 0;
    setHidden(true);
    // Jump past the intro container so Hero is at viewport top
    window.scrollTo({ top: containerTop + containerHeight, behavior: "auto" });
  };

  if (hidden) return null;

  return (
    <div
      ref={containerRef}
      className="hidden md:block relative"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
        {/* Ken Burns background image */}
        <motion.div
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/images/intro-hero.png"
            alt=""
            fill
            priority={false}
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
              "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)",
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
          style={{ opacity: step1Opacity, y: step1Y, zIndex: 5 }}
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
            }}
          >
            OSMO
          </span>
        </motion.div>

        {/* Step 2 — Tagline */}
        <motion.div
          style={{ opacity: step2Opacity, y: step2Y, zIndex: 5 }}
          className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none"
        >
          <p
            style={{
              fontFamily: FONTS.display,
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 52px)",
              color: "#FFFFFF",
              textAlign: "center",
              maxWidth: 700,
              lineHeight: 1.2,
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
      </div>
    </div>
  );
}
