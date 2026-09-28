// client/src/pages/CategoryPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { VelIcon } from '../components/common/VelIcon';
import { ProductCard } from '../components/products/ProductCard';
import { FilterSidebar } from '../components/products/FilterSidebar';
import { QuickViewModal } from '../components/products/QuickViewModal';
import { SizeGuideModal } from '../components/products/SizeGuideModal';
import { useSettings } from '../context/SettingsContext';
import { api } from '../../src/services/api';

export const CategoryPage = ({ categorySlug: propSlug }) => {
  const params = useParams();
  const slug = propSlug || params.categorySlug;
  const { categories } = useSettings();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedSize, setSelectedSize] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [inStockOnly, setInStockOnly] = useState(false);
  const [bestsellerOnly, setBestsellerOnly] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  // Category copy lookup matching SEO specs
  const categoryMetaMap = {
    'ethnic-wear': {
      name: "Ethnic Wear",
      title: "Ethnic Wear for Women – Kurtis, Sarees & Suits | Inthugil",
      description: "Discover graceful kurtis, sarees & suits at honest prices. Shop Inthugil's ethnic wear collection made for the modern Indian woman.",
      headline: "Ethnic Wear, Reimagined",
      intro: "Graceful drapes, rich textures, and timeless silhouettes — our ethnic collection is designed for the woman who carries tradition with elegance.",
      banner: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=80"
    },
    'western-wear': {
      name: "Western Wear",
      title: "Women's Dresses & Co-ords Online | Inthugil",
      description: "Elegant dresses, tops & co-ord sets for every occasion. Affordable western wear that never compromises on style. Shop now at Inthugil.",
      headline: "Contemporary Western Styles",
      intro: "Elegant dresses, tops & co-ord sets for every occasion. Affordable western wear that never compromises on style.",
      banner: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1600&q=80"
    },
    'loungewear': {
      name: "Loungewear",
      title: "Comfortable Loungewear for Women | Inthugil",
      description: "Comfortable, breathable loungewear and nightwear for women. Soft modal fabrics and relaxed fits at budget-friendly prices.",
      headline: "Comfort Meets Everyday Style",
      intro: "Cloud-soft fabrics and relaxed tailoring that keep you looking put-together, even when you're just unwinding at home.",
      banner: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=1600&q=80"
    },
    'new-arrivals': {
      name: "New Arrivals",
      title: "New Arrivals – Latest Women's Fashion | Inthugil",
      description: "Explore this week's new arrivals at Inthugil. Fresh kurtis, stylish dresses, and comfortable ethnic wear at affordable prices.",
      headline: "This Week's Fresh Arrivals",
      intro: "Explore our latest drops featuring season-favorite pastels, lightweight festive embroidery, and contemporary everyday wear.",
      banner: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1600&q=80"
    }
  };

  const meta = categoryMetaMap[slug] || {
    name: "Fashion Collection",
    title: "Women's Clothing Online | Inthugil",
    description: "Shop elegant and affordable women's fashion at Inthugil.in.",
    headline: "Curated Women's Fashion",
    intro: "Thoughtfully crafted silhouettes for effortless everyday grace.",
    banner: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=80"
  };

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const filters = {
          sort: sortBy,
          size: selectedSize,
          minPrice: priceRange.min > 0 ? priceRange.min : undefined,
          maxPrice: priceRange.max < 5000 ? priceRange.max : undefined,
        };
        if (slug === 'new-arrivals') {
          filters.isNewArrival = 'true';
        } else {
          filters.category = slug;
        }
        if (bestsellerOnly) filters.isBestseller = 'true';

        const data = await api.getProducts(filters);
        let list = data;
        if (inStockOnly) {
          list = list.filter(p => p.inStock);
        }
        setProducts(list);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [slug, sortBy, selectedSize, priceRange, inStockOnly, bestsellerOnly]);

  const handleResetFilters = () => {
    setSelectedSize('');
    setPriceRange({ min: 0, max: 5000 });
    setInStockOnly(false);
    setBestsellerOnly(false);
    setSortBy('newest');
  };

  return (
    <div className="bg-sand-50 min-h-screen pb-20">
      
      {/* Dynamic SEO Meta & Head */}
      <SEOHead
        title={meta.title}
        description={meta.description}
        canonicalUrl={`https://inthugil.in/${slug}`}
        ogImage={meta.banner}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-sand-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-xs text-sand-500">
            <Link to="/" className="hover:text-brand-600 transition">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/shop" className="hover:text-brand-600 transition">Shop</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-regal-900 font-semibold">{meta.name}</span>
          </nav>
        </div>
      </div>

      {/* Category Hero Banner - Peacock Shades */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#02181F] via-[#052C37] via-[#074758] to-[#04332A] text-white py-16 sm:py-20 border-b border-[#D4AF37]/30">
        <div 
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(14, 116, 144, 0.45) 0%, rgba(3, 105, 161, 0.2) 50%, transparent 70%)'
          }}
        />
        <div 
          className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(6, 78, 59, 0.55) 0%, rgba(4, 120, 87, 0.2) 50%, transparent 70%)'
          }}
        />
        <div className="absolute inset-0 z-0 opacity-25">
          <img src={meta.banner} alt={meta.name} className="w-full h-full object-cover object-center" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-[#063A48]/85 border border-[#D4AF37]/50 text-[#FDE68A] px-3.5 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-md mb-3">
            <VelIcon className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>வேல் • Inthugil Collection</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-white">
            {meta.headline}
          </h1>
          <p className="text-teal-100/90 text-sm sm:text-base max-w-2xl leading-relaxed">
            {meta.intro}
          </p>
        </div>
      </div>

      {/* Main Catalog Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
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

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28">
              <FilterSidebar
                categories={categories}
                selectedCategory={slug}
                onSelectCategory={() => {}}
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

          {/* Product Grid */}
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
                <p className="text-xs text-sand-500 mb-6">Try adjusting your filters or price range to explore more options.</p>
                <button
                  onClick={handleResetFilters}
                  className="bg-regal-900 text-white text-xs font-semibold px-6 py-2.5 rounded-xl hover:bg-brand-600 transition"
                >
                  Reset All Filters
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
