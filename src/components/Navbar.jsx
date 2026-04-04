import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShoppingCart, Droplets } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ cartItemCount }) => {
  return (
    <header className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          <Droplets className="logo-icon" />
          <span>Hottub Haven</span>
        </Link>
        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Products
          </NavLink>
        </nav>
        <div className="nav-cart">
          <Link to="/cart" className="cart-link">
            <ShoppingCart className="cart-icon" />
            <span className="cart-text">Cart</span>
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
