// client/src/components/home/Testimonials.jsx
import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';

export const Testimonials = () => {
  const reviews = [
    {
      name: "Pooja Sharma",
      city: "Bengaluru, Karnataka",
      item: "Rose Beige Anarkali Kurti",
      rating: 5,
      comment: "The fabric is so soft and breathable. The flare is gorgeous and doesn't cling. Honestly looks like a ₹3,000 designer boutique piece!",
    },
    {
      name: "Ananya Iyer",
      city: "Chennai, Tamil Nadu",
      item: "Sage Green Embroidered Kurti Set",
      rating: 5,
      comment: "I was hesitant about ordering my size online, but the size chart was 100% accurate. Very comfortable stitching around the arms and bust.",
    },
    {
      name: "Meera Krishnan",
      city: "Hyderabad, Telangana",
      item: "Dusty Rose Tiered Floral Dress",
      rating: 5,
      comment: "Wore this for a Sunday brunch and got non-stop compliments. The cotton lining kept me cool all afternoon in the sun. Fast delivery too!",
    }
  ];

  return (
    <section className="py-20 bg-sand-50 border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-semibold text-brand-600 block mb-1">
            Real Stories, Real Grace
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-regal-900 tracking-tight">
            Loved By Women Across India
          </h2>
          <p className="text-xs sm:text-sm text-sand-600 mt-2">
            Over 10,000+ happy customers embracing everyday grace.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-8 border border-sand-200 shadow-soft hover:shadow-lift transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-500">
                    {[...Array(r.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-brand-200" />
                </div>
                
                <p className="text-xs sm:text-sm text-regal-900 leading-relaxed italic mb-6">
                  "{r.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-sand-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-regal-900">{r.name}</h4>
                    <p className="text-[11px] text-sand-500">{r.city}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                    <CheckCircle className="w-3 h-3" />
                    Verified Buyer
                  </span>
                </div>
                <p className="text-[11px] text-brand-600 mt-1 font-medium truncate">
                  Purchased: {r.item}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
