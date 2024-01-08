import { IResponse } from 'shared/interfaces/http';
import { baseRequest } from 'shared/utils/axios';
import apiRoute from '../constants/apiRoute';
import {
  ILoginResponse,
  ILogoutResponse,
  IRefreshTokenResponse,
  IResendMFACodeSchema,
  ISetNewPasswordSchema,
  IVerifyMFACodeSchema,
  LoginSchemaType,
  ActivateAccountSchemaType,
} from '../interfaces';
import { ForgotPasswordFormSchemaType } from '../schemas';

export const activateAccount = async (
  data: ActivateAccountSchemaType
): Promise<IResponse<any>> => {
  const { response, error } = await baseRequest({
    method: 'POST',
    url: apiRoute.activateAccount,
    data,
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};

export const loginUser = async (
  data: LoginSchemaType
): Promise<IResponse<ILoginResponse>> => {
  const { response, error } = await baseRequest({
    method: 'POST',
    url: apiRoute.login,
    data,
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};

export const logoutUser = async (): Promise<IResponse<ILogoutResponse>> => {
  const { response, error } = await baseRequest({
    method: 'GET',
    url: apiRoute.logout,
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};

export const refreshToken = async (): Promise<
  IResponse<IRefreshTokenResponse>
> => {
  const { response, error } = await baseRequest({
    method: 'GET',
    url: apiRoute.refreshToken,
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};

export const verifyMFACode = async (
  data: IVerifyMFACodeSchema
): Promise<IResponse<ILoginResponse>> => {
  const { response, error } = await baseRequest({
    method: 'POST',
    url: apiRoute.verifyMFACode,
    data,
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};

export const resendMFACode = async (
  data: IResendMFACodeSchema
): Promise<IResponse<{ otpToken: string }>> => {
  const { response, error } = await baseRequest({
    method: 'POST',
    url: apiRoute.resendMFACode,
    data,
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};

export const sendForgetPasswordLink = async (
  data: ForgotPasswordFormSchemaType
): Promise<IResponse<null>> => {
  const { response, error } = await baseRequest({
    method: 'POST',
    url: apiRoute.forgotPassword,
    data,
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};

export const setNewPassword = async (
  data: ISetNewPasswordSchema
): Promise<IResponse<null>> => {
  const { response, error } = await baseRequest({
    method: 'POST',
    url: apiRoute.setNewPassword,
    data,
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};

export const validateToken = async (
  token: string
): Promise<IResponse<null>> => {
  const { response, error } = await baseRequest({
    method: 'GET',
    url: apiRoute.validateToken,
    params: { token },
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};

export const authorizationPermissions = async (): Promise<IResponse<any>> => {
  const { response, error } = await baseRequest({
    method: 'GET',
    url: apiRoute.getAuthorizationPermissions,
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};
