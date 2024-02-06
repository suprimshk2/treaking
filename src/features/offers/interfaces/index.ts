import {
  ICreated,
  IFilter,
  IUpdated,
  IVendorSchema,
  SortOrderType,
} from 'shared/interfaces/misc';
import { OfferSortBy, OfferTemplateCode } from '../enums';

export interface IVendor {
  _id: string;
  address: string;
  website: string;
  logoUrl: string;
  description: string;
  businessName: string;
  contacts: any;
  email: string;
  phone: string;
  accountOwner: IAccountOwner;
  socialMedias: ISocialMedia[];
  enrolledDate: string;
  updated: IUpdated;
  created: ICreated;
  vendorId: string;
  name: string;
}

export interface IAccountOwner {
  id: string;
  name: string;
}

export interface ISocialMedia {
  url: string;
  provider: string;
}

export interface ITemplate {
  layout: ILayout;
  background: IBackground;
}

export interface ILayout {
  type: string;
}

export interface IBackground {
  type: OfferTemplateCode;
  imageUrl: string;
  colorCode: string;
}

export interface IEngagements {
  views: number;
  likes: number;
  clicks: number;
}

export interface IOffer {
  name: string;
  title: string;
  vendor: IVendor;
  offerId: string;
  endDate: string;
  imageUrl: string;
  subTitle: string;
  template: ITemplate;
  startDate: string;
  description: string;
  availableUntil: string;
  shortDescription: string;
  usageInstructions: string;
  termsAndConditions: string;
  price: string;
  point: string;
  type: string;
  isOrderedByUser: boolean;
  isLikedByUser: boolean;
  isClickedByUser: boolean;
  isInCollection: boolean;
  engagements: IEngagements;
  created: ICreated;
  updated: IUpdated;
}

export interface IOfferTableFilter extends IFilter {}

export interface IOfferSort {
  sortBy: OfferSortBy | null;
  sortOrder: SortOrderType | null;
}

export interface IOfferSlice {
  offerTableFilters: IOfferTableFilter;
  totalOffers: number;
  offerSort: IOfferSort;
  changeOfferSortByAndOrder: (newOrder: Partial<IOfferSort>) => void;
  setOfferTableFilters: (newFilters: Partial<IOfferTableFilter>) => void;
  resetOfferTableFilters: VoidFunction;
  resetAllOfferTableFilters: VoidFunction;
  setTotalOffers: (total: number) => void;
}

export interface IOfferForm {
  template: { layoutType?: string; backgroundType?: string };
  vendor: IVendorSchema;
  title: string;
  startDate: Date;
  endDate: Date;
  imageUrl: string;
  shortDescription: string;
  description: string;
  subTitle: string;
  body: string;
  type: string;
  accountManager: string;
  name: string;
  link: string;
  termsAndConditions: string;
  usageInstructions: string;
  availableUntil: Date;
  layoutType: string;
}

export interface IEditOfferSchema {}

export interface IAddOfferSchema {}
