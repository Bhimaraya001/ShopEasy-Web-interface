import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import ProductDetails from "./pages/ProductDetails";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";



function App() {

  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>

      <Header search={search} setSearch={setSearch} />

      <Routes>

        <Route path="/" element={<Welcome />} />

        {/* pass search to Home */}
        <Route path="/home" element={<Home search={search} />} />
        
        <Route path="/add" element={<AddProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;