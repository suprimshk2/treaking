import { config } from 'shared/constants/config';
import { QuizAdvancedFilterFormSchemaType } from '../schemas';

export const VENDOR_ADVANCED_FILTER_DEFAULT_VALUES: QuizAdvancedFilterFormSchemaType =
  {
    titleOne: '',
    titleTwo: '',
  };

export const vendorConfig = {
  VENDOR_TABLE_DEFAULT_FILTER: {
    ...config.TABLE_DEFAULT_FILTER,
    ...VENDOR_ADVANCED_FILTER_DEFAULT_VALUES,
  },
};
