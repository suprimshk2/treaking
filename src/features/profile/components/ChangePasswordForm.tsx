import { Box } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserPasswordChangeMutation } from 'features/users/mutations';
import Alert from 'shared/theme/components/Alert';
import { IError } from 'shared/interfaces/http';
import { useState } from 'react';
import uiRoute from 'shared/constants/uiRoute';
import { logoutUser } from 'features/auth/api';
import { ChangePasswordFields } from './ChangePasswordFields';
import {
  ChangePasswordFormSchemaType,
  changePasswordFormSchema,
} from '../schemas';

const defaultValues: ChangePasswordFormSchemaType = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export function ChangePasswordForm() {
  const methods = useForm<ChangePasswordFormSchemaType>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues,
  });
  const { handleSubmit } = methods;

  const changeUserPasswordMutation = useUserPasswordChangeMutation();

  const [mutationError, setMutationError] = useState<IError | null>(null);

  const onSubmit = (data: ChangePasswordFormSchemaType) => {
    setMutationError(null);
    const { oldPassword, newPassword } = data;
    changeUserPasswordMutation.mutate(
      {
        data: {
          newPassword,
          oldPassword,
        },
      },
      {
        onSuccess: async () => {
          await logoutUser();
          window.location.replace(uiRoute.auth.login);
        },
        onError: (error: unknown) => {
          setMutationError(error as IError);
        },
      }
    );
  };
  return (
    <Box>
      {mutationError && (
        <Box mb={8}>
          <Alert
            type="error"
            title="Password Change Error"
            description={mutationError.message}
          />
        </Box>
      )}
      <FormProvider {...methods}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <ChangePasswordFields
            isLoading={changeUserPasswordMutation.isPending}
          />
        </Box>
      </FormProvider>
    </Box>
  );
}
