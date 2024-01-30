import { isPast, isFuture } from 'date-fns';
import { offerTemplates } from '../components/offer-templates/OfferFormAdTemplates';
import { OfferStatus, OfferTemplateCode } from '../enums';

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
