import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
// import { useBoundStore } from 'shared/stores/useBoundStore';

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
  return useMutation(({ data }: { data: LoginSchemaType }) =>
    authAPI.loginUser(data)
  );
};

export const useActivateAccountMutation = () => {
  return useMutation(({ data }: { data: ActivateAccountSchemaType }) =>
    authAPI.activateAccount(data)
  );
};

export const useLogoutMutation = (dontShowSuccessMessage?: boolean) => {
  const { enqueueSnackbar } = useSnackbar();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return useMutation((_: string) => authAPI.logoutUser(), {
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
  return useMutation(({ data }: { data: IVerifyMFACodeSchema }) =>
    authAPI.verifyMFACode(data)
  );
};

export const useResendMFACodeMutation = () => {
  return useMutation(({ data }: { data: IResendMFACodeSchema }) =>
    authAPI.resendMFACode(data)
  );
};

export const useSendForgotPasswordLinkMutation = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(
    ({ data }: { data: ForgotPasswordFormSchemaType }) =>
      authAPI.sendForgetPasswordLink(data),
    {
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
    }
  );
};

export const useSetNewPasswordMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    ({ data }: { data: ISetNewPasswordSchema }) => authAPI.setNewPassword(data),
    {
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
    }
  );
};
