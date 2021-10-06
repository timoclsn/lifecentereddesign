import { style } from '@vanilla-extract/css';

import { sprinkles } from './sprinkles.css';

export const srOnly = style([
  sprinkles({
    position: 'absolute',
    padding: 'none',
    overflow: 'hidden',
  }),
  {
    width: '1px',
    height: '1px',
    margin: '-1px',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    borderWidth: 0,
  },
]);
