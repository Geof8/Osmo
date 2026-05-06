"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";

const pictograms = [
  {
    id: "lemon",
    radius: 110,
    speed: 10,
    direction: 1,
    lineSpeed: 2,
    svg: (
      <svg viewBox="0 0 28 28" fill="none" stroke="#FFFFFF" strokeWidth={1.5} width={28} height={28}>
        <circle cx="14" cy="14" r="12" />
        <line x1="14" y1="2" x2="14" y2="26" />
        <line x1="2" y1="14" x2="26" y2="14" />
        <line x1="5.5" y1="5.5" x2="22.5" y2="22.5" />
        <line x1="22.5" y1="5.5" x2="5.5" y2="22.5" />
      </svg>
    ),
  },
  {
    id: "hexagon",
    radius: 140,
    speed: 14,
    direction: -1,
    lineSpeed: 2.5,
    svg: (
      <svg viewBox="0 0 28 28" fill="none" stroke="#FFFFFF" strokeWidth={1.5} width={28} height={28}>
        <polygon points="14,1 26,7.5 26,20.5 14,27 2,20.5 2,7.5" />
      </svg>
    ),
  },
  {
    id: "teardrop",
    radius: 125,
    speed: 12,
    direction: 1,
    lineSpeed: 3,
    svg: (
      <svg viewBox="0 0 28 28" fill="none" stroke="#FFFFFF" strokeWidth={1.5} width={28} height={28}>
        <path d="M14 2 Q6 14 6 18 A8 8 0 0 0 22 18 Q22 14 14 2 Z" />
      </svg>
    ),
  },
  {
    id: "shield",
    radius: 150,
    speed: 16,
    direction: -1,
    lineSpeed: 2.8,
    svg: (
      <svg viewBox="0 0 28 28" fill="none" stroke="#FFFFFF" strokeWidth={1.5} width={28} height={28}>
        <path d="M14 2 L25 7 V16 Q25 24 14 27 Q3 24 3 16 V7 Z" />
      </svg>
    ),
  },
  {
    id: "bolt",
    radius: 120,
    speed: 11,
    direction: 1,
    lineSpeed: 3.2,
    svg: (
      <svg viewBox="0 0 28 28" fill="none" stroke="#FFFFFF" strokeWidth={1.5} width={28} height={28}>
        <path d="M16 2 L6 16 L13 16 L11 26 L22 12 L15 12 Z" />
      </svg>
    ),
  },
];

export default function Formula() {
  const sectionRef = useRef<HTMLElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [orbitalStarted, setOrbitalStarted] = useState(false);

  useEffect(() => {
    if (!isInView || orbitalStarted) return;
    const diagram = diagramRef.current;
    if (!diagram) return;

    setOrbitalStarted(true);
    const cx = 200;
    const cy = 200;
    const tweens: gsap.core.Tween[] = [];

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
            const x = cx + Math.cos(proxy.angle) * p.radius;
            const y = cy + Math.sin(proxy.angle) * p.radius;
            pictoEl.style.left = `${x - 14}px`;
            pictoEl.style.top = `${y - 14}px`;
            lineEl.setAttribute("x2", String(x));
            lineEl.setAttribute("y2", String(y));
          },
        })
      );

      tweens.push(
        gsap.to(lineEl, {
          strokeDashoffset: 0,
          duration: p.lineSpeed,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        })
      );
    });

    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, [isInView, orbitalStarted]);

  return (
    <motion.section
      ref={sectionRef}
      id="formule"
      className="scroll-mt-20 relative z-[5]"
      style={{ background: "#111111", padding: "140px 0" }}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-[1380px] mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
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
              {["Cinq ", "actifs."].map((word, i) => (
                <motion.span
                  key={i}
                  style={{ display: "inline-block" }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                >
                  {word}
                </motion.span>
              ))}
              <br />
              {["Une ", "équation."].map((word, i) => (
                <motion.span
                  key={i + 2}
                  style={{ display: "inline-block" }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
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
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Chaque ingrédient a été sélectionné pour un rôle précis.
              <br />
              Rien de superflu. Tout est dosé.
            </motion.p>
          </div>

          <div className="flex justify-center">
            <div
              ref={diagramRef}
              className="diagram-container"
              style={{ width: 400, height: 400, position: "relative" }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <Image
                  src="/osmo-product.jpeg"
                  alt="OSMO"
                  width={180}
                  height={180}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>

              <svg
                className="lines-svg"
                viewBox="0 0 400 400"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              >
                {pictograms.map((p) => (
                  <line
                    key={`line-${p.id}`}
                    className={`connect-line-${p.id}`}
                    x1="200"
                    y1="200"
                    x2="200"
                    y2="200"
                    stroke="#C8963E"
                    strokeWidth={1}
                    opacity={0.5}
                    strokeDasharray="200"
                    strokeDashoffset="200"
                  />
                ))}
              </svg>

              {pictograms.map((p, i) => {
                const angle = (i / pictograms.length) * Math.PI * 2;
                const x = 200 + Math.cos(angle) * p.radius - 14;
                const y = 200 + Math.sin(angle) * p.radius - 14;
                return (
                  <div
                    key={p.id}
                    className={`picto-${p.id}`}
                    style={{
                      position: "absolute",
                      left: x,
                      top: y,
                      width: 28,
                      height: 28,
                    }}
                  >
                    {p.svg}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
