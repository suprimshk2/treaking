import { useCallback, useEffect, useState } from 'react';
import { IError } from 'shared/interfaces/http';
import { Box } from '@mui/material';
import Alert from 'shared/theme/components/Alert';
import uiRoute from 'shared/constants/uiRoute';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as authAPI from 'features/auth/api';
import { formatEncodedParam } from 'shared/utils/misc';
import { clearLocal, clearSession } from 'shared/utils/storage';
import { useQueryClient } from '@tanstack/react-query';
import ActivateAccountForm from './ActivateAccountForm';
import AuthLayout from '../layouts/AuthLayout';
import { ActivateAccountFormSchemaType } from '../schemas';
import { useActivateAccountMutation, useLogoutMutation } from '../mutations';

export function ActivateAccount() {
  const activateAccountMutation = useActivateAccountMutation();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const token = formatEncodedParam(searchParams.get('token') ?? '');
  const [decodedData, setDecodedData] = useState<any>();
  const { mutate: logoutMutate } = useLogoutMutation(true);

  const [loginError, setLoginError] = useState<IError | null>(null);

  const validateToken = useCallback(async () => {
    try {
      const validateResponse = await authAPI.validateToken(token);
      setDecodedData(validateResponse);
    } catch (err) {
      navigate(uiRoute.auth.login);
    }
  }, [navigate, token]);

  const onSubmit = (data: ActivateAccountFormSchemaType) => {
    if (!token) {
      return;
    }

    const payload = { ...data, token };

    activateAccountMutation.mutate(
      { data: payload },
      {
        onSuccess: () => {
          logoutMutate('', {
            onSuccess: () => {
              queryClient.clear();
              clearLocal();
              clearSession();
              setTimeout(() => {
                window.location.replace(uiRoute.auth.login);
              }, 800);
            },
          });
        },
      }
    );
  };

  useEffect(() => {
    if (token) validateToken();
  }, [token, validateToken]);

  return (
    <AuthLayout title="Activate Account">
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
        <ActivateAccountForm
          onSubmitHandler={onSubmit}
          isLoading={activateAccountMutation.isLoading}
          email={decodedData?.data?.email}
        />
      </Box>
    </AuthLayout>
  );
}
