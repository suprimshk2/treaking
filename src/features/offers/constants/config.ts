import { config } from 'shared/constants/config';

export const offerConfig = {
  OFFER_TABLE_DEFAULT_FILTER: {
    ...config.TABLE_DEFAULT_FILTER,
  },
  OFFER_TABLE_DEFAULT_SORT: {
    sortBy: null,
    sortOrder: null,
  },
};
