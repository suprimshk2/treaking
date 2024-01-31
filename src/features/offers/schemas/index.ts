import { z } from 'zod';
import {
  optionalStringSchema,
  requiredDateSchema,
  requiredStringSchema,
  vendorSchema,
} from 'shared/schemas';

export const offerAddEditFormSchema = z.object({
  template: z.object({
    id: requiredStringSchema,
    img: requiredStringSchema,
    code: requiredStringSchema,
    label: requiredStringSchema,
  }),
  vendor: vendorSchema,
  title: requiredStringSchema,
  shortDescription: requiredStringSchema,
  description: requiredStringSchema,
  startDate: requiredDateSchema,
  endDate: requiredDateSchema,
  body: optionalStringSchema,
  bodyType: requiredStringSchema,
  // startTime: requiredDateSchema,
  // endTime: requiredDateSchema,
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
