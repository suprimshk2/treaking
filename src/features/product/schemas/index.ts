import {
  imageSchema,
  optionalStringSchema,
  pointSchema,
  priceSchema,
  requiredNumberSchema,
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
  point: pointSchema,
  price: priceSchema,
  quantityInStock: requiredNumberSchema,
  costPrice: requiredNumberSchema,
  retailPrice: requiredNumberSchema,
  vendor: vendorSchema,
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
