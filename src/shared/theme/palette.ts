import { PALETTE } from './constants/theme';

declare module '@mui/material/styles' {
  interface Palette {
    shade: Palette['primary'];
    gray: Palette['primary'];
  }

  // Enable typings for 'lighter' and 'darker' shades
  // If you need to add a custom shade (say 'faint') for either of
  // Primary, Secondary, Info, Success, Warning and Error, you need to add typings as well
  interface PaletteColor {
    lighter?: string;
    darker?: string;
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    shade?: PaletteOptions['primary'];
    gray?: PaletteOptions['primary'];
  }
}

const COMMON = {
  black: PALETTE.black,
  white: PALETTE.white,
};

const PRIMARY = {
  lighter: PALETTE.primaryLighter,
  light: PALETTE.primaryLight,
  main: PALETTE.primaryMain,
  dark: PALETTE.primaryDark,
  darker: PALETTE.primaryDarker,
  // contrastText: will be calculated to contrast with palette.primary.main if not specified
};

const SECONDARY = {
  lighter: PALETTE.secondaryLighter,
  light: PALETTE.secondaryLight,
  main: PALETTE.secondaryMain,
  dark: PALETTE.secondaryDark,
  darker: PALETTE.secondaryDarker,
  // contrastText: will be calculated to contrast with palette.secondary.main if not specified
};

const INFO = {
  lighter: PALETTE.infoLighter,
  light: PALETTE.infoLight,
  main: PALETTE.infoMain,
  dark: PALETTE.infoDark,
  darker: PALETTE.infoDarker,
  // contrastText: will be calculated to contrast with palette.info.main if not specified
};

const SUCCESS = {
  lighter: PALETTE.successLighter,
  light: PALETTE.successLight,
  main: PALETTE.successMain,
  dark: PALETTE.successDark,
  darker: PALETTE.successDarker,
  // contrastText: will be calculated to contrast with palette.success.main if not specified
};

const WARNING = {
  lighter: PALETTE.warningLighter,
  light: PALETTE.warningLight,
  main: PALETTE.warningMain,
  dark: PALETTE.warningDark,
  darker: PALETTE.warningDarker,
  // contrastText: will be calculated to contrast with palette.warning.main if not specified
};

const ERROR = {
  lighter: PALETTE.errorLighter,
  light: PALETTE.errorLight,
  main: PALETTE.errorMain,
  dark: PALETTE.errorDark,
  darker: PALETTE.errorDarker,
  // contrastText: will be calculated to contrast with palette.error.main if not specified
};

const TEXT = {
  primary: PALETTE.textDark,
  secondary: PALETTE.textLight,
};

// Custom palettes
const SHADE = {
  lighter: PALETTE.shadeLighter,
  light: PALETTE.shadeLight,
  main: PALETTE.shadeMain,
  dark: PALETTE.shadeDark,
  darker: PALETTE.shadeDarker,
};

const GRAY = {
  lighter: PALETTE.grayLighter,
  light: PALETTE.grayLight,
  main: PALETTE.grayMain,
  dark: PALETTE.grayDark,
  darker: PALETTE.grayDarker,
};

const palette = {
  common: { ...COMMON },
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  text: { ...TEXT },

  // custom palettes
  // We can add custom ones if the MUI doesn't have the one we need.

  // adding a custom palette for 'shade'.
  shade: { ...SHADE },
  gray: { ...GRAY },
};

export default palette;
