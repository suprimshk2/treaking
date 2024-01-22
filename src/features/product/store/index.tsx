import { StateCreator } from 'zustand';
import { IProductSlice, IProductTableFilter } from '../interfaces';
import { productConfig } from '../constant/config';

export const createProductSlice: StateCreator<IProductSlice> = (set) => ({
  productTableFilters: productConfig.PRODUCT_TABLE_DEFAULT_FILTER,
  setProductTableFilters: (newFilters: Partial<IProductTableFilter>) =>
    set((state) => ({
      productTableFilters: { ...state.productTableFilters, ...newFilters },
    })),
  productSort: {
    sortBy: null,
    sortOrder: null,
  },
  changeProductSortByAndOrder: (newOrder) =>
    set((state) => ({
      productSort: { ...state.productSort, ...newOrder },
    })),
  resetProductTableFilters: () =>
    set(() => ({
      productTableFilters: { ...productConfig.PRODUCT_TABLE_DEFAULT_FILTER },
    })),
});
