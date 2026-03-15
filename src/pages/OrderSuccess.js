import React from "react";
import { Link } from "react-router-dom";

function OrderSuccess(){

return(

<div style={{padding:"40px",textAlign:"center"}}>

<h1>🎉 Order Placed Successfully</h1>

<p>Your payment was successful.</p>

<Link to="/orders">
<button>View Orders</button>
</Link>

</div>

)

}

export default OrderSuccess;