"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import FadeUp from "@/components/FadeUp";

/* ─── Responsive sizes ─── */
const DESKTOP_SIZE = 500;
const MOBILE_SIZE = 300;

const pictograms = [
  {
    id: "lemon",
    rx: 160,
    ry: 120,
    speed: 14,
    direction: 1,
    startAngle: 0,
    svg: (
      <svg width={28} height={28} viewBox="0 0 36 36" fill="none" stroke="#C8963E" strokeWidth={1.5} aria-hidden="true">
        <circle cx="18" cy="18" r="15" />
        <line x1="18" y1="3" x2="18" y2="33" />
        <line x1="3" y1="18" x2="33" y2="18" />
        <line x1="7" y1="7" x2="29" y2="29" />
        <line x1="29" y1="7" x2="7" y2="29" />
      </svg>
    ),
  },
  {
    id: "hexagon",
    rx: 190,
    ry: 140,
    speed: 18,
    direction: -1,
    startAngle: (Math.PI * 2) / 5,
    svg: (
      <svg width={28} height={28} viewBox="0 0 36 36" fill="none" stroke="#C8963E" strokeWidth={1.5} aria-hidden="true">
        <polygon points="18,2 33,10 33,26 18,34 3,26 3,10" />
      </svg>
    ),
  },
  {
    id: "teardrop",
    rx: 170,
    ry: 130,
    speed: 16,
    direction: 1,
    startAngle: (Math.PI * 2 * 2) / 5,
    svg: (
      <svg width={28} height={28} viewBox="0 0 36 36" fill="none" stroke="#C8963E" strokeWidth={1.5} aria-hidden="true">
        <path d="M18 3 Q8 18 8 23 A10 10 0 0 0 28 23 Q28 18 18 3 Z" />
      </svg>
    ),
  },
  {
    id: "shield",
    rx: 200,
    ry: 150,
    speed: 20,
    direction: -1,
    startAngle: (Math.PI * 2 * 3) / 5,
    svg: (
      <svg width={28} height={28} viewBox="0 0 36 36" fill="none" stroke="#C8963E" strokeWidth={1.5} aria-hidden="true">
        <path d="M18 3 L32 9 V20 Q32 30 18 34 Q4 30 4 20 V9 Z" />
      </svg>
    ),
  },
  {
    id: "bolt",
    rx: 175,
    ry: 125,
    speed: 15,
    direction: 1,
    startAngle: (Math.PI * 2 * 4) / 5,
    svg: (
      <svg width={28} height={28} viewBox="0 0 36 36" fill="none" stroke="#C8963E" strokeWidth={1.5} aria-hidden="true">
        <path d="M21 3 L8 20 L17 20 L14 33 L28 16 L19 16 Z" />
      </svg>
    ),
  },
];

const PICTO_SIZE = 36;
const PICTO_HALF = PICTO_SIZE / 2;

const actifs = [
  {
    ord: "N° 01 · Minéral",
    mol: "NaHCO₃",
    name: "Bicarbonate de sodium",
    dose: "1700",
    role: "Équilibre acido-basique post-alcool. Tampon des fluides corporels.",
    svg: (
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={1.2} aria-hidden="true">
        <path d="M28 6 L44 20 L36 46 L20 46 L12 20 Z" />
        <line x1="28" y1="6" x2="28" y2="46" />
        <line x1="12" y1="20" x2="44" y2="20" />
      </svg>
    ),
  },
  {
    ord: "N° 02 · Minéral",
    mol: "K₃C₆H₅O₇",
    name: "Citrate de potassium",
    dose: "2000",
    role: "Fonction musculaire. Contraction cardiaque normale.",
    svg: (
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} aria-hidden="true">
        <path d="M30 6 L16 32 L24 32 L20 50 L40 24 L30 24 Z" />
      </svg>
    ),
  },
  {
    ord: "N° 03 · Minéral",
    mol: "Mg(C₂H₄NO₂)₂",
    name: "Bisglycinate de magnésium",
    dose: "1350",
    role: "Récupération nerveuse. Sommeil profond.",
    svg: (
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={1.2} aria-hidden="true">
        <path d="M6 22 Q14 14 22 22 T36 22 T50 22" />
        <path d="M6 32 Q14 24 22 32 T36 32 T50 32" />
        <path d="M6 42 Q14 34 22 42 T36 42 T50 42" />
      </svg>
    ),
  },
  {
    ord: "N° 04 · Minéral",
    mol: "NaCl",
    name: "Chlorure de sodium",
    dose: "150",
    role: "Hydratation cellulaire ciblée.",
    svg: (
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} aria-hidden="true">
        <path d="M28 6 Q14 24 14 34 A14 14 0 0 0 42 34 Q42 24 28 6 Z" />
        <path d="M21 34 Q21 41 28 44" />
      </svg>
    ),
  },
  {
    ord: "N° 05 · Acide aminé",
    mol: "C₅H₉NO₃S",
    name: "N-Acétyl-Cystéine",
    dose: "600",
    role: "Soutien hépatique nocturne. Précurseur du glutathion.",
    svg: (
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} aria-hidden="true">
        <path d="M28 6 L46 14 V28 Q46 44 28 50 Q10 44 10 28 V14 Z" />
        <path d="M19 28 L25 34 L37 22" />
      </svg>
    ),
  },
];

