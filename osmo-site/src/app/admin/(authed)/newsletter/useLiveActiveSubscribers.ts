"use client";

import { useEffect, useRef, useState } from "react";
import { getSupabase } from "@/lib/supabase";

export type LiveSubscribers = {
  active: number;
  total: number;
};

const POLL_INTERVAL_MS = 15_000;

export function useLiveActiveSubscribers(
  initialActive: number,
  initialTotal: number,
): LiveSubscribers {
  const [active, setActive] = useState(initialActive);
  const [total, setTotal] = useState(initialTotal);
  const inFlight = useRef(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    async function refresh() {
      if (inFlight.current) return;
      inFlight.current = true;
      try {
        const res = await fetch("/api/admin/newsletter/subscribers/count", {
          cache: "no-store",
          credentials: "include",
        });
        if (!res.ok) return;
        const data: { active?: number; total?: number } = await res.json();
        if (!mounted.current) return;
        if (typeof data.active === "number") setActive(data.active);
        if (typeof data.total === "number") setTotal(data.total);
      } catch {
        // ignore — next tick will retry
      } finally {
        inFlight.current = false;
      }
    }

    // Reconcile immediately on mount in case the server-rendered initial
    // counts are stale (e.g. someone subscribed between SSR and hydration).
    refresh();

    // Polling fallback — always-on safety net that works even when Supabase
    // Realtime is not configured (missing publication, RLS, env vars, etc.).
    const interval = window.setInterval(refresh, POLL_INTERVAL_MS);

    // Refresh whenever the admin tab regains focus, so a returning admin
    // never stares at a stale number.
    function onFocus() {
      if (document.visibilityState === "visible") refresh();
    }
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);

    // Bonus: Supabase Realtime for instant updates when properly configured.
    // Failures here are non-fatal — polling already keeps the count fresh.
    const supabase = getSupabase();
    const channel = supabase
      .channel(
        `admin-newsletter-subscribers-${Math.random().toString(36).slice(2)}`,
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "newsletter_subscribers" },
        () => refresh(),
      )
      .subscribe();

    return () => {
      mounted.current = false;
      window.clearInterval(interval);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
      supabase.removeChannel(channel);
    };
  }, []);

  return { active, total };
}
