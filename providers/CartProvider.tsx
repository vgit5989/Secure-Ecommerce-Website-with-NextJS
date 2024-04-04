"use client";

import { CartContextProvidor } from "@/hooks/Cart";

interface CartProviderProps {
  children: React.ReactNode;
}

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  return <CartContextProvidor>{children}</CartContextProvidor>;
};

export default CartProvider;
