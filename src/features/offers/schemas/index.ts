import { z } from 'zod';
import {
  optionalStringSchema,
  requiredDateSchema,
  requiredStringSchema,
  vendorSchema,
} from 'shared/schemas';

export const offerAddEditFormSchema = z.object({
  link: optionalStringSchema,
  name: optionalStringSchema,
  type: requiredStringSchema,
  title: requiredStringSchema,
  endDate: requiredDateSchema,
  imageUrl: optionalStringSchema,
  vendor: vendorSchema,
  startDate: requiredDateSchema,
  description: requiredStringSchema,
  subTitle: requiredStringSchema,
  shortDescription: requiredStringSchema,
  termsAndConditions: requiredStringSchema,
  template: z.object({
    layoutType: requiredStringSchema,
    backgroundType: requiredStringSchema,
  }),
  usageInstructions: requiredStringSchema,
  availableUntil: requiredDateSchema,
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

export type OfferAddEditFormSchemaType = z.infer<typeof offerAddEditFormSchema>;
