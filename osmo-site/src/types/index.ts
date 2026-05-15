import type { ReactNode } from "react";

export interface Ingredient {
  ord: string;
  mol: string;
  name: string;
  benefit: string;
  dose: string;
  role: string;
  svg: ReactNode;
}

export interface Step {
  num: string;
  sub: string;
  label: string;
  labelEm: boolean;
  desc: string;
  timing: string;
  svg: ReactNode;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Pictogram {
  id: string;
  rx: number;
  ry: number;
  speed: number;
  direction: 1 | -1;
  startAngle: number;
  svg: ReactNode;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface HeroStat {
  k: number;
  label: string;
  v: string;
  count: boolean;
  amber?: boolean;
}

export interface CtaStat {
  k: string;
  v: string;
  em: boolean;
}

export interface CaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string;
}

export interface OpenModalProps {
  onOpenModal: () => void;
  remaining?: number;
  soldOut?: boolean;
}

export interface HeroProps extends OpenModalProps {
  revealed: boolean;
  remaining?: number;
  soldOut?: boolean;
}

export interface SplitOverlayProps {
  onComplete: () => void;
}

export interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export interface CountUpProps {
  target: number;
  duration?: number;
  start?: boolean;
}
