import { createGlobalTheme } from '@vanilla-extract/css';
import { precomputeValues } from '@capsizecss/core';
import fontMetrics from '@capsizecss/metrics/notoSans';

export const vars = createGlobalTheme(':root', {
  fonts: {
    sans: '"Noto Sans", -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
  },
  fontSizes: {
    xs: precomputeValues({
      fontSize: 12,
      leading: 16,
      fontMetrics,
    }),
    sm: precomputeValues({
      fontSize: 14,
      leading: 18,
      fontMetrics,
    }),
    md: precomputeValues({
      fontSize: 16,
      leading: 24,
      fontMetrics,
    }),
    lg: precomputeValues({
      fontSize: 18,
      leading: 28,
      fontMetrics,
    }),
    xl: precomputeValues({
      fontSize: 20,
      leading: 28,
      fontMetrics,
    }),
    '2xl': precomputeValues({
      fontSize: 24,
      leading: 32,
      fontMetrics,
    }),
    '3xl': precomputeValues({
      fontSize: 30,
      leading: 36,
      fontMetrics,
    }),
    '4xl': precomputeValues({
      fontSize: 36,
      leading: 40,
      fontMetrics,
    }),
    '5xl': precomputeValues({
      fontSize: 48,
      leading: 48,
      fontMetrics,
    }),
    '6xl': precomputeValues({
      fontSize: 60,
      leading: 60,
      fontMetrics,
    }),
  },
  lineHeights: {
    xs: '1',
    sm: '1.25',
    md: '1.5',
    lg: '1.75',
    xl: '2',
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  space: {
    none: '0',
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '5rem',
    '5xl': '6rem',
    '6xl': '7rem',
    '7xl': '8rem',
  },
  sizes: {
    full: '100%',
  },
  radii: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    full: '9999px',
  },
  contentWidth: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  colors: {
    white: 'hsla(0, 0%, 100%, 1)',
    soft: 'hsla(0, 0%, 100%, 0.56)',
    light: 'hsla(35, 14%, 17%, 0.16)',
    dark: 'hsla(35, 14%, 17%, 0.84)',
    'black-lighter': 'hsla(36, 7%, 30%, 1)',
    'black-normal': 'hsla(35, 14%, 17%, 1)',
    'grass-normal': 'hsla(65, 57%, 88%, 1)',
    'grass-darker': 'hsla(62, 26%, 77%, 1)',
    'sky-normal': 'hsla(220, 48%, 94%, 1)',
    'sky-darker': 'hsla(222, 11%, 82%, 1)',
    'evening-normal': 'hsla(7, 43%, 93%, 1)',
    'evening-darker': 'hsla(8, 15%, 81%, 1)',
    'sand-normal': 'hsla(43, 60%, 89%, 1)',
    'sand-darker': 'hsla(43, 28%, 78%, 1)',
    'morning-normal': 'hsla(281, 45%, 93%, 1)',
    'morning-darker': 'hsla(295, 13%, 81%, 1)',
    'oak-normal': 'hsla(34, 29%, 91%, 1)',
    'oak-darker': 'hsla(32, 13%, 80%, 1)',
    'forest-normal': 'hsla(126, 36%, 92%, 1)',
    'forest-darker': 'hsla(120, 11%, 81%, 1)',
    'stone-normal': 'hsla(0, 0%, 92%, 1)',
    'stone-darker': 'hsla(60, 1%, 80%, 1)',
  },
});
