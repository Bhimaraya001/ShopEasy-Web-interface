import React, { useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


function Payment() {

  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const startPayment = async () => {

    const { data } = await axios.post(
      "http://localhost:5000/create-order",
      {
        amount: total
      }
    );

    const options = {

      key: "rzp_test_SRUZF6OdQXNlh8",

      amount: data.amount,

      currency: data.currency,

      name: "ShopEasy",

      description: "Order Payment",

      order_id: data.id,

      handler: async function (response) {

  alert("Payment Successful");

  await axios.post("http://localhost:5000/save-order", {
    items: cart,
    total: total,
    paymentId: response.razorpay_payment_id,
    orderId: response.razorpay_order_id
  });

  localStorage.removeItem("cart");

  navigate("/success");

}

    };

    const rzp = new window.Razorpay(options);

    rzp.open();

  };

  return (

    <div style={{ padding: "40px" }}>

      <h2>Total Amount: ₹ {total}</h2>

      <button onClick={startPayment}>
        Pay Now
      </button>

    </div>

  );

}

export default Payment;