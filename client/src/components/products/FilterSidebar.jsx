// client/src/components/products/FilterSidebar.jsx
import React from 'react';
import { Filter, X, RotateCcw } from 'lucide-react';

export const FilterSidebar = ({
  categories = [],
  selectedCategory,
  onSelectCategory,
  priceRange,
  onPriceChange,
  selectedSize,
  onSelectSize,
  inStockOnly,
  onToggleInStock,
  bestsellerOnly,
  onToggleBestseller,
  onReset
}) => {
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const priceOptions = [
    { label: 'All Prices', min: 0, max: 5000 },
    { label: 'Under ₹799', min: 0, max: 799 },
    { label: '₹799 - ₹999', min: 799, max: 999 },
    { label: '₹999 - ₹1,499', min: 999, max: 1499 },
    { label: 'Above ₹1,499', min: 1499, max: 5000 },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border border-sand-200 shadow-soft space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-sand-200">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-600" />
          <h3 className="font-serif text-base font-bold text-regal-900">Filters</h3>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-sand-500 hover:text-brand-600 flex items-center gap-1 font-medium transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-regal-900 mb-3">
          Categories
        </h4>
        <div className="space-y-1.5 text-xs">
          <button
            onClick={() => onSelectCategory('')}
            className={`w-full text-left px-3 py-2 rounded-xl transition ${
              !selectedCategory ? 'bg-brand-50 text-brand-800 font-bold' : 'text-sand-600 hover:bg-sand-50'
            }`}
          >
            All Collections
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => onSelectCategory(cat.slug)}
              className={`w-full text-left px-3 py-2 rounded-xl transition ${
                selectedCategory === cat.slug
                  ? 'bg-brand-50 text-brand-800 font-bold'
                  : 'text-sand-600 hover:bg-sand-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Indian Sizes (XS - XXL) */}
      <div className="pt-4 border-t border-sand-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-regal-900 mb-3">
          Indian Sizes
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((sz) => (
            <button
              key={sz}
              onClick={() => onSelectSize(selectedSize === sz ? '' : sz)}
              className={`py-2 text-xs font-bold rounded-xl border transition ${
                selectedSize === sz
                  ? 'bg-regal-900 text-white border-regal-900 shadow-sm'
                  : 'bg-white text-sand-700 border-sand-200 hover:border-sand-400'
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="pt-4 border-t border-sand-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-regal-900 mb-3">
          Budget Range (INR)
        </h4>
        <div className="space-y-2">
          {priceOptions.map((opt, i) => (
            <label key={i} className="flex items-center gap-2.5 text-xs text-sand-700 cursor-pointer">
              <input
                type="radio"
                name="priceFilter"
                checked={priceRange?.max === opt.max && priceRange?.min === opt.min}
                onChange={() => onPriceChange(opt.min, opt.max)}
                className="w-3.5 h-3.5 text-brand-600 focus:ring-brand-500 rounded"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Quick Toggles */}
      <div className="pt-4 border-t border-sand-200 space-y-3">
        <label className="flex items-center justify-between text-xs text-sand-700 cursor-pointer">
          <span className="font-medium">In Stock Only</span>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onToggleInStock(e.target.checked)}
            className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500"
          />
        </label>
        <label className="flex items-center justify-between text-xs text-sand-700 cursor-pointer">
          <span className="font-medium">Bestsellers Only</span>
          <input
            type="checkbox"
            checked={bestsellerOnly}
            onChange={(e) => onToggleBestseller(e.target.checked)}
            className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500"
          />
        </label>
      </div>

    </div>
  );
};
