import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import uiRoute from 'shared/constants/uiRoute';
// import uiRoute from 'shared/constants/uiRoute';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { getRoutesFromPermissionResource } from 'shared/utils/permission';

const WHITE_LIST_ROUTES = [
  uiRoute.profile.profile,
  uiRoute.profile.profileSecurity,
  uiRoute.settings.rolePermissionManagement.manageRolesAndPermissions,
  uiRoute.auth.login,
  uiRoute.auth.activateAccount,
  uiRoute.auth.forgotPassword,
  uiRoute.auth.logout,
  uiRoute.auth.resetPassword,
  uiRoute.offers.index,
  uiRoute.offers.offerForm,
];

export function useCheckRoutePermission() {
  const { pathname } = useLocation();

  const [canAccess, setCanAccess] = useState<boolean | null>(null);
  // const [isSystemRoute, setIsSystemRoute] = useState<boolean | null>(null);
  // const allResources = useBoundStore.use.allPermissions() || null;
  const allowedResources = useBoundStore.use.authModule()?.modules || null;

  // const allRoutes: string[] = useMemo(() => {
  //   if (!allResources?.rows) return [];
  //   return getRoutesFromPermissionResource(allResources.rows);
  // }, [allResources]);

  const allowedRoutes: string[] | null = useMemo(() => {
    if (!allowedResources) return null;
    return getRoutesFromPermissionResource(allowedResources);
  }, [allowedResources]);

  useEffect(() => {
    if (allowedRoutes) {
      setCanAccess(
        allowedRoutes.includes(pathname) || WHITE_LIST_ROUTES.includes(pathname)
      );
      // setIsSystemRoute(allRoutes.includes(pathname));
      //   setCanAccess(compareArraysIntersectionExits(allRoutes, allowedRoutes));
    }
  }, [allowedResources, allowedRoutes, pathname]);

  return { canAccess };
}
