import {
  imageSchema,
  optionalCheckboxSchema,
  optionalStringSchema,
  requiredStringSchema,
  vendorSchema,
} from 'shared/schemas';
import { z } from 'zod';

const productSchema = z.object({
  question: requiredStringSchema,
});

export const addProductFormSchema = z
  .object({
    title: requiredStringSchema,
    description: requiredStringSchema,
    images: imageSchema,
    point: requiredStringSchema,
    price: requiredStringSchema,
    quantityInStock: requiredStringSchema.min(0),
    costPrice: requiredStringSchema,
    retailPrice: requiredStringSchema,
    vendor: vendorSchema,
    discount: requiredStringSchema.min(0),
    isAuthentic: optionalCheckboxSchema,
  })
  .superRefine(({ price, costPrice, discount }, refinementContext) => {
    if (+price < +costPrice) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Selling price must be greater than cost price',
        path: ['price'],
      });
    }
    if (+discount > +price) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Discount price must be less than selling price',
        path: ['discount'],
      });
    }
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
