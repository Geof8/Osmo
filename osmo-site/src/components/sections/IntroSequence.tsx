"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { FONTS } from "@/lib/constants";

export default function IntroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [autoScrolled, setAutoScrolled] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // STEP 1 — "OSMO" wordmark (0% → 28%)
  const step1Opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.28],
    [0, 1, 1, 0]
  );
  const step1Y = useTransform(scrollYProgress, [0, 0.1], [20, 0]);

  // STEP 2 — Tagline (28% → 56%)
  const step2Opacity = useTransform(
    scrollYProgress,
    [0.28, 0.38, 0.48, 0.56],
    [0, 1, 1, 0]
  );
  const step2Y = useTransform(scrollYProgress, [0.28, 0.38], [20, 0]);

  // STEP 3 — Whole intro fades to reveal hero (55% → 70%)
  const wrapperOpacity = useTransform(scrollYProgress, [0.55, 0.7], [1, 0]);

  // Track active step for progress dots + auto-scroll trigger
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.28) setActiveStep(0);
    else if (v < 0.55) setActiveStep(1);
    else setActiveStep(2);

    if (v >= 0.7 && !autoScrolled) {
      setAutoScrolled(true);
      const hero = document.getElementById("hero");
      if (hero) hero.scrollIntoView({ behavior: "smooth" });
    }
  });

  // If the user lands deep in the page (refresh / hash), skip intro
  useEffect(() => {
    if (window.scrollY > window.innerHeight * 0.5) {
      setHidden(true);
    }
  }, []);

  const handleSkip = () => {
    setHidden(true);
    const hero = document.getElementById("hero");
    if (hero) hero.scrollIntoView({ behavior: "smooth" });
  };

  if (hidden) return null;

  return (
    <div
      ref={containerRef}
      className="hidden md:block relative"
      style={{ height: "400vh" }}
    >
      <motion.div
        style={{ opacity: wrapperOpacity }}
        className="sticky top-0 w-full h-screen overflow-hidden bg-black"
      >
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
      </motion.div>
    </div>
  );
}
