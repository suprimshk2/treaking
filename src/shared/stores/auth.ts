import { IAuth } from 'features/auth/interfaces';
import { IAuthSlice } from 'shared/interfaces/auth';
import { StateCreator } from 'zustand';

export const createAuthSlice: StateCreator<IAuthSlice> = (set) => ({
  accessToken: '',
  setAccessToken: (token) => set(() => ({ accessToken: token })),
  authData: null,
  setAuthData: (authData: IAuth) => set(() => ({ authData })),
  lookupTags: [],
  setLookupTags: (tags: any) => set(() => ({ lookupTags: tags })),
});
