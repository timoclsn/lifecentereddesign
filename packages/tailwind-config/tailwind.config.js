/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'pages/**/*.{js,ts,jsx,tsx}',
    'components/**/*.{js,ts,jsx,tsx}',
    '../../packages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
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
      collective: {
        white: '#FFFFFF',
        'white-light': 'rgba(255, 255, 255, 0.72)',
        'header-bg': '#060606',
        text: '#18213A',
        'text-light': 'rgba(24, 33, 58, 0.64)',
        grey: '#F3F4F8',
        principles: '#FCF4E9',
        about: '#0C0F19',
        team: '#E9EFE8',
      },
    },
    extend: {
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
    require('@tailwindcss/line-clamp'),
  ],
};
