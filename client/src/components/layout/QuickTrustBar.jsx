// client/src/components/layout/QuickTrustBar.jsx
import React from 'react';
import { Truck, RotateCcw, Lock, CheckCircle, Award } from 'lucide-react';

export const QuickTrustBar = () => {
  const items = [
    {
      icon: Truck,
      title: "Free Shipping",
      desc: "On all prepaid orders across India"
    },
    {
      icon: RotateCcw,
      title: "Easy 7-Day Returns",
      desc: "Doorstep reverse pickups"
    },
    {
      icon: Lock,
      title: "100% Secure Payments",
      desc: "UPI, Cards, Netbanking via Razorpay"
    },
    {
      icon: Award,
      title: "Quality Checked",
      desc: "Breathable fabrics & tested stitching"
    }
  ];

  return (
    <div className="bg-sand-100 border-y border-sand-200 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {items.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div key={idx} className="flex items-center space-x-2.5 sm:space-x-3.5 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-peacock-700 shrink-0 group-hover:bg-peacock-700 group-hover:text-white transition duration-300">
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-gold-600 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-regal-900 leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-sand-500 mt-0.5 leading-snug line-clamp-1 sm:line-clamp-none">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
