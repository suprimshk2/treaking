import { Shadows } from '@mui/material';
import { DROP_SHADOW } from './constants/theme';

/**
 * Disable the default shadows by setting it to 'none' so that only the custom shadows
 * are used across the app.
 */
export const shadows = [
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
] as Shadows;

/**
 * Add TypeScript support for the custom shadows
 */
declare module '@mui/material/styles' {
  interface Theme {
    customShadows: {
      dropShadow1: string;
      dropShadow2: string;
      innerShadow: string;
    };
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    customShadows?: {
      dropShadow1?: string;
      dropShadow2?: string;
      innerShadow?: string;
    };
  }
}

export const customShadows = {
  dropShadow1: DROP_SHADOW.dropShadow1,
  dropShadow2: DROP_SHADOW.dropShadow2,
  innerShadow: DROP_SHADOW.innerShadow,
};
