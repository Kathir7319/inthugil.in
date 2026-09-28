// client/src/components/home/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Star, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { VelIcon, MayilFeatherIcon } from '../common/VelIcon';
import { useSettings } from '../../context/SettingsContext';

export const HeroSection = () => {
  const { settings } = useSettings();
  const hero = settings?.heroBanner || {
    title: "Draped in Grace, Blessed with Poise",
    subtitle: "Inspired by the majesty of the sacred peacock (மயில்) and divine temple silks. Breathable everyday ethnic wear, flowing kurtis, and contemporary drapes crafted for modern Indian women.",
    ctaText: "Shop Heritage Collection",
    ctaLink: "/shop",
    secondaryCtaText: "Explore Ethnic Wear",
    secondaryCtaLink: "/ethnic-wear",
    backgroundImage: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
    badge: "வேல் • Mayil & Sacred Thugil Collection"
  };

  const showcaseImage = hero.backgroundImage?.includes("photo-1610030469983-98e550d6193c")
    ? "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80"
    : hero.backgroundImage || "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80";

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#02181F] via-[#052C37] via-[#074758] to-[#04332A] text-white border-b border-[#D4AF37]/30 min-h-[620px] lg:min-h-[680px] flex items-center">
      
      {/* Peacock Radiant Ambient Lights */}
      <div 
        className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full pointer-events-none blur-3xl opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(14, 116, 144, 0.5) 0%, rgba(3, 105, 161, 0.25) 45%, transparent 70%)'
        }}
      />
      <div 
        className="absolute -bottom-32 -left-32 w-[540px] h-[540px] rounded-full pointer-events-none blur-3xl opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(6, 78, 59, 0.6) 0%, rgba(4, 120, 87, 0.25) 50%, transparent 70%)'
        }}
      />
      <div 
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full pointer-events-none blur-3xl opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, transparent 60%)'
        }}
      />

      {/* Decorative Subtle Peacock Feather Motif Watermark in Background */}
      <div className="absolute right-10 top-12 opacity-[0.04] pointer-events-none hidden lg:block">
        <MayilFeatherIcon className="w-96 h-96 text-white" />
      </div>

      {/* Fitted Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Fitted Content & Clear Typography */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Sacred Vel Badge */}
            <div className="inline-flex items-center gap-2 bg-[#063A48]/85 border border-[#D4AF37]/50 text-[#FDE68A] px-4 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-md">
              <VelIcon className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
              <span>{hero.badge || "வேல் • Mayil & Sacred Thugil Collection"}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-ping" />
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Draped in Grace,{' '}
              <span className="bg-gradient-to-r from-[#FDE68A] via-[#FBBF24] to-[#D4AF37] bg-clip-text text-transparent block sm:inline">
                Blessed with Poise
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-teal-100/90 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              {hero.subtitle || "Inspired by the majesty of the sacred peacock (மயில்) and divine temple silks. Breathable everyday ethnic wear, flowing kurtis, and contemporary drapes crafted for modern Indian women."}
            </p>

            {/* CTA Buttons in Temple Gold & Glass */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                to={hero.ctaLink || "/shop"}
                className="bg-gradient-to-r from-[#F59E0B] via-[#EAB308] to-[#D4AF37] hover:from-[#D97706] hover:to-[#CA8A04] text-[#02181F] px-8 py-4 rounded-2xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-[1.02] transition duration-200 group border border-amber-300"
              >
                <span>{hero.ctaText || "Shop Heritage Collection"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition duration-200 text-[#02181F]" />
              </Link>

              <Link
                to={hero.secondaryCtaLink || "/ethnic-wear"}
                className="bg-white/10 hover:bg-white/15 text-white border border-white/25 hover:border-[#D4AF37]/60 backdrop-blur-md px-6 py-4 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition duration-200 shadow-sm"
              >
                <MayilFeatherIcon className="w-4 h-4 text-emerald-300" />
                <span>{hero.secondaryCtaText || "Explore Ethnic Wear"}</span>
              </Link>
            </div>

            {/* Heritage Assurances */}
            <div className="pt-3 flex flex-wrap items-center gap-3 sm:gap-5 text-xs text-teal-100/90 font-medium">
              <span className="flex items-center gap-1.5 bg-[#03242E]/70 border border-teal-500/20 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                Sizes XS – XXL (Curated Indian Fit)
              </span>
              <span className="flex items-center gap-1.5 bg-[#03242E]/70 border border-teal-500/20 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Under ₹999 Daily Kurtis
              </span>
              <span className="flex items-center gap-1.5 bg-[#03242E]/70 border border-teal-500/20 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-teal-300" />
                Free Delivery Across India
              </span>
            </div>

            {/* Quick Explore Tags */}
            <div className="pt-2 flex items-center gap-2 text-xs">
              <span className="text-teal-200/70 font-semibold uppercase tracking-wider text-[10px]">Popular:</span>
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
                    className="text-[11px] text-teal-100/80 hover:text-[#FDE68A] hover:bg-white/10 px-2 py-0.5 rounded-md border border-white/10 transition"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Beautifully Framed Showcase Model (NO OVERLAPPING TEXT) */}
          <div className="lg:col-span-5 relative">
            
            {/* Outer Decorative Glow Ring */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#D4AF37] via-teal-500 to-emerald-600 rounded-3xl blur-md opacity-35 group-hover:opacity-60 transition duration-500" />
            
            {/* Framed Image Container */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl bg-[#02181F] aspect-[4/5] sm:max-h-[520px] w-full">
              <img
                src={showcaseImage}
                alt="Tamizh Thugil & Mayil inspired Indian ethnic wear"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              />

              {/* Bottom Subtle Vignette to frame image inside card */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#02181F]/90 via-[#02181F]/20 to-transparent pointer-events-none" />

              {/* Top Floating Badge: Sacred Seal */}
              <div className="absolute top-4 left-4 z-10 bg-[#02181F]/90 backdrop-blur-md border border-[#D4AF37]/50 text-[#FDE68A] text-xs font-bold px-3.5 py-1.5 rounded-2xl shadow-lg flex items-center gap-1.5">
                <VelIcon className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Sacred Mayil Weave</span>
              </div>

              {/* Bottom Floating Info Card */}
              <div className="absolute bottom-4 inset-x-4 z-10 bg-[#02181F]/92 backdrop-blur-md border border-[#D4AF37]/35 rounded-2xl p-3.5 shadow-2xl flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[#F59E0B] text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>4.9/5 Rating</span>
                    <span className="text-teal-200/70 font-normal ml-1">(1,200+ Reviews)</span>
                  </div>
                  <p className="text-white font-serif font-bold text-sm mt-0.5">
                    Authentic Tamizh Thugil
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-teal-200/80 uppercase font-semibold block">Starts At</span>
                  <span className="text-[#FDE68A] font-bold text-base">₹699</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
};
