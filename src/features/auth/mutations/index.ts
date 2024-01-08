import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { IError } from 'shared/interfaces/http';
import * as authAPI from '../api';
import {
  ActivateAccountSchemaType,
  IResendMFACodeSchema,
  ISetNewPasswordSchema,
  IVerifyMFACodeSchema,
  LoginSchemaType,
} from '../interfaces';
import { ForgotPasswordFormSchemaType } from '../schemas';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: ({ data }: { data: LoginSchemaType }) =>
      authAPI.loginUser(data),
  });
};

export const useActivateAccountMutation = () => {
  return useMutation({
    mutationFn: ({ data }: { data: ActivateAccountSchemaType }) =>
      authAPI.activateAccount(data),
  });
};

export const useLogoutMutation = (dontShowSuccessMessage?: boolean) => {
  const { enqueueSnackbar } = useSnackbar();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: (_: string) => authAPI.logoutUser(),
    onSuccess: (res) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      !dontShowSuccessMessage &&
        enqueueSnackbar(res.message, {
          variant: 'success',
        });

      // Reset the store
      // useBoundStore.getState().setAccessToken('');
    },
  });
};

export const useVerifyMFACodeMutation = () => {
  return useMutation({
    mutationFn: ({ data }: { data: IVerifyMFACodeSchema }) =>
      authAPI.verifyMFACode(data),
  });
};

export const useResendMFACodeMutation = () => {
  return useMutation({
    mutationFn: ({ data }: { data: IResendMFACodeSchema }) =>
      authAPI.resendMFACode(data),
  });
};

export const useSendForgotPasswordLinkMutation = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: ({ data }: { data: ForgotPasswordFormSchemaType }) =>
      authAPI.sendForgetPasswordLink(data),
    onSuccess: (res) => {
      enqueueSnackbar(res.message, {
        variant: 'success',
      });
    },
    onError: (error: IError) => {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
    },
  });
};

export const useSetNewPasswordMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    onSuccess: (res) => {
      enqueueSnackbar(res.message, {
        variant: 'success',
      });
    },
    onError: (error: IError) => {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
    },
    mutationFn: ({ data }: { data: ISetNewPasswordSchema }) =>
      authAPI.setNewPassword(data),
  });
};
