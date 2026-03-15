import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout() {

  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (

    <div className="checkout-page">

      <h2>Checkout</h2>

      {cart.map(item => (

        <div key={item._id} className="checkout-item">

          <img
            src={`/uploads/${item.image}`}   // ✅ FIXED
            alt={item.name}
            style={{ width: "100px" }}
          />

          <div>

            <h3>{item.name}</h3>

            <p>₹ {item.price}</p>

            <p>Quantity: {item.quantity}</p>

          </div>

        </div>

      ))}

      <h2>Total Amount: ₹ {total}</h2>

      <button
        onClick={() => navigate("/payment")}
        className="checkout-btn"
      >
        Proceed to Payment
      </button>

    </div>

  );
}

export default Checkout;