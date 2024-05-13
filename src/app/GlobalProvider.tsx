"use client";
import { CartProvider } from "@/context/CartContext";
import { SessionProvider } from "next-auth/react";
export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <CartProvider>
      <SessionProvider>{children}</SessionProvider>
    </CartProvider>
  );
};
