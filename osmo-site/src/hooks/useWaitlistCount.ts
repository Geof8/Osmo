"use client";

import { useState, useEffect } from "react";
import { getSupabase } from "@/lib/supabase";

const FALLBACK = 47;
const POLL_INTERVAL = 10_000;

async function fetchRemaining(): Promise<number> {
  try {
    const res = await fetch("/api/early-adopters/count");
    const data: { remaining?: number } = await res.json();
    if (typeof data.remaining === "number") return data.remaining;
  } catch {
    // ignore
  }
  return FALLBACK;
}

export function useWaitlistCount() {
  const [remaining, setRemaining] = useState<number>(FALLBACK);
  const soldOut = remaining <= 0;

  useEffect(() => {
    let cancelled = false;

    // Initial fetch via server-side API (reliable)
    fetchRemaining().then((n) => { if (!cancelled) setRemaining(n); });

    // Polling every 10s — catches admin updates even without realtime
    const timer = setInterval(() => {
      fetchRemaining().then((n) => { if (!cancelled) setRemaining(n); });
    }, POLL_INTERVAL);

    // Realtime bonus — instant update when admin saves
    const supabase = getSupabase();
    const channel = supabase
      .channel("settings-counter")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "settings" },
        (payload) => {
          const row = (payload.new ?? payload.old) as { key?: string; value?: string } | null;
          if (row?.key === "early_adopters_remaining" && row?.value != null) {
            const n = parseInt(row.value, 10);
            if (!isNaN(n) && !cancelled) setRemaining(n);
          }
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      clearInterval(timer);
      supabase.removeChannel(channel);
    };
  }, []);

  return { remaining, soldOut };
}
