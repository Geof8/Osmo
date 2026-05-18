"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import type { CountUpProps } from "@/types";

export default function CountUp({ target, duration = 1.2, start = true }: CountUpProps) {
  const [ref, isInView] = useInView<HTMLSpanElement>();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView || !start) return;
    const t0 = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - t0) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, start, target, duration]);

  return <span ref={ref}>{value}</span>;
}
