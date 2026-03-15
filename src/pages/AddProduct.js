import React, { useState } from "react";
import axios from "axios";

function AddProduct() {

  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: ""
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("image", image);

    await axios.post("http://localhost:5000/add-product", formData);

    alert("Product Added");

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
          type="file"
          onChange={handleImage}
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