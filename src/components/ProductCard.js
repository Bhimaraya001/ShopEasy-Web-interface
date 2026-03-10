import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductCard({ product, deleteProduct, editProduct }) {

  const { addToCart } = useContext(CartContext);

  return (

    <div className="product-card">

      <img src={product.image} alt="product" />

      <h3>{product.name}</h3>

      <p>{product.description}</p>

      <h4>₹ {product.price}</h4>

      <button
        className="cart-btn"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>

      <button
        className="edit-btn"
        onClick={() => editProduct(product)}
      >
        Edit
      </button>

      <button
        className="delete-btn"
        onClick={() => deleteProduct(product._id)}
      >
        Delete
      </button>

    </div>
  );
}

export default ProductCard;