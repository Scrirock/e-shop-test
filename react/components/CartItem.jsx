import trash from "../../public/uploads/trash.svg";
import styled from "styled-components";

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
    <CartItemContainer>
      <img
        src={trash}
        alt="trash icon"
        onClick={() => handleClick(cartItem.id)}
      />
      <CartLine>
        <p>{cartItem.product.name}</p>
        <span>({cartItem.quantity})</span>
      </CartLine>
    </CartItemContainer>
  );
}

const CartItemContainer = styled.div`
  display: flex;
  margin: 2rem 0;

  & img {
    width: 13px;
    margin-right: 2rem;
    color: #88f0ff;
    position: relative;
    top: -0.5rem;
  }
`;

const CartLine = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  width: 100%;
  border-bottom: 1px solid #a3a3a3;
  padding-bottom: 0.8rem;
`;
