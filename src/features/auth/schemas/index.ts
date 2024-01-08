import { z } from 'zod';
import {
  emailSchema,
  passwordSchema,
  requiredStringSchema,
} from 'shared/schemas';
import { VALIDATION_MESSAGE } from 'shared/constants/message';

const { MATCH_PASSWORD } = VALIDATION_MESSAGE;

export const loginFormSchema = z.object({
  identifier: requiredStringSchema,
  password: requiredStringSchema,
});

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;

export const forgotPasswordFormSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordFormSchemaType = z.infer<
  typeof forgotPasswordFormSchema
>;

export const setPasswordFormSchema = z
  .object({
    newPassword: passwordSchema,
    confirmNewPassword: requiredStringSchema,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: MATCH_PASSWORD,
    path: ['confirmNewPassword'],
  });

export type SetPasswordFormSchemaType = z.infer<typeof setPasswordFormSchema>;

export const activeAccountFormSchema = z
  .object({
    email: emailSchema,
    newPassword: passwordSchema,
    confirmNewPassword: requiredStringSchema,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: MATCH_PASSWORD,
    path: ['confirmNewPassword'],
  });

export type ActivateAccountFormSchemaType = z.infer<
  typeof activeAccountFormSchema
>;
