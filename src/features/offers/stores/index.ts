import { StateCreator } from 'zustand';
import { offerConfig } from '../constants/config';
import { IOfferSlice, IOfferTableFilter } from '../interfaces';

export const createOfferSlice: StateCreator<IOfferSlice> = (set) => ({
  offerTableFilters: offerConfig.OFFER_TABLE_DEFAULT_FILTER,
  setOfferTableFilters: (newFilters: Partial<IOfferTableFilter>) =>
    set((state) => ({
      offerTableFilters: { ...state.offerTableFilters, ...newFilters },
    })),
  totalOffers: 0,
  setTotalOffers: (total) =>
    set(() => ({
      totalOffers: total,
    })),
  offerSort: offerConfig.OFFER_TABLE_DEFAULT_SORT,
  changeOfferSortByAndOrder: (newOrder) =>
    set((state) => ({
      offerSort: { ...state.offerSort, ...newOrder },
    })),

  resetOfferTableFilters: () =>
    set(() => ({
      offerTableFilters: { ...offerConfig.OFFER_TABLE_DEFAULT_FILTER },
    })),
  resetAllOfferTableFilters: () =>
    set(() => ({
      offerTableFilters: { ...offerConfig.OFFER_TABLE_DEFAULT_FILTER },
      offerSort: { ...offerConfig.OFFER_TABLE_DEFAULT_SORT },
    })),
});
