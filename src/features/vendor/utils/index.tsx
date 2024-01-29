import { isEmpty, pickBy } from 'shared/utils/lodash';
import { mapKeys } from 'shared/utils/misc';
import { IFormattedVendorFormSchema, IVendorTableFilter } from '../interfaces';
import { vendorConfig } from '../constant/config';

const { VENDOR_TABLE_FILTER_MAP } = vendorConfig;
const formatVendorAddEditPayload = (data: any): IFormattedVendorFormSchema => {
  return {
    logoUrl: data.logoUrl,
    businessName: data.businessName,
    contacts: [
      {
        firstName: data.fullName,
        lastName: data.fullName,
        email: data.vendorEmail,
        phone: data.phone,
      },
    ],
    website: '',
    phone: [data.contactsOne, data.contactsTwo],
    email: data.email,
    accountOwner: {
      name: data.accountOwner,
      id: '',
    },
    address: data.address,
    socialMedias: [
      {
        url: data.facebook,
        provider: 'FACEBOOK',
      },
      {
        url: data.instagram,
        provider: 'INSTAGRAM',
      },
      { url: data.website, provider: 'WEBSITE' },
      { url: data.youtube, provider: 'YOUTUBE' },
    ],
    description: data.description,
  };
};
export const formatVendorAddPayload = (data): IFormattedVendorFormSchema => {
  return formatVendorAddEditPayload(data);
};
export const formatVendorFilterParams = (filters: IVendorTableFilter) => {
  const params = pickBy(filters, (value: string | number) => value !== '');
  if (isEmpty(params)) {
    return params;
  }

  // Type assertion needed to escape type for empty object (i.e. {})
  return mapKeys(params as Record<string, unknown>, VENDOR_TABLE_FILTER_MAP);
};
