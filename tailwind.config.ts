import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: ['class'],
  content: [
    'src/app/**/*.{js,ts,jsx,tsx}',
    'src/components/**/*.{js,ts,jsx,tsx}',
    'src/design-system/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
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
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
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
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        serif: ['var(--font-serif)', ...fontFamily.serif],
      },
      borderRadius: {
        sm: 'calc(var(--radius) - 4px)',
        md: `calc(var(--radius) - 2px)`,
        lg: `var(--radius)`,
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    require('@tailwindcss/container-queries'),
  ],
};
export default config;
