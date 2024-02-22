import {
  emailSchema,
  optionalDateSchema,
  optionalImageSchema,
  optionalStringSchema,
  phoneSchema,
  phoneSchemaOptional,
  requiredStringSchema,
} from 'shared/schemas';
import { z } from 'zod';

const vendorSchema = z.object({
  question: requiredStringSchema,
});

export const addVendorFormSchema = z.object({
  images: optionalImageSchema,
  businessName: requiredStringSchema,
  contactsOne: phoneSchema,
  contactsTwo: phoneSchemaOptional,
  email: emailSchema,
  accountOwner: requiredStringSchema,
  description: requiredStringSchema,
  instagram: optionalStringSchema,
  facebook: optionalStringSchema,
  youtube: optionalStringSchema,
  website: optionalStringSchema,
  address: optionalStringSchema,
  vendorEmail: emailSchema,
  phone: phoneSchema,
  fullName: requiredStringSchema,
  enrolledDate: optionalDateSchema,
});

export type AddVendorFormSchemaType = z.infer<typeof addVendorFormSchema>;
export const vendorAdvancedFilterFormSchema = z.object({
  titleOne: optionalStringSchema,
  titleTwo: optionalStringSchema,
});

export type VendorAdvancedFilterFormSchemaType = z.infer<
  typeof vendorAdvancedFilterFormSchema
>;

export type VendorSchemaType = z.infer<typeof vendorSchema>;
