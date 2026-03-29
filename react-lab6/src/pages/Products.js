import React, { useState } from 'react';

const productList = [
  { id: 1, title: 'Laptop',       description: 'A powerful laptop for everyday use.' },
  { id: 2, title: 'Smartphone',   description: 'Latest smartphone with great camera.' },
  { id: 3, title: 'Headphones',   description: 'Noise-cancelling wireless headphones.' },
  { id: 4, title: 'Tablet',       description: 'Lightweight tablet for work and fun.' },
  { id: 5, title: 'Smartwatch',   description: 'Track fitness and notifications easily.' },
  { id: 6, title: 'Keyboard',     description: 'Mechanical keyboard for fast typing.' },
];

function Products() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (title) => {
    setCartItems([...cartItems, title]);
  };

  return (
    <div className="page">
      <h1>Products</h1>

      {cartItems.length > 0 && (
        <div className="cart-note">
          🛒 Cart: {cartItems.join(', ')}
        </div>
      )}

      <div className="products-grid" style={{ marginTop: '20px' }}>
        {productList.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <button className="add-cart-btn" onClick={() => addToCart(product.title)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
