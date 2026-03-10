import React from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {

  const navigate = useNavigate();

  return (

    <div className="hero">

      <div className="hero-content">

        <h1>Welcome to ShopEasy</h1>

        <p>Your one stop shopping destination</p>

        <button
          className="enter-btn"
          onClick={() => navigate("/home")}
        >
          Enter Store
        </button>

      </div>

    </div>

  );
}

export default Welcome;