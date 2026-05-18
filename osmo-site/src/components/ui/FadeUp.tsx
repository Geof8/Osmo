"use client";

import { motion } from "framer-motion";
import { ANIMATION_CONFIG } from "@/lib/constants";
import type { FadeUpProps } from "@/types";

export default function FadeUp({ children, delay = 0, className = "" }: FadeUpProps) {
  const { initial, whileInView, viewport, transition } = ANIMATION_CONFIG.fadeUp;
  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      transition={{ ...transition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
