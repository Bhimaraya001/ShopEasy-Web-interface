import React, { useEffect, useState } from "react";
import axios from "axios";

function Orders(){

const [orders,setOrders] = useState([]);

useEffect(()=>{

axios.get("http://localhost:5000/orders")
.then(res => setOrders(res.data));

},[]);

return(

<div style={{padding:"40px"}}>

<h2>Your Orders</h2>

{orders.map(order => (

<div key={order._id} className="order-card">

<h3>Total: ₹{order.total}</h3>

<p>Payment ID: {order.paymentId}</p>

<p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>

</div>

))}

</div>

)

}

export default Orders;