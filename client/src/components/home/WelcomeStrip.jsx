// client/src/components/home/WelcomeStrip.jsx
import React from 'react';
import { VelIcon } from '../common/VelIcon';
import { useSettings } from '../../context/SettingsContext';

export const WelcomeStrip = () => {
  const { settings } = useSettings();
  const welcome = settings?.welcomeStrip;

  return (
    <section className="bg-sand-50 py-16 px-4 sm:px-6 lg:px-8 border-b border-sand-200 relative overflow-hidden">
      {/* Subtle Temple Arch Watermark */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-gold-400/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-peacock-800 bg-peacock-50 border border-peacock-200/60 px-3 py-1 rounded-full">
          <VelIcon className="w-3.5 h-3.5 text-gold-600" />
          <span>The Sacred Legacy of 'Thugil' (துகில்)</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-regal-900 tracking-tight">
          {welcome?.heading || "The Sacred Legacy of 'Thugil' (துகில்)"}
        </h2>
        
        {/* Sacred Gold Divider */}
        <div className="flex items-center justify-center gap-2 my-3">
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-gold-400" />
          <VelIcon className="w-3.5 h-3.5 text-gold-500" />
          <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-gold-400" />
        </div>

        <p className="text-sand-700 text-sm sm:text-base leading-relaxed font-normal max-w-3xl mx-auto">
          {welcome?.body || "In ancient Sangam literature, 'Thugil' celebrated the purest celestial drapery — woven with dignity, breathability, and timeless grace. Inthugil brings that sacred Tamil heritage into modern women's fashion: vibrant peacock blues, auspicious temple ochres, and featherlight cottons made to elevate your everyday confidence."}
        </p>
      </div>
    </section>
  );
};
