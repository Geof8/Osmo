"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const diagram = diagramRef.current;
    const headline = headlineRef.current;
    if (!section || !diagram || !headline) return;

    const ctx = gsap.context(() => {
      gsap.set(section, { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(section, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });

          const words = headline.querySelectorAll(".word");
          gsap.fromTo(
            words,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out", delay: 0.2 }
          );

          startOrbitalAnimations(diagram);
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="formule"
      className="scroll-mt-20 relative z-[5]"
      style={{ background: "#111111", padding: "140px 0" }}
    >
      <div className="max-w-[1380px] mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left side — text */}
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
              ref={headlineRef}
              style={{
                fontFamily: "var(--font-barlow), var(--display)",
                fontWeight: 900,
                fontSize: "clamp(48px, 5vw, 80px)",
                lineHeight: 0.95,
                letterSpacing: "-0.035em",
                color: "#FFFFFF",
              }}
            >
              <span className="word" style={{ display: "inline-block" }}>Cinq&nbsp;</span>
              <span className="word" style={{ display: "inline-block" }}>actifs.</span>
              <br />
              <span className="word" style={{ display: "inline-block" }}>Une&nbsp;</span>
              <span className="word" style={{ display: "inline-block" }}>équation.</span>
            </h2>
            <p
              className="mt-8"
              style={{
                fontSize: 15,
                lineHeight: 1.6,
                color: "#666666",
                maxWidth: 380,
              }}
            >
              Chaque ingrédient a été sélectionné pour un rôle précis.
              <br />
              Rien de superflu. Tout est dosé.
            </p>
          </div>

          {/* Right side — molecular diagram */}
          <div className="flex justify-center">
            <div
              ref={diagramRef}
              className="diagram-container"
              style={{ width: 400, height: 400, position: "relative" }}
            >
              {/* Center pot image */}
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

              {/* SVG layer for connecting lines */}
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

              {/* Orbital pictograms */}
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
    </section>
  );
}

function startOrbitalAnimations(container: HTMLDivElement) {
  const cx = 200;
  const cy = 200;

  pictograms.forEach((p, i) => {
    const pictoEl = container.querySelector<HTMLElement>(`.picto-${p.id}`);
    const lineEl = container.querySelector<SVGLineElement>(`.connect-line-${p.id}`);
    if (!pictoEl || !lineEl) return;

    const startAngle = (i / pictograms.length) * Math.PI * 2;
    const proxy = { angle: startAngle };

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
    });

    gsap.to(lineEl, {
      strokeDashoffset: 0,
      duration: p.lineSpeed,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  });
}
