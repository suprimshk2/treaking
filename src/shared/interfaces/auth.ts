import { IAuth } from 'features/auth/interfaces';

export interface IAuthSlice {
  accessToken: string;
  setAccessToken: (token: string) => void;
  authData: IAuth | null;
  setAuthData: (authData: IAuth) => void;
  lookupTags: any;
  setLookupTags: (tags: any) => void;
}
