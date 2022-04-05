import "./ProductsList.css";
import { Product } from "../Product/Product";
import { useEffect, useState } from "react";

export function ProductsList({ setCartUpdated, category }) {
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
    <div className="productsList">
      {products
        .filter((product) => category === 0 || product.category.id === category)
        .map((product) => (
          <Product
            key={product.id}
            product={product}
            setCartUpdated={setCartUpdated}
          />
        ))}
    </div>
  );
}
