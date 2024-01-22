import { Box } from '@mui/material';
import { IError } from 'shared/interfaces/http';
import { useEffect, useState } from 'react';
import Alert from 'shared/theme/components/Alert';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { setAuth } from 'shared/utils/store';

import uiRoute from 'shared/constants/uiRoute';
import { useNavigate } from 'react-router-dom';
import { usePermissionsQuery } from 'features/settings/roles-and-permissions/queries';
import { getFirstRouteFromPermission } from 'shared/utils/permission';
import AuthLayout from '../layouts/AuthLayout';
import { LoginFormSchemaType } from '../schemas';
import { useLoginMutation } from '../mutations';
import LoginForm from './LoginForm';
import { ILoginData } from '../interfaces';
import { useAuthorizationQuery } from '../queries';

interface ILoginProps {
  loginData: ILoginData;
  setLoginData: React.Dispatch<React.SetStateAction<ILoginData>>;
}

export function Login({ loginData, setLoginData }: ILoginProps) {
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();
  const filters = useBoundStore.use.roleTableFilters();

  const setAccessToken = useBoundStore.use.setAccessToken();
  const accessToken = useBoundStore.use.accessToken();
  const [loginError, setLoginError] = useState<IError | null>(null);
  const authorizationQuery = useAuthorizationQuery({ enabled: !!accessToken });
  const gettingAllRoles = usePermissionsQuery(filters, {
    enabled: !!accessToken,
  });

  // useEffect(() => {
  //   if (authorizationQuery?.data?.data && accessToken) {
  //     const routeToNavigate = getFirstRouteFromPermission(
  //       authorizationQuery.data.data?.modules
  //     );
  //     navigate(routeToNavigate || uiRoute.profile.profile);
  //   }
  // }, [authorizationQuery?.data?.data, accessToken, navigate]);

  // Store
  const onSubmit = (data: LoginFormSchemaType) => {
    setLoginError(null);
    loginMutation.mutate(
      { data },
      {
        onSuccess: (response) => {
          if (response.data?.accessToken && response.data?.user) {
            // Login without MFA
            setAccessToken(response.data.accessToken);
            setAuth(response.data.user);
            // navigate(uiRoute.index, {
            //   state: {
            //     from: uiRoute.auth.login,
            //   },
            // });
          } else if (response.data?.otpToken) {
            // Login with MFA -> Allow user to enter OTP code
            setLoginData({
              otpToken:
                typeof response.data.otpToken === 'object'
                  ? response.data.otpToken.otpToken
                  : response.data.otpToken,
              username: data.identifier,
              password: data.password,
            });
          } else {
            throw new Error('Invalid response from login');
          }
        },
        onError: (error: unknown) => {
          setLoginError(error as IError);
        },
      }
    );
  };

  return !accessToken ? (
    <AuthLayout title="Member Login">
      <Box mt={8}>
        {loginError && (
          <Box mb={8}>
            <Alert
              type="error"
              title="Login Error"
              description={loginError.message}
            />
          </Box>
        )}

        <LoginForm
          initialValues={loginData}
          onSubmitHandler={onSubmit}
          isLoading={
            loginMutation.isPending ||
            authorizationQuery?.isInitialLoading ||
            gettingAllRoles?.isInitialLoading
          }
        />
      </Box>
    </AuthLayout>
  ) : null;
}
