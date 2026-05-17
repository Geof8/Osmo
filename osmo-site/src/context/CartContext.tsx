"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface CartContextValue {
  open: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCartAndNavigate: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openCart = useCallback(() => setOpen(true), []);
  const closeCart = useCallback(() => setOpen(false), []);

  return (
    <CartContext.Provider value={{ open, openCart, closeCart, addToCartAndNavigate: openCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
