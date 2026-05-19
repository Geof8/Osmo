"use client";

import { useState, useEffect } from "react";
import { PRODUCT } from "@/lib/constants";

export function useWaitlistCount() {
  const [remaining, setRemaining] = useState<number>(PRODUCT.maxEarlyAdopters);
  const soldOut = remaining <= 0;

  useEffect(() => {
    let cancelled = false;
    fetch("/api/early-adopters/count")
      .then((r) => r.json())
      .then((data: { remaining?: number }) => {
        if (cancelled) return;
        if (typeof data.remaining === "number") {
          setRemaining(data.remaining);
        }
      })
      .catch(() => {
        if (!cancelled) setRemaining(PRODUCT.maxEarlyAdopters);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { remaining, soldOut };
}
