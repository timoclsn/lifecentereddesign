import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '../theme.css';

export const imageBorder = style({});

globalStyle(`${imageBorder} div`, {
  borderStyle: 'solid',
  borderWidth: '4px',
  borderColor: vars.colors.white,
  borderRadius: vars.radii.full,
});
