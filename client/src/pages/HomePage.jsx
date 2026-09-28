// client/src/pages/HomePage.jsx
import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { HeroSection } from '../components/home/HeroSection';
import { WelcomeStrip } from '../components/home/WelcomeStrip';
import { QuickTrustBar } from '../components/layout/QuickTrustBar';
import { ValueHighlights } from '../components/home/ValueHighlights';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { TrendingProducts } from '../components/home/TrendingProducts';
import { Testimonials } from '../components/home/Testimonials';
import { InstagramFeedStrip } from '../components/home/InstagramFeedStrip';

export const HomePage = () => {
  return (
    <div>
      {/* Dynamic SEO Head with Organization Schema */}
      <SEOHead
        title="Inthugil – Affordable Elegant Women's Clothing Online"
        description="Shop elegant, affordable women's clothing at Inthugil. Ethnic wear, western wear & loungewear crafted for everyday grace. Free shipping available."
        canonicalUrl="https://inthugil.in/"
        schemaType="Organization"
      />

      {/* Hero Banner */}
      <HeroSection />

      {/* Value Strip */}
      <WelcomeStrip />

      {/* Quick Trust Highlights */}
      <QuickTrustBar />

      {/* 3-Column Value Highlights */}
      <ValueHighlights />

      {/* Featured Categories (Ethnic, Western, Loungewear, New Arrivals) */}
      <CategoryGrid />

      {/* Trending Products & Best Sellers with Quick View & Size Guide */}
      <TrendingProducts />

      {/* Customer Reviews & Social Proof */}
      <Testimonials />

      {/* Instagram Community Feed */}
      <InstagramFeedStrip />
    </div>
  );
};
