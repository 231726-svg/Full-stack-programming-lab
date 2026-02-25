// ============================================================
// Task 5 – Product Catalog
// Concepts: ES6 Map, .set() .get() .delete() .size .has(),
//           Map iteration, Arrow Functions, Template Literals
// ============================================================

// ---- ES6 Map — Key: Product ID, Value: Product Object ----
const productMap = new Map();

// ---- Category → CSS class mapping ----
const CATEGORY_CLASS = {
    Electronics: 'cat-electronics',
    Clothing: 'cat-clothing',
    Books: 'cat-books',
    Sports: 'cat-sports',
    Other: 'cat-other',
};

// ============================================================
// Seed with 5 default products (required minimum)
// ============================================================
const DEFAULT_PRODUCTS = [
    { id: 1001, name: 'Laptop Pro 15"', category: 'Electronics', price: 999.99, stock: 12 },
    { id: 1002, name: 'Running Shoes', category: 'Sports', price: 79.50, stock: 45 },
    { id: 1003, name: 'JavaScript Mastery', category: 'Books', price: 39.99, stock: 100 },
    { id: 1004, name: 'Slim Fit Jeans', category: 'Clothing', price: 54.00, stock: 30 },
    { id: 1005, name: 'Smart Watch', category: 'Electronics', price: 249.99, stock: 8 },
];

DEFAULT_PRODUCTS.forEach(p => productMap.set(p.id, p));

// ============================================================
// Add product from form
// ============================================================
const addProduct = () => {
    const id = parseInt(document.getElementById('prodId').value);
    const name = document.getElementById('prodName').value.trim();
    const price = parseFloat(document.getElementById('prodPrice').value);
    const category = document.getElementById('prodCategory').value;
    const stock = parseInt(document.getElementById('prodStock').value) || 0;

    if (!id || !name || isNaN(price) || !category) {
        alert('Please fill in all required fields (ID, Name, Price, Category).');
        return;
    }

    if (productMap.has(id)) {
        alert(`Product ID ${id} already exists in the catalog.`);
        return;
    }

    // Map.set(key, value)
    productMap.set(id, { id, name, category, price, stock });

    // Clear form
    ['prodId', 'prodName', 'prodPrice', 'prodStock'].forEach(fId => {
        document.getElementById(fId).value = '';
    });
    document.getElementById('prodCategory').value = '';

    renderTable();
    updateStats();
};

// ============================================================
// Search product by ID — Map.get(key)
// ============================================================
const searchProduct = () => {
    const id = parseInt(document.getElementById('searchId').value);
    const result = document.getElementById('searchResult');

    if (!id) {
        result.innerHTML = '<p class="text-muted">Enter a product ID to search.</p>';
        return;
    }

    // Map.has() check before Map.get()
    if (productMap.has(id)) {
        const p = productMap.get(id);
        const cat = CATEGORY_CLASS[p.category] || 'cat-other';
        result.innerHTML = `
      <div class="search-result">
        <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:6px">
          ✅ Found via <code>productMap.get(${id})</code>
        </div>
        <strong>${p.name}</strong><br>
        <span class="category-badge ${cat}" style="margin:4px 0;display:inline-block">${p.category}</span><br>
        Price: <strong class="text-success">$${p.price.toFixed(2)}</strong>&nbsp;&nbsp;
        Stock: <strong>${p.stock} units</strong>&nbsp;&nbsp;
        ID: <code>${p.id}</code>
      </div>`;
    } else {
        result.innerHTML = `
      <div class="alert alert-danger">
        ❌ No product found with ID <code>${id}</code>
      </div>`;
    }
};

// ============================================================
// Delete product by ID — Map.delete(key)
// ============================================================
const deleteProduct = (idParam = null) => {
    const id = idParam ?? parseInt(document.getElementById('searchId').value);

    if (!id) {
        alert('Enter a product ID to delete.');
        return;
    }

    if (!productMap.has(id)) {
        alert(`Product ID ${id} not found.`);
        return;
    }

    productMap.delete(id);   // Map.delete()
    document.getElementById('searchResult').innerHTML =
        `<div class="alert alert-success">🗑️ Product ID ${id} deleted from catalog.</div>`;

    renderTable();
    updateStats();
};

// ============================================================
// Render product table — iterate Map with for...of
// ============================================================
const renderTable = () => {
    const tbody = document.getElementById('productTableBody');

    if (productMap.size === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-muted">No products in catalog.</td></tr>';
        return;
    }

    let html = '';

    // Iterate Map using for...of on entries()
    for (const [id, product] of productMap.entries()) {
        const cat = CATEGORY_CLASS[product.category] || 'cat-other';
        html += `
      <tr>
        <td><code>${id}</code></td>
        <td>${product.name}</td>
        <td><span class="category-badge ${cat}">${product.category}</span></td>
        <td class="text-success">$${product.price.toFixed(2)}</td>
        <td>${product.stock}</td>
        <td class="action-icons">
          <button class="del-btn" title="Delete" onclick="deleteProduct(${id})">🗑️</button>
        </td>
      </tr>`;
    }

    tbody.innerHTML = html;
};

// ============================================================
// Update stats — uses Map.size property
// ============================================================
const updateStats = () => {
    document.getElementById('productCount').innerHTML = productMap.size;

    // Total catalog value
    let total = 0;
    productMap.forEach(p => { total += p.price * p.stock; });
    document.getElementById('totalValue').innerHTML = `$${total.toFixed(0)}`;
};

// ---- Init ----
window.addEventListener('DOMContentLoaded', () => {
    renderTable();
    updateStats();
});
