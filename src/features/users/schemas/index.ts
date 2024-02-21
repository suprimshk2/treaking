import { z } from 'zod';
import {
  // dobSchema,
  emailSchema,
  emailSchemaOptional,
  nullableStringSchema,
  optionalStringSchema,
  // phoneSchema,
  phoneSchemaOptional,
  requiredStringSchema,
} from 'shared/schemas';

export const userAddEditFormSchema = z.object({
  firstName: requiredStringSchema,
  middleName: nullableStringSchema,
  lastName: requiredStringSchema,
  email: emailSchema,
  gender: nullableStringSchema,
  dob: nullableStringSchema,
  mobileNumber: nullableStringSchema,
  role: nullableStringSchema,
});
// TODO: Gonna be used in the future removed required validations for gender,dob and phone
// export const userEditFormSchema = z.object({
//   firstName: requiredStringSchema,
//   middleName: optionalStringSchema,
//   lastName: requiredStringSchema,
//   email: emailSchema,
//   gender: requiredStringSchema,
//   dob: dobSchema,
//   phone: phoneSchema,
//   role: requiredStringSchema,
// });

export type UserAddEditFormSchemaType = z.infer<
  typeof userAddEditFormSchema
> & { enableMFA?: boolean };

export const userAdvancedFilterFormSchema = z.object({
  firstName: optionalStringSchema,
  lastName: optionalStringSchema,
  email: emailSchemaOptional,
  mobileNumber: phoneSchemaOptional,
});

export type UserAdvancedFilterFormSchemaType = z.infer<
  typeof userAdvancedFilterFormSchema
>;
