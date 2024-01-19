import { config } from 'shared/constants/config';
import { VendorAdvancedFilterFormSchemaType } from '../schemas';

export const VENDOR_ADVANCED_FILTER_DEFAULT_VALUES: VendorAdvancedFilterFormSchemaType =
  {
    titleOne: '',
    titleTwo: '',
  };
export const VENDOR_SORT_DEFAULT_VALUES = {
  sortBy: null,
  sortOrder: null,
};

export const vendorConfig = {
  VENDOR_TABLE_DEFAULT_FILTER: {
    ...config.TABLE_DEFAULT_FILTER,
    ...VENDOR_ADVANCED_FILTER_DEFAULT_VALUES,
  },
  VENDOR_TABLE_DEFAULT_SORT: {
    ...config.TABLE_SORT_DEFAULT_VALUES,
    ...VENDOR_SORT_DEFAULT_VALUES,
  },
};
