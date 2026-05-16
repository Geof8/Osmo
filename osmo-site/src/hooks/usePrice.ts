"use client";

import { useState, useEffect } from "react";
import { getSupabaseCount, computeRemaining } from "@/lib/supabase";
import { PRODUCT } from "@/lib/constants";

export function usePrice() {
  const [remaining, setRemaining] = useState<number>(PRODUCT.maxEarlyAdopters);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSupabaseCount().then((count) => {
      const result = computeRemaining(count);
      setRemaining(result.remaining);
      setLoading(false);
    });
  }, []);

  const isEarlyAdopter = remaining > 0;
  const unitPrice = isEarlyAdopter ? PRODUCT.earlyPrice : PRODUCT.publicPrice;

  return { unitPrice, isEarlyAdopter, remaining, loading };
}
