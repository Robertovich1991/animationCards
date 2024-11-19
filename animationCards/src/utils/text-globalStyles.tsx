import {TextStyle} from 'react-native';

export type Weight = 'bold' | 'regular' | 'semibold' | 'medium';
export type Font = 'bold' | 'regular' | 'semibold' | 'medium';
export type Size =
  | 32
  | 25
  | 24 // large
  | 22 // linkButtonLarge
  | 21
  | 19 // secondarySubtitle
  | 18 // primaryTitleSmaller
  | 16 // pageTitle
  | 15 // body, formField
  | 14 // legal
  | 12 // small
  | 10 //smaller
  | 8
  | 7;
export interface InterParams {
  size: Size;
  weight: Weight;
}

export function textGlobalStyle({size, weight}: InterParams): TextStyle {
  const fontSizePx = size;
  return {
    ...paramsByWeight[weight],
    fontSize: fontSizePx,
    letterSpacing: -0.02,
  };
}

const paramsByWeight: Record<Weight, TextStyle> = {
  regular: {
    fontWeight: '400',
    fontStyle: 'normal',
  },
  medium: {
    fontWeight: '500',
    fontStyle: 'normal',
  },
  semibold: {
    fontWeight: '600',
    fontStyle: 'normal',
  },
  bold: {
    fontWeight: '700',
    fontStyle: 'normal',
  },
};
