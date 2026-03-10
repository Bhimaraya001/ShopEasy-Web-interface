import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function Home({ search }) {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);   // cart state

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from backend
  const fetchProducts = () => {
    axios.get("http://localhost:5000/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Delete product
  const deleteProduct = (id) => {
    axios.delete(`http://localhost:5000/delete-product/${id}`)
      .then(() => {
        fetchProducts();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Edit product
  const editProduct = (product) => {

    const newName = prompt("Enter new name", product.name);

    if (!newName) return;

    axios.put(`http://localhost:5000/update-product/${product._id}`, {
      ...product,
      name: newName
    })
    .then(() => {
      fetchProducts();
    })
    .catch((err) => {
      console.error(err);
    });

  };

  // Add to cart
  const addToCart = (product) => {

    setCart([...cart, product]);

    alert(product.name + " added to cart");

    console.log("Cart:", [...cart, product]);
  };

  return (
    <div>

      <h2 className="title">Products</h2>

      {/* Product Grid */}
      <div className="product-grid">

        {products
          .filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              deleteProduct={deleteProduct}
              editProduct={editProduct}
              addToCart={addToCart}
            />
          ))}

      </div>

    </div>
  );
}

export default Home;