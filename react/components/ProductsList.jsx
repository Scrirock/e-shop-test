import { Product } from "./Product";
import { useEffect, useState } from "react";
import styled from "styled-components";

export function ProductsList({ category }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProduct() {
      const data = await fetch("/api/products");
      setProducts(await data.json());
    }
    getProduct().catch(() =>
      console.log("Impossible de recuperer les produits")
    );
  }, []);

  return (
    <List>
      {products
        .filter((product) => category === 0 || product.category.id === category)
        .map((product) => (
          <Product key={product.id} product={product} />
        ))}
    </List>
  );
}

const List = styled.div`
  margin-top: 2rem;
`;
