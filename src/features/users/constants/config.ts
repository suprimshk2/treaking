import { config } from 'shared/constants/config';
import { UserAdvancedFilterFormSchemaType } from '../schemas';

export const USER_ADVANCED_FILTER_DEFAULT_VALUES: UserAdvancedFilterFormSchemaType =
  {
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
  };

export const userConfig = {
  USER_TABLE_DEFAULT_FILTER: {
    ...config.TABLE_DEFAULT_FILTER,
    ...USER_ADVANCED_FILTER_DEFAULT_VALUES,
  },

  /**
   * For mapping the filter params to the ones required by API
   *
   * Use this map if the variables (or keys) expected by API doesn't match the ones used in forms (UI)
   *
   */
  USER_TABLE_FILTER_MAP: {
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    mobileNumber: 'mobileNumber',
  },
};
