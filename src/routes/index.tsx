import { ChangePasswordForm } from 'features/profile/components/ChangePasswordForm';
import UserProfileForm from 'features/profile/components/UserProfileForm';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import DashboardLayout from 'shared/components/layouts/dashboard';
import { lazyImportWithRetry } from 'shared/components/LazyLoader';
import PersistLogin from 'shared/components/PersistLogin';
import RequireAuth from 'shared/components/RequireAuth';
import uiRoute from 'shared/constants/uiRoute';
import ActivateAccount from 'features/auth/pages/ActivateAccount';
import { useCheckRoutePermission } from 'shared/hooks/permission';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { ProductList } from 'features/product/pages/ProductList';
import { QuizAddEdit } from 'features/quiz/pages/QuizAddEdit';

// Lazy load route level components (for bundle splitting)
// Maintain alphabetical order

const Dashboard = lazyImportWithRetry(
  () => import('../features/dashboard/pages/Dashboard')
);
// const QuizList = lazyImportWithRetry(
//   () => import('../features/quiz/pages/Quiz')
// );

const ForgotPassword = lazyImportWithRetry(
  () => import('../features/auth/pages/ForgotPassword')
);

const Login = lazyImportWithRetry(() => import('../features/auth/pages/Login'));

const Logout = lazyImportWithRetry(
  () => import('../features/auth/pages/Logout')
);

const ManageRolesAndPermissionLists = lazyImportWithRetry(
  () =>
    import(
      '../features/settings/roles-and-permissions/pages/ManageRolesAndPermissionLists'
    )
);

const NoMatch = lazyImportWithRetry(
  () => import('../shared/components/NoMatch')
);
const NoPermission = lazyImportWithRetry(
  () => import('../shared/components/display/NoPermission')
);
const OfferAddEdit = lazyImportWithRetry(
  () => import('../features/offers/pages/OfferAddEdit')
);
const OfferList = lazyImportWithRetry(
  () => import('../features/offers/pages/OfferList')
);
const SetPassword = lazyImportWithRetry(
  () => import('../features/auth/pages/SetPassword')
);

const UserList = lazyImportWithRetry(
  () => import('../features/users/pages/UserList')
);

const SideMenuLayout = lazyImportWithRetry(
  () => import('../shared/components/sidebar')
);

const UserProfile = lazyImportWithRetry(() =>
  import('../features/profile/pages/UserProfile').then((module) => {
    return { default: module.UserProfile };
  })
);

const RolesAndPermissionsList = lazyImportWithRetry(
  () =>
    import(
      '../features/settings/roles-and-permissions/pages/RolesAndPermissionsList'
    )
);

// function DashboardAuth() {
//   // const role = useGetRole();
//   // const dashboard = useGetDashboardObject();
//   const isAdminView = checkAuthForPermissions(
//     ModuleCodes.DASHBOARD,
//     DashboardViewCodes.ADMIN_VIEW
//   );

//   const isRepresentativeView = checkAuthForPermissions(
//     ModuleCodes.DASHBOARD,
//     DashboardViewCodes.REPRESENTATIVE_VIEW
//   );

//   if (isAdminView) return <AdminDashboard />;
//   if (isRepresentativeView) return <RepresentativeDashboard />;

//   // const isAdminRole = role === Role.ADMIN;
//   // const isRepresentativeRole = role === Role.REPRESENTATIVE;

//   // const representativeViewExists = dashboard?.permissions?.find(
//   //   (item: any) => item?.code === DashboardViewCodes.REPRESENTATIVE_VIEW
//   // );

//   // const adminViewExists = dashboard?.permissions?.find(
//   //   (item: any) => item?.code === DashboardViewCodes.ADMIN_VIEW
//   // );

//   // const doesBothViewExists = representativeViewExists && adminViewExists;

//   // if (doesBothViewExists) {
//   //   if (isAdminRole) {
//   //     return <AdminDashboard />;
//   //   }
//   // }

//   // if (doesBothViewExists) {
//   //   if (isRepresentativeRole) {
//   //     return <RepresentativeDashboard />;
//   //   }
//   // }

//   // if (adminViewExists) return <AdminDashboard />;

//   // if (representativeViewExists) {
//   //   return <RepresentativeDashboard />;
//   // }
//   return null;
// }

function RoutesAuth() {
  const { canAccess } = useCheckRoutePermission();
  const accessToken = useBoundStore.use.accessToken();
  if (canAccess === null) return null;
  if (canAccess) return <Outlet />;
  // if (!isSystemRoute) return <NoMatch />;
  // return <NoPermission />;
  if (accessToken) return <NoPermission />;
  return <Navigate to="/not-found" />;
}

function Router() {
  return (
    <Routes>
      {/* Protected Routes with Persisted Login */}
      <Route element={<PersistLogin />} path={uiRoute.index}>
        <Route element={<Login />} path={uiRoute.auth.login} />
        {/* <Route element={<RequireAuth />}> */}
        <Route element={<RoutesAuth />}>
          <Route element={<DashboardLayout />}>
            <Route element={<OfferList />} path={uiRoute.offers.index} />
            <Route element={<OfferAddEdit />} path={uiRoute.offers.offerForm} />
            {/* <Route element={<QuizList />} path={uiRoute.dashboard} /> */}
            <Route element={<QuizAddEdit />} path={uiRoute.dashboard} />
            {/* <Route element={<VendorList />} path={uiRoute.dashboard} /> */}
            {/* <Route element={<QuizAddEdit />} path={uiRoute.dashboard} /> */}
            <Route element={<ProductList />} path={uiRoute.products} />

            <Route
              element={<RolesAndPermissionsList />}
              path={uiRoute.dashboard}
            />
            <Route element={<UserList />} path={uiRoute.dashboard} />
            <Route element={<SideMenuLayout />}>
              <Route
                element={<UserList />}
                path={uiRoute.settings.userManagement}
              />
              <Route
                element={<RolesAndPermissionsList />}
                path={uiRoute.settings.rolePermissionManagement.index}
              />
              <Route
                element={<ManageRolesAndPermissionLists />}
                path={
                  uiRoute.settings.rolePermissionManagement
                    .manageRolesAndPermissions
                }
              />
            </Route>

            <Route element={<UserProfile />}>
              <Route
                element={<ChangePasswordForm />}
                path={uiRoute.profile.profileSecurity}
              />
              <Route
                element={<UserProfileForm />}
                path={uiRoute.profile.profile}
              />
            </Route>
          </Route>
        </Route>
      </Route>
      {/* </Route> */}
      {/* Protected Routes */}
      <Route element={<RequireAuth />}>
        <Route element={<Logout />} path={uiRoute.auth.logout} />
      </Route>

      {/* Public Routes */}

      <Route element={<ForgotPassword />} path={uiRoute.auth.forgotPassword} />
      <Route element={<SetPassword />} path={uiRoute.auth.resetPassword} />
      <Route
        element={<ActivateAccount />}
        path={uiRoute.auth.activateAccount}
      />
      {/* No match found should have the lowest precedence */}
      <Route element={<NoMatch />} path="*" />
    </Routes>
  );
}

export default Router;
