import { style } from '@vanilla-extract/css';
import { vars } from '../theme.css';

export const list = style({
  listStyleType: 'disc',
  listStylePosition: 'inside',
  color: vars.colors.dark,
});
