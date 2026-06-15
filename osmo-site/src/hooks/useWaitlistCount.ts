"use client";

import { useState, useEffect } from "react";
import { getSupabase } from "@/lib/supabase";

const SETTING_KEY = "early_adopters_remaining";
const FALLBACK = 47;

export function useWaitlistCount() {
  const [remaining, setRemaining] = useState<number>(FALLBACK);
  const soldOut = remaining <= 0;

  useEffect(() => {
    const supabase = getSupabase();

    // Initial fetch
    supabase
      .from("settings")
      .select("value")
      .eq("key", SETTING_KEY)
      .single()
      .then(({ data }) => {
        if (data?.value != null) {
          const n = parseInt(data.value, 10);
          if (!isNaN(n)) setRemaining(n);
        }
      });

    // Real-time subscription — updates homepage instantly when admin saves
    const channel = supabase
      .channel("settings-counter")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "settings",
          filter: `key=eq.${SETTING_KEY}`,
        },
        (payload) => {
          const val = (payload.new as { value?: string }).value;
          if (val != null) {
            const n = parseInt(val, 10);
            if (!isNaN(n)) setRemaining(n);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { remaining, soldOut };
}