const stamps = ["Sans sucre ajouté", "Sans colorant", "Vegan", "Made in France"];

function IngredientCard({ a, index }: { a: typeof actifs[number]; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="hover:-translate-y-1 transition-[transform,box-shadow] duration-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] flex flex-col gap-[14px]"
      style={{
        padding: "28px 20px 24px",
        background: "#1A1A1A",
        borderRight: "1px solid #333333",
        borderBottom: "1px solid #333333",
      }}
    >
      <div
        className="pb-3"
        style={{
          fontFamily: "var(--font-mono), var(--mono)",
          fontSize: 10,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#AAAAAA",
          borderBottom: "1px solid #333333",
        }}
      >
        {a.ord}
      </div>
      <div className="w-11 h-11" style={{ color: "#C8963E" }}>{a.svg}</div>
      <div
        style={{
          fontFamily: "var(--font-mono), var(--mono)",
          fontSize: 11,
          color: "#AAAAAA",
        }}
      >
        {a.mol}
      </div>
      <div
        style={{
          fontFamily: "var(--font-barlow), var(--display)",
          fontWeight: 700,
          fontSize: "clamp(18px, 1.4vw, 22px)",
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          color: "#FFFFFF",
        }}
      >
        {a.name}
      </div>
      <div
        style={{
          fontFamily: "var(--font-barlow), var(--display)",
          fontWeight: 800,
          fontSize: "clamp(28px, 2.5vw, 36px)",
          letterSpacing: "-0.025em",
          lineHeight: 1,
          color: "#FFFFFF",
        }}
      >
        {a.dose}
        <span
          style={{
            fontFamily: "var(--font-barlow), var(--display)",
            fontWeight: 500,
            fontStyle: "normal",
            fontSize: 16,
            letterSpacing: 0,
            color: "#AAAAAA",
          }}
        >
          {" "}mg
        </span>
      </div>
      <div
        className="pt-3"
        style={{
          fontSize: 13,
          lineHeight: 1.55,
          color: "#AAAAAA",
          borderTop: "1px dashed #333333",
        }}
      >
        {a.role}
      </div>
    </motion.article>
  );
}

