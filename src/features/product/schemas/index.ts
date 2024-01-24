import {
  dobSchema,
  optionalStringSchema,
  requiredStringSchema,
} from 'shared/schemas';
import { z } from 'zod';

const productSchema = z.object({
  question: requiredStringSchema,
});

export const addProductFormSchema = z.object({
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

export type AddProductFormSchemaType = z.infer<typeof addProductFormSchema>;
export const productAdvancedFilterFormSchema = z.object({
  titleOne: optionalStringSchema,
  titleTwo: optionalStringSchema,
});

export type ProductAdvancedFilterFormSchemaType = z.infer<
  typeof productAdvancedFilterFormSchema
>;

export type ProductSchemaType = z.infer<typeof productSchema>;
