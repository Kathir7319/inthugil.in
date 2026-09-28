// client/src/components/home/InstagramFeedStrip.jsx
import React from 'react';
import { Instagram, Heart } from 'lucide-react';

export const InstagramFeedStrip = () => {
  const photos = [
    {
      img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=500&q=80",
      caption: "Everyday festive with our Anarkali line #InthugilWomen",
      likes: "1.2k"
    },
    {
      img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=500&q=80",
      caption: "Breezy mornings in pure hand-block cotton ✨",
      likes: "890"
    },
    {
      img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=500&q=80",
      caption: "Floral tier dresses for Sunday brunch poetics",
      likes: "2.4k"
    },
    {
      img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=500&q=80",
      caption: "Minimalist linen sets for workday poise",
      likes: "1.5k"
    },
    {
      img: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=500&q=80",
      caption: "Cloud-soft modal loungewear for calm evenings 🌙",
      likes: "970"
    }
  ];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-600 mb-1">
          <Instagram className="w-4 h-4" />
          <span>Follow Us On Instagram</span>
        </div>
        <h3 className="font-serif text-2xl font-bold text-regal-900">
          @inthugil.in
        </h3>
        <p className="text-xs text-sand-500 mt-1">Tag #InthugilStyle to be featured in our style gallery</p>
      </div>

      {/* Mobile Swipeable Strip / Desktop 5-Col Grid */}
      <div className="flex overflow-x-auto gap-3 pb-3 px-4 scrollbar-none md:grid md:grid-cols-5 max-w-[1400px] mx-auto">
        {photos.map((item, idx) => (
          <a
            key={idx}
            href="https://instagram.com/inthugil"
            target="_blank"
            rel="noreferrer"
            className="group relative w-40 sm:w-52 md:w-auto shrink-0 md:shrink aspect-square rounded-2xl overflow-hidden bg-sand-200 block shadow-soft"
          >
            <img
              src={item.img}
              alt={item.caption}
              loading="eager"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-regal-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center text-white">
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-white mb-1.5" />
              <div className="flex items-center gap-1 text-xs font-bold text-rose-300">
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>{item.likes}</span>
              </div>
              <p className="text-[10px] text-sand-200 line-clamp-2 mt-1">{item.caption}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
