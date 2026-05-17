"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SLIDES = [
  { src: "/osmo-slide-actifs.png", alt: "OSMO Recovery — pot et les cinq actifs cliniques" },
  { src: "/osmo-slide-laboratoire.png", alt: "Formule optimisée, validée en laboratoire — dosages et composition nocturne" },
  { src: "/osmo-slide-bienfaits.png", alt: "Les bienfaits des électrolytes OSMO — soutien hépatique, sommeil, anti-fatigue, réhydratation" },
];

const INTERVAL = 6000;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => setCurrent(index), []);
  const next = useCallback(() => setCurrent((p) => (p + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(next, INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, next, current]);

  return (
    <div
      className="w-full flex flex-col gap-3"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Main image area */}
      <div
        className="relative aspect-square w-full overflow-hidden rounded-2xl"
        style={{ background: "var(--paper-2)" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={SLIDES[current].src}
              alt={SLIDES[current].alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority={current === 0}
            />
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prev}
          aria-label="Image précédente"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(8px)",
            color: "#111111",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="11 14 6 9 11 4" />
          </svg>
        </button>

        <button
          onClick={next}
          aria-label="Image suivante"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(8px)",
            color: "#111111",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="7 4 12 9 7 14" />
          </svg>
        </button>
      </div>

      {/* Thumbnail strip — small fixed-size, left-aligned, room for more */}
      <div className="flex flex-wrap gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Voir slide ${i + 1}`}
            className="relative overflow-hidden rounded-md transition-all duration-200"
            style={{
              width: 64,
              height: 64,
              flexShrink: 0,
              border: i === current ? "2px solid #C8963E" : "1px solid var(--rule)",
              opacity: i === current ? 1 : 0.55,
            }}
            onMouseEnter={(e) => {
              if (i !== current) e.currentTarget.style.opacity = "0.9";
            }}
            onMouseLeave={(e) => {
              if (i !== current) e.currentTarget.style.opacity = "0.55";
            }}
          >
            <Image src={s.src} alt="" fill sizes="64px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
