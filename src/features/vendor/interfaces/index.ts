import { IFilter, SortOrderType } from 'shared/interfaces/misc';
import { VendorSortBy } from '../enums';

export interface IVendorTableFilter extends IFilter {
  titleOne?: string;
  titleTwo?: string;
  body?: string;
}
export interface IVendorSort {
  sortBy: VendorSortBy | null;
  sortOrder: SortOrderType | null;
}
export interface IFileSchema {
  id: string;
  name: string;
  contentType: string;
  createdBy: string;
  base64: any;
  size: number;
  error?: boolean;
  file_url?: string;
  isPublic?: boolean;
}
export interface IFormattedVendorFormSchema {
  logoUrl: string;
  businessName: string;
  contacts: any[];
  website: string;
  phone: string;
  email: string;
  accountOwner: AccountOwner;
  address: string;
  socialMedias: SocialMedia[];
  description: string;
}

export interface AccountOwner {
  id: string;
  name: string;
}

export interface SocialMedia {
  url: string;
  provider: string;
}

export interface IVendorSlice {
  vendorSort: IVendorSort;
  vendorTableFilters: IVendorTableFilter;
  // totalVendor: number;
  changeVendorSortByAndOrder: (newOrder: Partial<IVendorSort>) => void;
  setVendorTableFilters: (newFilters: Partial<IVendorTableFilter>) => void;
  resetVendorTable: VoidFunction;
  resetVendorTableFilters: VoidFunction;
  // setTotalQuiz: (total: number) => void;
}
