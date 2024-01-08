import { TYPOGRAPHY } from './constants/theme';

/**
 * Update the necessary typings for the custom variants if any
 *  * */
declare module '@mui/material/styles' {
  interface TypographyVariants {
    heroTitle: React.CSSProperties;
    bodyTextLarge: React.CSSProperties;
    bodyTextLargeMd: React.CSSProperties;
    bodyTextMedium: React.CSSProperties;
    bodyTextMediumMd: React.CSSProperties;
    bodyTextSmall: React.CSSProperties;
    bodyTextSmallMd: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    heroTitle?: React.CSSProperties;
    bodyTextLarge?: React.CSSProperties;
    bodyTextLargeMd?: React.CSSProperties;
    bodyTextMedium?: React.CSSProperties;
    bodyTextMediumMd?: React.CSSProperties;
    bodyTextSmall?: React.CSSProperties;
    bodyTextSmallMd?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    heroTitle: true;
    bodyTextLarge: true;
    bodyTextLargeMd: true;
    bodyTextMedium: true;
    bodyTextMediumMd: true;
    bodyTextSmall: true;
    bodyTextSmallMd: true;
  }
}
/**
 * -------------------------------------------------------------
 *  * */

/**
 * Convert pixels to rem
 *
 * @param {number} value :: Value in pixels
 * @returns {string} :: respective value in rem
 */
const pxToRem = (value: number) => `${value / +TYPOGRAPHY.baseFontSize}rem`;

/**
 * Get media query object for the font sizes
 *
 * @param {number, number, number} obj :: Font sizes for {sm, md, lg}
 * @returns {Object} :: Object containing media queries
 */
// const responsiveFontSizes = ({
//   sm,
//   md,
//   lg,
// }: {
//   sm: number;
//   md: number;
//   lg: number;
// }) => ({
//   '@media (min-width:600px)': {
//     fontSize: pxToRem(sm),
//   },
//   '@media (min-width:900px)': {
//     fontSize: pxToRem(md),
//   },
//   '@media (min-width:1200px)': {
//     fontSize: pxToRem(lg),
//   },
// });

const typography = {
  fontFamily: TYPOGRAPHY.fontBody,
  fontWeightRegular: TYPOGRAPHY.fontWeightRegular,
  fontWeightMedium: TYPOGRAPHY.fontWeightMedium,
  h1: {
    fontWeight: TYPOGRAPHY.fontWeightMedium,
    fontFamily: TYPOGRAPHY.fontHeading,
    lineHeight: pxToRem(+TYPOGRAPHY.h1LineHeight),
    fontSize: pxToRem(+TYPOGRAPHY.h1FontSize),
    // TODO: Responsive font sizes to be determinted after consulting  with the Design Team
    // ...responsiveFontSizes({ sm: 52, md: 58, lg: 48 }), // NOTE: only lg fontSize are determined for typography
  },
  h2: {
    fontWeight: TYPOGRAPHY.fontWeightMedium,
    fontFamily: TYPOGRAPHY.fontHeading,
    lineHeight: pxToRem(+TYPOGRAPHY.h2LineHeight),
    fontSize: pxToRem(+TYPOGRAPHY.h2FontSize),
  },
  h3: {
    fontWeight: TYPOGRAPHY.fontWeightMedium,
    fontFamily: TYPOGRAPHY.fontHeading,
    lineHeight: pxToRem(+TYPOGRAPHY.h3LineHeight),
    fontSize: pxToRem(+TYPOGRAPHY.h3FontSize),
  },
  h4: {
    fontWeight: TYPOGRAPHY.fontWeightMedium,
    fontFamily: TYPOGRAPHY.fontHeading,
    lineHeight: pxToRem(+TYPOGRAPHY.h4LineHeight),
    fontSize: pxToRem(+TYPOGRAPHY.h4FontSize),
  },
  h5: {
    fontWeight: TYPOGRAPHY.fontWeightMedium,
    fontFamily: TYPOGRAPHY.fontHeading,
    lineHeight: pxToRem(+TYPOGRAPHY.h5LineHeight),
    fontSize: pxToRem(+TYPOGRAPHY.h5FontSize),
  },
  h6: {
    fontWeight: TYPOGRAPHY.fontWeightMedium,
    fontFamily: TYPOGRAPHY.fontHeading,
    lineHeight: pxToRem(+TYPOGRAPHY.h6LineHeight),
    fontSize: pxToRem(+TYPOGRAPHY.h6FontSize),
  },

  // Disable default variants provided by MUI which are not required (which are not included in the style guide)
  subtitle1: undefined,
  subtitle2: undefined,
  body1: undefined,
  body2: undefined,
  caption: undefined,
  overline: undefined,
  button: undefined,

  // Custom variants
  // You can add custom variants as well.
  heroTitle: {
    fontWeight: TYPOGRAPHY.fontWeightMedium,
    fontFamily: TYPOGRAPHY.fontHeading,
    lineHeight: pxToRem(+TYPOGRAPHY.heroTitleLineHeight),
    fontSize: pxToRem(+TYPOGRAPHY.heroTitleFontSize),
  },
  bodyTextLarge: {
    fontWeight: TYPOGRAPHY.fontWeightRegular,
    fontFamily: TYPOGRAPHY.fontBody,
    lineHeight: pxToRem(+TYPOGRAPHY.bodyTextLineHeight),
    fontSize: pxToRem(+TYPOGRAPHY.bodyTextFontSize),
  },
  bodyTextLargeMd: {
    fontWeight: TYPOGRAPHY.fontWeightMedium,
    fontFamily: TYPOGRAPHY.fontHeading,
    lineHeight: pxToRem(+TYPOGRAPHY.bodyTextLineHeight),
    fontSize: pxToRem(+TYPOGRAPHY.bodyTextFontSize),
  },
  bodyTextMedium: {
    fontWeight: TYPOGRAPHY.fontWeightRegular,
    fontFamily: TYPOGRAPHY.fontBody,
    lineHeight: pxToRem(+TYPOGRAPHY.bodyTextMediumLineHeight),
    fontSize: pxToRem(+TYPOGRAPHY.bodyTextMediumFontSize),
  },
  bodyTextMediumMd: {
    fontWeight: TYPOGRAPHY.fontWeightMedium,
    fontFamily: TYPOGRAPHY.fontHeading,
    lineHeight: pxToRem(+TYPOGRAPHY.bodyTextMediumLineHeight),
    fontSize: pxToRem(+TYPOGRAPHY.bodyTextMediumFontSize),
  },
  bodyTextSmall: {
    fontWeight: TYPOGRAPHY.fontWeightRegular,
    fontFamily: TYPOGRAPHY.fontBody,
    lineHeight: pxToRem(+TYPOGRAPHY.bodyTextSmallLineHeight),
    fontSize: pxToRem(+TYPOGRAPHY.bodyTextSmallFontSize),
  },
  bodyTextSmallMd: {
    fontWeight: TYPOGRAPHY.fontWeightMedium,
    fontFamily: TYPOGRAPHY.fontHeading,
    lineHeight: pxToRem(+TYPOGRAPHY.bodyTextSmallLineHeight),
    fontSize: pxToRem(+TYPOGRAPHY.bodyTextSmallFontSize),
  },
};

export default typography;
