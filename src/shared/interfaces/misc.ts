import { TypographyProps } from '@mui/material';
import { IconType } from 'react-icons/lib';
import { SortOrder } from 'shared/enums';

export interface IFilter {
  keyword?: string;
  limit: number;
  page?: number;
}

export interface IAddress {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string | null;
}

export interface ICreated {
  at: string;
  by: string;
  id: string;
}

export interface IUpdated {
  at: string;
  by: string;
}

export interface ITableColumn {
  id: string;
  label: string;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  paddingLeft?: number;
  align?: 'left' | 'center' | 'right';
  backgroundColor?: string;
  sortBy?: string;
  colSpan?: number;
}

export interface IListWithIconItem {
  id: number;
  icon: IconType;
  text: string | React.ReactNode;
  tooltip?: boolean;
  typographyProps?: TypographyProps;
  truncateLength?: number; // length of the string after which it should be truncated
}

export type SortOrderType = SortOrder.ASC | SortOrder.DESC;

export type ColorType =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning';
