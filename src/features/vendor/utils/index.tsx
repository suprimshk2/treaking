import { IFormattedVendorFormSchema } from '../interfaces';

const formatVendorAddEditPayload = (data: any): IFormattedVendorFormSchema => {
  console.log('nonformat data==>', data);

  return {
    logoUrl: 'string',
    businessName: data.name,
    contacts: [],
    website: 'string',
    phone: 'string',
    email: data.email,
    accountOwner: { id: '', name: data.accountOwner },
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
