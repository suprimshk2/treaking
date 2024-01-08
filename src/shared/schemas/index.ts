import { z } from 'zod';
import { VALIDATION_MESSAGE } from 'shared/constants/message';
import { regex } from 'shared/constants/regex';
import { validateDob } from 'shared/utils/date';

const {
  INVALID_DOB,
  INVALID_EMAIL,
  INVALID_PHONE,
  INVALID_ZIP,
  REQUIRED_FIELD,
  REQUIREMENT_PASSWORD,
} = VALIDATION_MESSAGE;

const emptyStringToUndefined = z.literal('').transform(() => undefined);

export function asOptionalField<T extends z.ZodTypeAny>(schema: T) {
  return schema.optional().or(emptyStringToUndefined);
}

export const requiredStringSchema = z
  .string()
  .trim()
  .min(1, { message: REQUIRED_FIELD });

export const optionalStringSchema = z.string().trim().optional();
export const nullableStringSchema = z.string().trim().optional().nullable();

export const emailSchema = z
  .string()
  .trim()
  .min(1, { message: REQUIRED_FIELD })
  .email(INVALID_EMAIL);

export const emailSchemaOptional = asOptionalField(emailSchema);

export const phoneSchema = z
  .string()
  .trim()
  .min(1, { message: REQUIRED_FIELD })
  .refine((val) => regex.PHONE.test(val), INVALID_PHONE);

export const phoneSchemaOptional = asOptionalField(phoneSchema);

export const dobSchema = z
  .string()
  .trim()
  .min(1, { message: REQUIRED_FIELD })
  .refine((val) => {
    return validateDob(val);
  }, INVALID_DOB);

export const zipSchema = z.string().trim().min(4, { message: INVALID_ZIP });

export const zipSchemaOptional = asOptionalField(zipSchema).nullable();

export const passwordSchema = z
  .string()
  .trim()
  .min(1, { message: REQUIRED_FIELD })
  .refine((val) => regex.SPECIAL_CHARACTER.test(val), REQUIREMENT_PASSWORD);

export const arrayOfStringSchema = z
  .array(z.string())
  .min(1, { message: REQUIRED_FIELD })
  .nullable();

export const booleanSchema = z.boolean().nullable().optional();
