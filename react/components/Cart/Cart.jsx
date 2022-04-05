import "./Cart.css";
import { CartItem } from "../CartItem/CartItem";
import { useEffect, useState } from "react";
import { Loader } from "../Loader/Loader";

export function Cart({ cartUpdated, setCartUpdated }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="cartContainer">
      <p className="cartTitle">Vos articles</p>
      <div className="cartItemContainer">
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
      <button
        className="emptyCartButton"
        onClick={() => {
          handleClick(cartItems);
        }}
      >
        Vider le panier
      </button>
    </div>
  );
}
