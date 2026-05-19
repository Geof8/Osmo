"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { motion, useMotionValue, animate, type PanInfo } from "framer-motion";

const SWIPE_THRESHOLD = 50;

type Props<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  getKey: (item: T, index: number) => string;
  ariaLabel: string;
  dotColor?: string;
  dotInactiveColor?: string;
};

export default function MobileCardCarousel<T>({
  items,
  renderItem,
  getKey,
  ariaLabel,
  dotColor = "#C8963E",
  dotInactiveColor = "#DDDDDD",
}: Props<T>) {
  const [index, setIndex] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const measure = () => setTrackWidth(el.offsetWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (trackWidth === 0) return;
    const controls = animate(x, -index * trackWidth, {
      type: "spring",
      stiffness: 320,
      damping: 34,
      mass: 0.9,
    });
    return () => controls.stop();
  }, [index, trackWidth, x]);

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(items.length - 1, next));
      setIndex(clamped);
    },
    [items.length],
  );

  const onDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      const offset = info.offset.x;
      if (offset < -SWIPE_THRESHOLD) {
        goTo(index + 1);
      } else if (offset > SWIPE_THRESHOLD) {
        goTo(index - 1);
      } else {
        animate(x, -index * trackWidth, {
          type: "spring",
          stiffness: 320,
          damping: 34,
        });
      }
    },
    [goTo, index, trackWidth, x],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(index + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(index - 1);
      }
    },
    [goTo, index],
  );

  return (
    <div className="md:hidden">
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        role="region"
        aria-label={ariaLabel}
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <motion.div
          className="flex"
          style={{ x, width: trackWidth ? trackWidth * items.length : "100%" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          dragMomentum={false}
          onDragEnd={onDragEnd}
        >
          {items.map((item, i) => (
            <div
              key={getKey(item, i)}
              className="flex-shrink-0"
              style={{ width: trackWidth || "100%" }}
              aria-hidden={i === index ? "false" : "true"}
              aria-roledescription="slide"
              aria-label={`${i + 1} sur ${items.length}`}
            >
              {renderItem(item, i)}
            </div>
          ))}
        </motion.div>
      </div>

      <div
        className="mt-5 flex items-center justify-center gap-2"
        role="tablist"
        aria-label="Sélecteur de carte"
      >
        {items.map((item, i) => {
          const active = i === index;
          return (
            <button
              key={getKey(item, i)}
              type="button"
              role="tab"
              aria-selected={active}
              aria-current={active ? "true" : undefined}
              aria-label={`Carte ${i + 1}`}
              onClick={() => goTo(i)}
              className="inline-flex items-center justify-center"
              style={{
                width: 44,
                height: 44,
                background: "transparent",
                border: "none",
                padding: 0,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: "block",
                  width: active ? 22 : 8,
                  height: 8,
                  borderRadius: 999,
                  background: active ? dotColor : dotInactiveColor,
                  transition:
                    "width 220ms ease, background-color 220ms ease",
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
