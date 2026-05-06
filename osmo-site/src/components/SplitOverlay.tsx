"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function OverlayContent({ color }: { color: "light" | "dark" }) {
  const textColor = color === "light" ? "#FFFFFF" : "#111111";
  return (
    <div style={{ textAlign: "center", width: "max-content" }}>
      <div
        style={{
          fontFamily: "var(--font-barlow), var(--display)",
          fontWeight: 900,
          fontSize: "clamp(42px, 7vw, 130px)",
          lineHeight: 1,
          letterSpacing: "-0.04em",
          color: textColor,
        }}
      >
        Parce que demain matin,
        <br />
        tu n&apos;as pas le choix.
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono), var(--mono)",
          fontSize: 11,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          marginTop: 24,
          color: textColor,
        }}
      >
        300 places
      </div>
    </div>
  );
}

export default function SplitOverlay({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (doneRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: spacerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
          pin: true,
          pinSpacing: false,
          onLeave: () => {
            if (!doneRef.current) {
              doneRef.current = true;
              if (containerRef.current) containerRef.current.remove();
              if (spacerRef.current) spacerRef.current.remove();
              window.scrollTo(0, 0);
              onComplete();
            }
          },
        },
      });

      tl.to(leftRef.current, { x: "-100%", ease: "none" }, 0)
        .to(rightRef.current, { x: "100%", ease: "none" }, 0);
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <>
      {/* Spacer — scroll through this to open the panels */}
      <div ref={spacerRef} style={{ height: "100vh", position: "relative", zIndex: 0 }} />

      {/* Fixed overlay */}
      <div ref={containerRef} className="fixed inset-0 z-[100]">
        {/* Left panel */}
        <div
          ref={leftRef}
          className="absolute top-0 left-0 w-1/2 h-full overflow-hidden"
          style={{ background: "#111111" }}
        >
          <div style={{ position: "absolute", top: "50%", left: "100%", transform: "translate(-50%, -50%)" }}>
            <OverlayContent color="light" />
          </div>
        </div>
        {/* Right panel */}
        <div
          ref={rightRef}
          className="absolute top-0 right-0 w-1/2 h-full overflow-hidden"
          style={{ background: "#FFFFFF" }}
        >
          <div style={{ position: "absolute", top: "50%", left: "0%", transform: "translate(-50%, -50%)" }}>
            <OverlayContent color="dark" />
          </div>
        </div>
      </div>
    </>
  );
}
