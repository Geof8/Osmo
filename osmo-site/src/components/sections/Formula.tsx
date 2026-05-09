"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";

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
      <svg viewBox="0 0 36 36" fill="none" stroke="#C8963E" strokeWidth={1.5}>
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
      <svg viewBox="0 0 36 36" fill="none" stroke="#C8963E" strokeWidth={1.5}>
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
      <svg viewBox="0 0 36 36" fill="none" stroke="#C8963E" strokeWidth={1.5}>
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
      <svg viewBox="0 0 36 36" fill="none" stroke="#C8963E" strokeWidth={1.5}>
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
      <svg viewBox="0 0 36 36" fill="none" stroke="#C8963E" strokeWidth={1.5}>
        <path d="M21 3 L8 20 L17 20 L14 33 L28 16 L19 16 Z" />
      </svg>
    ),
  },
];

const PICTO_SIZE = 20;
const PICTO_HALF = PICTO_SIZE / 2;

function MolecularDiagram() {
  const diagramRef = useRef<HTMLDivElement>(null);
  const potRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const sectionInView = useRef(false);
  const tweensRef = useRef<gsap.core.Tween[]>([]);
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
    const diagram = diagramRef.current;
    const pot = potRef.current;
    const glow = glowRef.current;
    const shadow = shadowRef.current;
    if (!diagram || !pot || !glow || !shadow) return;

    const SIZE = containerSize;
    const CENTER = SIZE / 2;
    const scale = SIZE / DESKTOP_SIZE;
    const tweens: gsap.core.Tween[] = [];

    /* Pot float ±8px over 4s */
    const floatProxy = { y: 0 };
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
          /* Dynamic shadow: bigger/lighter when pot is high, smaller/darker when low */
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

    /* Pot z-rotation ±2deg over 6s */
    const rotProxy = { deg: 0 };
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

            /* 3D depth: sin determines "front/back" position
               Behind (sin < 0) → scale 0.7, opacity 0.5
               In front (sin > 0) → scale 1.0, opacity 1.0 */
            const depthFactor = Math.sin(proxy.angle);
            const pictoScale = 0.7 + (depthFactor + 1) * 0.15; // 0.7 → 1.0
            const pictoOpacity = 0.5 + (depthFactor + 1) * 0.25; // 0.5 → 1.0
            const zIndex = depthFactor > 0 ? 10 : 1;

            pictoEl.style.left = `${x - PICTO_HALF}px`;
            pictoEl.style.top = `${y - PICTO_HALF}px`;
            pictoEl.style.transform = `scale(${pictoScale})`;
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
    /* Force-resume if already in view */
    if (sectionInView.current && !document.hidden) {
      tweens.forEach((t) => t.resume());
    }

    return () => {
      tweens.forEach((t) => t.kill());
      tweensRef.current = [];
    };
  }, [containerSize]);

  const SIZE = containerSize;
  const CENTER = SIZE / 2;
  const scale = SIZE / DESKTOP_SIZE;

  return (
    <div
      ref={diagramRef}
      style={{
        width: SIZE,
        height: SIZE,
        position: "relative",
        perspective: "800px",
      }}
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

      {/* Ambient glow under the pot */}
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
          background:
            "radial-gradient(ellipse, rgba(200, 150, 62, 0.2) 0%, transparent 70%)",
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
          alt="OSMO"
          width={220}
          height={240}
          style={{
            objectFit: "contain",
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      {/* Subtle orbit ring hint */}
      <div
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
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
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
              left: x,
              top: y,
              width: PICTO_SIZE,
              height: PICTO_SIZE,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              background: "rgba(200, 150, 62, 0.08)",
              border: "1px solid rgba(200, 150, 62, 0.15)",
              transition: "transform 0.1s ease-out",
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
      style={{ background: "#111111", padding: "140px 0" }}
    >
      <div ref={ref} className="max-w-[1380px] mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div
              className="mb-7"
              style={{
                fontFamily: "var(--font-mono), var(--mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#666666",
              }}
            >
              La formule
            </div>
            <h2
              style={{
                fontFamily: "var(--font-barlow), var(--display)",
                fontWeight: 900,
                fontSize: "clamp(48px, 5vw, 80px)",
                lineHeight: 0.95,
                letterSpacing: "-0.035em",
                color: "#FFFFFF",
              }}
            >
              {["Cinq", "actifs."].map((word, i) => (
                <motion.span
                  key={i}
                  style={{
                    display: "inline-block",
                    marginRight: i === 0 ? "0.3em" : 0,
                  }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.2 + i * 0.1,
                    ease: "easeOut",
                  }}
                >
                  {word}
                </motion.span>
              ))}
              <br />
              {["Une", "équation."].map((word, i) => (
                <motion.span
                  key={i + 2}
                  style={{
                    display: "inline-block",
                    marginRight: i === 0 ? "0.3em" : 0,
                  }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.4 + i * 0.1,
                    ease: "easeOut",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>
            <motion.p
              className="mt-8"
              style={{
                fontSize: 15,
                lineHeight: 1.6,
                color: "#666666",
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
      </div>
    </section>
  );
}
