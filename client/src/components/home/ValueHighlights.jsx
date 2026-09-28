// client/src/components/home/ValueHighlights.jsx
import React from 'react';
import { VelIcon, MayilFeatherIcon } from '../common/VelIcon';
import { ShieldCheck, HeartHandshake } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const ValueHighlights = () => {
  const { settings } = useSettings();
  const highlights = settings?.valueHighlights || [
    {
      title: "Shakti & Poise (The Vel)",
      description: "Sharp, flattering cuts inspired by the Vel's timeless strength and clarity, designed to empower every Indian woman.",
      icon: "Vel",
    },
    {
      title: "Thooya Thugil (Purity of Weave)",
      description: "100% pure breathable cottons, gentle chanderi, and natural dyes that feel like sacred silk against your skin.",
      icon: "Mayil",
    },
    {
      title: "Dharmic Honest Pricing",
      description: "Direct from the artisan weaving belts of Tamil Nadu — authentic boutique elegance without exorbitant retail markups.",
      icon: "HeartHandshake",
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {highlights.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-8 rounded-3xl bg-sand-50/70 border border-sand-200 hover:border-gold-400 hover:shadow-soft transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-soft flex items-center justify-center text-peacock-700 mb-5 group-hover:bg-gradient-to-br group-hover:from-peacock-800 group-hover:to-peacock-950 group-hover:text-gold-300 transition duration-300 border border-sand-200">
                  {index === 0 ? (
                    <VelIcon className="w-8 h-8 text-gold-600 group-hover:text-gold-400" />
                  ) : index === 1 ? (
                    <MayilFeatherIcon className="w-8 h-8 text-peacock-600 group-hover:text-peacock-300" />
                  ) : (
                    <HeartHandshake className="w-8 h-8 text-saffron-600 group-hover:text-gold-300" />
                  )}
                </div>
                <h3 className="font-serif text-xl font-bold text-regal-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-sand-600 leading-relaxed max-w-xs">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
