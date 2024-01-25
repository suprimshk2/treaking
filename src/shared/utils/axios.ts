import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  Method,
} from 'axios';

import config from 'config';
import { IComposeError } from 'shared/interfaces/http';

const defaultConfig = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  baseURL: config.baseURL,
  withCredentials: true,
  //  timeout: 600000,
};

interface InterceptorHandler {
  onRequest: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
  onRequestError: (error: AxiosError) => Promise<AxiosError>;
  onResponse: (response: AxiosResponse) => AxiosResponse;
  onResponseError: (error: AxiosError) => Promise<AxiosError>;
}

interface IBaseRequest {
  method: Method;
  url: string;
  data?: unknown;
  params?: unknown;
  callback?(): void;
  headers?: any;
}

const handleError = (error: AxiosError): IComposeError => {
  const { request, response, message } = error;
  if (response) {
    const { data, status, config: AxiosConfig }: AxiosResponse = response;
    return {
      message: data?.message || message,
      status,
      config: AxiosConfig,
    };
  }
  if (request) {
    return {
      message: 'Request time out',
      status: 503,
    };
  }

  return { message: 'Opps! Something went wrong...' };
};

export class CustomAxios {
  requestInterceptor: unknown;

  responseInterceptor: unknown;

  controller: AbortController | null;

  axiosInstance: AxiosInstance;

  constructor(defaultconfig: AxiosRequestConfig) {
    this.controller = new AbortController();
    this.axiosInstance = axios.create(defaultconfig);
  }

  setupInterceptors = ({
    onRequest,
    onRequestError,
    onResponse,
    onResponseError,
  }: InterceptorHandler) => {
    this.requestInterceptor = this.axiosInstance.interceptors.request.use(
      onRequest,
      onRequestError
    );

    this.responseInterceptor = this.axiosInstance.interceptors.response.use(
      onResponse,
      onResponseError
    );
  };

  removeInterceptors = () => {
    this.axiosInstance.interceptors.request.eject(
      this.requestInterceptor as number
    );
    this.axiosInstance.interceptors.response.eject(
      this.responseInterceptor as number
    );
  };

  cancelRequest = () => {
    this.controller?.abort();
    this.controller = new AbortController();
  };

  baseRequest = async ({
    method,
    url,
    data,
    params,
    callback,
    headers,
  }: IBaseRequest) => {
    const requestConfig = {
      method,
      url,
      data,
      params,
      signal: this.controller?.signal,
      headers: headers ?? defaultConfig.headers,
    };
    try {
      const response = await this.axiosInstance(requestConfig);
      return { response };
    } catch (error: unknown) {
      return { error: handleError(error as AxiosError) };
    } finally {
      callback?.();
    }
  };
}

export const {
  axiosInstance: customAxios,
  setupInterceptors,
  removeInterceptors,
  cancelRequest,
  baseRequest,
} = new CustomAxios(defaultConfig);

export default customAxios;
