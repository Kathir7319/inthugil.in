/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Murugan Temple Gold & Saffron Ochre
        gold: {
          50: '#FDFBEF',
          100: '#FBF5D5',
          200: '#F7EAAB',
          300: '#F1DB77',
          400: '#E7C545',
          500: '#D4AF37', // Divine Temple Gold
          600: '#B88F22',
          700: '#946E18',
          800: '#7A5718',
          900: '#674719',
        },
        // Mayil Peacock Teal & Sapphire Blue
        peacock: {
          50: '#F0F9FA',
          100: '#D5F1F3',
          200: '#B0E2E7',
          300: '#7BCDD7',
          400: '#3FB1C1',
          500: '#178E9F',
          600: '#0E7490', // Mayil Teal
          700: '#0C5E75',
          800: '#0F4C5E', // Deep Peacock
          900: '#0C3845',
          950: '#05222B', // Regal Night Peacock
        },
        // Sacred Kumkum & Crimson Temple Red
        kumkum: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B', // Deep Kumkum Red
          900: '#7F1D1D',
          950: '#450A0A',
        },
        // Saffron & Turmeric Temple Warmth
        saffron: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706', // Turmeric Ochre
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        // Sandstone, Temple Granite & Sacred Silk Whites
        sand: {
          50: '#FCFAF6',  // Pure Ivory Silk
          100: '#F6F1E9', // Warm Sandalwood Cream
          200: '#ECE3D5',
          300: '#DDD0BE',
          400: '#C7B59D',
          500: '#AB967B',
          600: '#937D62',
          700: '#79654E',
        },
        regal: {
          50: '#F8F6F4',
          800: '#382218',
          900: '#23150F', // Temple Bronze Charcoal
          950: '#150C08',
        },
        // Brand aliases mapping to the new Murugan palette
        brand: {
          50: '#FDF9F0',
          100: '#FBF0D8',
          200: '#F6DFB0',
          300: '#ECC780',
          400: '#DFAB50',
          500: '#C59028',
          600: '#A87319', // Primary Accent
          700: '#875616',
          800: '#704418',
          900: '#5F3918',
          950: '#371D0B',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(14, 116, 144, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'lift': '0 12px 32px -4px rgba(15, 76, 94, 0.16), 0 4px 12px -2px rgba(212, 175, 55, 0.15)',
        'gold': '0 0 25px rgba(212, 175, 55, 0.25)',
      }
    },
  },
  plugins: [],
};
