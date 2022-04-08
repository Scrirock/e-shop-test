import { useContext, useState } from "react";
import { CartContextProvider } from "../context/CartContext";
import styled from "styled-components";
import { getTheme } from "../theming";

const colors = {
  minus: "#dedede",
  plus: "#5f65ff",
};

export function Product({ product }) {
  const [stock, setStock] = useState();
  const { setCartUpdated } = useContext(CartContextProvider);

  async function handleClick(productId, amount) {
    const fetchInit = {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    await fetch("/api/cart/add", {
      ...fetchInit,
      body: JSON.stringify({
        product_id: productId,
        quantity: amount,
      }),
    });

    const response = await fetch("api/product/stock", {
      ...fetchInit,
      body: JSON.stringify({
        product_id: productId,
      }),
    });
    const data = await response.json();
    setStock(data.stock);
    setCartUpdated(true);
  }

  return (
    <ProductContainer key={product.id}>
      <img src={"./uploads/" + product.image} alt="image of the product" />
      <ProductInfo>
        <ProductFlex>
          <ProductBold>{product.name}</ProductBold>
          <p>heart</p>
        </ProductFlex>
        <ProductDescription>{product.description}</ProductDescription>
        <span>en stock {stock}</span>
        <ProductBottom>
          <ProductQuantitySelector>
            <MinusButton onClick={() => handleClick(product.id, -1)} />
            <PlusButton onClick={() => handleClick(product.id, 1)} />
          </ProductQuantitySelector>
          <ProductBold>${product.price}</ProductBold>
        </ProductBottom>
      </ProductInfo>
    </ProductContainer>
  );
}

const condition = true;
const littleBorderRadius = "1rem";
const bigBorderRadius = "5rem";

const ProductContainer = styled.div`
  display: flex;
  padding: 2rem;
  border: 1px solid #a3a3a3;
  border-radius: ${condition ? littleBorderRadius : bigBorderRadius};
  width: 70rem;
  margin: 1rem 0;
  background-color: ${({ theme }) => theme.components.background};
  color: ${({ theme }) => theme.components.textColor};

  & img {
    margin-right: 2rem;
  }

  & span {
    font-size: 1.8rem;
  }
`;

const ProductInfo = styled.div`
  width: 100%;
  position: relative;
`;

const ProductDescription = styled.div`
  margin: 2rem 0;
  font-size: 1.5rem;
`;

const ProductFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: baseline;
  width: 100%;
`;

const ProductBold = styled.p`
  font-size: 2.5rem;
  font-weight: bold;
`;

const ProductBottom = styled(ProductFlex)`
  position: absolute;
  bottom: 0;
`;

const ProductQuantitySelector = styled.div`
  border: 1px solid #a3a3a3;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;

const MinusButton = styled.button`
  &::before {
    content: "-";
  }

  &:active {
    background-color: #cbcbcb;
  }

  background-color: ${colors.minus};
  padding: 0.5rem;
  margin: 0.5rem;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.4rem;
  border: none;
  cursor: pointer;
`;

const PlusButton = styled(MinusButton)`
  &::before {
    content: "+";
  }

  &:active {
    background-color: #4c51be;
  }

  color: white;
  background-color: ${colors.plus};
`;
