import { Ref, useRef } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import Router from 'routes';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SnackbarProvider } from 'notistack';
import { IconButton, useTheme } from '@mui/material';
import { BsX } from 'react-icons/bs';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { envConstants } from 'shared/constants/env';
import ThemeConfig from 'shared/theme';
import GlobalStyles from 'shared/theme/GlobalStyles';
import AxiosInterceptor from 'shared/components/AxiosInterceptor';
import DetectOnlineOffline from 'shared/components/DetectOnlineOffline';
import { config } from 'shared/constants/config';
import { getRetryDelay } from 'shared/utils/misc';
import { IComposeError } from 'shared/interfaces/http';
import ConfirmationModalProvider from 'shared/stores/ConfirmationModal';
import { useInitializeStoreData } from 'shared/hooks/useAuth';
import CacheBuster from 'shared/components/CacheBuster';
import { LocalizationProvider } from '@mui/x-date-pickers';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 0,
      // staleTime: 60 * 1000, // 60 secs
      useErrorBoundary: true,
      // Will retry failed requests x times before displaying an error
      retry: (failureCount, error) => {
        const errResponse = error as IComposeError;

        // There are certain endpoints for which we don't want to retry even for 401 error (like login)
        if (
          errResponse.config?.url &&
          config.NO_RETRY_API_ROUTES.includes(errResponse.config.url)
        ) {
          return false;
        }

        return (
          errResponse.status === 401 && failureCount <= config.REQUEST_RETRY
        );
      },
      retryDelay: (attemptIndex) => getRetryDelay(attemptIndex),
    },
    mutations: {
      // Will retry failed requests x times before displaying an error
      retry: (failureCount, error) => {
        const errResponse = error as IComposeError;

        // There are certain endpoints for which we don't want to retry even for 401 error (like login)
        if (
          errResponse.config?.url &&
          config.NO_RETRY_API_ROUTES.includes(errResponse.config.url)
        ) {
          return false;
        }

        return (
          errResponse.status === 401 && failureCount <= config.REQUEST_RETRY
        );
      },
      retryDelay: (attemptIndex) => getRetryDelay(attemptIndex),
    },
  },
});

export function App() {
  return <Router />;
}

export function WrappedApp() {
  const ref: Ref<SnackbarProvider> = useRef(null);
  const theme = useTheme();
  useInitializeStoreData();

  return (
    <>
      <CacheBuster />
      <ThemeConfig>
        <SnackbarProvider
          // TODO: Remove this eslint disable rule
          // eslint-disable-next-line react/no-unstable-nested-components
          action={(snackbarId) => (
            <IconButton
              onClick={() => ref?.current?.closeSnackbar(snackbarId)}
              sx={{ color: theme.palette.common.white }}
            >
              <BsX />
            </IconButton>
          )}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          maxSnack={3}
          ref={ref}
          style={{ fontFamily: theme.typography.fontFamily }}
        >
          <GlobalStyles />
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DetectOnlineOffline />
                <ConfirmationModalProvider>
                  <AxiosInterceptor>
                    <App />
                    {envConstants.DEV_MODE && (
                      <ReactQueryDevtools initialIsOpen={false} />
                    )}
                  </AxiosInterceptor>
                </ConfirmationModalProvider>
              </LocalizationProvider>
            </BrowserRouter>
          </QueryClientProvider>
        </SnackbarProvider>
      </ThemeConfig>
    </>
  );
}

export default App;
