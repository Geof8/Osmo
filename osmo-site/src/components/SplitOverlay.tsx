"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const textStyle: React.CSSProperties = {
  fontFamily: "var(--font-barlow), var(--display)",
  fontWeight: 900,
  fontSize: "8vw",
  lineHeight: 1,
  letterSpacing: "-0.04em",
  whiteSpace: "nowrap",
  position: "absolute",
  top: "50%",
};

export default function SplitOverlay({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (doneRef.current) return;
    doneRef.current = true;

    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      delay: 1.5,
      onComplete: () => {
        document.body.style.overflow = "";
        if (containerRef.current) {
          containerRef.current.style.display = "none";
        }
        onComplete();
      },
    });

    tl.to(
      leftRef.current,
      { x: "-100%", duration: 1.4, ease: "power3.inOut" },
      0
    ).to(
      rightRef.current,
      { x: "100%", duration: 1.4, ease: "power3.inOut" },
      0
    );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100]">
      {/* Left panel */}
      <div
        ref={leftRef}
        className="absolute top-0 left-0 w-1/2 h-full overflow-hidden"
        style={{ background: "#111111" }}
      >
        <div style={{ ...textStyle, color: "#FFFFFF", left: "100%", transform: "translate(-50%, -50%)" }}>
          Le lendemain matin.
        </div>
      </div>
      {/* Right panel */}
      <div
        ref={rightRef}
        className="absolute top-0 right-0 w-1/2 h-full overflow-hidden"
        style={{ background: "#FFFFFF" }}
      >
        <div style={{ ...textStyle, color: "#111111", left: "0%", transform: "translate(-50%, -50%)" }}>
          Le lendemain matin.
        </div>
      </div>
    </div>
  );
}
