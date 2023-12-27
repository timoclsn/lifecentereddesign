/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    'app/**/*.{js,ts,jsx,tsx}',
    'pages/**/*.{js,ts,jsx,tsx}',
    'components/**/*.{js,ts,jsx,tsx}',
    '../../packages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'var(--color-transparent)',
        oak: 'var(--color-oak)',
        forest: 'var(--color-forest)',
        sand: 'var(--color-sand)',
        lime: 'var(--color-lime)',
        sky: 'var(--color-sky)',
        evening: 'var(--color-evening)',
        stone: 'var(--color-stone)',
        morning: 'var(--color-morning)',
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
        },
        bg: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
        },
        primary: {
          main: {
            bg: 'var(--color-primary-main-bg)',
            text: 'var(--color-primary-main-text)',
          },
          hover: {
            bg: 'var(--color-primary-hover-bg)',
            text: 'var(--color-primary-hover-text)',
          },
          disabled: {
            bg: 'var(--color-primary-disabled-bg)',
            text: 'var(--color-primary-disabled-text)',
          },
          contrast: {
            text: 'var(--color-primary-contrast-text)',
          },
          ghost: {
            bg: 'var(--color-primary-ghost-bg)',
          },
        },
        ghost: {
          main: {
            light: {
              bg: 'var(--color-ghost-main-light-bg)',
            },
            dark: {
              bg: 'var(--color-ghost-main-dark-bg)',
            },
          },
          contrast: {
            text: 'var(--color-ghost-contrast-text)',
          },
        },
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        serif: 'var(--font-serif)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    require('@tailwindcss/container-queries'),
  ],
};
