// client/src/components/home/TrendingProducts.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { VelIcon, MayilFeatherIcon } from '../common/VelIcon';
import { ProductCard } from '../products/ProductCard';
import { QuickViewModal } from '../products/QuickViewModal';
import { SizeGuideModal } from '../products/SizeGuideModal';
import { api } from '../../services/api';

export const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  const tabs = [
    { id: 'all', label: 'All Curations' },
    { id: 'bestseller', label: 'Mayil & Bestsellers', icon: MayilFeatherIcon },
    { id: 'under-999', label: 'Under ₹999 Kurtis' },
    { id: 'ethnic', label: 'Temple & Ethnic Wear', icon: VelIcon },
    { id: 'western', label: 'Western & Lounge' },
  ];

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'bestseller') return p.isBestseller;
    if (activeTab === 'under-999') return p.price <= 999;
    if (activeTab === 'ethnic') return p.categorySlug === 'ethnic-wear';
    if (activeTab === 'western') return p.categorySlug === 'western-wear' || p.categorySlug === 'loungewear';
    return true;
  });

  return (
    <section className="py-20 bg-white border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-peacock-800 bg-peacock-50 border border-peacock-200 px-3.5 py-1 rounded-full mb-3 shadow-xs">
            <VelIcon className="w-3.5 h-3.5 text-gold-600" />
            <span>Divine Curations • நல்வரவு</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-regal-900 tracking-tight">
            Curated For Everyday Poise
          </h2>
          <p className="text-xs sm:text-sm text-sand-600 mt-2">
            Breathable handloom feels, auspicious jewel tones, and honest pricing. Crafted for the woman who carries grace wherever she goes.
          </p>
        </div>

        {/* Tab Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {tabs.map((tab) => {
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition duration-200 flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-peacock-800 text-white shadow-soft border border-peacock-700'
                    : 'bg-sand-100 text-sand-700 hover:bg-sand-200 border border-transparent'
                }`}
              >
                {IconComp && <IconComp className="w-3.5 h-3.5 text-gold-400" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse space-y-3">
                <div className="aspect-[3/4] bg-sand-200 rounded-2xl" />
                <div className="h-4 bg-sand-200 rounded w-3/4" />
                <div className="h-4 bg-sand-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.slice(0, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2.5 bg-sand-100 hover:bg-peacock-800 hover:text-white text-regal-900 px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-wider transition duration-300 shadow-soft border border-sand-300 group"
          >
            <span>Explore Entire Heritage Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition text-gold-600" />
          </Link>
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
    </section>
  );
};
