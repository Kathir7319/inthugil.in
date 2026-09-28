// client/src/pages/ShopPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ChevronRight, SlidersHorizontal } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { ProductCard } from '../components/products/ProductCard';
import { FilterSidebar } from '../components/products/FilterSidebar';
import { QuickViewModal } from '../components/products/QuickViewModal';
import { SizeGuideModal } from '../components/products/SizeGuideModal';
import { useSettings } from '../context/SettingsContext';
import { useWishlist } from '../context/WishlistContext';
import { api } from '../services/api';

export const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || '';
  const isWishlistFilter = searchParams.get('wishlist') === 'true';

  const { categories } = useSettings();
  const { wishlist } = useWishlist();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedSize, setSelectedSize] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [inStockOnly, setInStockOnly] = useState(false);
  const [bestsellerOnly, setBestsellerOnly] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  useEffect(() => {
    if (initialSearch !== searchQuery) {
      setSearchQuery(initialSearch);
    }
  }, [initialSearch]);

  useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);
      try {
        const filters = {
          search: searchQuery || undefined,
          category: selectedCategory || undefined,
          sort: sortBy,
          size: selectedSize || undefined,
          minPrice: priceRange.min > 0 ? priceRange.min : undefined,
          maxPrice: priceRange.max < 5000 ? priceRange.max : undefined,
        };
        if (bestsellerOnly) filters.isBestseller = 'true';

        let data = await api.getProducts(filters);
        if (isWishlistFilter) {
          data = data.filter(p => wishlist.some(w => w.id === p.id));
        }
        if (inStockOnly) {
          data = data.filter(p => p.inStock);
        }
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalog();
  }, [selectedCategory, searchQuery, sortBy, selectedSize, priceRange, inStockOnly, bestsellerOnly, isWishlistFilter, wishlist]);

  const handleResetFilters = () => {
    setSelectedCategory('');
    setSearchQuery('');
    setSelectedSize('');
    setPriceRange({ min: 0, max: 5000 });
    setInStockOnly(false);
    setBestsellerOnly(false);
    setSortBy('newest');
    setSearchParams({});
  };

  return (
    <div className="bg-sand-50 min-h-screen pb-20">
      
      {/* SEO Title & Meta Tags */}
      <SEOHead
        title={isWishlistFilter ? "My Saved Wishlist | Inthugil" : "Shop Women's Affordable Elegant Fashion Online | Inthugil"}
        description="Explore the complete collection of Kurtis, Sarees, Western Dresses, and Loungewear at Inthugil. High quality fabrics, honest prices, and free shipping across India."
        canonicalUrl="https://inthugil.in/shop"
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-sand-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-xs text-sand-500">
            <Link to="/" className="hover:text-brand-600 transition">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-regal-900 font-semibold">
              {isWishlistFilter ? "My Saved Wishlist" : "Shop Catalog"}
            </span>
            {searchQuery && (
              <>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-brand-600">Search: "{searchQuery}"</span>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Header Title */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-regal-900 tracking-tight">
            {isWishlistFilter ? "Your Saved Wishlist" : (searchQuery ? `Search Results for "${searchQuery}"` : "Shop Women's Collection")}
          </h1>
          <p className="text-xs sm:text-sm text-sand-600 mt-1">
            Discover timeless elegance tailored for Indian women at honest prices.
          </p>
        </div>

        {/* Top Controls: Items Count & Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-sand-200">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-sand-300 text-xs font-bold text-regal-900 shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4 text-brand-600" />
              <span>Filters</span>
            </button>
            <p className="text-xs sm:text-sm text-sand-600">
              Showing <strong className="text-regal-900 font-bold">{products.length}</strong> styles
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-sand-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-sand-300 rounded-xl px-3 py-2 text-xs font-semibold text-regal-900 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm"
            >
              <option value="newest">Featured & Newest</option>
              <option value="price-low">Price: Low to High (Budget)</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>

        {/* Catalog Grid with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28">
              <FilterSidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => setSelectedCategory(cat)}
                priceRange={priceRange}
                onPriceChange={(min, max) => setPriceRange({ min, max })}
                selectedSize={selectedSize}
                onSelectSize={(sz) => setSelectedSize(sz)}
                inStockOnly={inStockOnly}
                onToggleInStock={(val) => setInStockOnly(val)}
                bestsellerOnly={bestsellerOnly}
                onToggleBestseller={(val) => setBestsellerOnly(val)}
                onReset={handleResetFilters}
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse space-y-3">
                    <div className="aspect-[3/4] bg-sand-200 rounded-2xl" />
                    <div className="h-4 bg-sand-200 rounded w-3/4" />
                    <div className="h-4 bg-sand-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-sand-200 p-8">
                <p className="font-serif text-lg font-bold text-regal-900 mb-2">No matching styles found</p>
                <p className="text-xs text-sand-500 mb-6">
                  {isWishlistFilter ? "You haven't saved any styles to your wishlist yet." : "Try adjusting your filters or search keywords."}
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-regal-900 text-white text-xs font-semibold px-6 py-2.5 rounded-xl hover:bg-brand-600 transition"
                >
                  View All Products
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Modals */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onOpenSizeGuide={() => setSizeGuideOpen(true)}
      />

      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />
    </div>
  );
};
