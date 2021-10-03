import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '../theme.css';

export const imageBorder = style({});

globalStyle(`${imageBorder} div`, {
  borderRadius: vars.radii.full,
  borderColor: vars.colors.white,
  borderWidth: '4px',
});
