import { useNavigate, useSearchParams } from 'react-router-dom';
import uiRoute from 'shared/constants/uiRoute';
import * as authAPI from 'features/auth/api';
import { useCallback, useEffect, useState } from 'react';
import { formatEncodedParam } from 'shared/utils/misc';
import { LoadingIndicator } from 'shared/components/display/LoadingIndicator';
import { clearLocal, clearSession } from 'shared/utils/storage';
import { useQueryClient } from '@tanstack/react-query';
import AuthLayout from '../layouts/AuthLayout';
import { SetPasswordForm } from '../components/SetPasswordForm';
import { SetPasswordFormSchemaType } from '../schemas';
import { useLogoutMutation, useSetNewPasswordMutation } from '../mutations';

function ForgotPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = formatEncodedParam(searchParams.get('token') ?? '');
  const [isLoading, setIsLoading] = useState(true);

  const setNewPasswordMutation = useSetNewPasswordMutation();
  const { mutate: logoutMutate } = useLogoutMutation(true);
  const queryClient = useQueryClient();

  const validateToken = useCallback(async () => {
    try {
      await authAPI.validateToken(token);
    } catch (err) {
      navigate(uiRoute.auth.login);
    } finally {
      setIsLoading(false);
    }
  }, [navigate, token]);

  const onSubmitHandler = (formData: SetPasswordFormSchemaType) => {
    if (!token) return;
    const data = {
      token,
      ...formData,
    };
    setNewPasswordMutation.mutate(
      {
        data,
      },
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
    if (!token) navigate(uiRoute.auth.login);
  }, [navigate, token]);

  useEffect(() => {
    if (token) validateToken();
  }, [token, validateToken]);

  return isLoading ? (
    <LoadingIndicator containerHeight="100vh" />
  ) : (
    <AuthLayout title="Set Password">
      <SetPasswordForm
        onSubmitHandler={onSubmitHandler}
        isLoading={setNewPasswordMutation.isPending}
      />
    </AuthLayout>
  );
}

export default ForgotPassword;
