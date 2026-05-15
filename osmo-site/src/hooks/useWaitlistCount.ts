"use client";

import { useState, useEffect } from "react";
import { getSupabaseCount, computeRemaining } from "@/lib/supabase";

export function useWaitlistCount() {
  const [remaining, setRemaining] = useState(50);
  const [displayedSold, setDisplayedSold] = useState(0);
  const soldOut = remaining <= 0;

  useEffect(() => {
    getSupabaseCount().then((count) => {
      const result = computeRemaining(count);
      setRemaining(result.remaining);
      setDisplayedSold(result.displayedSold);
    });
  }, []);

  return { remaining, displayedSold, soldOut };
}
