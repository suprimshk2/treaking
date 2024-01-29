import { IFilter, SortOrderType } from 'shared/interfaces/misc';
import { CreatedAt } from 'features/product/interfaces';
import { VendorSortBy } from '../enums';

export interface IVendorTableFilter extends IFilter {
  businessName?: string;
  email?: string;
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
  contacts: Contact[];
  website: string;
  phone: string[];
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
export interface Contact {
  fullName: string;
  email: string;
  phone: string;
}

export interface SocialMedia {
  url: string;
  provider: string;
}
export interface IVendor {
  _id: string;
  address: string;
  website: string;
  logoUrl: string;
  description: string;
  businessName: string;
  contacts: Contact[];
  email: string;
  phone: string;
  accountOwner: AccountOwner;
  socialMedias: SocialMedia[];
  enrolledDate: Date;
  updated: CreatedAt;
  created: CreatedAt;
  vendorId: string;
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
