import { InternalAxiosRequestConfig } from 'axios';

export interface IResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface IListMetaInfo {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPage: number;
}
export interface IListResponse<T> {
  metaInfo: IListMetaInfo;
  total: number;
  count?: number;
  rows: T[];
}

export interface IErrorResponse {
  response: {
    status: number;
    statusText: string;
    data: {
      message: string;
      statusCode: number;
      name: string;
    };
  };
}

export interface IError {
  message: string;
  statusCode: number;
  name: string;
}

export interface IComposeError {
  message: string;
  status?: number;
  config?: InternalAxiosRequestConfig<unknown>;
}
