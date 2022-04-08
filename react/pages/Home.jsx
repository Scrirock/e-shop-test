import { useState } from "react";
import { Cart } from "../components/Cart";
import { Categories } from "../components/Categories";
import { ProductsList } from "../components/ProductsList";
import { CartContext } from "../context/CartContext";
import styled from "styled-components";

export function Home() {
  const [category, setCategory] = useState(0);

  return (
    <Container>
      <CartContext>
        <Cart />
        <div style={{ margin: "2rem" }}>
          <Categories setCategory={setCategory} />
          <ProductsList category={category} />
        </div>
      </CartContext>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin: 2rem;
  padding: 0 20rem;
`;
