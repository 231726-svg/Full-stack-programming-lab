// ============================================================
// Task 2 – Online Shopping Cart
// Concepts: Rest Operator, Spread Operator,
//           Array Destructuring, Arrow Functions
// ============================================================

// ---- Product catalogue (const — never reassigned) ----
const PRODUCTS = [
    { id: 1, name: 'Wireless Headphones', price: 89.99, emoji: '🎧' },
    { id: 2, name: 'Mechanical Keyboard', price: 129.99, emoji: '⌨️' },
    { id: 3, name: 'USB-C Hub', price: 49.99, emoji: '🔌' },
    { id: 4, name: 'Webcam HD', price: 75.00, emoji: '📷' },
    { id: 5, name: 'Mouse Pad XL', price: 19.99, emoji: '🖱️' },
    { id: 6, name: 'LED Desk Lamp', price: 34.99, emoji: '💡' },
    { id: 7, name: 'Phone Stand', price: 14.99, emoji: '📱' },
    { id: 8, name: 'Portable SSD', price: 99.99, emoji: '💾' },
];

// ---- Cart state using let (can grow/change) ----
let cart = [];

// ===========================================================
// REST OPERATOR — addToCart(...items)
// ===========================================================
const addToCart = (...items) => {
    // items is an array collected via Rest operator
    cart = [...cart, ...items];   // Spread to add items
    renderCart();
};

// ---- Click handler called from product grid ----
const handleProductClick = (productId) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (product) {
        addToCart(product);   // uses Rest internally
    }
};

// ===========================================================
// SPREAD OPERATOR — clone cart
// ===========================================================
const cloneCart = () => {
    if (cart.length === 0) {
        alert('Cart is empty – add items first!');
        return;
    }

    // Clone using Spread (shallow copy)
    const clonedCart = [...cart];

    const section = document.getElementById('cloneSection');
    const container = document.getElementById('clonedCartItems');
    section.style.display = 'block';

    container.innerHTML = `
    <div class="alert alert-info mb-2">
      ✅ Cart cloned using Spread Operator <code>[...cart]</code> — ${clonedCart.length} item(s)
    </div>
    ${clonedCart.map(item => buildCartItemHTML(item, false)).join('')}`;
    section.scrollIntoView({ behavior: 'smooth' });
};

// ===========================================================
// ARRAY DESTRUCTURING
// ===========================================================
const destructureCart = () => {
    if (cart.length === 0) {
        alert('Cart is empty – add items first!');
        return;
    }

    // Destructure: first item and …remaining items
    const [firstItem, ...remainingItems] = cart;

    const resultBox = document.getElementById('destructureResult');
    resultBox.style.display = 'block';
    resultBox.innerHTML = `
    <strong class="text-accent">🔍 Array Destructuring Result:</strong><br>
    <span class="text-muted">const [firstItem, ...remainingItems] = cart;</span><br><br>
    <strong>First Item:</strong> ${firstItem.emoji} ${firstItem.name} — $${firstItem.price.toFixed(2)}<br>
    <strong>Remaining (${remainingItems.length}):</strong>
    ${remainingItems.length > 0
            ? remainingItems.map(i => `${i.emoji} ${i.name}`).join(', ')
            : 'None'}`;
};

// ---- Clear Cart ----
const clearCart = () => {
    cart = [];
    document.getElementById('cloneSection').style.display = 'none';
    document.getElementById('destructureResult').style.display = 'none';
    renderCart();
};

// ============================================================
// RENDER
// ============================================================

// Render product selection grid
const renderProducts = () => {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = PRODUCTS.map(p => `
    <button class="product-btn" onclick="handleProductClick(${p.id})">
      <div>${p.emoji} ${p.name}</div>
      <div class="price">$${p.price.toFixed(2)}</div>
    </button>`).join('');
};

// Build a single cart item row HTML
const buildCartItemHTML = (item, showIdx = true) => `
  <div class="cart-item">
    <span>${item.emoji} ${item.name}</span>
    <span class="item-price">$${item.price.toFixed(2)}</span>
  </div>`;

// Render the cart section
const renderCart = () => {
    const container = document.getElementById('cartItems');
    const statsEl = document.getElementById('cartStats');
    const countEl = document.getElementById('cartCount');
    const totalEl = document.getElementById('cartTotal');

    if (cart.length === 0) {
        container.innerHTML = '<p class="text-muted">Your cart is empty.</p>';
        statsEl.style.display = 'none';
        return;
    }

    container.innerHTML = cart.map(item => buildCartItemHTML(item)).join('');
    statsEl.style.display = 'flex';

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    countEl.innerHTML = cart.length;
    totalEl.innerHTML = `$${total.toFixed(2)}`;
};

// ---- Init ----
window.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderCart();
});
