import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="logo">
          Zomato Clone
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/restaurant">Restaurants</Link>
          <Link to="/delivery">Delivery</Link>
          <Link to="/auth">Login / Sign Up</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;