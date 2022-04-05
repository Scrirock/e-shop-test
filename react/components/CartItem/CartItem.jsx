import "./CartItem.css";
import trash from "../../../public/uploads/trash.svg";

export function CartItem({ cartItem, setCartUpdated }) {
  async function handleClick(id) {
    await fetch("/api/cart/one-del", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    setCartUpdated(true);
  }

  return (
    <div className="cartItem">
      <img
        src={trash}
        alt="trash icon"
        className="trashIcon"
        onClick={() => handleClick(cartItem.id)}
      />
      <div>
        <p>{cartItem.product.name}</p>
        <span className="cartQuantity">({cartItem.quantity})</span>
      </div>
    </div>
  );
}
