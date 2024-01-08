import { StateCreator } from 'zustand';
import { userConfig } from '../constants/config';
import { IUserSlice, IUserTableFilter } from '../interfaces';

export const createUserSlice: StateCreator<IUserSlice> = (set) => ({
  userTableFilters: userConfig.USER_TABLE_DEFAULT_FILTER,
  setUserTableFilters: (newFilters: Partial<IUserTableFilter>) =>
    set((state) => ({
      userTableFilters: { ...state.userTableFilters, ...newFilters },
    })),
  resetUserTableFilters: () =>
    set(() => ({
      userTableFilters: { ...userConfig.USER_TABLE_DEFAULT_FILTER },
    })),

  totalUsers: 0,
  setTotalUsers: (total) =>
    set(() => ({
      totalUsers: total,
    })),
  userSort: {
    sortBy: null,
    sortOrder: null,
  },
  changeUserSortByAndOrder: (newOrder) =>
    set((state) => ({
      userSort: { ...state.userSort, ...newOrder },
    })),
});
