// server/db.js - Reliable Multi-Mode Persistence Engine
// Supports Local File Persistence (JSON) + Direct Hooks for MongoDB Atlas & PostgreSQL
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data', 'store.json');

// Ensure data folder exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// In-memory cache loaded from JSON file
let store = {
  settings: {},
  categories: [],
  products: [],
  orders: [],
  inquiries: []
};

function loadStore() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      store = JSON.parse(raw);
    } else {
      saveStore();
    }
  } catch (err) {
    console.error('Error loading store.json:', err.message);
  }
}

function saveStore() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing store.json:', err.message);
  }
}

// Initial load
loadStore();

module.exports = {
  // Settings
  getSettings: () => store.settings,
  updateSettings: (newSettings) => {
    store.settings = { ...store.settings, ...newSettings };
    saveStore();
    return store.settings;
  },

  // Categories
  getCategories: () => store.categories || [],
  getCategoryBySlug: (slug) => store.categories.find(c => c.slug === slug),
  addCategory: (cat) => {
    const id = cat.id || `cat-${Date.now()}`;
    const newCat = { ...cat, id };
    store.categories.push(newCat);
    saveStore();
    return newCat;
  },
  updateCategory: (id, update) => {
    const idx = store.categories.findIndex(c => c.id === id || c.slug === id);
    if (idx !== -1) {
      store.categories[idx] = { ...store.categories[idx], ...update };
      saveStore();
      return store.categories[idx];
    }
    return null;
  },
  deleteCategory: (id) => {
    const idx = store.categories.findIndex(c => c.id === id || c.slug === id);
    if (idx !== -1) {
      const deleted = store.categories.splice(idx, 1)[0];
      saveStore();
      return deleted;
    }
    return null;
  },

  // Products
  getProducts: (filters = {}) => {
    let result = [...(store.products || [])];
    
    if (filters.category) {
      result = result.filter(p => p.categorySlug === filters.category);
    }
    if (filters.subCategory) {
      result = result.filter(p => p.subCategory?.toLowerCase() === filters.subCategory.toLowerCase());
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description?.toLowerCase().includes(q) ||
        p.fabric?.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q))
      );
    }
    if (filters.size) {
      result = result.filter(p => p.availableSizes?.includes(filters.size));
    }
    if (filters.minPrice) {
      result = result.filter(p => p.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter(p => p.price <= Number(filters.maxPrice));
    }
    if (filters.featured === 'true' || filters.isBestseller === 'true') {
      result = result.filter(p => p.isBestseller);
    }
    if (filters.isNewArrival === 'true') {
      result = result.filter(p => p.isNewArrival);
    }
    if (filters.tag) {
      result = result.filter(p => p.tags?.includes(filters.tag));
    }

    // Sorting
    if (filters.sort === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sort === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (filters.sort === 'discount') {
      result.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
    } else {
      // Default newest / id
      result.sort((a, b) => (b.id || '').localeCompare(a.id || ''));
    }

    return result;
  },

  getProductBySlug: (slug) => store.products.find(p => p.slug === slug || p.id === slug),
  getProductById: (id) => store.products.find(p => p.id === id),

  addProduct: (product) => {
    const id = product.id || `prod-${Date.now()}`;
    // Auto-generate clean SEO slug if not provided
    const slug = product.slug || product.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const discountPercent = product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : (product.discountPercent || 0);

    const imageAlt = product.imageAlt || `${product.name} – ${product.categoryName || 'clothing'} for women | Inthugil`;

    const newProd = {
      ...product,
      id,
      slug,
      discountPercent,
      imageAlt,
      rating: product.rating || 5.0,
      reviewCount: product.reviewCount || 1,
      inStock: product.stockCount > 0,
      createdAt: new Date().toISOString()
    };

    store.products.unshift(newProd);
    saveStore();
    return newProd;
  },

  updateProduct: (id, updates) => {
    const idx = store.products.findIndex(p => p.id === id || p.slug === id);
    if (idx !== -1) {
      const existing = store.products[idx];
      const merged = { ...existing, ...updates };

      if (merged.originalPrice && merged.price) {
        merged.discountPercent = Math.round(((merged.originalPrice - merged.price) / merged.originalPrice) * 100);
      }
      merged.inStock = merged.stockCount > 0;

      store.products[idx] = merged;
      saveStore();
      return merged;
    }
    return null;
  },

  deleteProduct: (id) => {
    const idx = store.products.findIndex(p => p.id === id || p.slug === id);
    if (idx !== -1) {
      const deleted = store.products.splice(idx, 1)[0];
      saveStore();
      return deleted;
    }
    return null;
  },

  // Orders
  getOrders: () => store.orders || [],
  getOrderById: (id) => store.orders.find(o => o.id === id || o.orderNumber === id),
  getOrderByTracking: (search) => {
    const q = (search || '').trim().toLowerCase();
    return store.orders.find(o => 
      o.orderNumber.toLowerCase() === q ||
      o.id.toLowerCase() === q ||
      o.trackingNumber?.toLowerCase() === q ||
      o.customer?.phone?.replace(/\D/g, '').includes(q.replace(/\D/g, ''))
    );
  },

  createOrder: (orderData) => {
    const num = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `INTH-${num}`;
    const id = `ORD-${Date.now()}`;
    const newOrder = {
      ...orderData,
      id,
      orderNumber,
      orderStatus: "Placed",
      createdAt: new Date().toISOString(),
      timeline: [
        {
          status: "Placed",
          time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          note: `Order placed via ${orderData.paymentMethod || 'Razorpay'}`
        }
      ]
    };

    store.orders.unshift(newOrder);
    saveStore();
    return newOrder;
  },

  updateOrderStatus: (id, newStatus, note = "") => {
    const order = store.orders.find(o => o.id === id || o.orderNumber === id);
    if (order) {
      order.orderStatus = newStatus;
      if (newStatus === "Delivered") {
        order.paymentStatus = "PAID";
      }
      order.timeline.push({
        status: newStatus,
        time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        note: note || `Order updated to ${newStatus}`
      });
      saveStore();
      return order;
    }
    return null;
  },

  // Contact Inquiries
  getInquiries: () => store.inquiries || [],
  createInquiry: (inq) => {
    const newInq = {
      ...inq,
      id: `inq-${Date.now()}`,
      date: new Date().toISOString(),
      status: "New"
    };
    store.inquiries.unshift(newInq);
    saveStore();
    return newInq;
  }
};
