import mapValues from 'lodash/mapValues';
import { createStyleObject } from '@capsizecss/core';
import type { ConditionalValue } from '@vanilla-extract/sprinkles';
import {
  defineProperties,
  createSprinkles,
  createMapValueFn,
} from '@vanilla-extract/sprinkles';

import { vars } from './theme.css';

const responsiveProperties = defineProperties({
  conditions: {
    none: {},
    '640px': { '@media': 'screen and (min-width: 640px)' },
    '768px': { '@media': 'screen and (min-width: 768px)' },
    '1024px': { '@media': 'screen and (min-width: 1024px)' },
    '1280px': { '@media': 'screen and (min-width: 1280px)' },
  },
  defaultCondition: 'none',
  properties: {
    position: ['absolute', 'relative', 'fixed'],
    display: ['none', 'block', 'inline', 'flex', 'inline-flex'],
    alignItems: ['flex-start', 'center', 'flex-end', 'baseline'],
    justifyContent: ['flex-start', 'center', 'flex-end', 'space-between'],
    flexDirection: ['row', 'column'],
    paddingTop: vars.space,
    paddingBottom: vars.space,
    paddingLeft: vars.space,
    paddingRight: vars.space,
    marginTop: vars.space,
    marginBottom: vars.space,
    marginLeft: { ...vars.space, auto: 'auto' },
    marginRight: { ...vars.space, auto: 'auto' },
    gap: vars.space,
    opacity: [0, 1],
    textAlign: ['left', 'center', 'right'],
    maxWidth: vars.contentWidth,
    fontSize: mapValues(vars.fontSizes, (fontSize) =>
      createStyleObject(fontSize)
    ),
  },
  shorthands: {
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
  },
});

export type ResponsiveValue<Value extends string | number> = ConditionalValue<
  typeof responsiveProperties,
  Value
>;
export const mapResponsiveValue = createMapValueFn(responsiveProperties);

const colorProperties = defineProperties({
  properties: {
    color: vars.colors,
    background: vars.colors,
  },
});

const pseudoProperties = defineProperties({
  conditions: {
    default: {},
    hover: { selector: '&:hover' },
  },
  defaultCondition: 'default',
  properties: {
    textDecoration: ['none', 'underline'],
  },
});

const unconditionalProperties = defineProperties({
  properties: {
    flexWrap: ['wrap', 'nowrap'],
    top: [0],
    bottom: [0],
    left: [0],
    right: [0],
    flexShrink: [0],
    zIndex: [-1, 0, 1],
    width: vars.sizes,
    height: ['100vh'],
    borderRadius: vars.radii,
    cursor: ['pointer'],
    fontFamily: vars.fonts,
    fontWeight: vars.fontWeights,
  },
});

export type Sprinkles = Parameters<typeof sprinkles>[0];

export const sprinkles = createSprinkles(
  responsiveProperties,
  colorProperties,
  pseudoProperties,
  unconditionalProperties
);