import {
  imageSchema,
  optionalStringSchema,
  requiredStringSchema,
  vendorSchema,
} from 'shared/schemas';
import { z } from 'zod';

const productSchema = z.object({
  question: requiredStringSchema,
});

export const addProductFormSchema = z.object({
  title: requiredStringSchema,
  description: requiredStringSchema,
  images: imageSchema,
  point: requiredStringSchema,
  price: requiredStringSchema,
  quantityInStock: requiredStringSchema,
  costPrice: requiredStringSchema,
  retailPrice: requiredStringSchema,
  vendor: vendorSchema,
  discount: z.string().optional(),
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
