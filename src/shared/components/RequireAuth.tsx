import { useLocation, Navigate, Outlet } from 'react-router-dom';
import uiRoute from 'shared/constants/uiRoute';
import { useBoundStore } from 'shared/stores/useBoundStore';

function RequireAuth() {
  const location = useLocation();

  // Store
  const accessToken = useBoundStore.use.accessToken();

  if (!accessToken) {
    return (
      <Navigate to={uiRoute.auth.login} state={{ from: location }} replace />
    );
  }

  if (accessToken && window.location.pathname === uiRoute.index) {
    return (
      <Navigate to={uiRoute.dashboard} state={{ from: location }} replace />
    );
  }

  return <Outlet />;
}

export default RequireAuth;
