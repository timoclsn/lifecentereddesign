import { createVar } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import type { RecipeVariants } from '@vanilla-extract/recipes';

import { sprinkles } from '../sprinkles.css';
import { vars } from '../theme.css';

const paddingX = createVar();
const paddingY = createVar();

export type ButtonVaraints = RecipeVariants<typeof button>;

export const button = recipe({
  base: [
    sprinkles({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      textDecoration: 'none',
      gap: '8px',
      flexShrink: 0,
      fontWeight: 'bold',
      fontSize: '16px',
    }),
    {
      ':focus': {
        outline: 'none',
      },
    },
  ],

  variants: {
    size: {
      lg: [
        {
          vars: {
            [paddingX]: vars.space['32px'],
            [paddingY]: vars.space['16px'],
          },
        },
      ],
      sm: [
        {
          vars: {
            [paddingX]: vars.space['24px'],
            [paddingY]: vars.space['8px'],
          },
        },
      ],
    },

    variant: {
      primary: {
        color: vars.colors.white,
        backgroundColor: vars.colors['black-normal'],
        borderRadius: vars.radii.full,
        paddingLeft: paddingX,
        paddingRight: paddingX,
        paddingTop: paddingY,
        paddingBottom: paddingY,
        ':hover': {
          backgroundColor: vars.colors['black-lighter'],
        },
        ':active': {
          backgroundColor: vars.colors['black-lighter'],
        },
        ':focus-visible': {
          backgroundColor: vars.colors['black-lighter'],
        },
        ':disabled': {
          backgroundColor: vars.colors['black-lighter'],
        },
      },

      secondary: {
        color: vars.colors['black-normal'],
        backgroundColor: vars.colors['oak-normal'],
        borderRadius: vars.radii.full,
        paddingLeft: paddingX,
        paddingRight: paddingX,
        paddingTop: paddingY,
        paddingBottom: paddingY,
        ':hover': {
          backgroundColor: vars.colors['oak-darker'],
        },
        ':active': {
          backgroundColor: vars.colors['oak-darker'],
        },
        ':focus-visible': {
          backgroundColor: vars.colors['oak-darker'],
        },
        ':disabled': {
          backgroundColor: vars.colors['oak-darker'],
        },
      },

      link: {
        textDecoration: 'underline',
        color: vars.colors['black-normal'],
        backgroundColor: 'transparent',
        ':hover': {
          color: vars.colors['black-lighter'],
        },
        ':active': {
          color: vars.colors['black-lighter'],
        },
        ':focus-visible': {
          color: vars.colors['black-lighter'],
        },
        ':disabled': {
          color: vars.colors['black-lighter'],
        },
      },
    },

    fullWith: {
      true: sprinkles({ width: 'full' }),
    },
  },

  defaultVariants: {
    size: 'lg',
    variant: 'primary',
  },
});
