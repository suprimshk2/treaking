import { requiredStringSchema } from 'shared/schemas';
import { z } from 'zod';

export const RolesAddEditFormSchema = z.object({
  name: requiredStringSchema,
});

export type RolesAddEditFormSchemaType = z.infer<typeof RolesAddEditFormSchema>;
