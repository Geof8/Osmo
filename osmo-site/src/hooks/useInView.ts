"use client";

import { useRef } from "react";
import { useInView as useFramerInView } from "framer-motion";

type Margin = `${number}px` | `${number}%`;

interface Options {
  margin?: Margin;
  once?: boolean;
}

export function useInView<T extends Element = HTMLElement>(
  options: Options = {},
) {
  const { margin = "-40px", once = true } = options;
  const ref = useRef<T>(null);
  const isInView = useFramerInView(ref, { once, margin });
  return [ref, isInView] as const;
}
