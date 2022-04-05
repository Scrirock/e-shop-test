import { useState } from "react";
import { Cart } from "../../components/Cart/Cart";
import { Categories } from "../../components/Categories/Categories";
import { ProductsList } from "../../components/ProductsList/ProductsList";

export function Home() {
  const [cartUpdated, setCartUpdated] = useState(false);
  const [category, setCategory] = useState(0);

  return (
    <>
      <div className="container">
        <Cart cartUpdated={cartUpdated} setCartUpdated={setCartUpdated} />
        <div style={{ margin: "2rem" }}>
          <Categories setCategory={setCategory} />
          <ProductsList category={category} setCartUpdated={setCartUpdated} />
        </div>
      </div>
    </>
  );
}