function MolecularDiagram() {
  const diagramRef = useRef<HTMLDivElement>(null);
  const potRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const sectionInView = useRef(false);
  const tweensRef = useRef<gsap.core.Tween[]>([]);
  const prefersReducedMotion = useReducedMotion();
  const [containerSize, setContainerSize] = useState(DESKTOP_SIZE);

  /* ─── Responsive ─── */
  useEffect(() => {
    function updateSize() {
      setContainerSize(window.innerWidth < 768 ? MOBILE_SIZE : DESKTOP_SIZE);
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  /* ─── Document visibility pause ─── */
  useEffect(() => {
    function handleVisibility() {
      const tweens = tweensRef.current;
      if (document.hidden) {
        tweens.forEach((t) => t.pause());
      } else if (sectionInView.current) {
        tweens.forEach((t) => t.resume());
      }
    }
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  /* ─── IntersectionObserver to start/pause ─── */
  useEffect(() => {
    const diagram = diagramRef.current;
    if (!diagram) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        sectionInView.current = entry.isIntersecting;
        const tweens = tweensRef.current;
        if (entry.isIntersecting && !document.hidden) {
          tweens.forEach((t) => t.resume());
        } else {
          tweens.forEach((t) => t.pause());
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(diagram);
    return () => observer.disconnect();
  }, []);

  /* ─── Main GSAP animations ─── */
  useEffect(() => {
    if (prefersReducedMotion) return;

    const diagram = diagramRef.current;
    const pot = potRef.current;
    const glow = glowRef.current;
    const shadow = shadowRef.current;
    if (!diagram || !pot || !glow || !shadow) return;

    const SIZE = containerSize;
    const CENTER = SIZE / 2;
    const scale = SIZE / DESKTOP_SIZE;
    const tweens: gsap.core.Tween[] = [];

    /* Pot float ±8px over 4s + z-rotation ±2deg over 6s */
    const floatProxy = { y: 0 };
    const rotProxy = { deg: 0 };

    tweens.push(
      gsap.to(floatProxy, {
        y: -8,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        onUpdate: () => {
          if (pot) {
            pot.style.transform = `translate(-50%, -52%) perspective(800px) translateY(${floatProxy.y}px) rotateZ(${rotProxy.deg}deg)`;
          }
          /* Dynamic shadow: bigger/lighter when pot high, smaller/darker when low */
          if (shadow) {
            const progress = (floatProxy.y + 8) / 16; // 0 = highest, 1 = lowest
            const scaleS = 1 + progress * 0.15;
            const opacity = 0.15 + progress * 0.2;
            shadow.style.transform = `translate(-50%, -50%) scaleX(${scaleS}) scaleY(${scaleS * 0.7})`;
            shadow.style.opacity = String(opacity);
          }
        },
      })
    );

    tweens.push(
      gsap.to(rotProxy, {
        deg: 2,
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })
    );

    /* Glow pulse */
    tweens.push(
      gsap.fromTo(
        glow,
        { opacity: 0.25, scale: 0.95 },
        {
          opacity: 0.6,
          scale: 1.08,
          duration: 3.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        }
      )
    );

    /* ─── Elliptical orbits with 3D depth ─── */
    pictograms.forEach((p) => {
      const pictoEl = diagram.querySelector<HTMLElement>(`.picto-${p.id}`);
      const lineEl = diagram.querySelector<SVGLineElement>(`.connect-line-${p.id}`);
      if (!pictoEl || !lineEl) return;

      const rx = p.rx * scale;
      const ry = p.ry * scale;
      const proxy = { angle: p.startAngle };

      tweens.push(
        gsap.to(proxy, {
          angle: p.startAngle + Math.PI * 2 * p.direction,
          duration: p.speed,
          ease: "none",
          repeat: -1,
          onUpdate: () => {
            const x = CENTER + Math.cos(proxy.angle) * rx;
            const y = CENTER + Math.sin(proxy.angle) * ry;

            /* 3D depth: sin determines "front/back"
               Behind (sin < 0) → scale 0.7, opacity 0.5
               In front (sin > 0) → scale 1.0, opacity 1.0 */
            const depthFactor = Math.sin(proxy.angle);
            const pictoScale = 0.7 + (depthFactor + 1) * 0.15; // 0.7 → 1.0
            const pictoOpacity = 0.5 + (depthFactor + 1) * 0.25; // 0.5 → 1.0
            const zIndex = depthFactor > 0 ? 10 : 1;

            pictoEl.style.transform = `translate(${x - PICTO_HALF}px, ${y - PICTO_HALF}px) scale(${pictoScale})`;
            pictoEl.style.opacity = String(pictoOpacity);
            pictoEl.style.zIndex = String(zIndex);

            lineEl.setAttribute("x2", String(x));
            lineEl.setAttribute("y2", String(y));

            /* Dynamic line opacity: far = brighter, near = dimmer */
            const dist = Math.sqrt((x - CENTER) ** 2 + (y - CENTER) ** 2);
            const maxDist = Math.max(rx, ry);
            const lineOpacity = 0.3 + (dist / maxDist) * 0.3; // 0.3 → 0.6
            lineEl.setAttribute("opacity", String(lineOpacity));
          },
        })
      );
    });

    tweensRef.current = tweens;

    /* Start paused — IntersectionObserver will resume */
    tweens.forEach((t) => t.pause());
    if (sectionInView.current && !document.hidden) {
      tweens.forEach((t) => t.resume());
    }

    return () => {
      tweens.forEach((t) => t.kill());
      tweensRef.current = [];
    };
  }, [containerSize, prefersReducedMotion]);

  const SIZE = containerSize;
  const CENTER = SIZE / 2;
  const scale = SIZE / DESKTOP_SIZE;

  return (
    <div
      ref={diagramRef}
      className="hidden sm:block"
      style={{
        width: SIZE,
        height: SIZE,
        position: "relative",
        perspective: "800px",
        maxWidth: "100%",
      }}
      role="img"
      aria-label="Diagramme moléculaire montrant les 5 actifs en orbite autour du pot OSMO"
    >
      {/* Dynamic shadow under pot */}
      <div
        ref={shadowRef}
        style={{
          position: "absolute",
          top: "62%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 160 * scale,
          height: 40 * scale,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(0,0,0,0.35) 0%, transparent 70%)",
          filter: `blur(${12 * scale}px)`,
          pointerEvents: "none",
          opacity: 0.2,
        }}
      />

      {/* Ambient glow */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          top: "52%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 240 * scale,
          height: 140 * scale,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(200, 150, 62, 0.2) 0%, transparent 70%)",
          filter: `blur(${24 * scale}px)`,
          pointerEvents: "none",
        }}
      />

      {/* Center pot */}
      <div
        ref={potRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -52%) perspective(800px)",
          width: 220 * scale,
          height: 240 * scale,
          filter: `drop-shadow(0 12px 32px rgba(0,0,0,0.5)) drop-shadow(0 0 60px rgba(200, 150, 62, 0.12))`,
          transformStyle: "preserve-3d",
          zIndex: 5,
        }}
      >
        <Image
          src="/osmo-pot.png"
          alt="OSMO Recovery pot"
          width={220}
          height={240}
          style={{
            objectFit: "contain",
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      {/* Subtle orbit ring */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 280 * scale,
          height: 280 * scale,
          borderRadius: "50%",
          border: "1px solid rgba(200, 150, 62, 0.08)",
          pointerEvents: "none",
        }}
      />

      {/* SVG connecting lines */}
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        {pictograms.map((p) => {
          const rx = p.rx * scale;
          const ry = p.ry * scale;
          const x2 = CENTER + Math.cos(p.startAngle) * rx;
          const y2 = CENTER + Math.sin(p.startAngle) * ry;
          return (
            <line
              key={`line-${p.id}`}
              className={`connect-line-${p.id}`}
              x1={CENTER}
              y1={CENTER}
              x2={x2}
              y2={y2}
              stroke="#C8963E"
              strokeWidth={0.8}
              opacity={0.3}
            />
          );
        })}
      </svg>

      {/* Orbital pictograms */}
      {pictograms.map((p) => {
        const rx = p.rx * scale;
        const ry = p.ry * scale;
        const x = CENTER + Math.cos(p.startAngle) * rx - PICTO_HALF;
        const y = CENTER + Math.sin(p.startAngle) * ry - PICTO_HALF;
        return (
          <div
            key={p.id}
            className={`picto-${p.id}`}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              transform: `translate(${x}px, ${y}px)`,
              width: PICTO_SIZE,
              height: PICTO_SIZE,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              background: "rgba(200, 150, 62, 0.08)",
              border: "1px solid rgba(200, 150, 62, 0.15)",
            }}
          >
            {p.svg}
          </div>
        );
      })}
    </div>
  );
}

