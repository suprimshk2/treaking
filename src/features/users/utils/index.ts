import { formatDateToSave } from 'shared/utils/date';
import { isEmpty, pickBy } from 'shared/utils/lodash';
import { mapKeys } from 'shared/utils/misc';
import { ProfileSchemaType } from 'features/profile/schemas';
import {
  IAddUserSchema,
  IEditUserSchema,
  IUserTableFilter,
} from '../interfaces';
import { UserAddEditFormSchemaType } from '../schemas';
import { userConfig } from '../constants/config';

const { USER_TABLE_FILTER_MAP } = userConfig;

export const formatPhone = (unformattedPhone: string) => {
  let phone = unformattedPhone;
  if (phone) {
    const x = phone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    if (!x) return '-';
    // eslint-disable-next-line prefer-template
    phone = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    return phone;
  }
  return 'N/A';
};

export const formatUserEditPayload = (
  data: UserAddEditFormSchemaType | ProfileSchemaType
): IEditUserSchema => {
  return {
    demographic: {
      firstName: data.firstName,
      middleName: data.middleName || '',
      lastName: data.lastName,
      email: data.email,
      gender: data.gender,
      dob: data.dob ? formatDateToSave(data.dob) : undefined,
      mobileNumber: data.mobileNumber || '',
    },
    association: {
      roles: [`${data.role}`],
    },
    security: {
      enableMFA: data?.enableMFA ?? undefined,
    },
  };
};

export const formatUserAddPayload = (
  data: UserAddEditFormSchemaType
): IAddUserSchema => {
  return formatUserEditPayload(data);
};

export const formatUserFilterParams = (filters: IUserTableFilter) => {
  const params = pickBy(filters, (value: string | number) => value !== '');
  if (isEmpty(params)) {
    return params;
  }

  // Type assertion needed to escape type for empty object (i.e. {})
  return mapKeys(params as Record<string, unknown>, USER_TABLE_FILTER_MAP);
};
