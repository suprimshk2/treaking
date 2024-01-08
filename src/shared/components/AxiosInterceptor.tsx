import { ReactElement, ReactNode, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useQueryClient } from '@tanstack/react-query';

import { removeInterceptors, setupInterceptors } from 'shared/utils/axios';

import * as authAPI from 'features/auth/api';
import uiRoute from 'shared/constants/uiRoute';
import authApiRoute from 'features/auth/constants/apiRoute';
import { useSnackbar } from 'notistack';
import { MESSAGE } from 'shared/constants/message';
import { clearLocal, clearSession } from 'shared/utils/storage';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { config as configConstant } from 'shared/constants/config';

const { NO_RETRY_API_ROUTES } = configConstant;

function AxiosInterceptor({ children }: { children: ReactNode }): JSX.Element {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  useLayoutEffect(() => {
    const onRequest = (
      config: InternalAxiosRequestConfig
    ): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
      return config;
    };
    const onRequestError = (error: AxiosError): Promise<AxiosError> =>
      Promise.reject(error);

    const onResponse = (response: AxiosResponse): AxiosResponse => response;

    const onResponseError = (error: AxiosError): Promise<AxiosError> => {
      const { response, config } = error;

      /**
       * Handle unauthorized response
       *
       * Since, refresh token is in use, API to refresh token is called for 401 unauthorized request.
       * The user is taken to login page (redirected from logout) only if the refresh token itself has expired
       *
       */
      if (
        response?.status === 401 &&
        config?.url &&
        !NO_RETRY_API_ROUTES.includes(config.url)
      ) {
        if (config.url !== authApiRoute.refreshToken) {
          authAPI.refreshToken();
        } else {
          queryClient.clear();
          clearLocal();
          clearSession();

          // Reset the store
          useBoundStore.getState().setAccessToken('');
          if (
            ![uiRoute.auth.login, uiRoute.index].includes(
              window.location.pathname
            )
          ) {
            enqueueSnackbar(MESSAGE.SESSION_EXPIRED, {
              variant: 'warning',
              persist: false,
            });
          }
          navigate(uiRoute.auth.login);
        }
      }

      return Promise.reject(error);
    };
    setupInterceptors({
      onRequest,
      onRequestError,
      onResponse,
      onResponseError,
    });
    return () => removeInterceptors();
  }, [enqueueSnackbar, navigate, queryClient]);

  return children as ReactElement;
}

export default AxiosInterceptor;
