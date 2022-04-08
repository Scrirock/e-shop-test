import { CartItem } from "./CartItem";
import { useEffect, useState, useContext } from "react";
import { Loader } from "./Loader";
import { CartContextProvider } from "../context/CartContext";
import styled from "styled-components";
import { ThemeContextProvider } from "../context/ThemeContext";
import { getTheme } from "../theming";

export function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { cartUpdated, setCartUpdated } = useContext(CartContextProvider);
  const { theme } = useContext(ThemeContextProvider);

  useEffect(() => {
    async function getCart() {
      setIsLoading(true);
      const response = await fetch("/api/cart");
      const data = await response.json();
      setCartItems(data.cartItems);
      setCartUpdated(false);
      setIsLoading(false);
    }

    getCart().catch(() => console.log("Erreur avec la recuperation du panier"));
  }, [cartUpdated]);

  async function handleClick(cartItems) {
    await fetch("/api/cart/del", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartItems: cartItems,
      }),
    });
    setCartUpdated(true);
  }

  return (
    <CartContainer>
      <CartTitle>Vos articles</CartTitle>
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          cartItems.map((cartItem) => (
            <CartItem
              key={cartItem.product.id}
              cartItem={cartItem}
              setCartUpdated={setCartUpdated}
            />
          ))
        )}
      </div>
      <EmptyCardButton
        theme={getTheme(theme)}
        onClick={() => {
          handleClick(cartItems);
        }}
      >
        Vider le panier
      </EmptyCardButton>
    </CartContainer>
  );
}

const CartContainer = styled.div`
  position: relative;
  margin: 2rem;
  padding: 2rem;
  border: 1px solid #a3a3a3;
  border-radius: 1rem;
  width: 30rem;
  height: 50rem;
`;

const CartTitle = styled.h2`
  font-size: 2.3rem;
`;

const EmptyCardButton = styled.button`
  position: absolute;
  bottom: 1.5rem;
  right: 2.5rem;
  padding: 0.8rem;
  border: 1px solid #a3a3a3;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.components.background};
  color: ${({ theme }) => theme.components.textColor};
`;
