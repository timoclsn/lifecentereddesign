import { createGlobalTheme } from '@vanilla-extract/css';
import { precomputeValues } from '@capsizecss/core';
import fontMetrics from '@capsizecss/metrics/notoSans';

const grid = 8;
const px = (value: string | number) => `${value}px`;

export const vars = createGlobalTheme(':root', {
  fonts: {
    sans: '"Noto Sans", -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
  },
  fontSizes: {
    '16px': precomputeValues({
      fontSize: 2 * grid,
      leading: 3 * grid,
      fontMetrics,
    }),
    '32px': precomputeValues({
      fontSize: 3 * grid,
      leading: 5 * grid,
      fontMetrics,
    }),
    '48px': precomputeValues({
      fontSize: 6 * grid,
      leading: 6 * grid,
      fontMetrics,
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  grid: px(grid),
  space: {
    none: '0',
    '2px': px(0.25 * grid),
    '4px': px(0.5 * grid),
    '8px': px(1 * grid),
    '16px': px(2 * grid),
    '24px': px(3 * grid),
    '32px': px(4 * grid),
    '48px': px(6 * grid),
    '64px': px(8 * grid),
    '80px': px(10 * grid),
    '96px': px(12 * grid),
    '128px': px(16 * grid),
  },
  sizes: {
    '1/4': '25%',
    '1/3': '33.3%',
    '1/2': '50%',
    '2/3': '66.66%',
    '3/4': '75%',
    full: '100%',
  },
  radii: {
    none: '0',
    '8px': px(1 * grid),
    '16px': px(2 * grid),
    '24px': px(3 * grid),
    full: '9999px',
  },
  contentWidth: {
    '640px': px(640),
    '768px': px(768),
    '1024px': px(1024),
    '1280px': px(1280),
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
