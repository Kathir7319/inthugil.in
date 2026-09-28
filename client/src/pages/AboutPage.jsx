// client/src/pages/AboutPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ShieldCheck, Smile, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { QuickTrustBar } from '../components/layout/QuickTrustBar';
import { VelIcon } from '../components/common/VelIcon';

export const AboutPage = () => {
  const promises = [
    {
      title: "Elegant designs inspired by everyday women",
      desc: "We design for real bodies, real routines, and real moments — from morning meetings to festive evenings.",
      icon: Sparkles
    },
    {
      title: "Fair, transparent pricing",
      desc: "Zero artificial markups. We deliver honest boutique-quality clothing directly to your wardrobe.",
      icon: ShieldCheck
    },
    {
      title: "Quality you can feel",
      desc: "Breathable pure cottons, gentle rayon blends, and reinforced stitching crafted to withstand regular wear.",
      icon: Heart
    },
    {
      title: "A shopping experience as graceful as our clothes",
      desc: "Easy Indian pin code delivery, seamless Razorpay checkout, and doorstep returns with a warm support team.",
      icon: Smile
    }
  ];

  return (
    <div className="bg-sand-50 min-h-screen pb-20">
      
      {/* Dynamic SEO Meta */}
      <SEOHead
        title="Our Story – Inthugil Women's Fashion"
        description="Learn the story behind Inthugil — bringing graceful, high-quality, and budget-friendly clothing to women across India. Style, dignity, and affordability in one wardrobe."
        canonicalUrl="https://inthugil.in/about-us"
        ogImage="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80"
      />

      {/* Hero Section - Peacock Shades */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#02181F] via-[#052C37] via-[#074758] to-[#04332A] text-white py-20 lg:py-28 border-b border-[#D4AF37]/30">
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
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1920&q=80"
            alt="Inthugil craftsmanship"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#063A48]/85 border border-[#D4AF37]/50 text-[#FDE68A] px-4 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-md">
            <VelIcon className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>வேல் • Our Story & Heritage</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            The Story of Inthugil
          </h1>
          <p className="text-teal-100/90 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Born of Tamil heritage, inspired by the majesty of the Vel & Peacock. Style, dignity, and honest pricing in the same wardrobe.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-20 bg-white border-b border-sand-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="space-y-6 text-sm sm:text-base text-sand-700 leading-relaxed font-normal">
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-brand-600 first-letter:mr-2 first-letter:float-left">
              At Inthugil, we believe elegance shouldn't come with a hefty price tag. We started with a simple idea — every woman deserves clothing that makes her feel graceful, confident, and beautiful, without compromise on her budget.
            </p>

            <p>
              Each piece in our collection is thoughtfully curated to blend timeless design with modern comfort. We work closely with our makers to ensure quality stitching, breathable fabrics, and details that feel premium to the touch — because you deserve nothing less.
            </p>

            <div className="p-6 sm:p-8 bg-brand-50 rounded-3xl border border-brand-100 text-brand-950 font-serif italic text-base sm:text-xl text-center leading-relaxed">
              "Inthugil isn't just a clothing brand. It's a promise — that style, dignity, and affordability can exist in the same wardrobe."
            </div>

            <p>
              Whether you are slipping into one of our featherlight Anarkali kurtis for a family gathering, a tailored linen co-ord for a bustling workday, or our cloud-soft modal loungewear after a long evening, Inthugil is designed to move effortlessly with your life.
            </p>
          </div>

        </div>
      </section>

      {/* Our Promise Section */}
      <section id="promise" className="py-20 bg-sand-50 border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest font-semibold text-brand-600 block mb-1">
              What We Stand For
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-regal-900 tracking-tight">
              Our Promise to You
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {promises.map((p, idx) => {
              const IconComp = p.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-3xl border border-sand-200 shadow-soft hover:shadow-lift transition duration-300 flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-regal-900 mb-1">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-sand-600 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-8 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-lift transition"
            >
              <span>Explore The Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <QuickTrustBar />

    </div>
  );
};
