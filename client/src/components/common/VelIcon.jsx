// client/src/components/common/VelIcon.jsx
import React from 'react';

// Sacred Vel (வேல்) Icon
export const VelIcon = ({ className = "w-5 h-5 text-gold-500", size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Spear blade */}
    <path
      d="M12 2C10.5 4.5 9 8 9 11.5C9 14.5 10.5 16 11.2 16.5V21C11.2 21.4 11.6 21.8 12 21.8C12.4 21.8 12.8 21.4 12.8 21V16.5C13.5 16 15 14.5 15 11.5C15 8 13.5 4.5 12 2Z"
    />
    {/* Crossbar guard */}
    <path
      d="M8.5 14C8 14 7.5 14.4 7.5 15C7.5 15.6 8 16 8.5 16C9 16 9.5 15.6 9.5 15C9.5 14.4 9 14 8.5 14Z"
      opacity="0.8"
    />
    <path
      d="M15.5 14C15 14 14.5 14.4 14.5 15C14.5 15.6 15 16 15.5 16C16 16 16.5 15.6 16.5 15C16.5 14.4 16 14 15.5 14Z"
      opacity="0.8"
    />
    {/* Base point */}
    <circle cx="12" cy="22" r="1" />
  </svg>
);

// Sacred Mayil Feather (மயில் இறகு) Icon
export const MayilFeatherIcon = ({ className = "w-5 h-5 text-peacock-500", size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" fill="currentColor" fillOpacity="0.15" />
    <line x1="16" y1="8" x2="2" y2="22" />
    <line x1="17.5" y1="15" x2="9" y2="15" />
    <circle cx="14" cy="9" r="2.5" fill="currentColor" fillOpacity="0.4" />
  </svg>
);
