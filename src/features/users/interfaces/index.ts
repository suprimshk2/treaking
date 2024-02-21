import {
  IAddress,
  ICreated,
  IFilter,
  IUpdated,
  SortOrderType,
} from 'shared/interfaces/misc';
import { UserSortBy } from '../enum';

export interface IDemographic {
  firstName: string;
  middleName: string;
  lastName: string;
  fullName: string;
  gender: string;
  dob: string;
  email: string;
  mobileNumber: string;
  address?: string;
}

export interface IClient {
  code: string;
  name: string;
  applicationId: string;
  applicationName: string;
}

export interface IUser {
  _id: string;
  // userId: string;
  client?: IClient;
  demographic: IDemographic;
  security?: {
    enableMFA?: boolean;
  };
  association?: IAssociation;
  status?: string;
  created: ICreated;
  updated: IUpdated;
}
export interface IAdoptUser extends Omit<IUser, 'demographic'> {
  demographic: IAdoptDemography;
}
export interface IAdoptDemography extends IDemographic {
  fullName: string;
}
export interface IUserTableFilter extends IFilter {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface IUserSort {
  sortBy: UserSortBy | null;
  sortOrder: SortOrderType | null;
}

export interface IUserSlice {
  userTableFilters: IUserTableFilter;
  totalUsers: number;
  userSort: IUserSort;
  changeUserSortByAndOrder: (newOrder: Partial<IUserSort>) => void;
  setUserTableFilters: (newFilters: Partial<IUserTableFilter>) => void;
  resetUserTableFilters: VoidFunction;
  setTotalUsers: (total: number) => void;
}

export interface IPermissions {
  code: string;
  isDeny: boolean;
}

export interface IResource {
  resource: string;
  permissions: IPermissions[];
}

export interface IAssociation {
  roles: string[];
  resources?: IResource;
}

export interface IEditUserSchema {
  demographic: {
    firstName: string;
    middleName?: string;
    lastName: string;
    email?: string;
    gender?: string | null;
    dob?: string;
    mobileNumber?: string;
  };
  association: IAssociation;
  security?: {
    enableMFA?: boolean;
  };
}

export interface IAddUserSchema {
  demographic: {
    firstName: string;
    middleName?: string;
    lastName: string;
    email?: string;
    gender?: string | null;
    dob?: string;
    mobileNumber?: string;
  };
}

export interface IUserPasswordChangeSchema {
  oldPassword: string;
  newPassword: string;
}

export interface ISendInviteSchema {
  email: string;
}
