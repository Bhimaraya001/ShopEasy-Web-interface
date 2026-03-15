
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link} from "react-router-dom";
function ProductCard({ product, deleteProduct, editProduct }) {

  const { addToCart } = useContext(CartContext);

  return (

    <div className="product-card">

    <Link to={`/product/${product._id}`}>

    <img
    src={`http://localhost:5000/uploads/${product.image}`}
    alt={product.name}
    />

    <h3>{product.name}</h3>

    </Link>

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