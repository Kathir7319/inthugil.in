// client/src/components/layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  Package,
  Phone,
  ArrowRight
} from 'lucide-react';
import { VelIcon, MayilFeatherIcon } from '../common/VelIcon';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useSettings } from '../../context/SettingsContext';
import { api } from '../../services/api';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { settings } = useSettings();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await api.getProducts({ search: searchQuery });
        setSearchResults(results.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Ethnic Wear', path: '/ethnic-wear', tag: 'மரபு' },
    { name: 'Western Wear', path: '/western-wear' },
    { name: 'Loungewear', path: '/loungewear' },
    { name: 'New Arrivals', path: '/new-arrivals', tag: 'Mayil' },
    { name: 'Our Story', path: '/about-us' },
    { name: 'Contact', path: '/contact-us' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sand-200 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 text-slate-800 hover:text-peacock-700 transition"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Brand Logo & Vel Emblem */}
          <div className="flex-1 lg:flex-initial text-center lg:text-left">
            <Link to="/" className="inline-flex items-center gap-2 sm:gap-2.5 group">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-gradient-to-br from-gold-400 via-gold-500 to-amber-600 flex items-center justify-center shadow-gold group-hover:scale-105 transition duration-300">
                <VelIcon className="w-4 h-4 sm:w-5 sm:h-5 text-regal-950" />
              </div>
              <div className="text-left">
                <span className="font-serif text-xl sm:text-3xl font-bold tracking-tight text-slate-900 group-hover:text-peacock-700 transition duration-300 block leading-tight">
                  INTHUGIL
                </span>
                <span className="block text-[8px] sm:text-[9px] tracking-widest uppercase font-bold text-peacock-800 -mt-0.5">
                  துகில் • Sacred Grace, Everyday Prices
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`transition duration-200 py-1 border-b-2 flex items-center gap-1.5 font-semibold text-sm ${
                    isActive
                      ? 'text-peacock-700 border-peacock-700 font-bold'
                      : 'text-slate-800 hover:text-peacock-700 border-transparent'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.tag && (
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-peacock-50 text-peacock-800 px-1.5 py-0.5 rounded-full border border-peacock-200">
                      {link.tag}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-1.5 sm:space-x-3">
            
            {/* Search Trigger */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-slate-800 hover:text-peacock-700 hover:bg-sand-100 rounded-full transition"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {searchOpen && (
                <div className="fixed sm:absolute inset-x-3 sm:inset-x-auto sm:right-0 top-18 sm:top-auto sm:mt-3 sm:w-96 bg-white shadow-2xl sm:shadow-lift rounded-3xl p-4 border border-sand-200 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <input
                      type="text"
                      placeholder="Search Mayil kurtis, temple silks, sarees..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-sand-50 border border-sand-300 rounded-2xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-peacock-600 pr-10 font-medium text-slate-800"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="absolute right-3 top-2.5 text-sand-500 hover:text-peacock-700"
                    >
                      <Search className="w-4 h-4" />
                    </button>
                  </form>

                  {searchQuery.trim() && (
                    <div className="mt-3 divide-y divide-sand-100 max-h-64 overflow-y-auto">
                      {isSearching ? (
                        <div className="text-xs text-center py-4 text-sand-500">Searching catalog...</div>
                      ) : searchResults.length > 0 ? (
                        searchResults.map((prod) => (
                          <Link
                            key={prod.id}
                            to={`/product/${prod.slug}`}
                            onClick={() => setSearchOpen(false)}
                            className="flex items-center gap-3 py-2.5 hover:bg-sand-50 px-2 rounded-xl transition"
                          >
                            <img
                              src={prod.images?.[0]}
                              alt={prod.name}
                              className="w-10 h-12 object-cover rounded-lg shadow-sm"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-slate-900 truncate">{prod.name}</p>
                              <p className="text-xs text-peacock-700 font-bold">₹{prod.price.toLocaleString('en-IN')}</p>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-sand-400" />
                          </Link>
                        ))
                      ) : (
                        <div className="text-xs text-center py-4 text-sand-500">
                          No matching styles found. Try "anarkali", "peacock", or "cotton".
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Track Order */}
            <Link
              to="/track-order"
              className="hidden sm:flex p-2 text-slate-800 hover:text-peacock-700 hover:bg-sand-100 rounded-full transition"
              title="Track Order"
            >
              <Package className="w-5 h-5" />
            </Link>

            {/* Wishlist */}
            <Link
              to="/shop?wishlist=true"
              className="relative p-2 text-slate-800 hover:text-peacock-700 hover:bg-sand-100 rounded-full transition"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-kumkum-700 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Drawer */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-slate-800 hover:text-peacock-700 hover:bg-sand-100 rounded-full transition"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 bg-gold-500 text-regal-950 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-bounce shadow-xs">
                  {itemCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-regal-950/70 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-sand-50 h-full min-h-[100dvh] shadow-2xl flex flex-col justify-between p-6 z-10 overflow-y-auto border-r border-sand-200">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-sand-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center shadow-gold">
                    <VelIcon className="w-4 h-4 text-regal-950" />
                  </div>
                  <div>
                    <span className="font-serif text-xl font-bold tracking-tight text-slate-900">
                      INTHUGIL
                    </span>
                    <span className="block text-[8px] tracking-widest uppercase font-bold text-peacock-800">
                      துகில் • Sacred Grace
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-full text-slate-800 hover:bg-sand-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="mt-5 relative">
                <input
                  type="text"
                  placeholder="Search kurtis, sarees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-sand-300 rounded-2xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-peacock-600 pr-10 font-medium text-slate-800"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-2.5 text-sand-500 hover:text-peacock-700"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>

              {/* Mobile Links */}
              <div className="mt-6 flex flex-col space-y-3.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-sm font-semibold text-slate-800 hover:text-peacock-700 transition flex items-center justify-between py-1"
                  >
                    <span>{link.name}</span>
                    {link.tag && (
                      <span className="text-[10px] bg-peacock-50 text-peacock-800 border border-peacock-200 px-2 py-0.5 rounded-full font-bold">
                        {link.tag}
                      </span>
                    )}
                  </Link>
                ))}
                <Link
                  to="/track-order"
                  className="text-sm font-semibold text-slate-800 hover:text-peacock-700 transition flex items-center gap-2 py-1"
                >
                  <Package className="w-4 h-4 text-peacock-700" />
                  <span>Track Your Order</span>
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-sand-200">
              <div className="flex items-center justify-center gap-2 text-xs text-sand-600">
                <Phone className="w-3.5 h-3.5 text-peacock-700" />
                <a
                  href="https://wa.me/917708971359"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-peacock-700 font-semibold"
                >
                  WhatsApp Care: +91 7708 971 359
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
