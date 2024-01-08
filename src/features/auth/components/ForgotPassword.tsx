import { Box, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import uiRoute from 'shared/constants/uiRoute';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import AuthLayout from '../layouts/AuthLayout';

import ForgotPasswordForm from './ForgotPasswordForm';
import {
  ForgotPasswordFormSchemaType,
  forgotPasswordFormSchema,
} from '../schemas';
import { useSendForgotPasswordLinkMutation } from '../mutations';
import { EmailSent } from './EmailSent';

const defaultValues = {
  email: '',
};

export function ForgotPassword() {
  const navigate = useNavigate();
  const methods = useForm<ForgotPasswordFormSchemaType>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues,
  });
  const { handleSubmit } = methods;
  const sendPasswordResetLinkMutation = useSendForgotPasswordLinkMutation();
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  const onBackClick = () => {
    navigate(uiRoute.auth.login);
  };
  const onSubmit = (data: ForgotPasswordFormSchemaType) => {
    sendPasswordResetLinkMutation.mutate(
      { data },
      {
        onSuccess: () => {
          setIsEmailSent(true);
        },
      }
    );
  };
  return (
    <AuthLayout title={isEmailSent ? '' : 'Forgot Password'}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {isEmailSent ? (
            <EmailSent />
          ) : (
            <Box mt={4}>
              <Typography
                component="h4"
                variant="bodyTextMedium"
                color="gray.dark"
                mt={2}
              >
                Enter the email address you used when you joined and we&apos;ll
                send you instructions to reset your password.
              </Typography>
              <ForgotPasswordForm
                onBackClick={onBackClick}
                isLoading={sendPasswordResetLinkMutation.isPending}
              />
            </Box>
          )}
        </form>
      </FormProvider>
    </AuthLayout>
  );
}
