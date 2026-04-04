import React from 'react';
import { Link } from 'react-router-dom';
import { Droplets } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <Droplets size={24} />
            <span>Hottub Haven</span>
          </div>
          <p>Your ultimate destination for relaxation and rejuvenation.</p>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">My Cart</Link></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: relax@hottubhaven.demo</p>
          <p>Phone: 1-800-RELAX-NOW</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} Hottub Haven. React E-Commerce Lab Assignment.</p>
      </div>
    </footer>
  );
};

export default Footer;
