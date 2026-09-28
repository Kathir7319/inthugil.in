// client/src/components/admin/ProductEditorModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Upload, Save, Sparkles, Image as ImageIcon } from 'lucide-react';
import { api } from '../../services/api';

export const ProductEditorModal = ({ product, isOpen, onClose, onSaved }) => {
  if (!isOpen) return null;

  const isEditing = Boolean(product && product.id);

  const [formData, setFormData] = useState({
    name: '',
    categorySlug: 'ethnic-wear',
    categoryName: 'Ethnic Wear',
    subCategory: 'Kurtis',
    price: 899,
    originalPrice: 1699,
    stockCount: 20,
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: 'Rose Beige, Ivory Cream',
    fabric: 'Pure Cotton / Rayon Blend',
    fit: 'A-Line Flared Fit',
    care: 'Machine wash cold, gentle cycle',
    shortDescription: 'Effortless elegance in every stitch — soft, breathable fabric designed for all-day comfort and grace.',
    description: 'Crafted from premium breathable fabric, this piece brings together timeless elegance and everyday comfort. The refined silhouette flatters every body type, while thoughtful detailing adds a touch of understated luxury.',
    images: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
    isBestseller: false,
    isNewArrival: true,
    metaTitle: '',
    metaDescription: ''
  });

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        categorySlug: product.categorySlug || 'ethnic-wear',
        categoryName: product.categoryName || 'Ethnic Wear',
        subCategory: product.subCategory || 'Kurtis',
        price: product.price || 899,
        originalPrice: product.originalPrice || 1699,
        stockCount: product.stockCount !== undefined ? product.stockCount : 20,
        availableSizes: product.availableSizes || ['S', 'M', 'L', 'XL'],
        colors: Array.isArray(product.colors) ? product.colors.join(', ') : (product.colors || ''),
        fabric: product.fabric || '',
        fit: product.fit || '',
        care: product.care || '',
        shortDescription: product.shortDescription || '',
        description: product.description || '',
        images: Array.isArray(product.images) ? product.images.join('\n') : (product.images || ''),
        isBestseller: Boolean(product.isBestseller),
        isNewArrival: Boolean(product.isNewArrival),
        metaTitle: product.metaTitle || '',
        metaDescription: product.metaDescription || ''
      });
    }
  }, [product]);

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const toggleSize = (sz) => {
    setFormData(prev => {
      const exists = prev.availableSizes.includes(sz);
      const updated = exists
        ? prev.availableSizes.filter(s => s !== sz)
        : [...prev.availableSizes, sz];
      return { ...prev, availableSizes: updated };
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const uploadRes = await api.uploadImage(reader.result, file.name);
        setFormData(prev => ({
          ...prev,
          images: prev.images ? `${uploadRes.url}\n${prev.images}` : uploadRes.url
        }));
      } catch (err) {
        console.error(err);
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const imagesArray = formData.images
        .split('\n')
        .map(u => u.trim())
        .filter(Boolean);

      const colorsArray = formData.colors
        .split(',')
        .map(c => c.trim())
        .filter(Boolean);

      const categoryNameMap = {
        'ethnic-wear': 'Ethnic Wear',
        'western-wear': 'Western Wear',
        'loungewear': 'Loungewear',
        'new-arrivals': 'New Arrivals'
      };

      const payload = {
        ...formData,
        categoryName: categoryNameMap[formData.categorySlug] || 'Women',
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        stockCount: Number(formData.stockCount),
        images: imagesArray.length ? imagesArray : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80'],
        colors: colorsArray,
        imageAlt: `${formData.name} – ${categoryNameMap[formData.categorySlug] || 'clothing'} for women | Inthugil`,
        metaTitle: formData.metaTitle || `${formData.name} – Buy Online | Inthugil`,
        metaDescription: formData.metaDescription || `Shop ${formData.name} at Inthugil — premium fabric, elegant fit, budget-friendly price. Free returns. Order online today.`
      };

      if (isEditing) {
        await api.updateProduct(product.id, payload);
      } else {
        await api.addProduct(payload);
      }

      onSaved();
      onClose();
    } catch (err) {
      alert(err.message || 'Error saving product');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-regal-950/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl z-10 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-sand-200 mb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-600 font-bold">
              Product Studio
            </span>
            <h2 className="font-serif text-2xl font-bold text-regal-900">
              {isEditing ? `Edit Product: ${product.name}` : 'Add New Style to Inthugil'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-sand-400 hover:text-regal-900 rounded-full hover:bg-sand-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* General Information */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-regal-900 mb-1">
                Product Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rose Beige Anarkali Kurti"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-sand-50 border border-sand-300 rounded-xl px-4 py-2.5 text-xs text-regal-900 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-regal-900 mb-1">
                Category *
              </label>
              <select
                value={formData.categorySlug}
                onChange={(e) => setFormData({ ...formData, categorySlug: e.target.value })}
                className="w-full bg-sand-50 border border-sand-300 rounded-xl px-3 py-2.5 text-xs text-regal-900 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
              >
                <option value="ethnic-wear">Ethnic Wear</option>
                <option value="western-wear">Western Wear</option>
                <option value="loungewear">Loungewear</option>
                <option value="new-arrivals">New Arrivals</option>
              </select>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-sand-50 rounded-2xl border border-sand-200">
            <div>
              <label className="block text-xs font-bold text-regal-900 mb-1">
                Selling Price (₹) *
              </label>
              <input
                type="number"
                required
                min={0}
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-white border border-sand-300 rounded-xl px-3 py-2 text-xs font-bold text-regal-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-regal-900 mb-1">
                Original Price (₹)
              </label>
              <input
                type="number"
                min={0}
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                className="w-full bg-white border border-sand-300 rounded-xl px-3 py-2 text-xs font-bold text-sand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-regal-900 mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                min={0}
                value={formData.stockCount}
                onChange={(e) => setFormData({ ...formData, stockCount: e.target.value })}
                className="w-full bg-white border border-sand-300 rounded-xl px-3 py-2 text-xs font-bold text-regal-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-regal-900 mb-1">
                Sub-Type
              </label>
              <input
                type="text"
                placeholder="e.g. Kurtis, Sarees"
                value={formData.subCategory}
                onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                className="w-full bg-white border border-sand-300 rounded-xl px-3 py-2 text-xs font-medium"
              />
            </div>
          </div>

          {/* Indian Sizes Selector */}
          <div>
            <label className="block text-xs font-bold text-regal-900 mb-2">
              Available Indian Sizes
            </label>
            <div className="flex gap-2">
              {allSizes.map((sz) => (
                <button
                  type="button"
                  key={sz}
                  onClick={() => toggleSize(sz)}
                  className={`w-12 h-10 rounded-xl text-xs font-bold border transition ${
                    formData.availableSizes.includes(sz)
                      ? 'bg-regal-900 text-white border-regal-900 shadow-sm'
                      : 'bg-sand-50 text-sand-500 border-sand-300'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Fabric, Fit, Care */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-regal-900 mb-1">
                Fabric
              </label>
              <input
                type="text"
                placeholder="Pure Cotton / Rayon"
                value={formData.fabric}
                onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                className="w-full bg-sand-50 border border-sand-300 rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-regal-900 mb-1">
                Fit Silhouette
              </label>
              <input
                type="text"
                placeholder="A-Line / Straight / Relaxed"
                value={formData.fit}
                onChange={(e) => setFormData({ ...formData, fit: e.target.value })}
                className="w-full bg-sand-50 border border-sand-300 rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-regal-900 mb-1">
                Wash & Care
              </label>
              <input
                type="text"
                placeholder="Machine wash cold"
                value={formData.care}
                onChange={(e) => setFormData({ ...formData, care: e.target.value })}
                className="w-full bg-sand-50 border border-sand-300 rounded-xl px-3 py-2 text-xs"
              />
            </div>
          </div>

          {/* Product Descriptions */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-regal-900 mb-1">
                Short Description (Listing Tagline)
              </label>
              <input
                type="text"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="w-full bg-sand-50 border border-sand-300 rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-regal-900 mb-1">
                Detailed Description (Product Page Copy)
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-sand-50 border border-sand-300 rounded-xl px-3 py-2 text-xs"
              />
            </div>
          </div>

          {/* Image URLs & Cloudinary Upload */}
          <div className="p-4 bg-sand-50 rounded-2xl border border-sand-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-regal-900 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-brand-600" />
                <span>Product Images (One URL per line)</span>
              </label>
              <label className="cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-sand-300 text-xs font-bold text-brand-600 hover:bg-brand-50 flex items-center gap-1.5 shadow-xs">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            <textarea
              rows={2}
              placeholder="https://images.unsplash.com/..."
              value={formData.images}
              onChange={(e) => setFormData({ ...formData, images: e.target.value })}
              className="w-full bg-white border border-sand-300 rounded-xl px-3 py-2 text-xs font-mono"
            />
          </div>

          {/* Checkboxes: Bestseller & New Arrival */}
          <div className="flex items-center gap-6 pt-1 text-xs">
            <label className="flex items-center gap-2 cursor-pointer font-bold text-regal-900">
              <input
                type="checkbox"
                checked={formData.isBestseller}
                onChange={(e) => setFormData({ ...formData, isBestseller: e.target.checked })}
                className="w-4 h-4 text-brand-600 rounded"
              />
              <span>Mark as Bestseller</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-bold text-regal-900">
              <input
                type="checkbox"
                checked={formData.isNewArrival}
                onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                className="w-4 h-4 text-brand-600 rounded"
              />
              <span>Mark as New Arrival</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-sand-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-sand-300 text-xs font-bold text-sand-600 hover:bg-sand-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-brand-600 hover:bg-brand-500 text-white px-8 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Saving...' : 'Save Product'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
