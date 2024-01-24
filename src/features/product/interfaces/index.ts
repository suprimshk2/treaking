import { IFilter, SortOrderType } from 'shared/interfaces/misc';
import { ProductSortBy } from '../enums';

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
