// client/src/components/products/ProductCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { VelIcon } from '../common/VelIcon';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState(product.availableSizes?.[0] || 'M');
  const [isHovered, setIsHovered] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const formattedPrice = `₹${product.price.toLocaleString('en-IN')}`;
  const formattedOriginalPrice = product.originalPrice ? `₹${product.originalPrice.toLocaleString('en-IN')}` : null;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize, 1);
  };

  return (
    <div
      className="group relative bg-white rounded-3xl overflow-hidden border border-sand-200 hover:border-gold-400 shadow-soft hover:shadow-lift transition-all duration-300 flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Area */}
      <div className="relative aspect-[3/4] bg-sand-100 overflow-hidden">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={isHovered && product.images?.[1] ? product.images[1] : product.images?.[0]}
            alt={product.imageAlt || `${product.name} – ${product.categoryName} for women | Inthugil`}
            loading="eager"
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Badges: Discount & Status */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.discountPercent > 0 && (
            <span className="bg-kumkum-700 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
              {product.discountPercent}% OFF
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-peacock-800 text-gold-300 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm tracking-wide uppercase border border-gold-400/40">
              Mayil Pick
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-emerald-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm tracking-wide uppercase">
              New
            </span>
          )}
        </div>

        {/* Action Buttons: Wishlist & Quick View */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={() => toggleWishlist(product)}
            className={`p-2 rounded-full transition shadow-md ${
              isFavorited
                ? 'bg-rose-50 text-kumkum-700'
                : 'bg-white/95 text-regal-900 hover:text-peacock-700 hover:bg-white'
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>

          {onQuickView && (
            <button
              onClick={() => onQuickView(product)}
              className="p-2 rounded-full bg-white/95 text-regal-900 hover:text-peacock-700 hover:bg-white shadow-md transition opacity-0 group-hover:opacity-100 hidden sm:flex"
              title="Quick View"
              aria-label="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Add Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-peacock-900 hover:bg-peacock-800 text-white py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition duration-200 border border-peacock-700"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-gold-400" />
            <span>Quick Add ({selectedSize})</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-sand-500 mb-1 sm:mb-1.5">
            <span className="tracking-wide uppercase text-[9px] sm:text-[10px] font-bold text-peacock-800">
              {product.categoryName || 'Women'}
            </span>
            <div className="flex items-center text-amber-500 font-bold text-[10px] sm:text-[11px]">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current mr-0.5 text-gold-500" />
              <span>{product.rating || 4.9}</span>
              <span className="text-sand-400 ml-0.5">({product.reviewCount || 24})</span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/product/${product.slug}`} className="block group-hover:text-peacock-700 transition">
            <h3 className="font-serif text-xs sm:text-base font-bold text-regal-900 line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Short description / Fabric snippet */}
          <p className="text-[11px] sm:text-xs text-sand-500 line-clamp-1 mt-0.5 sm:mt-1">
            {product.fabric || product.shortDescription}
          </p>
        </div>

        {/* Sizes & Price */}
        <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-3 border-t border-sand-100 flex flex-wrap items-baseline justify-between gap-1">
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-sm sm:text-lg font-bold text-regal-900 font-sans">
              {formattedPrice}
            </span>
            {formattedOriginalPrice && (
              <span className="text-[10px] sm:text-xs text-sand-400 line-through">
                {formattedOriginalPrice}
              </span>
            )}
          </div>

          {/* Quick Size Select Dots */}
          {product.availableSizes && product.availableSizes.length > 1 && (
            <div className="flex items-center gap-1 py-0.5">
              {product.availableSizes.slice(0, 3).map((sz) => (
                <button
                  key={sz}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedSize(sz);
                  }}
                  className={`text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md sm:rounded-lg border transition ${
                    selectedSize === sz
                      ? 'bg-peacock-800 text-white border-peacock-800 shadow-xs'
                      : 'bg-sand-50 text-sand-700 border-sand-200 hover:border-sand-400'
                  }`}
                >
                  {sz}
                </button>
              ))}
              {product.availableSizes.length > 3 && (
                <span className="text-[9px] text-sand-400 font-medium">+{product.availableSizes.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
