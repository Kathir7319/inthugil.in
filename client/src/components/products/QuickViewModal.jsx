// client/src/components/products/QuickViewModal.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, Star, ShoppingBag, ShieldCheck, Ruler, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const QuickViewModal = ({ product, isOpen, onClose, onOpenSizeGuide }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!isOpen || !product) return null;

  const [activeImage, setActiveImage] = useState(product.images?.[0]);
  const [selectedSize, setSelectedSize] = useState(product.availableSizes?.[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-regal-950/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl z-10 overflow-hidden max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-sand-500 hover:text-regal-900 hover:bg-sand-100 transition z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Left: Images */}
          <div className="space-y-3">
            <div className="aspect-[3/4] bg-sand-100 rounded-2xl overflow-hidden shadow-inner">
              <img
                src={activeImage || product.images?.[0]}
                alt={product.imageAlt || product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-14 h-16 rounded-lg overflow-hidden border-2 transition ${
                      activeImage === img ? 'border-brand-600 scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="space-y-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-brand-600">
                {product.categoryName} • {product.subCategory}
              </span>
              <h2 className="font-serif text-2xl font-bold text-regal-900 mt-1">
                {product.name}
              </h2>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-regal-900">{product.rating || 4.9}</span>
                <span className="text-xs text-sand-500">({product.reviewCount || 30} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 py-2 border-y border-sand-200">
              <span className="text-2xl font-bold text-regal-900">
                ₹{product.price?.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-base text-sand-400 line-through">
                  ₹{product.originalPrice?.toLocaleString('en-IN')}
                </span>
              )}
              {product.discountPercent > 0 && (
                <span className="bg-brand-100 text-brand-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  {product.discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-xs text-sand-600 leading-relaxed">
              {product.shortDescription || product.description}
            </p>

            {/* Fabric & Fit Details */}
            <div className="text-xs space-y-1 text-sand-700 bg-sand-50 p-3 rounded-xl border border-sand-200">
              {product.fabric && <div><strong>Fabric:</strong> {product.fabric}</div>}
              {product.fit && <div><strong>Fit:</strong> {product.fit}</div>}
              {product.care && <div><strong>Care:</strong> {product.care}</div>}
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-regal-900">Select Size (Indian Fit):</span>
                {onOpenSizeGuide && (
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-xs text-brand-600 hover:text-brand-800 font-semibold flex items-center gap-1 underline underline-offset-2"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide</span>
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.availableSizes?.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`min-w-[42px] h-10 px-3 rounded-xl text-xs font-bold border transition ${
                      selectedSize === sz
                        ? 'bg-regal-900 text-white border-regal-900 shadow-sm'
                        : 'bg-white text-regal-900 border-sand-300 hover:border-sand-500'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center border border-sand-300 rounded-xl bg-sand-50 overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-sm font-bold text-sand-700 hover:bg-sand-200"
                >
                  -
                </button>
                <span className="px-3 py-2 text-xs font-bold text-regal-900 min-w-[32px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-sm font-bold text-sand-700 hover:bg-sand-200"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={addedNotice}
                className="flex-1 bg-brand-600 hover:bg-brand-500 text-white py-3 px-6 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition duration-200"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{addedNotice ? 'Added to Bag! ✓' : 'Add to Bag'}</span>
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-xl border transition ${
                  isFavorited
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-white border-sand-300 text-regal-900 hover:border-sand-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Link to Full Product Page */}
            <div className="pt-2 text-center">
              <Link
                to={`/product/${product.slug}`}
                onClick={onClose}
                className="text-xs font-semibold text-brand-600 hover:text-brand-800 inline-flex items-center gap-1 group"
              >
                <span>View Full Details & Customer Photos</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
