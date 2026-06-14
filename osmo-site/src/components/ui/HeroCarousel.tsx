"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SLIDES = [
  { src: "/osmo-slide-actifs.png", alt: "OSMO Recovery — pot et les cinq actifs cliniques" },
  { src: "/osmo-slide-laboratoire.png", alt: "Formule optimisée, validée en laboratoire — dosages et composition nocturne" },
  { src: "/osmo-slide-bienfaits.png", alt: "Les bienfaits des électrolytes OSMO — soutien hépatique, sommeil, anti-fatigue, réhydratation" },
];

// Augmenter ce nombre quand on ajoute des images — les slots vides resteront en placeholder
const TOTAL_SLOTS = 5;

const BADGES = [
  {
    label: "Goût citron",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="13" rx="7" ry="8" />
        <path d="M12 5c-1.5-1.5-3-2-4-2" />
        <path d="M9.5 10.5 12 13l2.5-2.5M9.5 15.5 12 13l2.5 2.5" />
      </svg>
    ),
  },
  {
    label: "Sans sucre ajouté",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="5" width="14" height="14" rx="2" />
        <line x1="4" y1="4" x2="20" y2="20" />
      </svg>
    ),
  },
  {
    label: "Made in France",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 21s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
];

const INTERVAL = 6000;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => setCurrent((p) => (p + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + SLIDES.length) % SLIDES.length), []);

  const goTo = useCallback((i: number) => {
    setCurrent(i);
    setPaused(true);
  }, []);

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
    <div className="flex flex-col gap-2">
      {/* Image principale */}
      <div
        className="relative aspect-square w-full overflow-hidden rounded-2xl"
        style={{ background: "var(--paper-2)", maxHeight: "60vh" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
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

      {/* Vignettes — grille qui remplit exactement la largeur de l'image */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${TOTAL_SLOTS}, 1fr)`,
          gap: 6,
        }}
      >
        {Array.from({ length: TOTAL_SLOTS }).map((_, i) => {
          const slide = SLIDES[i];
          const isActive = i === current;

          if (!slide) {
            return (
              <div
                key={i}
                style={{
                  aspectRatio: "1 / 1",
                  borderRadius: 8,
                  background: "#F0F0F0",
                  border: "2px solid #E8E8E8",
                }}
              />
            );
          }

          return (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Voir ${slide.alt}`}
              aria-current={isActive}
              style={{
                position: "relative",
                aspectRatio: "1 / 1",
                borderRadius: 8,
                overflow: "hidden",
                border: isActive ? "2px solid #C8963E" : "2px solid transparent",
                transition: "border-color 200ms ease",
                cursor: "pointer",
                padding: 0,
                background: "var(--paper-2)",
              }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="15vw"
                className="object-cover"
              />
              {!isActive && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(255,255,255,0.45)",
                    transition: "background 200ms ease",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Badges */}
      <div className="grid grid-cols-3 gap-2 mt-1">
        {BADGES.map((b) => (
          <div
            key={b.label}
            className="osmo-card flex flex-col items-center text-center gap-3"
            style={{ padding: "18px 8px" }}
          >
            <div style={{ color: "#111111" }}>{b.icon}</div>
            <div
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "clamp(10px, 2.6vw, 12px)",
                fontWeight: 400,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#111111",
                lineHeight: 1.3,
              }}
            >
              {b.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
