import apiRoute from 'features/auth/constants/apiRoute';
import { Gender, Role } from 'shared/enums';

export const config = {
  /**
   * Persists login i.e. the user is logged in unless the session is expired or is logged out.
   * You may want to set it to false which causes user to login again on page refresh for sensitive application
   * (like password manager, etc.)
   */
  PERSIST_LOGIN: true,
  /**
   * Number of times to retry calling an API endpoint on failed request
   */
  REQUEST_RETRY: 2,

  /**
   * Default filter for tables
   */
  TABLE_DEFAULT_FILTER: {
    keyword: '',
    limit: 5,
    page: 1,
  },

  TABLE_SORT_DEFAULT_VALUES: {
    sortBy: null,
    sortOrder: null,
  },

  PAGE_LIMIT_OPTIONS: [
    { id: 1, text: 'Show 5', value: 5 },
    { id: 2, text: 'Show 10', value: 10 },
    { id: 2, text: 'Show 20', value: 20 },
  ],

  GENDER_OPTIONS: [
    { id: 1, text: Gender.MALE, value: Gender.MALE },
    { id: 2, text: Gender.FEMALE, value: Gender.FEMALE },
    { id: 3, text: Gender.OTHER, value: Gender.OTHER },
  ],
  ROLE_OPTIONS: [
    { id: 1, text: Role.ADMIN_TEXT, value: Role.ADMIN },
    { id: 2, text: Role.REPRESENTATIVE_TEXT, value: Role.REPRESENTATIVE },
  ],

  INPUT_MASKING: {
    date: '##/##/####',
    phone: '(###) ### ####',
    zip: '####',
  },

  DATE_FORMAT: {
    dateViewFormat: 'MM/dd/yyyy',
    dateTimeViewFormat: 'Pp',
    dateInputFormat: 'MMddyyyy',
    dateSaveFormat: 'yyyy-MM-dd',
    ISO: 'ISO',
    timeFormat: 'HH:mm:ss',
  },

  NO_RETRY_API_ROUTES: [
    apiRoute.login,
    apiRoute.verifyMFACode,
    apiRoute.forgotPassword,
    apiRoute.setNewPassword,
  ],

  OTP_CODE_LENGTH: 4,
  OTP_RESEND_INTERVAL_IN_SECS: 15,
  OTP_EXPIRATION_TIME_IN_SECS: 5 * 60,

  ROLE_PERMISSION_PADDING_SPACE: 11,

  MAX_FILE_SIZE: 5000000,
};
