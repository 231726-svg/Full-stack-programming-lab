import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, ThermometerSun } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Experience Ultimate Relaxation at Home</h1>
          <p>Discover our premium selection of hot tubs designed for luxury, therapy, and social gatherings.</p>
          <Link to="/products" className="btn hero-btn">Shop Now</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Hottub Haven?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <Sparkles className="feature-icon" size={40} />
            <h3>Premium Quality</h3>
            <p>Crafted from durable materials ensuring years of worry-free enjoyment.</p>
          </div>
          <div className="feature-card">
            <ThermometerSun className="feature-icon" size={40} />
            <h3>Advanced Heating</h3>
            <p>Energy-efficient systems that keep your tub at the perfect temperature.</p>
          </div>
          <div className="feature-card">
            <ShieldCheck className="feature-icon" size={40} />
            <h3>5-Year Warranty</h3>
            <p>Full coverage for shell, plumbing, and electrical components.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
