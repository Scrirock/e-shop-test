import { createContext, useState } from "react";

export const CartContextProvider = createContext({});

export function CartContext({ children }) {
  const [cartUpdated, setCartUpdated] = useState(false);

  return (
    <CartContextProvider.Provider value={{ cartUpdated, setCartUpdated }}>
      {children}
    </CartContextProvider.Provider>
  );
}
