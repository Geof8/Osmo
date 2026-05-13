"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FONTS } from "@/lib/constants";
import type { SplitOverlayProps } from "@/types";

function OverlayContent({ color }: { color: "light" | "dark" }) {
  const textColor = color === "light" ? "#FFFFFF" : "#111111";
  return (
    <div style={{ textAlign: "center", width: "max-content" }}>
      <div
        style={{
          fontFamily: FONTS.display,
          fontWeight: 900,
          fontSize: "clamp(32px, 7vw, 130px)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          color: textColor,
        }}
      >
        Parce que demain matin,
        <br />
        tu n&apos;as pas le choix.
      </div>
      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: 11,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          marginTop: 24,
          color: textColor,
        }}
      >
        500 places
      </div>
    </div>
  );
}

export default function SplitOverlay({ onComplete }: SplitOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (doneRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      doneRef.current = true;
      onComplete();
      containerRef.current?.remove();
      return;
    }

    function dismiss() {
      if (doneRef.current) return;
      doneRef.current = true;

      window.removeEventListener("wheel", dismiss);
      window.removeEventListener("touchstart", dismiss);

      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              opacity: 0,
              duration: 0.4,
              ease: "power2.inOut",
              onComplete: () => containerRef.current?.remove(),
            });
          }
        },
      });

      tl.to(leftRef.current, { x: "-100%", duration: 0.8, ease: "power3.inOut" }, 0)
        .to(rightRef.current, { x: "100%", duration: 0.8, ease: "power3.inOut" }, 0);
    }

    window.addEventListener("wheel", dismiss, { passive: true, once: true });
    window.addEventListener("touchstart", dismiss, { passive: true, once: true });

    const fallback = setTimeout(dismiss, 6000);

    return () => {
      clearTimeout(fallback);
      window.removeEventListener("wheel", dismiss);
      window.removeEventListener("touchstart", dismiss);
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100]" aria-hidden="true">
      <div
        ref={leftRef}
        className="absolute top-0 left-0 w-1/2 h-full overflow-hidden"
        style={{ background: "#111111" }}
      >
        <div style={{ position: "absolute", top: "50%", left: "100%", transform: "translate(-50%, -50%)" }}>
          <OverlayContent color="light" />
        </div>
      </div>
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
  );
}
