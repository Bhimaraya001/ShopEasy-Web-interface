import React, {useContext} from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Header({ search, setSearch }) {
  const  {cart}  = useContext(CartContext);
  return (
    <header className="header">
      
      <div className="logo">
        ShopEasy
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search for products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>🔍</button>
      </div>

      <nav className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/add">Add Product</Link>
      </nav>

      
         <Link to="/cart" className="cart-icon">
🛒 Cart ({cart.length})
</Link>
      
      
    </header>
  );
}

export default Header;