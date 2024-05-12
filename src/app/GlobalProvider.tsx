"use client";
import { CartProvider } from "@/context/CartContext";
export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return <CartProvider>{children}</CartProvider>;
};
