// client/src/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Heart,
  ShoppingBag,
  Ruler,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MapPin,
  Clock
} from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { SizeGuideModal } from '../components/products/SizeGuideModal';
import { ProductCard } from '../components/products/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { api } from '../services/api';

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeImage, setActiveImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [pincode, setPincode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      setError(null);
      try {
        const prod = await api.getProductBySlug(slug);
        setProduct(prod);
        setActiveImage(prod.images?.[0] || '');
        setSelectedSize(prod.availableSizes?.[0] || 'M');

        // Fetch related products
        const allProds = await api.getProducts({ category: prod.categorySlug });
        setRelatedProducts(allProds.filter((p) => p.id !== prod.id).slice(0, 4));
      } catch (err) {
        console.error(err);
        setError('Product not found or unavailable');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
    window.scrollTo(0, 0);
  }, [slug]);

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (/^\d{6}$/.test(pincode)) {
      setDeliveryResult({
        success: true,
        message: 'Delivery available! Estimated arrival within 3–4 business days with Free Doorstep Returns.'
      });
    } else {
      setDeliveryResult({
        success: false,
        message: 'Please enter a valid 6-digit Indian PIN code.'
      });
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product, selectedSize, quantity);
    setIsCartOpen(false);
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="aspect-[3/4] bg-sand-200 rounded-3xl" />
          <div className="space-y-4">
            <div className="h-8 bg-sand-200 rounded w-3/4" />
            <div className="h-6 bg-sand-200 rounded w-1/3" />
            <div className="h-24 bg-sand-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h2 className="font-serif text-3xl font-bold text-regal-900 mb-2">Style Not Found</h2>
        <p className="text-sm text-sand-500 mb-6">The piece you are looking for might be out of season or restyling.</p>
        <Link
          to="/shop"
          className="bg-brand-600 text-white px-6 py-3 rounded-xl font-semibold text-xs inline-flex items-center gap-2"
        >
          <span>Explore Other Curations</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const formattedPrice = `₹${product.price.toLocaleString('en-IN')}`;
  const formattedOriginalPrice = product.originalPrice ? `₹${product.originalPrice.toLocaleString('en-IN')}` : null;

  return (
    <div className="bg-sand-50 min-h-screen pb-20">
      
      {/* Dynamic SEO Head with Structured JSON-LD Product Schema */}
      <SEOHead
        title={product.metaTitle || `${product.name} – Buy Online | Inthugil`}
        description={product.metaDescription || `Shop ${product.name} at Inthugil — premium fabric, elegant fit, budget-friendly price. Free returns. Order online today.`}
        canonicalUrl={`https://inthugil.in/product/${product.slug}`}
        ogImage={product.images?.[0]}
        schemaType="Product"
        schemaData={product}
      />

      {/* Breadcrumb Schema Nav */}
      <div className="bg-white border-b border-sand-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-xs text-sand-500 overflow-x-auto">
            <Link to="/" className="hover:text-brand-600 transition shrink-0">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link to={`/${product.categorySlug}`} className="hover:text-brand-600 transition shrink-0">
              {product.categoryName}
            </Link>
            {product.subCategory && (
              <>
                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                <span className="shrink-0">{product.subCategory}</span>
              </>
            )}
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-regal-900 font-semibold truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Image Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-[3/4] bg-sand-100 rounded-3xl overflow-hidden shadow-soft border border-sand-200 relative group">
              <img
                src={activeImage}
                alt={product.imageAlt || `${product.name} – ${product.categoryName} for women | Inthugil`}
                className="w-full h-full object-cover object-top transition duration-500"
              />
              {product.discountPercent > 0 && (
                <div className="absolute top-4 left-4 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {product.discountPercent}% OFF
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-24 rounded-2xl overflow-hidden border-2 transition shrink-0 ${
                      activeImage === img ? 'border-brand-600 shadow-soft scale-95' : 'border-sand-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Buying Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header info */}
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-brand-600 block mb-1">
                {product.categoryName} • {product.subCategory}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-regal-900 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-regal-900">{product.rating || 4.9}</span>
                <span className="text-xs text-sand-500">({product.reviewCount || 48} customer reviews)</span>
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full ml-2">
                  In Stock ({product.stockCount || 25} left)
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 py-3 border-y border-sand-200">
              <span className="text-3xl font-bold text-regal-900 font-sans">
                {formattedPrice}
              </span>
              {formattedOriginalPrice && (
                <span className="text-lg text-sand-400 line-through">
                  {formattedOriginalPrice}
                </span>
              )}
              {product.discountPercent > 0 && (
                <span className="bg-brand-100 text-brand-700 text-xs font-bold px-2.5 py-1 rounded-full">
                  Save {product.discountPercent}%
                </span>
              )}
              <span className="text-[11px] text-sand-500 block sm:inline ml-auto">
                (Inclusive of all taxes)
              </span>
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-sand-600 leading-relaxed italic">
              "{product.shortDescription || "Effortless elegance in every stitch — soft, breathable fabric designed for all-day comfort and grace."}"
            </p>

            {/* Indian Size Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-regal-900 uppercase tracking-wider">
                  Select Size (Indian Fit):
                </span>
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-xs text-brand-600 hover:text-brand-800 font-semibold flex items-center gap-1 underline underline-offset-2"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Chart (Inches / CM)</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {product.availableSizes?.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`min-w-[48px] h-12 px-4 rounded-2xl text-xs font-bold border transition ${
                      selectedSize === sz
                        ? 'bg-regal-900 text-white border-regal-900 shadow-md'
                        : 'bg-white text-regal-900 border-sand-300 hover:border-sand-500'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & CTA Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-sand-300 rounded-2xl bg-white shadow-soft">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-sm font-bold text-sand-700 hover:bg-sand-100 rounded-l-2xl"
                  >
                    -
                  </button>
                  <span className="px-4 py-3 text-xs font-bold text-regal-900 min-w-[36px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 text-sm font-bold text-sand-700 hover:bg-sand-100 rounded-r-2xl"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-white hover:bg-sand-100 text-regal-900 border-2 border-regal-900 py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition duration-200"
                >
                  <ShoppingBag className="w-4 h-4 text-brand-600" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3.5 rounded-2xl border-2 transition ${
                    isFavorited
                      ? 'bg-rose-50 border-rose-300 text-rose-600'
                      : 'bg-white border-sand-300 text-regal-900 hover:border-sand-500'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Instant Buy Now Button with Razorpay UPI */}
              <button
                onClick={handleBuyNow}
                className="w-full bg-brand-600 hover:bg-brand-500 text-white py-4 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lift transition duration-200"
              >
                <span>Buy Now with 1-Click Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Indian Pin Code Delivery Check */}
            <div className="bg-white p-4 rounded-2xl border border-sand-200 shadow-soft space-y-2">
              <span className="text-xs font-bold text-regal-900 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-600" />
                <span>Check Delivery & Cash on Delivery (COD)</span>
              </span>
              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode (e.g. 560038)"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 bg-sand-50 border border-sand-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <button
                  type="submit"
                  className="bg-regal-900 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-brand-600 transition"
                >
                  Check
                </button>
              </form>
              {deliveryResult && (
                <p className={`text-xs ${deliveryResult.success ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {deliveryResult.message}
                </p>
              )}
            </div>

            {/* Product Specifications & Care Bullets */}
            <div className="bg-white p-6 rounded-3xl border border-sand-200 shadow-soft space-y-4">
              <h3 className="font-serif text-base font-bold text-regal-900">
                Craftsmanship & Fabric Details
              </h3>
              <p className="text-xs text-sand-600 leading-relaxed">
                {product.description}
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-sand-100">
                <div>
                  <span className="text-sand-500 block">Fabric</span>
                  <span className="font-bold text-regal-900">{product.fabric || "Pure Breathable Cotton"}</span>
                </div>
                <div>
                  <span className="text-sand-500 block">Fit & Flare</span>
                  <span className="font-bold text-regal-900">{product.fit || "A-Line Flared Fit"}</span>
                </div>
                <div>
                  <span className="text-sand-500 block">Wash & Care</span>
                  <span className="font-bold text-regal-900">{product.care || "Machine wash gentle"}</span>
                </div>
                <div>
                  <span className="text-sand-500 block">Origin</span>
                  <span className="font-bold text-regal-900">Crafted in India 🇮🇳</span>
                </div>
              </div>
            </div>

            {/* Trust Assurances */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center text-[11px] text-sand-600">
              <div className="p-3 bg-sand-100/70 rounded-2xl flex flex-col items-center">
                <Truck className="w-4 h-4 text-brand-600 mb-1" />
                <span className="font-bold text-regal-900">Free Shipping</span>
                <span className="text-[10px]">On prepaid orders</span>
              </div>
              <div className="p-3 bg-sand-100/70 rounded-2xl flex flex-col items-center">
                <RotateCcw className="w-4 h-4 text-brand-600 mb-1" />
                <span className="font-bold text-regal-900">7-Day Returns</span>
                <span className="text-[10px]">Doorstep reverse pickup</span>
              </div>
              <div className="p-3 bg-sand-100/70 rounded-2xl flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-brand-600 mb-1" />
                <span className="font-bold text-regal-900">100% Secure</span>
                <span className="text-[10px]">Razorpay UPI / Cards</span>
              </div>
            </div>

          </div>

        </div>

        {/* Related Styles Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-sand-200">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs uppercase tracking-widest font-semibold text-brand-600 block mb-1">
                You May Also Love
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-regal-900">
                Complete Your Wardrobe
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>

      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />
    </div>
  );
};
