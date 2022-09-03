const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      oak: '#EFE9E2',
      forest: '#E4F2E6',
      sand: '#F3E6D1',
      lime: '#F0F2D1',
      sky: '#E7ECF7',
      evening: '#F4E6E4',
      stone: '#EAEAEA',
      morning: '#F1E6F5',
      text: {
        primary: '#101B2C',
        secondary: 'rgba(16, 27, 44, 0.64)',
      },
      bg: {
        primary: '#F8F6F1',
        secondary: '#FFFFFF',
      },
      primary: {
        main: {
          bg: '#101B2C',
          text: '#101B2C',
        },
        hover: {
          bg: 'rgba(16, 27, 44, 0.8)',
          text: '#101B2C',
        },
        disabled: {
          bg: 'rgba(16, 27, 44, 0.4)',
          text: 'rgba(16, 27, 44, 0.4)',
        },
        contrast: {
          text: '#FFFFFF',
        },
        ghost: {
          bg: 'rgba(16, 27, 44, 0.12)',
        },
      },
      ghost: {
        main: {
          light: {
            bg: 'rgba(255, 255, 255, 0.56)',
          },
          dark: {
            bg: 'rgba(16, 27, 44, 0.12)',
          },
        },
        contrast: {
          text: '#101B2C',
        },
      },
    },
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', ...fontFamily.sans],
        serif: ['"Source Serif 4"', fontFamily.serif],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
};
