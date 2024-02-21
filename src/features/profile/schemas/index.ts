import { VALIDATION_MESSAGE } from 'shared/constants/message';
import {
  booleanSchema,
  emailSchema,
  nullableStringSchema,
  passwordSchema,
  requiredStringSchema,
} from 'shared/schemas';
import { z } from 'zod';

const { MATCH_PASSWORD } = VALIDATION_MESSAGE;

export const changePasswordFormSchema = z
  .object({
    oldPassword: requiredStringSchema,
    newPassword: passwordSchema,
    confirmPassword: requiredStringSchema,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: MATCH_PASSWORD,
    path: ['confirmPassword'],
  });

export type ChangePasswordFormSchemaType = z.infer<
  typeof changePasswordFormSchema
>;

export const profileSchema = z.object({
  firstName: requiredStringSchema,
  middleName: nullableStringSchema,
  lastName: requiredStringSchema,
  email: emailSchema,
  mobileNumber: nullableStringSchema,
  gender: nullableStringSchema,
  dob: nullableStringSchema,
  role: requiredStringSchema,
  enableMFA: booleanSchema,
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;
