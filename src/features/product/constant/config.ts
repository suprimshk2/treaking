import { config } from 'shared/constants/config';
import { ProductAdvancedFilterFormSchemaType } from '../schemas';

export const PRODUCT_ADVANCED_FILTER_DEFAULT_VALUES: ProductAdvancedFilterFormSchemaType =
  {
    titleOne: '',
    titleTwo: '',
  };

export const productConfig = {
  PRODUCT_TABLE_DEFAULT_FILTER: {
    ...config.TABLE_DEFAULT_FILTER,
    ...PRODUCT_ADVANCED_FILTER_DEFAULT_VALUES,
  },
};
