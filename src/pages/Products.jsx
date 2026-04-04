import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../assets/products';
import './Products.css';

const Products = ({ onAddToCart }) => {
  return (
    <div className="products-page">
      <header className="products-header">
        <h1>Our Premium Hot Tubs</h1>
        <p>Browse our collection to find the perfect addition to your home sanctuary.</p>
      </header>

      <div className="products-grid">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart} 
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
