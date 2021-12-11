import { style } from '@vanilla-extract/css';

import { vars } from '../theme.css';

export const imageBorder = style({
  width: '120px',
  height: '120px',
  borderStyle: 'solid',
  borderWidth: '4px',
  borderColor: vars.colors.white,
});
