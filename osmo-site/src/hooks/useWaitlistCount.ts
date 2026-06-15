"use client";

import { useState, useEffect } from "react";
import { getSupabase } from "@/lib/supabase";

const SETTING_KEY = "early_adopters_remaining";
const FALLBACK = 47;
const POLL_INTERVAL = 15_000; // fallback poll every 15s

async function fetchRemaining(): Promise<number> {
  const { data } = await getSupabase()
    .from("settings")
    .select("value")
    .eq("key", SETTING_KEY)
    .single();
  if (!data?.value) return FALLBACK;
  const n = parseInt(data.value, 10);
  return isNaN(n) ? FALLBACK : n;
}

export function useWaitlistCount() {
  const [remaining, setRemaining] = useState<number>(FALLBACK);
  const soldOut = remaining <= 0;

  useEffect(() => {
    let cancelled = false;

    // Initial fetch
    fetchRemaining().then((n) => { if (!cancelled) setRemaining(n); });

    // Realtime — no filter (more reliable), filter client-side
    const supabase = getSupabase();
    const channel = supabase
      .channel("settings-counter")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "settings" },
        (payload) => {
          const row = (payload.new ?? payload.old) as { key?: string; value?: string } | null;
          if (row?.key === SETTING_KEY && row?.value != null) {
            const n = parseInt(row.value, 10);
            if (!isNaN(n)) setRemaining(n);
          }
        }
      )
      .subscribe();

    // Polling fallback in case realtime misses an event
    const timer = setInterval(() => {
      fetchRemaining().then((n) => { if (!cancelled) setRemaining(n); });
    }, POLL_INTERVAL);

    return () => {
      cancelled = true;
      clearInterval(timer);
      supabase.removeChannel(channel);
    };
  }, []);

  return { remaining, soldOut };
}
