import {
  dobSchema,
  optionalStringSchema,
  requiredStringSchema,
} from 'shared/schemas';
import { z } from 'zod';

const vendorSchema = z.object({
  question: requiredStringSchema,
});

export const addVendorFormSchema = z.object({
  titleOne: requiredStringSchema,
  titleTwo: requiredStringSchema,
  body: requiredStringSchema,
  winnerDate: dobSchema,
  startDate: dobSchema,
  endDate: dobSchema,
  campaign: requiredStringSchema,
  prize: requiredStringSchema,
  terms: requiredStringSchema,

  // quizzes: z.array(quizSchema),
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
