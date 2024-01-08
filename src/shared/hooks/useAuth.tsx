import { IAuth } from 'features/auth/interfaces';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { useBoundStore } from 'shared/stores/useBoundStore';

export function useInitializeStoreData() {
  const token = useBoundStore.use.accessToken();
  const authData = useBoundStore.use.authData();
  const setAuthData = useBoundStore.use.setAuthData();

  const getUserDetails = (accesstoken: string): IAuth => {
    try {
      const decodedData = jwtDecode(accesstoken);
      return decodedData as IAuth;
    } catch (e) {
      throw new Error('JWT Decode Error');
    }
  };

  useEffect(() => {
    if (!authData && token) {
      setAuthData(getUserDetails(token));
    }
  }, [authData, token, setAuthData]);

  return null;
}
