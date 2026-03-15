import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart(){

const { cart, removeFromCart, increaseQty, decreaseQty } =
useContext(CartContext);

const total = cart.reduce(
(sum,item)=> sum + item.price * item.quantity,
0
);

return(

<div className="cart-page">

<h2>Your Cart</h2>

{cart.length === 0 ? (
<h3>Cart is empty</h3>
) : (

<>

{cart.map((item)=> (

<div key={item._id} className="cart-item">

<img
src={`http://localhost:5000/uploads/${item.image}`}
alt={item.name}
/>

<div className="cart-details">

<h3>{item.name}</h3>

<p>₹ {item.price}</p>

<div className="qty">

<button onClick={()=>decreaseQty(item._id)}>-</button>

<span>{item.quantity}</span>

<button onClick={()=>increaseQty(item._id)}>+</button>

</div>

<button
onClick={()=>removeFromCart(item._id)}
className="delete-btn"
>
Remove
</button>

</div>

</div>

))}

<h2>Total: ₹ {total}</h2>

<Link to="/checkout">
<button className="checkout-btn">
Proceed to Checkout
</button>
</Link>

</>

)}

</div>

)

}

export default Cart;