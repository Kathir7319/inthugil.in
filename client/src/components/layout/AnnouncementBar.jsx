// client/src/components/layout/AnnouncementBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { VelIcon } from '../common/VelIcon';
import { useSettings } from '../../context/SettingsContext';

export const AnnouncementBar = () => {
  const { settings } = useSettings();
  const bar = settings?.announcementBar;

  if (bar && bar.enabled === false) return null;

  const messages = [
    {
      text: "✨ Om Muruga | Draped in Grace • Tamizh Thugil Heritage Collection",
      code: "VEL10",
      offer: "for 10% Off",
      link: bar?.linkUrl || "/shop",
      linkText: bar?.linkText || "Explore Edits"
    },
    {
      text: "🚚 Free Express Delivery Across India on Orders Above ₹799",
      code: null,
      offer: null,
      link: "/shop",
      linkText: "Shop Now"
    },
    {
      text: "🌿 100% Pure Breathable Artisan Cottons & Sacred Silks",
      code: "UNDER ₹999",
      offer: "Everyday Kurtis",
      link: "/ethnic-wear",
      linkText: "View Kurtis"
    },
    {
      text: "🔄 Easy 7-Day Doorstep Returns & Size Exchanges",
      code: null,
      offer: null,
      link: "/track-order",
      linkText: "Track Order"
    },
    {
      text: "💬 WhatsApp Customer Care Support: +91 7708 971 359",
      code: null,
      offer: null,
      link: "/contact-us",
      linkText: "Contact Us"
    }
  ];

  const renderTrack = (keyPrefix) => (
    <div key={keyPrefix} className="flex items-center gap-8 shrink-0 pr-8">
      {messages.map((item, idx) => (
        <div key={`${keyPrefix}-${idx}`} className="flex items-center gap-3 shrink-0 whitespace-nowrap">
          <VelIcon className="w-3.5 h-3.5 text-[#F59E0B] shrink-0 animate-pulse" />
          <span className="tracking-wide text-white/95 text-xs sm:text-sm font-medium">
            {item.text}
            {item.code && (
              <>
                {' '}| Code:{' '}
                <span className="bg-[#D4AF37]/25 text-[#FDE68A] font-mono font-bold px-2 py-0.5 rounded border border-[#D4AF37]/45 tracking-wider mx-1">
                  {item.code}
                </span>
                {item.offer && ` ${item.offer}`}
              </>
            )}
          </span>
          <Link
            to={item.link}
            className="text-[#FBBF24] hover:text-[#FDE68A] underline underline-offset-4 font-bold shrink-0 transition inline-flex items-center gap-0.5 text-xs sm:text-sm"
          >
            {item.linkText} &rarr;
          </Link>
          <span className="text-[#D4AF37]/40 text-xs select-none pl-2">✦</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-[#031C24] text-white py-2 sm:py-2.5 border-b border-[#D4AF37]/35 shadow-sm relative z-50 overflow-hidden select-none">
      <div className="w-full overflow-hidden flex">
        <div className="animate-marquee flex">
          {renderTrack('track-a')}
          {renderTrack('track-b')}
        </div>
      </div>
    </div>
  );
};
