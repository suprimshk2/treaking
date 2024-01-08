import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { config } from 'shared/constants/config';
import { Box, CircularProgress } from '@mui/material';
import * as authAPI from 'features/auth/api';

import { useAuthorizationQuery } from 'features/auth/queries';
import { usePermissionsQuery } from 'features/settings/roles-and-permissions/queries';
import uiRoute from 'shared/constants/uiRoute';
import { getFirstRouteFromPermission } from 'shared/utils/permission';

const { PERSIST_LOGIN } = config;

function PersistLogin() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const filters = useBoundStore.use.roleTableFilters();

  // Store
  const accessToken = useBoundStore.use.accessToken();
  const setAccessToken = useBoundStore.use.setAccessToken();
  const authorizationQuery = useAuthorizationQuery({ enabled: !!accessToken });
  const gettingAllRoles = usePermissionsQuery(filters, {
    enabled: !!accessToken,
  });
  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        const response = await authAPI.refreshToken();
        setAccessToken(response.data.accessToken);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // Avoids unwanted call to verifyRefreshToken
    if (!accessToken && PERSIST_LOGIN) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [accessToken, setAccessToken]);

  useEffect(() => {
    if (
      authorizationQuery?.data?.data &&
      accessToken &&
      [uiRoute.index, uiRoute.auth.login].includes(location.pathname)
    ) {
      const routeToNavigate = getFirstRouteFromPermission(
        authorizationQuery.data.data?.modules
      );

      navigate(routeToNavigate || uiRoute.profile.profile);
    }
  }, [authorizationQuery.data?.data, accessToken, location.pathname, navigate]);

  if (!PERSIST_LOGIN) {
    return <Outlet />;
  }

  if (
    isLoading ||
    authorizationQuery?.isInitialLoading ||
    gettingAllRoles?.isInitialLoading
  ) {
    return (
      <Box
        width="100%"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  // if (!accessToken)
  //   return (
  //     <Navigate to={uiRoute.auth.login} state={{ from: location }} replace />
  //   );
  // if (
  //   accessToken &&
  //   [uiRoute.index, uiRoute.auth.login].includes(location.pathname)
  // ) {
  //   return (
  //     <NoPermission />
  //     // <Navigate to={uiRoute.dashboard} state={{ from: location }} replace />
  //   );
  // }
  return <Outlet />;
}

export default PersistLogin;
