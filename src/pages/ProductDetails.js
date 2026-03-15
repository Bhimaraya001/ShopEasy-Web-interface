import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function ProductDetails() {

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {

    axios.get("http://localhost:5000/products")
    .then((res) => {

      const current = res.data.find(p => p._id === id);
      setProduct(current);

      // related products (same category)
      const relatedProducts = res.data.filter(
        p => p.category === current.category && p._id !== id
      );

      setRelated(relatedProducts);

    });

  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  return (

    <div className="product-details-page">

      {/* PRODUCT INFO */}
      <div className="product-details">

        <img
          src={`http://localhost:5000/uploads/${product.image}`}
          alt={product.name}
        />

        <div className="details">

          <h2>{product.name}</h2>

          <p>{product.description}</p>

          <p>Category: {product.category}</p>

          <h3>₹ {product.price}</h3>

          <button
            className="cart-btn"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

        </div>

      </div>

      {/* RELATED PRODUCTS */}
      <h2 style={{marginTop:"40px"}}>Related Products</h2>

      <div className="related-grid">

        {related.map(item => (

          <Link key={item._id} to={`/product/${item._id}`} className="related-card">

            <img
              src={`http://localhost:5000/uploads/${item.image}`}
              alt={item.name}
            />

            <h4>{item.name}</h4>

            <p>₹ {item.price}</p>

          </Link>

        ))}

      </div>

    </div>

  );
}

export default ProductDetails;