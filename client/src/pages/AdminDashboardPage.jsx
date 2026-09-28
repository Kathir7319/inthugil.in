// client/src/pages/AdminDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Sliders,
  Package,
  ShoppingBag,
  Settings,
  Globe,
  MessageSquare,
  Plus,
  Edit,
  Trash2,
  LogOut,
  ExternalLink,
  Save,
  CheckCircle2,
  Search,
  Truck,
  Eye,
  FileText
} from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { ProductEditorModal } from '../components/admin/ProductEditorModal';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import { api } from '../services/api';

export const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, adminUser } = useAuth();
  const { settings, refreshSettings } = useSettings();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders' | 'settings' | 'seo' | 'inquiries'

  // Data states
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter/Search states
  const [productSearch, setProductSearch] = useState('');
  const [orderFilter, setOrderFilter] = useState('all');

  // Modal state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState(null);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSavedNotice, setSettingsSavedNotice] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    loadAllAdminData();
  }, [isAuthenticated]);

  useEffect(() => {
    if (settings) {
      setSettingsForm(JSON.parse(JSON.stringify(settings)));
    }
  }, [settings]);

  const loadAllAdminData = async () => {
    setLoading(true);
    try {
      const [prods, ords, inqs] = await Promise.all([
        api.getProducts(),
        api.getOrders(),
        api.getInquiries()
      ]);
      setProducts(prods);
      setOrders(ords);
      setInquiries(inqs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from Inthugil?`)) {
      try {
        await api.deleteProduct(id);
        loadAllAdminData();
      } catch (err) {
        alert(err.message || 'Error deleting product');
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.updateOrderStatus(orderId, newStatus);
      loadAllAdminData();
    } catch (err) {
      alert(err.message || 'Failed to update order status');
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      await api.updateSettings(settingsForm);
      await refreshSettings();
      setSettingsSavedNotice(true);
      setTimeout(() => setSettingsSavedNotice(false), 3000);
    } catch (err) {
      alert(err.message || 'Failed to save settings');
    } finally {
      setSavingSettings(false);
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.categoryName?.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredOrders = orders.filter(o => {
    if (orderFilter === 'all') return true;
    return o.orderStatus?.toLowerCase() === orderFilter.toLowerCase();
  });

  return (
    <div className="bg-sand-50 min-h-screen">
      <SEOHead
        title="Admin Control Center | Inthugil"
        description="Effortless management portal for Inthugil.in products, orders, settings, and SEO"
        canonicalUrl="https://inthugil.in/admin"
      />

      {/* Top Admin Navbar */}
      <header className="bg-regal-950 text-white border-b border-regal-900 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-serif text-xl font-bold tracking-tight text-white hover:text-brand-300 transition">
              INTHUGIL
            </Link>
            <span className="hidden sm:inline text-xs bg-regal-800 text-brand-300 font-semibold px-2.5 py-0.5 rounded-full border border-regal-700">
              Admin CMS Studio
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="hidden md:inline text-sand-300">
              Logged in as <strong>{adminUser?.email || 'admin@inthugil.in'}</strong>
            </span>
            <Link
              to="/"
              target="_blank"
              className="flex items-center gap-1 text-sand-300 hover:text-white"
            >
              <span>View Live Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 bg-regal-800 hover:bg-rose-700 text-sand-200 hover:text-white px-3 py-1.5 rounded-xl transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Admin Body Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-sand-200">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'products'
                ? 'bg-regal-900 text-white shadow-soft'
                : 'bg-white text-sand-700 hover:bg-sand-100 border border-sand-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Products ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-regal-900 text-white shadow-soft'
                : 'bg-white text-sand-700 hover:bg-sand-100 border border-sand-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-regal-900 text-white shadow-soft'
                : 'bg-white text-sand-700 hover:bg-sand-100 border border-sand-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Website Customizer</span>
          </button>

          <button
            onClick={() => setActiveTab('seo')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'seo'
                ? 'bg-regal-900 text-white shadow-soft'
                : 'bg-white text-sand-700 hover:bg-sand-100 border border-sand-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>SEO & Sitemap</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'inquiries'
                ? 'bg-regal-900 text-white shadow-soft'
                : 'bg-white text-sand-700 hover:bg-sand-100 border border-sand-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Inquiries ({inquiries.length})</span>
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: PRODUCTS MANAGER */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative max-w-sm flex-1">
                <Search className="w-4 h-4 text-sand-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search products by title or category..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full bg-white border border-sand-300 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
                />
              </div>

              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setIsEditorOpen(true);
                }}
                className="bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Style</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-3xl border border-sand-200 shadow-soft overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-sand-50 border-b border-sand-200 text-regal-900 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Item</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Stock</th>
                      <th className="py-3 px-4">Sizes</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand-100">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-sand-50/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.images?.[0]}
                              alt={p.name}
                              className="w-10 h-12 object-cover rounded-lg bg-sand-100 shadow-xs"
                            />
                            <div>
                              <strong className="text-regal-900 font-bold block max-w-xs truncate">
                                {p.name}
                              </strong>
                              <span className="text-[10px] text-sand-500 font-mono">
                                /{p.slug}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="bg-brand-50 text-brand-800 font-semibold px-2 py-0.5 rounded-md text-[11px]">
                            {p.categoryName}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-bold text-regal-900">
                          ₹{p.price.toLocaleString('en-IN')}
                          {p.originalPrice && (
                            <span className="text-sand-400 line-through ml-1 text-[11px] font-normal">
                              ₹{p.originalPrice}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {p.stockCount > 0 ? (
                            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">
                              {p.stockCount} in stock
                            </span>
                          ) : (
                            <span className="text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded-full text-[10px]">
                              Sold Out
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-1 flex-wrap max-w-xs">
                            {p.availableSizes?.map(sz => (
                              <span key={sz} className="bg-sand-100 text-sand-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                                {sz}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              to={`/product/${p.slug}`}
                              target="_blank"
                              className="p-1.5 text-sand-500 hover:text-brand-600 rounded-lg hover:bg-sand-100"
                              title="View on store"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => {
                                setSelectedProduct(p);
                                setIsEditorOpen(true);
                              }}
                              className="p-1.5 text-sand-500 hover:text-brand-600 rounded-lg hover:bg-sand-100"
                              title="Edit product"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id, p.name)}
                              className="p-1.5 text-sand-500 hover:text-rose-600 rounded-lg hover:bg-sand-100"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: ORDERS MANAGER */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-regal-900">
                Customer Orders ({orders.length})
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-sand-500">Filter status:</span>
                <select
                  value={orderFilter}
                  onChange={(e) => setOrderFilter(e.target.value)}
                  className="bg-white border border-sand-300 rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-none"
                >
                  <option value="all">All Orders</option>
                  <option value="placed">Placed</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-sand-200 shadow-soft overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-sand-50 border-b border-sand-200 text-regal-900 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Order #</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Address</th>
                      <th className="py-3 px-4">Items</th>
                      <th className="py-3 px-4">Total</th>
                      <th className="py-3 px-4">Payment</th>
                      <th className="py-3 px-4">Change Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand-100">
                    {filteredOrders.map((o) => (
                      <tr key={o.id} className="hover:bg-sand-50/50">
                        <td className="py-3 px-4 font-mono font-bold text-brand-700">
                          {o.orderNumber}
                          <span className="block text-[10px] text-sand-400 font-sans font-normal">
                            {new Date(o.createdAt).toLocaleDateString('en-IN')}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <strong className="text-regal-900 font-bold block">{o.customer?.name}</strong>
                          <span className="text-sand-500">{o.customer?.phone}</span>
                        </td>
                        <td className="py-3 px-4 max-w-xs text-sand-600 truncate">
                          {o.customer?.address}, {o.customer?.city} ({o.customer?.pincode})
                        </td>
                        <td className="py-3 px-4">
                          <div className="space-y-0.5">
                            {o.items?.map((it, idx) => (
                              <div key={idx} className="text-[11px] truncate max-w-xs">
                                • {it.name} ({it.size}) × {it.quantity}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-bold text-regal-900">
                          ₹{o.total?.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-4">
                          <span className="block font-semibold text-regal-900">{o.paymentMethod}</span>
                          <span className={`text-[10px] font-bold ${
                            o.paymentStatus === 'PAID' ? 'text-emerald-700' : 'text-amber-700'
                          }`}>
                            {o.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={o.orderStatus}
                            onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                            className="bg-sand-50 border border-sand-300 rounded-lg px-2.5 py-1 text-xs font-bold text-regal-900 focus:outline-none"
                          >
                            <option value="Placed">Placed</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: WEBSITE CUSTOMIZER (MAINTENANCE CMS) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'settings' && settingsForm && (
          <form onSubmit={handleSaveSettings} className="space-y-8 max-w-4xl">
            
            {/* Announcement Ribbon */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft space-y-4">
              <h3 className="font-serif text-lg font-bold text-regal-900 pb-3 border-b border-sand-100 flex items-center justify-between">
                <span>Top Announcement Bar Ticker</span>
                <label className="text-xs font-sans font-medium flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settingsForm.announcementBar?.enabled}
                    onChange={(e) => setSettingsForm({
                      ...settingsForm,
                      announcementBar: { ...settingsForm.announcementBar, enabled: e.target.checked }
                    })}
                    className="w-4 h-4 text-brand-600 rounded"
                  />
                  <span>Show Announcement Bar</span>
                </label>
              </h3>

              <div>
                <label className="block text-xs font-bold text-regal-900 mb-1">
                  Announcement Message
                </label>
                <input
                  type="text"
                  value={settingsForm.announcementBar?.text || ''}
                  onChange={(e) => setSettingsForm({
                    ...settingsForm,
                    announcementBar: { ...settingsForm.announcementBar, text: e.target.value }
                  })}
                  className="w-full bg-sand-50 border border-sand-300 rounded-xl px-4 py-2.5 text-xs text-regal-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-regal-900 mb-1">
                    Link Text
                  </label>
                  <input
                    type="text"
                    value={settingsForm.announcementBar?.linkText || ''}
                    onChange={(e) => setSettingsForm({
                      ...settingsForm,
                      announcementBar: { ...settingsForm.announcementBar, linkText: e.target.value }
                    })}
                    className="w-full bg-sand-50 border border-sand-300 rounded-xl px-4 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-regal-900 mb-1">
                    Link Destination URL
                  </label>
                  <input
                    type="text"
                    value={settingsForm.announcementBar?.linkUrl || ''}
                    onChange={(e) => setSettingsForm({
                      ...settingsForm,
                      announcementBar: { ...settingsForm.announcementBar, linkUrl: e.target.value }
                    })}
                    className="w-full bg-sand-50 border border-sand-300 rounded-xl px-4 py-2 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Hero Banner Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft space-y-4">
              <h3 className="font-serif text-lg font-bold text-regal-900 pb-3 border-b border-sand-100">
                Homepage Hero Section
              </h3>

              <div>
                <label className="block text-xs font-bold text-regal-900 mb-1">
                  Main Headline (H1)
                </label>
                <input
                  type="text"
                  value={settingsForm.heroBanner?.title || ''}
                  onChange={(e) => setSettingsForm({
                    ...settingsForm,
                    heroBanner: { ...settingsForm.heroBanner, title: e.target.value }
                  })}
                  className="w-full bg-sand-50 border border-sand-300 rounded-xl px-4 py-2.5 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-regal-900 mb-1">
                  Subheadline
                </label>
                <textarea
                  rows={2}
                  value={settingsForm.heroBanner?.subtitle || ''}
                  onChange={(e) => setSettingsForm({
                    ...settingsForm,
                    heroBanner: { ...settingsForm.heroBanner, subtitle: e.target.value }
                  })}
                  className="w-full bg-sand-50 border border-sand-300 rounded-xl px-4 py-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-regal-900 mb-1">
                    Hero CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={settingsForm.heroBanner?.ctaText || ''}
                    onChange={(e) => setSettingsForm({
                      ...settingsForm,
                      heroBanner: { ...settingsForm.heroBanner, ctaText: e.target.value }
                    })}
                    className="w-full bg-sand-50 border border-sand-300 rounded-xl px-4 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-regal-900 mb-1">
                    Hero Lifestyle Photo URL
                  </label>
                  <input
                    type="text"
                    value={settingsForm.heroBanner?.backgroundImage || ''}
                    onChange={(e) => setSettingsForm({
                      ...settingsForm,
                      heroBanner: { ...settingsForm.heroBanner, backgroundImage: e.target.value }
                    })}
                    className="w-full bg-sand-50 border border-sand-300 rounded-xl px-4 py-2 text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Shipping & Support */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft space-y-4">
              <h3 className="font-serif text-lg font-bold text-regal-900 pb-3 border-b border-sand-100">
                Shipping Rules & Support Contacts
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-regal-900 mb-1">
                    Free Shipping Threshold (₹)
                  </label>
                  <input
                    type="number"
                    value={settingsForm.shippingPolicy?.freeShippingThreshold || 799}
                    onChange={(e) => setSettingsForm({
                      ...settingsForm,
                      shippingPolicy: { ...settingsForm.shippingPolicy, freeShippingThreshold: Number(e.target.value) }
                    })}
                    className="w-full bg-sand-50 border border-sand-300 rounded-xl px-4 py-2 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-regal-900 mb-1">
                    Customer Care Phone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={settingsForm.contactInfo?.phone || ''}
                    onChange={(e) => setSettingsForm({
                      ...settingsForm,
                      contactInfo: { ...settingsForm.contactInfo, phone: e.target.value }
                    })}
                    className="w-full bg-sand-50 border border-sand-300 rounded-xl px-4 py-2 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={savingSettings}
                className="bg-brand-600 hover:bg-brand-500 text-white px-8 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lift transition"
              >
                <Save className="w-4 h-4" />
                <span>{savingSettings ? 'Saving Changes...' : 'Save Website Changes'}</span>
              </button>
              {settingsSavedNotice && (
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Changes saved live to database!</span>
                </span>
              )}
            </div>

          </form>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: SEO & SITEMAP CENTER */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'seo' && (
          <div className="space-y-8 max-w-4xl">
            
            {/* Live Google Search Preview */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft space-y-4">
              <h3 className="font-serif text-lg font-bold text-regal-900 pb-3 border-b border-sand-100 flex items-center gap-2">
                <Globe className="w-5 h-5 text-brand-600" />
                <span>Live Google Search Snippet Preview</span>
              </h3>

              <div className="bg-white p-5 rounded-2xl border border-sand-300 font-sans max-w-xl">
                <div className="text-[12px] text-sand-500 mb-0.5">https://inthugil.in</div>
                <div className="text-blue-700 hover:underline text-lg font-medium cursor-pointer leading-snug">
                  Inthugil – Affordable Elegant Women's Clothing Online
                </div>
                <div className="text-sand-700 text-xs mt-1.5 leading-relaxed">
                  Shop elegant, affordable women's clothing at Inthugil. Ethnic wear, western wear & loungewear crafted for everyday grace. Free shipping available across India.
                </div>
              </div>
            </div>

            {/* Technical SEO Links */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft space-y-4">
              <h3 className="font-serif text-lg font-bold text-regal-900 pb-3 border-b border-sand-100">
                Automated Technical SEO Feeds
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  className="p-4 rounded-2xl bg-sand-50 border border-sand-200 hover:border-brand-400 hover:bg-white transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-brand-600" />
                    <div>
                      <strong className="block text-regal-900 font-bold">Dynamic XML Sitemap</strong>
                      <span className="text-sand-500">/sitemap.xml (Google Search Console)</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-sand-400 group-hover:text-brand-600" />
                </a>

                <a
                  href="/robots.txt"
                  target="_blank"
                  className="p-4 rounded-2xl bg-sand-50 border border-sand-200 hover:border-brand-400 hover:bg-white transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-brand-600" />
                    <div>
                      <strong className="block text-regal-900 font-bold">Robots.txt</strong>
                      <span className="text-sand-500">Allows search spiders, protects checkout</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-sand-400 group-hover:text-brand-600" />
                </a>
              </div>
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 5: INQUIRIES */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <h3 className="font-serif text-xl font-bold text-regal-900">
              Customer Messages & Support Inquiries ({inquiries.length})
            </h3>

            <div className="bg-white rounded-3xl border border-sand-200 shadow-soft overflow-hidden">
              <div className="divide-y divide-sand-100">
                {inquiries.length === 0 ? (
                  <div className="text-center py-12 text-xs text-sand-500">
                    No customer inquiries received yet.
                  </div>
                ) : (
                  inquiries.map((inq) => (
                    <div key={inq.id} className="p-6 space-y-2 hover:bg-sand-50/50">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <strong className="text-sm font-bold text-regal-900">{inq.name}</strong>
                          <span className="text-xs text-brand-700 font-semibold bg-brand-50 px-2 py-0.5 rounded-full">
                            {inq.status || 'New'}
                          </span>
                        </div>
                        <span className="text-xs text-sand-400">
                          {new Date(inq.date).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="text-xs text-sand-500 space-x-3">
                        <span>Email: <strong className="text-regal-900">{inq.email}</strong></span>
                        {inq.phone && <span>Phone: <strong className="text-regal-900">{inq.phone}</strong></span>}
                        {inq.orderNumber && <span>Order: <strong className="text-brand-600 font-mono">{inq.orderNumber}</strong></span>}
                      </div>
                      <p className="text-xs sm:text-sm text-regal-900 bg-sand-50 p-3.5 rounded-xl border border-sand-200 leading-relaxed">
                        {inq.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Product Editor Modal */}
      <ProductEditorModal
        product={selectedProduct}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSaved={loadAllAdminData}
      />

    </div>
  );
};
