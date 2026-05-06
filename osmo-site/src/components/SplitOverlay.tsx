"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SplitOverlay({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (doneRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        onUpdate: (self) => {
          if (self.direction === 1 && !doneRef.current) {
            doneRef.current = true;
            self.kill();

            const tl = gsap.timeline({
              onComplete: () => {
                if (containerRef.current) {
                  containerRef.current.style.display = "none";
                }
                onComplete();
              },
            });

            tl.to(textRef.current, {
              opacity: 0,
              duration: 0.3,
              ease: "power2.in",
            })
              .to(
                leftRef.current,
                { x: "-100%", duration: 1.2, ease: "power3.inOut" },
                0.2
              )
              .to(
                rightRef.current,
                { x: "100%", duration: 1.2, ease: "power3.inOut" },
                0.2
              );
          }
        },
      });
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] pointer-events-none">
      {/* Left panel */}
      <div
        ref={leftRef}
        className="absolute top-0 left-0 w-1/2 h-full"
        style={{ background: "#111111" }}
      />
      {/* Right panel */}
      <div
        ref={rightRef}
        className="absolute top-0 right-0 w-1/2 h-full"
        style={{ background: "#FFFFFF" }}
      />
      {/* Centered text */}
      <div
        ref={textRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ pointerEvents: "none" }}
      >
        <div
          className="relative whitespace-nowrap"
          style={{
            fontFamily: "var(--font-barlow), var(--display)",
            fontWeight: 900,
            fontSize: "8vw",
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          {/* White text (visible on left dark panel) */}
          <span
            className="absolute inset-0"
            style={{
              color: "#FFFFFF",
              clipPath: "inset(0 50% 0 0)",
            }}
          >
            Le lendemain matin.
          </span>
          {/* Black text (visible on right white panel) */}
          <span
            style={{
              color: "#111111",
              clipPath: "inset(0 0 0 50%)",
            }}
          >
            Le lendemain matin.
          </span>
          {/* Invisible text for sizing */}
          <span className="invisible">Le lendemain matin.</span>
        </div>
      </div>
    </div>
  );
}
