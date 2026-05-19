"use client";

import { CartProvider } from "@/context/CartContext";
import SideCart from "@/components/ui/SideCart";
import CookieBanner from "@/components/ui/CookieBanner";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <SideCart />
      <CookieBanner />
    </CartProvider>
  );
}
