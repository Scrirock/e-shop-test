import "./Product.css";

export function Product({ product, setCartUpdated }) {
  async function handleClick(productId, amount) {
    await fetch("/api/cart/add", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: productId,
        quantity: amount,
      }),
    });
    setCartUpdated(true);
  }

  return (
    <div key={product.id} className="product">
      <img src={"./uploads/" + product.image} alt="image of the product" />
      <div className="info">
        <div className="flex">
          <p className="bold">{product.name}</p>
          <p>heart</p>
        </div>
        <div className="description">{product.description}</div>
        <div className="flex bottom">
          {null !== setCartUpdated && (
            <div className="quantitySelector">
              <button
                className="button minus"
                onClick={() => handleClick(product.id, -1)}
              >
                -
              </button>
              <span className="quantity">Mettre dans le panier</span>
              <button
                className="button plus"
                onClick={() => handleClick(product.id, 1)}
              >
                +
              </button>
            </div>
          )}
          <p className="bold">${product.price}</p>
        </div>
      </div>
    </div>
  );
}