export default function Formula() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      id="formule"
      className="scroll-mt-20 relative z-[5]"
      style={{ background: "#111111", padding: "clamp(80px, 10vw, 140px) 0" }}
    >
      <div ref={ref} className="max-w-[1380px] mx-auto px-5 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div
              className="mb-7"
              style={{
                fontFamily: "var(--font-mono), var(--mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#AAAAAA",
              }}
            >
              La formule
            </div>
            <h2
              style={{
                fontFamily: "var(--font-barlow), var(--display)",
                fontWeight: 900,
                fontSize: "clamp(40px, 5vw, 80px)",
                lineHeight: 0.95,
                letterSpacing: "-0.035em",
                color: "#FFFFFF",
              }}
            >
              {["Cinq", "actifs."].map((word, i) => (
                <motion.span
                  key={i}
                  style={{ display: "inline-block", marginRight: i === 0 ? "0.3em" : 0 }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                >
                  {word}
                </motion.span>
              ))}
              <br />
              {["Une", "équation."].map((word, i) => (
                <motion.span
                  key={i + 2}
                  style={{ display: "inline-block", marginRight: i === 0 ? "0.3em" : 0 }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1, ease: "easeOut" }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>
            <motion.p
              className="mt-8"
              style={{
                fontSize: 15,
                lineHeight: 1.65,
                color: "#AAAAAA",
                maxWidth: 380,
              }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Chaque ingr&eacute;dient a &eacute;t&eacute; s&eacute;lectionn&eacute; pour un r&ocirc;le pr&eacute;cis.
              <br />
              Rien de superflu. Tout est dos&eacute;.
            </motion.p>
          </div>

          <div className="flex justify-center">
            <MolecularDiagram />
          </div>
        </div>

        {/* Ingredients grid */}
        <div className="mt-8">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
            style={{ borderTop: "1px solid #333333", borderLeft: "1px solid #333333" }}
          >
            {actifs.map((a, i) => (
              <IngredientCard key={i} a={a} index={i} />
            ))}
          </div>

          <FadeUp delay={0.3}>
            <div className="mt-10 lg:mt-14 pt-7 flex justify-between gap-8 flex-wrap items-center" style={{ borderTop: "1px solid #333333" }}>
              <div
                className="flex gap-5 sm:gap-7 flex-wrap"
                style={{ fontFamily: "var(--font-mono), var(--mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FFFFFF" }}
              >
                {stamps.map((s) => (
                  <span key={s} className="inline-flex items-center gap-2">
                    <span className="w-[6px] h-[6px] bg-[#C8963E] rounded-full" aria-hidden="true" />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
