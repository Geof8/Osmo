"use client";

import { useEffect, useRef, useState } from "react";
import { getSupabase } from "@/lib/supabase";

export type LiveSubscribers = {
  active: number;
  total: number;
};

export function useLiveActiveSubscribers(
  initialActive: number,
  initialTotal: number,
): LiveSubscribers {
  const [active, setActive] = useState(initialActive);
  const [total, setTotal] = useState(initialTotal);
  const inFlight = useRef(false);

  useEffect(() => {
    async function refresh() {
      if (inFlight.current) return;
      inFlight.current = true;
      try {
        const res = await fetch("/api/admin/newsletter/subscribers/count", {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data: { active?: number; total?: number } = await res.json();
        if (typeof data.active === "number") setActive(data.active);
        if (typeof data.total === "number") setTotal(data.total);
      } catch {
        // ignore — next event will retry
      } finally {
        inFlight.current = false;
      }
    }

    const supabase = getSupabase();
    const channel = supabase
      .channel(`admin-newsletter-subscribers-${Math.random().toString(36).slice(2)}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "newsletter_subscribers" },
        (payload) => {
          const newRow = payload.new as { active?: boolean } | null;
          const oldRow = payload.old as { active?: boolean } | null;
          if (payload.eventType === "INSERT") {
            setTotal((t) => t + 1);
            if (newRow?.active) setActive((a) => a + 1);
          } else if (payload.eventType === "DELETE") {
            setTotal((t) => Math.max(0, t - 1));
            if (oldRow?.active) setActive((a) => Math.max(0, a - 1));
          } else if (payload.eventType === "UPDATE") {
            const wasActive = !!oldRow?.active;
            const isActive = !!newRow?.active;
            if (wasActive !== isActive) {
              setActive((a) => (isActive ? a + 1 : Math.max(0, a - 1)));
            }
          }
          refresh();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { active, total };
}
