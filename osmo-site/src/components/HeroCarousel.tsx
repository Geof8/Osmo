"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import Image from "next/image";

const SLIDES = [
  { src: "/images/carousel/slide-1.png", alt: "OSMO Recovery — pot produit avec formules moléculaires" },
  { src: "/images/carousel/slide-2.png", alt: "Les bienfaits des électrolytes OSMO" },
  { src: "/images/carousel/slide-3.png", alt: "Formule optimisée, validée en laboratoire" },
];

const INTERVAL = 5000;
const SWIPE_THRESHOLD = 50;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
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

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) next();
    else if (info.offset.x > SWIPE_THRESHOLD) prev();
  };

  return (
    <div
      className="relative aspect-square w-full overflow-hidden rounded-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          className="absolute inset-0"
        >
          <Image
            src={SLIDES[current].src}
            alt={SLIDES[current].alt}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
            priority={current === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              background: i === current ? "#FFFFFF" : "rgba(255,255,255,0.4)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
