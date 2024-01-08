import { StateCreator } from 'zustand';
import { roleConfig } from '../constants/config';
import { IRoleSlice, IRoleTableFilter } from '../interfaces';

export const createRoleSlice: StateCreator<IRoleSlice> = (set) => ({
  roleTableFilters: roleConfig.ROLES_TABLE_DEFAULT_FILTER,
  setRoleTableFilters: (newFilters: Partial<IRoleTableFilter>) =>
    set((state) => ({
      roleTableFilters: { ...state.roleTableFilters, ...newFilters },
    })),
  resetRoleTableFilters: () =>
    set(() => ({
      roleTableFilters: { ...roleConfig.ROLES_TABLE_DEFAULT_FILTER },
    })),
  totalRoles: 0,
  setTotalRoles: (total) =>
    set(() => ({
      totalRoles: total,
    })),
  authModule: null,
  setAuthModule: (modules) => set(() => ({ authModule: modules })),
  allPermissions: [],
  setAllPermissions: (permissions) =>
    set(() => ({
      allPermissions: permissions,
    })),
});
