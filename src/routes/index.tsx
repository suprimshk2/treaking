import { Route, Routes } from 'react-router-dom';
import DashboardLayout from 'shared/components/layouts/dashboard';
import { lazyImportWithRetry } from 'shared/components/LazyLoader';
import uiRoute from 'shared/constants/uiRoute';

const NoMatch = lazyImportWithRetry(
  () => import('../shared/components/NoMatch')
);

const OfferList = lazyImportWithRetry(
  () => import('../features/offers/pages/OfferList')
);

function Router() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route element={<OfferList />} path={uiRoute.index} />
      </Route>
      <Route element={<NoMatch />} path="*" />
    </Routes>
  );
}

export default Router;
