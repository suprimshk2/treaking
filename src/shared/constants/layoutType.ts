import { OfferContentLayoutType } from 'features/offers/enums';

export const LAYOUT_TYPE: Partial<{ [key in OfferContentLayoutType]: string }> =
  {
    [OfferContentLayoutType.DEFAULT]: 'Free',
    [OfferContentLayoutType.AMOUNT_OFF]: 'RS',
    [OfferContentLayoutType.PERCENT_OFF]: '%',
  };
