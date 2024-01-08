import { IAuth } from 'features/auth/interfaces';

import { isEmpty } from 'lodash';
import { ModuleCodes } from 'shared/enums';
import { useBoundStore } from 'shared/stores/useBoundStore';

export const setAuth = (data: Partial<IAuth>) => {
  const { authData, setAuthData } = useBoundStore.getState();

  if (!authData && isEmpty(authData) && isEmpty(data)) return;

  const newAuthData = {
    ...authData,
    ...data,
  } as IAuth;

  setAuthData(newAuthData);
};

export const useGetRole = () => useBoundStore.use.authModule()?.role;

export const useGetDashboardObject = () =>
  useBoundStore.use
    .authModule()
    ?.modules?.find((item: any) => item.code === ModuleCodes.DASHBOARD) || '';
