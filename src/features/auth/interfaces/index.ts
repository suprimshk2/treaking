import {
  LoginFormSchemaType,
  SetPasswordFormSchemaType,
  ActivateAccountFormSchemaType,
} from '../schemas';

export type LoginSchemaType = LoginFormSchemaType;

export type ActivateAccountSchemaType = ActivateAccountFormSchemaType;

export interface ILoginResponse {
  user?: {
    _id: string;
    userId: string;
  };
  accessToken?: string;
  otpToken?:
    | string
    | {
        opt: string;
        otpToken: string;
      };
}

export type ILogoutResponse = ILoginResponse;

export interface IRefreshTokenResponse {
  accessToken: string;
}

export interface IVerifyMFACodeSchema {
  code: string;
  otpToken: string;
}

export interface IResendMFACodeSchema {
  otpToken: string;
}

export interface ILoginData {
  otpToken: string;
  username: string;
  password: string;
}

export interface ISetNewPasswordSchema extends SetPasswordFormSchemaType {
  token: string;
}

export interface IAuth {
  email: string;
  username: string;
  fullName: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  userId: string;
}
