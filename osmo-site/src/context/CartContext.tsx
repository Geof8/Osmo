"use client";

import { createContext, useContext, useReducer, useCallback, type ReactNode } from "react";
import { useRouter } from "next/navigation";

interface CartState {
  quantity: number;
}

type CartAction =
  | { type: "SET_QUANTITY"; payload: number }
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" };

interface CartContextValue {
  quantity: number;
  setQuantity: (n: number) => void;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  addToCartAndNavigate: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SET_QUANTITY":
      return { quantity: Math.max(1, action.payload) };
    case "INCREMENT":
      return { quantity: state.quantity + 1 };
    case "DECREMENT":
      return { quantity: Math.max(1, state.quantity - 1) };
    case "RESET":
      return { quantity: 0 };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { quantity: 0 });
  const router = useRouter();

  const setQuantity = useCallback((n: number) => {
    dispatch({ type: "SET_QUANTITY", payload: n });
  }, []);

  const increment = useCallback(() => {
    dispatch({ type: "INCREMENT" });
  }, []);

  const decrement = useCallback(() => {
    dispatch({ type: "DECREMENT" });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const addToCartAndNavigate = useCallback(() => {
    if (state.quantity === 0) {
      dispatch({ type: "SET_QUANTITY", payload: 1 });
    }
    router.push("/panier");
  }, [state.quantity, router]);

  return (
    <CartContext.Provider value={{ quantity: state.quantity, setQuantity, increment, decrement, reset, addToCartAndNavigate }}>
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
