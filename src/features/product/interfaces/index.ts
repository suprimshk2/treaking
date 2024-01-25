import { IFilter, SortOrderType } from 'shared/interfaces/misc';
import { ProductSortBy } from '../enums';

export interface IProductTableRow {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  vendor: Vendor;
  quantityInStock: number;
  images: Image[];
  category: Category;
  updated: Ated;
  created: Ated;
  productId: string;
  price: Point;
  point: Point;
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
  accountOwner: Category;
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
export interface IFormattedProductFormSchema {
  title: string;
  description: string;
  tags: any[];
  vendor: Category;
  point: Point[];
  price: Point[];
  quantityInStock: number;
  images: Image[];
  category: Category;
  updated: CreatedAt;
  created: Ated;
  productId: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface CreatedAt {
  date: string;
  name: string;
  id: string;
}

export interface Image {
  url: string;
  order: number;
}

export interface Point {
  value: number;
  effEndDate: string;
  effStartDate: string;
  discount?: Discount;
  originalValue?: number;
}

export interface Discount {
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
