import { IFilter, SortOrderType } from 'shared/interfaces/misc';
import { ProductSortBy } from '../enums';

export interface IProductTableRow {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  vendor: Vendor;
  quantityInStock: number;
  images: IImage[];
  category: ICategory;
  updated: Ated;
  created: Ated;
  productId: string;
  price: IPrice;
  point: IPoint;
}

export interface IAdaptedProductTableRow {
  id: string;
  name: string;
  point: string;
  price: string;
  status: string;
  createdBy: string;
  isInStock: boolean;
  quantityInStock: number;
}

export interface IProductSchema {
  title: string;
  description: string;
  vendor: IVendor;
  images: IFileSchema[];
  point: string;
  price: string;
  tags: any;
  quantityInStock: string;
  costPrice: string;
  retailPrice: string;
}

export interface IAdaptedproductSchema {
  title: string;
  description: string;
  vendor: IVendor;
  images: IImage[];
  point: IPoint[];
  price: IPrice[];
  tags: any;
  quantityInStock: number;
  costPrice: number;
  retailPrice: number;
}

export interface IPrice {
  value: number;
  originalValue?: number;
  discount?: IDiscount;
  effStartDate?: string;
  effEndDate?: string;
}

export interface IVendor {
  id?: string;
  name?: string;
}

export interface Ated {
  date: Date;
  name: string;
  id: string;
}

export interface Vendor {
  _id: string;
  address: string;
  website: string;
  logoUrl: string;
  businessName: string;
  contacts: string[];
  email: string;
  phone: string;
  accountOwner: ICategory;
  socialMedias: string[];
  enrolledDate: Date;
  updated: Ated;
  created: Ated;
  vendorId: string;
}

export interface IProductTableFilter extends IFilter {
  titleOne?: string;
  titleTwo?: string;
  body?: string;
}
export interface IProductSort {
  sortBy: ProductSortBy | null;
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

export interface ICategory {
  id: string;
  name: string;
}

export interface ICreatedAt {
  date: string;
  name: string;
  id: string;
}

export interface IImage {
  url: string;
  order: number;
}

export interface IPoint {
  value: number;
  effEndDate?: string;
  effStartDate?: string;
  discount?: IDiscount;
  originalValue?: number;
}

export interface IDiscount {
  value: number;
  type: string;
}

export interface IProductSlice {
  vendorTableFilters: any;
  vendorSort: any;
  productSort: IProductSort;
  productTableFilters: IProductTableFilter;
  // totalProduct: number;
  changeProductSortByAndOrder: (newOrder: Partial<IProductSort>) => void;
  setProductTableFilters: (newFilters: Partial<IProductTableFilter>) => void;
  resetProductTableFilters: VoidFunction;
  // setTotalQuiz: (total: number) => void;
}
