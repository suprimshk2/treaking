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

export const offerAddEditFormSchema = z.object({
  firstName: requiredStringSchema,
  middleName: nullableStringSchema,
  lastName: requiredStringSchema,
  email: emailSchema,
  gender: nullableStringSchema,
  dob: nullableStringSchema,
  phone: nullableStringSchema,
  role: nullableStringSchema,
});
// TODO: Gonna be used in the future removed required validations for gender,dob and phone
// export const offerEditFormSchema = z.object({
//   firstName: requiredStringSchema,
//   middleName: optionalStringSchema,
//   lastName: requiredStringSchema,
//   email: emailSchema,
//   gender: requiredStringSchema,
//   dob: dobSchema,
//   phone: phoneSchema,
//   role: requiredStringSchema,
// });

export type OfferAddEditFormSchemaType = z.infer<
  typeof offerAddEditFormSchema
> & { enableMFA?: boolean };

export const offerAdvancedFilterFormSchema = z.object({
  firstName: optionalStringSchema,
  lastName: optionalStringSchema,
  email: emailSchemaOptional,
  phone: phoneSchemaOptional,
});

export type OfferAdvancedFilterFormSchemaType = z.infer<
  typeof offerAdvancedFilterFormSchema
>;
