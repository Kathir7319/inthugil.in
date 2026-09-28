// client/src/components/home/HeroSection.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { VelIcon, MayilFeatherIcon } from '../common/VelIcon';
import { useSettings } from '../../context/SettingsContext';

export const HeroSection = () => {
  const { settings } = useSettings();
  const heroConfig = settings?.heroBanner;

  const slides = [
    {
      id: 1,
      badge: heroConfig?.badge || "வேல் • Mayil & Sacred Thugil Collection",
      titlePrefix: "Draped in Grace, ",
      titleHighlight: "Blessed with Poise",
      subtitle: heroConfig?.subtitle || "Inspired by the majesty of the sacred peacock (மயில்) and divine temple silks. Breathable everyday ethnic wear, flowing kurtis, and contemporary drapes crafted for modern Indian women.",
      ctaText: heroConfig?.ctaText || "Shop Heritage Collection",
      ctaLink: heroConfig?.ctaLink || "/shop",
      secondaryCtaText: heroConfig?.secondaryCtaText || "Explore Ethnic Wear",
      secondaryCtaLink: heroConfig?.secondaryCtaLink || "/ethnic-wear",
      image: heroConfig?.backgroundImage?.includes("photo-1610030469983-98e550d6193c")
        ? "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80"
        : (heroConfig?.backgroundImage || "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80"),
      seal: "Sacred Mayil Weave",
      tagline: "Authentic Tamizh Thugil",
      price: "₹699",
      rating: "4.9/5 Rating (1,200+ Reviews)"
    },
    {
      id: 2,
      badge: "மரபு • Breathable Handloom Cottons",
      titlePrefix: "Pure Comfort, ",
      titleHighlight: "Handloom Kurtis Under ₹999",
      subtitle: "100% pure breathable cottons, gentle chanderi textures, and skin-friendly natural dyes crafted for effortless everyday dignity and comfort.",
      ctaText: "Explore Daily Kurtis",
      ctaLink: "/ethnic-wear",
      secondaryCtaText: "New Arrivals",
      secondaryCtaLink: "/new-arrivals",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80",
      seal: "100% Breathable Cotton",
      tagline: "Handcrafted Artisanal Fits",
      price: "₹549",
      rating: "5.0/5 Rating (850+ Reviews)"
    },
    {
      id: 3,
      badge: "நவீனம் • Contemporary Fusion Wear",
      titlePrefix: "Modern Silhouettes, ",
      titleHighlight: "Chic Dresses & Co-ords",
      subtitle: "Flowing tier dresses, brunch sets, and relaxed tailored coordinates designed for the modern Indian woman who walks with confidence.",
      ctaText: "Shop Western Wear",
      ctaLink: "/western-wear",
      secondaryCtaText: "View All Styles",
      secondaryCtaLink: "/shop",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80",
      seal: "Contemporary Fusion",
      tagline: "Effortless Work & Brunch Poise",
      price: "₹899",
      rating: "4.9/5 Rating (940+ Reviews)"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Auto-scroll through banners continuously
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) {
      setIsPaused(false);
      return;
    }
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
    setIsPaused(false);
  };

  const slide = slides[currentSlide];

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-[#02181F] via-[#052C37] via-[#074758] to-[#04332A] text-white border-b border-[#D4AF37]/30 min-h-[580px] lg:min-h-[660px] flex items-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Peacock Radiant Ambient Lights */}
      <div 
        className="absolute -top-32 -right-32 w-[340px] sm:w-[520px] h-[340px] sm:h-[520px] rounded-full pointer-events-none blur-3xl opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(14, 116, 144, 0.5) 0%, rgba(3, 105, 161, 0.25) 45%, transparent 70%)'
        }}
      />
      <div 
        className="absolute -bottom-32 -left-32 w-[340px] sm:w-[540px] h-[340px] sm:h-[540px] rounded-full pointer-events-none blur-3xl opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(6, 78, 59, 0.6) 0%, rgba(4, 120, 87, 0.25) 50%, transparent 70%)'
        }}
      />
      <div 
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full pointer-events-none blur-3xl opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, transparent 60%)'
        }}
      />

      {/* Decorative Subtle Peacock Feather Motif Watermark in Background */}
      <div className="absolute right-10 top-12 opacity-[0.04] pointer-events-none hidden lg:block">
        <MayilFeatherIcon className="w-96 h-96 text-white" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Responsive Typography & CTAs */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left order-2 lg:order-1">
            
            {/* Sacred Vel Badge */}
            <div className="inline-flex items-center gap-2 bg-[#063A48]/85 border border-[#D4AF37]/50 text-[#FDE68A] px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-md">
              <VelIcon className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
              <span>{slide.badge}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-ping ml-1" />
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.15] sm:leading-[1.12]">
              {slide.titlePrefix}{' '}
              <span className="bg-gradient-to-r from-[#FDE68A] via-[#FBBF24] to-[#D4AF37] bg-clip-text text-transparent block sm:inline">
                {slide.titleHighlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-teal-100/90 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-normal line-clamp-3 sm:line-clamp-none">
              {slide.subtitle}
            </p>

            {/* CTA Buttons - Mobile-Friendly 48px Touch Targets */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
              <Link
                to={slide.ctaLink}
                className="bg-gradient-to-r from-[#F59E0B] via-[#EAB308] to-[#D4AF37] hover:from-[#D97706] hover:to-[#CA8A04] text-[#02181F] px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-[1.02] transition duration-200 group border border-amber-300 min-h-[48px]"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition duration-200 text-[#02181F]" />
              </Link>

              <Link
                to={slide.secondaryCtaLink}
                className="bg-white/10 hover:bg-white/15 text-white border border-white/25 hover:border-[#D4AF37]/60 backdrop-blur-md px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition duration-200 shadow-sm min-h-[48px]"
              >
                <MayilFeatherIcon className="w-4 h-4 text-emerald-300" />
                <span>{slide.secondaryCtaText}</span>
              </Link>
            </div>

            {/* Heritage Assurances - Responsive Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-teal-100/90 font-medium">
              <span className="flex items-center gap-1.5 bg-[#03242E]/70 border border-teal-500/20 px-2.5 sm:px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                Sizes XS – XXL
              </span>
              <span className="flex items-center gap-1.5 bg-[#03242E]/70 border border-teal-500/20 px-2.5 sm:px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Under ₹999 Daily Kurtis
              </span>
              <span className="flex items-center gap-1.5 bg-[#03242E]/70 border border-teal-500/20 px-2.5 sm:px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-teal-300" />
                Free Delivery Across India
              </span>
            </div>

            {/* Quick Explore Tags */}
            <div className="pt-1 flex items-center gap-2 text-xs">
              <span className="text-teal-200/70 font-semibold uppercase tracking-wider text-[10px] shrink-0">Popular:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { name: "Anarkali Kurtis", path: "/shop?search=anarkali" },
                  { name: "Chanderi Silk", path: "/shop?search=chanderi" },
                  { name: "Festive Drapes", path: "/ethnic-wear" },
                  { name: "Pure Cotton", path: "/shop?search=cotton" },
                ].map((tag) => (
                  <Link
                    key={tag.name}
                    to={tag.path}
                    className="text-[10px] sm:text-[11px] text-teal-100/80 hover:text-[#FDE68A] hover:bg-white/10 px-2 py-0.5 rounded-md border border-white/10 transition"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Framed Showcase Model (Mobile-Optimized Aspect Ratio) */}
          <div className="lg:col-span-5 relative order-1 lg:order-2 max-w-sm sm:max-w-md mx-auto w-full">
            
            {/* Outer Decorative Glow Ring */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#D4AF37] via-teal-500 to-emerald-600 rounded-3xl blur-md opacity-35 group-hover:opacity-60 transition duration-500" />
            
            {/* Framed Image Container */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl bg-[#02181F] aspect-[4/5] max-h-[380px] sm:max-h-[500px] w-full">
              <img
                src={slide.image}
                alt={`${slide.tagline} – Inthugil`}
                loading="eager"
                key={slide.id}
                className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
              />

              {/* Bottom Subtle Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#02181F]/90 via-[#02181F]/20 to-transparent pointer-events-none" />

              {/* Top Floating Badge: Sacred Seal */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 bg-[#02181F]/90 backdrop-blur-md border border-[#D4AF37]/50 text-[#FDE68A] text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-2xl shadow-lg flex items-center gap-1.5">
                <VelIcon className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>{slide.seal}</span>
              </div>

              {/* Bottom Floating Info Card */}
              <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 z-10 bg-[#02181F]/92 backdrop-blur-md border border-[#D4AF37]/35 rounded-2xl p-3 sm:p-3.5 shadow-2xl flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[#F59E0B] text-[11px] sm:text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{slide.rating}</span>
                  </div>
                  <p className="text-white font-serif font-bold text-xs sm:text-sm mt-0.5">
                    {slide.tagline}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[9px] sm:text-[10px] text-teal-200/80 uppercase font-semibold block">Starts At</span>
                  <span className="text-[#FDE68A] font-bold text-sm sm:text-base">{slide.price}</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Banner Navigation & Progress Controls (Scrolling All The Way Indicators) */}
        <div className="mt-6 sm:mt-8 pt-4 flex items-center justify-between border-t border-teal-500/20">
          
          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-2">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full h-2 ${
                  currentSlide === idx
                    ? 'w-8 bg-gradient-to-r from-[#F59E0B] to-[#D4AF37] shadow-sm'
                    : 'w-2 bg-teal-800/80 hover:bg-teal-600'
                }`}
              />
            ))}
            <span className="text-[11px] text-teal-200/60 font-medium ml-2 hidden sm:inline">
              Banner {currentSlide + 1} of {slides.length}
            </span>
          </div>

          {/* Prev / Next Banner Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Previous Banner"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#063A48]/80 hover:bg-[#0E7490] border border-[#D4AF37]/40 flex items-center justify-center text-[#FDE68A] hover:text-white transition duration-200 shadow-sm"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Banner"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#063A48]/80 hover:bg-[#0E7490] border border-[#D4AF37]/40 flex items-center justify-center text-[#FDE68A] hover:text-white transition duration-200 shadow-sm"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

        </div>

      </div>

    </section>
  );
};
