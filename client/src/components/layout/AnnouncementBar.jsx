// client/src/components/layout/AnnouncementBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { VelIcon } from '../common/VelIcon';
import { useSettings } from '../../context/SettingsContext';

export const AnnouncementBar = () => {
  const { settings } = useSettings();
  const bar = settings?.announcementBar;

  if (!bar || bar.enabled === false) return null;

  return (
    <div className="bg-[#031C24] text-white text-xs sm:text-sm py-2.5 px-4 border-b border-[#D4AF37]/35 shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2.5 text-center font-medium">
        <VelIcon className="w-3.5 h-3.5 text-[#F59E0B] shrink-0 animate-pulse" />
        <span className="tracking-wide text-white/95">
          ✨ <span className="font-semibold text-[#FDE68A]">Om Muruga</span> | Draped in Grace • Tamizh Thugil Heritage Collection | Use Code:{' '}
          <span className="bg-[#D4AF37]/25 text-[#FDE68A] font-mono font-bold px-2 py-0.5 rounded border border-[#D4AF37]/45 tracking-wider">
            VEL10
          </span>{' '}
          for 10% Off
        </span>
        {bar.linkText && bar.linkUrl && (
          <Link
            to={bar.linkUrl}
            className="text-[#FBBF24] hover:text-[#FDE68A] underline underline-offset-4 font-bold ml-1 shrink-0 transition inline-flex items-center gap-1"
          >
            {bar.linkText} &rarr;
          </Link>
        )}
      </div>
    </div>
  );
};
