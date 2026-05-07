"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";

const SIZE = 500;
const CENTER = SIZE / 2;

const pictograms = [
  {
    id: "lemon",
    radius: 145,
    speed: 10,
    direction: 1,
    lineSpeed: 2,
    svg: (
      <svg viewBox="0 0 36 36" fill="none" stroke="#FFFFFF" strokeWidth={1.5}>
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
    radius: 180,
    speed: 14,
    direction: -1,
    lineSpeed: 2.5,
    svg: (
      <svg viewBox="0 0 36 36" fill="none" stroke="#FFFFFF" strokeWidth={1.5}>
        <polygon points="18,2 33,10 33,26 18,34 3,26 3,10" />
      </svg>
    ),
  },
  {
    id: "teardrop",
    radius: 160,
    speed: 12,
    direction: 1,
    lineSpeed: 3,
    svg: (
      <svg viewBox="0 0 36 36" fill="none" stroke="#FFFFFF" strokeWidth={1.5}>
        <path d="M18 3 Q8 18 8 23 A10 10 0 0 0 28 23 Q28 18 18 3 Z" />
      </svg>
    ),
  },
  {
    id: "shield",
    radius: 190,
    speed: 16,
    direction: -1,
    lineSpeed: 2.8,
    svg: (
      <svg viewBox="0 0 36 36" fill="none" stroke="#FFFFFF" strokeWidth={1.5}>
        <path d="M18 3 L32 9 V20 Q32 30 18 34 Q4 30 4 20 V9 Z" />
      </svg>
    ),
  },
  {
    id: "bolt",
    radius: 155,
    speed: 11,
    direction: 1,
    lineSpeed: 3.2,
    svg: (
      <svg viewBox="0 0 36 36" fill="none" stroke="#FFFFFF" strokeWidth={1.5}>
        <path d="M21 3 L8 20 L17 20 L14 33 L28 16 L19 16 Z" />
      </svg>
    ),
  },
];

const PICTO_SIZE = 36;
const PICTO_HALF = PICTO_SIZE / 2;

function MolecularDiagram() {
  const diagramRef = useRef<HTMLDivElement>(null);
  const potRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const diagram = diagramRef.current;
    const pot = potRef.current;
    const glow = glowRef.current;
    if (!diagram || !pot || !glow) return;

    const tweens: gsap.core.Tween[] = [];

    // Pot floating animation
    tweens.push(
      gsap.to(pot, {
        y: -10,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })
    );

    // Pot slow rotation
    tweens.push(
      gsap.to(pot, {
        rotateY: 8,
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })
    );

    // Glow pulse
    tweens.push(
      gsap.fromTo(
        glow,
        { opacity: 0.3, scale: 0.95 },
        {
          opacity: 0.7,
          scale: 1.05,
          duration: 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        }
      )
    );

    // Orbital animations
    pictograms.forEach((p, i) => {
      const pictoEl = diagram.querySelector<HTMLElement>(`.picto-${p.id}`);
      const lineEl = diagram.querySelector<SVGLineElement>(`.connect-line-${p.id}`);
      if (!pictoEl || !lineEl) return;

      const startAngle = (i / pictograms.length) * Math.PI * 2;
      const proxy = { angle: startAngle };

      tweens.push(
        gsap.to(proxy, {
          angle: startAngle + Math.PI * 2 * p.direction,
          duration: p.speed,
          ease: "none",
          repeat: -1,
          onUpdate: () => {
            const x = CENTER + Math.cos(proxy.angle) * p.radius;
            const y = CENTER + Math.sin(proxy.angle) * p.radius;
            pictoEl.style.left = `${x - PICTO_HALF}px`;
            pictoEl.style.top = `${y - PICTO_HALF}px`;
            lineEl.setAttribute("x2", String(x));
            lineEl.setAttribute("y2", String(y));
          },
        })
      );

      tweens.push(
        gsap.fromTo(
          lineEl,
          { opacity: 0.1 },
          {
            opacity: 0.5,
            duration: p.lineSpeed,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          }
        )
      );
    });

    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={diagramRef}
      style={{ width: SIZE, height: SIZE, position: "relative" }}
    >
      {/* Ambient glow under the pot */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 220,
          height: 120,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(200, 150, 62, 0.25) 0%, transparent 70%)",
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />

      {/* Center pot — floating + rotating */}
      <div
        ref={potRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -52%) perspective(800px)",
          width: 220,
          height: 240,
          filter: "drop-shadow(0 12px 32px rgba(0,0,0,0.5)) drop-shadow(0 0 80px rgba(200, 150, 62, 0.15))",
          transformStyle: "preserve-3d",
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

      {/* Glow ring */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 260,
          height: 260,
          borderRadius: "50%",
          border: "1px solid rgba(200, 150, 62, 0.12)",
          pointerEvents: "none",
        }}
      />

      {/* SVG connecting lines */}
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        {pictograms.map((p, i) => {
          const angle = (i / pictograms.length) * Math.PI * 2;
          const x2 = CENTER + Math.cos(angle) * p.radius;
          const y2 = CENTER + Math.sin(angle) * p.radius;
          return (
            <line
              key={`line-${p.id}`}
              className={`connect-line-${p.id}`}
              x1={CENTER}
              y1={CENTER}
              x2={x2}
              y2={y2}
              stroke="#C8963E"
              strokeWidth={1}
              opacity={0.2}
            />
          );
        })}
      </svg>

      {/* Orbital pictograms with circular backdrop */}
      {pictograms.map((p, i) => {
        const angle = (i / pictograms.length) * Math.PI * 2;
        const x = CENTER + Math.cos(angle) * p.radius - PICTO_HALF;
        const y = CENTER + Math.sin(angle) * p.radius - PICTO_HALF;
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
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
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
