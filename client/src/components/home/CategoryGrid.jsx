// client/src/components/home/CategoryGrid.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { VelIcon } from '../common/VelIcon';
import { useSettings } from '../../context/SettingsContext';

export const CategoryGrid = () => {
  const { categories } = useSettings();

  const defaultCategoryData = [
    {
      name: "Ethnic Wear",
      subtitle: "Sarees, Kurtis & Suits",
      slug: "ethnic-wear",
      image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
      count: "Kurtis from ₹649"
    },
    {
      name: "Western Wear",
      subtitle: "Dresses, Tops & Co-ords",
      slug: "western-wear",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
      count: "Dresses from ₹899"
    },
    {
      name: "Loungewear",
      subtitle: "Comfort meets style",
      slug: "loungewear",
      image: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=800&q=80",
      count: "Sets from ₹799"
    },
    {
      name: "New Arrivals",
      subtitle: "Mayil & Temple Gold",
      slug: "new-arrivals",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
      count: "Fresh this week"
    }
  ];

  const items = categories && categories.length > 0 ? categories : defaultCategoryData;

  return (
    <section className="py-20 bg-sand-50 border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-peacock-800 mb-1">
              <VelIcon className="w-3.5 h-3.5 text-gold-600" />
              <span>Curated Collections</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-regal-900 tracking-tight">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/shop"
            className="mt-4 md:mt-0 text-sm font-bold text-peacock-700 hover:text-peacock-900 flex items-center gap-1 group"
          >
            <span>View All Collections</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition text-gold-600" />
          </Link>
        </div>

        {/* 2 Column Mobile / 4 Column Desktop Category Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {items.map((cat) => (
            <Link
              key={cat.slug}
              to={`/${cat.slug}`}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[3/4] bg-sand-200 shadow-soft hover:shadow-lift transition-all duration-500 block border border-sand-200 hover:border-gold-400"
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={`${cat.name} – Inthugil`}
                loading="eager"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-108"
              />

              {/* Gradient Overlay with Peacock Deep Tone */}
              <div className="absolute inset-0 bg-gradient-to-t from-regal-950/90 via-regal-950/30 to-transparent transition-opacity group-hover:from-peacock-950/95" />

              {/* Text info bottom */}
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-6 flex items-end justify-between text-white">
                <div>
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                    <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-gold-400 line-clamp-1">
                      {cat.subtitle || cat.headline || "Collection"}
                    </span>
                  </div>
                  <h3 className="font-serif text-base sm:text-2xl font-bold tracking-tight text-white group-hover:text-gold-200 transition">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-sand-300 mt-0.5 sm:mt-1 line-clamp-1 hidden sm:block">
                    {cat.intro ? `${cat.intro.slice(0, 48)}...` : "Curated for everyday grace"}
                  </p>
                </div>
                
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-gold-500 group-hover:text-regal-950 transition duration-300 shrink-0 ml-1.5 sm:ml-2 shadow-soft">
                  <ArrowUpRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
