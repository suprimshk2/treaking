import { isPast, isFuture } from 'date-fns';
import { offerTemplates } from '../components/offer-templates/OfferFormAdTemplates';
import {
  OfferContentLayoutType,
  OfferStatus,
  OfferTemplateCode,
} from '../enums';
import { OfferAddEditFormSchemaType } from '../schemas';
import { textEditorHandler } from 'shared/utils/common';

export const getSelectedOfferTemplateFromCode = (
  templateCode: OfferTemplateCode
) => {
  return offerTemplates.find(({ code }) => templateCode === code);
};

export const getOfferStatus = ({
  startDate,
  availableUntil,
}: {
  startDate: string;
  availableUntil: string;
}): OfferStatus => {
  const startDateFormat = new Date(startDate);

  const availableUntilDateFormat = new Date(availableUntil);

  if (isPast(availableUntilDateFormat)) {
    return OfferStatus.EXPIRED;
  }

  if (isFuture(startDateFormat)) {
    return OfferStatus.UPCOMING;
  }
  return OfferStatus.ACTIVE;
};

export const formatAddEditOfferPayload = (data: OfferAddEditFormSchemaType) => {
  return {
    ...data,
    startDate: new Date(data.startDate).toISOString(),
    endDate: new Date(data.endDate).toISOString(),
    availableUntil: new Date(data.availableUntil).toISOString(),
    termsAndConditions: textEditorHandler(data?.termsAndConditions),
    usageInstructions: textEditorHandler(data?.usageInstructions),
    subTitle:
      data?.layoutType !== OfferContentLayoutType.DEFAULT
        ? data?.subTitle
        : OfferContentLayoutType?.FREE,
  };
};
