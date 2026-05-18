"use client";

import { useState, useEffect } from "react";
import { getSupabaseCount, computeRemaining } from "@/lib/supabase";
import { PRODUCT } from "@/lib/constants";

export function useWaitlistCount() {
  const [remaining, setRemaining] = useState<number>(PRODUCT.maxEarlyAdopters);
  const soldOut = remaining <= 0;

  useEffect(() => {
    getSupabaseCount()
      .then((count) => setRemaining(computeRemaining(count).remaining))
      .catch(() => setRemaining(PRODUCT.maxEarlyAdopters));
  }, []);

  return { remaining, soldOut };
}
