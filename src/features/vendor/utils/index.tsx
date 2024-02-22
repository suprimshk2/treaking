import { isEmpty, pickBy } from 'shared/utils/lodash';
import { mapKeys } from 'shared/utils/misc';
import { IFormattedVendorFormSchema, IVendorTableFilter } from '../interfaces';
import { vendorConfig } from '../constant/config';
import { textEditorHandler } from 'shared/utils/common';

const { VENDOR_TABLE_FILTER_MAP } = vendorConfig;
export const formatVendorDetail = (res) => {
  return {
    ...res?.data,
    contactsOne: res?.data?.phone?.[0],
    contactsTwo: res?.data?.phone?.[1] === null ? '' : res?.data?.phone?.[1],
    images: res?.data?.logoUrl ? [{ url: res?.data?.logoUrl }] : null,
  };
};
const formatVendorAddEditPayload = (data: any): IFormattedVendorFormSchema => {
  return {
    logoUrl: data?.images?.[0]?.url || '',
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
    phone: [data.contactsOne || '', data?.contactsTwo || ''],
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
    description: textEditorHandler(data?.description),
    enrolledDate: new Date(data.enrolledDate).toISOString(),
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
