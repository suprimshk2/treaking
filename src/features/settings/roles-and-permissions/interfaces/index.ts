import { ICreated, IFilter, IUpdated } from 'shared/interfaces/misc';

export interface IRole {
  _id: string;
  updated: IUpdated;
  created: ICreated;
  name: string;
  code: string;
}

export interface IAddRoleSchema {
  name: string;
}

export type IEditRoleSchema = IAddRoleSchema;

export interface IAuthRole {
  name: string;
  code: string;
}

export interface IAuthModule {
  role: IAuthRole;
  modules?: any;
}

export interface IRoleSlice {
  roleTableFilters: IRoleTableFilter;
  totalRoles: number;
  setRoleTableFilters: (newFilters: Partial<IRoleTableFilter>) => void;
  resetRoleTableFilters: VoidFunction;
  setTotalRoles: (total: number) => void;
  authModule: IAuthModule | null;
  setAuthModule: (modules: any) => void;
  allPermissions: any;
  setAllPermissions: (roles: any) => void;
}

export type IRoleTableFilter = IFilter;

export interface IPermission {
  code: string;
  label: string;
  description?: string;
  isRequiredForAdmin?: boolean;
  // Flags used to bind UI
  isChecked?: boolean;
  isDisabledForAdminRelatedRoles?: boolean;
}
export interface IResource {
  code: string;
  name: string;
  parent?: string;
  permissions?: IPermission[];
  subModules: IResource[];
  // Flags used to bind UI
  isChecked?: boolean;
  isIndeterminate?: boolean;
  isDisabledForAdminRelatedRoles?: boolean;
}

export interface IAssignedResource {
  code: string;
  parent?: string;
  permissions?: string[];
  subModules: IAssignedResource[];
}
