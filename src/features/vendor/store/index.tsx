import { StateCreator } from 'zustand';
import { IVendorSlice, IVendorTableFilter } from '../interfaces';
import { vendorConfig } from '../constant/config';

export const createVendorSlice: StateCreator<IVendorSlice> = (set) => ({
  vendorTableFilters: vendorConfig.VENDOR_TABLE_DEFAULT_FILTER,
  setVendorTableFilters: (newFilters: Partial<IVendorTableFilter>) =>
    set((state) => ({
      vendorTableFilters: { ...state.vendorTableFilters, ...newFilters },
    })),
  vendorSort: vendorConfig.VENDOR_TABLE_DEFAULT_SORT,
  changeVendorSortByAndOrder: (newOrder) =>
    set((state) => ({
      vendorSort: { ...state.vendorSort, ...newOrder },
    })),

  resetVendorTable: () =>
    set(() => ({
      vendorTableFilters: { ...vendorConfig.VENDOR_TABLE_DEFAULT_FILTER },
      vendorTableSort: { ...vendorConfig.VENDOR_TABLE_DEFAULT_SORT },
    })),
});
