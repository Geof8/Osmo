"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ANIMATION_CONFIG } from "@/lib/constants";
import type { Pictogram } from "@/types";

const { desktopSize: DESKTOP_SIZE, mobileSize: MOBILE_SIZE, pictoSize: PICTO_SIZE } =
  ANIMATION_CONFIG.molecularDiagram;
const PICTO_HALF = PICTO_SIZE / 2;

const PICTO_SVG_PROPS = {
  width: 28,
  height: 28,
  viewBox: "0 0 36 36",
  fill: "none",
  stroke: "#C8963E",
  strokeWidth: 1.5,
  "aria-hidden": true,
} as const;

const pictograms: Pictogram[] = [
  {
    id: "lemon",
    rx: 160,
    ry: 120,
    speed: 14,
    direction: 1,
    startAngle: 0,
    svg: (
      <svg {...PICTO_SVG_PROPS}>
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
      <svg {...PICTO_SVG_PROPS}>
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
      <svg {...PICTO_SVG_PROPS}>
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
      <svg {...PICTO_SVG_PROPS}>
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
      <svg {...PICTO_SVG_PROPS}>
        <path d="M21 3 L8 20 L17 20 L14 33 L28 16 L19 16 Z" />
      </svg>
    ),
  },
];

export default function MolecularAnimation() {
  const diagramRef = useRef<HTMLDivElement>(null);
  const potRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const diagram = diagramRef.current;
    const pot = potRef.current;
    const glow = glowRef.current;
    const shadow = shadowRef.current;
    if (!diagram || !pot || !glow || !shadow) return;

    const isMobile = window.innerWidth < 768;
    const SIZE = isMobile ? MOBILE_SIZE : DESKTOP_SIZE;
    const CENTER = SIZE / 2;
    const scale = SIZE / DESKTOP_SIZE;

    diagram.style.width = `${SIZE}px`;
    diagram.style.height = `${SIZE}px`;

    const tweens: gsap.core.Tween[] = [];

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
          pot.style.transform = `translate(-50%, -52%) perspective(800px) translateY(${floatProxy.y}px) rotateZ(${rotProxy.deg}deg)`;
          const progress = (floatProxy.y + 8) / 16;
          const scaleS = 1 + progress * 0.15;
          const opacity = 0.15 + progress * 0.2;
          shadow.style.transform = `translate(-50%, -50%) scaleX(${scaleS}) scaleY(${scaleS * 0.7})`;
          shadow.style.opacity = String(opacity);
        },
      }),
    );

    tweens.push(
      gsap.to(rotProxy, {
        deg: 2,
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      }),
    );

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
        },
      ),
    );

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

            const depthFactor = Math.sin(proxy.angle);
            const pictoScale = 0.7 + (depthFactor + 1) * 0.15;
            const pictoOpacity = 0.5 + (depthFactor + 1) * 0.25;

            pictoEl.style.left = `${x - PICTO_HALF}px`;
            pictoEl.style.top = `${y - PICTO_HALF}px`;
            pictoEl.style.transform = `scale(${pictoScale})`;
            pictoEl.style.opacity = String(pictoOpacity);
            pictoEl.style.zIndex = depthFactor > 0 ? "10" : "1";

            lineEl.setAttribute("x2", String(x));
            lineEl.setAttribute("y2", String(y));

            const dist = Math.sqrt((x - CENTER) ** 2 + (y - CENTER) ** 2);
            const maxDist = Math.max(rx, ry);
            lineEl.setAttribute("opacity", String(0.3 + (dist / maxDist) * 0.3));
          },
        }),
      );
    });

    function onVisChange() {
      tweens.forEach((t) => (document.hidden ? t.pause() : t.resume()));
    }
    document.addEventListener("visibilitychange", onVisChange);

    return () => {
      tweens.forEach((t) => t.kill());
      document.removeEventListener("visibilitychange", onVisChange);
    };
  }, []);

  return (
    <div
      ref={diagramRef}
      className="hidden sm:block"
      style={{
        width: DESKTOP_SIZE,
        height: DESKTOP_SIZE,
        position: "relative",
        perspective: "800px",
        maxWidth: "100%",
      }}
      role="img"
      aria-label="Diagramme moléculaire montrant les 5 actifs en orbite autour du pot OSMO"
    >
      <div
        ref={shadowRef}
        style={{
          position: "absolute",
          top: "62%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 160,
          height: 40,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(0,0,0,0.35) 0%, transparent 70%)",
          filter: "blur(12px)",
          pointerEvents: "none",
          opacity: 0.2,
        }}
      />

      <div
        ref={glowRef}
        style={{
          position: "absolute",
          top: "52%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 240,
          height: 140,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(200, 150, 62, 0.2) 0%, transparent 70%)",
          filter: "blur(24px)",
          pointerEvents: "none",
        }}
      />

      <div
        ref={potRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -52%) perspective(800px)",
          width: 220,
          height: 240,
          filter: "drop-shadow(0 12px 32px rgba(0,0,0,0.5)) drop-shadow(0 0 60px rgba(200, 150, 62, 0.12))",
          transformStyle: "preserve-3d",
          zIndex: 5,
        }}
      >
        <Image
          src="/osmo-pot.png"
          alt="OSMO Recovery pot"
          width={220}
          height={240}
          style={{ objectFit: "contain", width: "100%", height: "100%" }}
        />
      </div>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 280,
          height: 280,
          borderRadius: "50%",
          border: "1px solid rgba(200, 150, 62, 0.08)",
          pointerEvents: "none",
        }}
      />

      <svg
        viewBox={`0 0 ${DESKTOP_SIZE} ${DESKTOP_SIZE}`}
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        {pictograms.map((p) => {
          const x2 = DESKTOP_SIZE / 2 + Math.cos(p.startAngle) * p.rx;
          const y2 = DESKTOP_SIZE / 2 + Math.sin(p.startAngle) * p.ry;
          return (
            <line
              key={`line-${p.id}`}
              className={`connect-line-${p.id}`}
              x1={DESKTOP_SIZE / 2}
              y1={DESKTOP_SIZE / 2}
              x2={x2}
              y2={y2}
              stroke="#C8963E"
              strokeWidth={0.8}
              opacity={0.3}
            />
          );
        })}
      </svg>

      {pictograms.map((p) => {
        const cx = DESKTOP_SIZE / 2;
        const ix = cx + Math.cos(p.startAngle) * p.rx - PICTO_HALF;
        const iy = cx + Math.sin(p.startAngle) * p.ry - PICTO_HALF;
        return (
          <div
            key={p.id}
            className={`picto-${p.id}`}
            style={{
              position: "absolute",
              left: ix,
              top: iy,
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
