import React, { useState } from "react";
import axios from "axios";

function AddProduct() {

  const [product, setProduct] = useState({
    name: "",
    image: "",
    description: "",
    category: "",
    price: ""
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    axios.post("http://localhost:5000/add-product", product)
      .then(() => {
        alert("Product Added Successfully");
      })
      .catch((error) => {
        console.log(error);
      });

  };

  return (
    <div>

      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
        />

        <button type="submit">Add Product</button>

      </form>

    </div>
  );
}

export default AddProduct;