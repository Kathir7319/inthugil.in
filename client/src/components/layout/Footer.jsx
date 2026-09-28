// client/src/components/layout/Footer.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Instagram, Facebook, ArrowRight, CheckCircle2, MapPin, Phone } from 'lucide-react';
import { VelIcon, MayilFeatherIcon } from '../common/VelIcon';
import { useSettings } from '../../context/SettingsContext';

export const Footer = () => {
  const { settings } = useSettings();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#02181F] via-[#052C37] via-[#074758] to-[#04332A] text-sand-100 border-t border-[#D4AF37]/35 pt-16 pb-10">
      {/* Peacock Radiant Ambient Lights matching Hero Section */}
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
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 60%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-teal-500/20">
          
          {/* Brand & About Column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-gold-400 via-gold-500 to-amber-600 flex items-center justify-center shadow-gold">
                <VelIcon className="w-5 h-5 text-regal-950" />
              </div>
              <div>
                <span className="font-serif text-3xl font-bold tracking-tight text-white block leading-tight">
                  INTHUGIL
                </span>
                <span className="block text-[10px] tracking-widest uppercase font-bold text-gold-400">
                  துகில் • Sacred Grace, Everyday Prices
                </span>
              </div>
            </Link>
            
            <p className="text-teal-100/80 text-sm leading-relaxed max-w-sm">
              Rooted in the timeless Tamil heritage of <em>Thugil</em> (pure celestial drape), Inthugil brings you dignified, breathable women's fashion at honest prices. Inspired by the grace of the Vel & Peacock.
            </p>

            <div className="space-y-1.5 text-xs text-teal-100/90 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>{settings?.contactInfo?.address || 'Somanur, Coimbatore'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <a
                  href="https://wa.me/917708971359"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gold-300 font-semibold"
                >
                  {settings?.contactInfo?.phone || '+91 7708 971 359'}
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href={settings?.socialLinks?.instagram || "https://instagram.com/inthugil"}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#063A48]/80 hover:bg-[#0E7490] flex items-center justify-center text-sand-200 hover:text-white transition duration-200 border border-[#D4AF37]/30"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings?.socialLinks?.facebook || "https://facebook.com/inthugil"}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#063A48]/80 hover:bg-[#0E7490] flex items-center justify-center text-sand-200 hover:text-white transition duration-200 border border-[#D4AF37]/30"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#063A48]/90 border border-[#D4AF37]/40 text-[#FDE68A] text-xs font-bold shadow-sm">
                <VelIcon className="w-3.5 h-3.5 text-gold-400" />
                <span>வெற்றிவேல் முருகனுக்கு அரோகரா</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-serif text-base text-gold-400 font-bold mb-4 tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-teal-100/80">
              <li>
                <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })} className="hover:text-gold-300 transition">Home</Link>
              </li>
              <li>
                <Link to="/ethnic-wear" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })} className="hover:text-gold-300 transition">Ethnic Wear (மரபு)</Link>
              </li>
              <li>
                <Link to="/western-wear" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })} className="hover:text-gold-300 transition">Western Wear</Link>
              </li>
              <li>
                <Link to="/loungewear" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })} className="hover:text-gold-300 transition">Loungewear</Link>
              </li>
              <li>
                <Link to="/new-arrivals" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })} className="hover:text-gold-300 transition">Mayil New Arrivals</Link>
              </li>
              <li>
                <Link to="/track-order" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })} className="hover:text-gold-300 transition">Track Order</Link>
              </li>
            </ul>
          </div>

          {/* Heritage Care Column */}
          <div>
            <h3 className="font-serif text-base text-gold-400 font-bold mb-4 tracking-wide">
              Heritage Care
            </h3>
            <ul className="space-y-2.5 text-sm text-teal-100/80">
              <li>
                <Link to="/about-us" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })} className="hover:text-gold-300 transition">Our Story & Heritage</Link>
              </li>
              <li>
                <Link to="/contact-us#faqs" className="hover:text-gold-300 transition">FAQs</Link>
              </li>
              <li>
                <Link to="/contact-us#shipping" className="hover:text-gold-300 transition">India Shipping Info</Link>
              </li>
              <li>
                <Link to="/contact-us" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })} className="hover:text-gold-300 transition">Studio Contact</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="font-serif text-base text-gold-400 font-bold mb-2 tracking-wide">
              Join Our Style Circle
            </h3>
            <p className="text-xs text-teal-100/80 mb-4 leading-relaxed">
              Subscribe for private festive drops, Mayil edition previews, and receive an instant 10% coupon code.
            </p>

            {subscribed ? (
              <div className="bg-[#063A48]/85 border border-gold-500/40 rounded-2xl p-3.5 text-center">
                <CheckCircle2 className="w-5 h-5 text-gold-400 mx-auto mb-1" />
                <p className="text-xs font-bold text-white">Welcome to the Inthugil Circle!</p>
                <p className="text-[11px] text-teal-100/90 mt-1">Use code <span className="font-mono font-bold text-gold-400">VEL10</span> at checkout for 10% off.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#02181F]/90 border border-teal-500/30 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-teal-200/50 focus:outline-none focus:border-gold-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-regal-950 rounded-xl text-xs font-bold flex items-center justify-center transition shadow-soft"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-teal-200/60">We respect your privacy. No spam ever.</p>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-teal-200/70">
          <p>© 2026 Inthugil.in — All Rights Reserved • துகில் மரபு</p>
          <div className="flex items-center space-x-6 text-[11px]">
            <span className="flex items-center gap-1.5 text-gold-400 font-medium">
              <VelIcon className="w-3 h-3" />
              Tamil Heritage Weaves
            </span>
            <span>Prices in INR (₹)</span>
            <span>100% Verified Boutique</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
