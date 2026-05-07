"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import FadeUp from "@/components/FadeUp";

const SIZE = 600;
const CENTER = SIZE / 2;

const pictograms = [
  {
    id: "lemon",
    radius: 175,
    speed: 6,
    direction: 1,
    lineSpeed: 2,
    svg: (
      <svg width={32} height={32} viewBox="0 0 36 36" fill="none" stroke="#C8963E" strokeWidth={1.5}>
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
    radius: 220,
    speed: 8.4,
    direction: -1,
    lineSpeed: 2.5,
    svg: (
      <svg width={32} height={32} viewBox="0 0 36 36" fill="none" stroke="#C8963E" strokeWidth={1.5}>
        <polygon points="18,2 33,10 33,26 18,34 3,26 3,10" />
      </svg>
    ),
  },
  {
    id: "teardrop",
    radius: 195,
    speed: 7.2,
    direction: 1,
    lineSpeed: 3,
    svg: (
      <svg width={32} height={32} viewBox="0 0 36 36" fill="none" stroke="#C8963E" strokeWidth={1.5}>
        <path d="M18 3 Q8 18 8 23 A10 10 0 0 0 28 23 Q28 18 18 3 Z" />
      </svg>
    ),
  },
  {
    id: "shield",
    radius: 235,
    speed: 9.6,
    direction: -1,
    lineSpeed: 2.8,
    svg: (
      <svg width={32} height={32} viewBox="0 0 36 36" fill="none" stroke="#C8963E" strokeWidth={1.5}>
        <path d="M18 3 L32 9 V20 Q32 30 18 34 Q4 30 4 20 V9 Z" />
      </svg>
    ),
  },
  {
    id: "bolt",
    radius: 185,
    speed: 6.6,
    direction: 1,
    lineSpeed: 3.2,
    svg: (
      <svg width={32} height={32} viewBox="0 0 36 36" fill="none" stroke="#C8963E" strokeWidth={1.5}>
        <path d="M21 3 L8 20 L17 20 L14 33 L28 16 L19 16 Z" />
      </svg>
    ),
  },
];

const PICTO_SIZE = 48;
const PICTO_HALF = PICTO_SIZE / 2;

const actifs = [
  {
    ord: "N° 01 · Minéral",
    mol: "NaHCO₃",
    name: "Bicarbonate de sodium",
    dose: "1700",
    role: "Équilibre acido-basique post-alcool. Tampon des fluides corporels.",
    svg: (
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={1.2}>
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
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}>
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
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={1.2}>
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
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}>
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
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}>
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
        padding: "36px 24px 32px",
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
          color: "#888888",
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
          color: "#888888",
        }}
      >
        {a.mol}
      </div>
      <div
        style={{
          fontFamily: "var(--font-barlow), var(--display)",
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          alignSelf: "end",
          color: "#FFFFFF",
        }}
      >
        {a.name}
      </div>
      <div
        style={{
          fontFamily: "var(--font-barlow), var(--display)",
          fontWeight: 800,
          fontSize: 36,
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
            color: "#888888",
          }}
        >
          {" "}mg
        </span>
      </div>
      <div
        className="pt-3"
        style={{
          fontSize: 13,
          lineHeight: 1.5,
          color: "#888888",
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

  useEffect(() => {
    const diagram = diagramRef.current;
    const pot = potRef.current;
    const glow = glowRef.current;
    if (!diagram || !pot || !glow) return;

    const tweens: gsap.core.Tween[] = [];

    tweens.push(
      gsap.to(pot, {
        y: -10,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })
    );

    tweens.push(
      gsap.to(pot, {
        rotateY: 8,
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })
    );

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

      // Scale pulse on each pictogram
      tweens.push(
        gsap.fromTo(
          pictoEl,
          { scale: 0.8 },
          {
            scale: 1.2,
            duration: 2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          }
        )
      );

      // Line opacity animation (0.3 to 0.8)
      tweens.push(
        gsap.fromTo(
          lineEl,
          { opacity: 0.3 },
          {
            opacity: 0.8,
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

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 320,
          height: 320,
          borderRadius: "50%",
          border: "1px solid rgba(200, 150, 62, 0.12)",
          pointerEvents: "none",
        }}
      />

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
              opacity={0.3}
            />
          );
        })}
      </svg>

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
              background: "rgba(200, 150, 62, 0.08)",
              border: "1px solid rgba(200, 150, 62, 0.2)",
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

        {/* Ingredients grid — merged into same dark section */}
        <div className="mt-8">
          <div
            className="grid grid-cols-2 lg:grid-cols-5"
            style={{ borderTop: "1px solid #333333", borderLeft: "1px solid #333333" }}
          >
            {actifs.map((a, i) => (
              <IngredientCard key={i} a={a} index={i} />
            ))}
          </div>

          <FadeUp delay={0.3}>
            <div className="mt-14 pt-7 flex justify-between gap-8 flex-wrap items-center" style={{ borderTop: "1px solid #333333" }}>
              <div
                className="flex gap-7 flex-wrap"
                style={{ fontFamily: "var(--font-mono), var(--mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FFFFFF" }}
              >
                {stamps.map((s) => (
                  <span key={s} className="inline-flex items-center gap-2">
                    <span className="w-[6px] h-[6px] bg-[#C8963E] rounded-full" />
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
