import palette from 'shared/theme/palette';
import typography from 'shared/theme/typography';
import { OfferTemplateCode } from '../enums';

export interface ITemplateStyles {
  headerFontFamily: string;
  footerFontFamily: string;
  headerFontSize: string;
  bodyFontSize: string;
  footerFontSize: string;
  textColor: string;
  footerTextColor: string;
}

const defaultTemplateStyle: ITemplateStyles = {
  headerFontFamily: 'League Gothic',
  footerFontFamily: 'Nunito Sans',
  headerFontSize: '64px',
  bodyFontSize: '185px',
  footerFontSize: typography.bodyTextLarge.fontSize,
  textColor: palette.common.white,
  footerTextColor: palette.common.white,
};

export const templateStyles: {
  [key in OfferTemplateCode]: ITemplateStyles;
} = {
  [OfferTemplateCode.GRADIENT]: {
    ...defaultTemplateStyle,
  },
  [OfferTemplateCode.SUN_BURST]: {
    ...defaultTemplateStyle,
    textColor: '#9D4B00',
    footerTextColor: '#2D2D2D',
  },
  [OfferTemplateCode.DARK]: {
    ...defaultTemplateStyle,
  },
  [OfferTemplateCode.TURQUOISE]: {
    ...defaultTemplateStyle,
  },
  [OfferTemplateCode.LIGHT]: {
    ...defaultTemplateStyle,
    textColor: '#9D4B00',
    footerTextColor: palette.common.black,
  },
};
