import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";

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
      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;