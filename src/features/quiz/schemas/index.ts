import {
  nullableStringSchema,
  optionalDateSchema,
  optionalStringSchema,
  requiredDateSchema,
  requiredStringSchema,
} from 'shared/schemas';
import { z } from 'zod';

const optionSchema = z.object({
  options: requiredStringSchema,
});
const quizSchema = z.object({
  question: requiredStringSchema,
  startDate: requiredDateSchema,
  endDate: requiredDateSchema,
  logoUrl: optionalStringSchema,
  options: z.array(z.string()).nonempty('At least one option is required'),
});
const prizeSchema = z.object({
  title: nullableStringSchema,
  description: optionalStringSchema,
});

export const addQuizFormSchema = z.object({
  logoUrl: optionalStringSchema,
  titleOne: requiredStringSchema,
  titleTwo: requiredStringSchema,
  subTitle: optionalStringSchema,
  description: requiredStringSchema,
  termsAndConditions: optionalStringSchema,
  winnerDate: optionalDateSchema,
  // startDate: dobSchema,
  // endDate: dobSchema,
  campaign: requiredStringSchema,
  prize: z.array(prizeSchema),

  quizzes: z.array(quizSchema),
});

export type AddQuizFormSchemaType = z.infer<typeof addQuizFormSchema>;
export const quizAdvancedFilterFormSchema = z.object({
  titleOne: optionalStringSchema,
  titleTwo: optionalStringSchema,
});

export type QuizAdvancedFilterFormSchemaType = z.infer<
  typeof quizAdvancedFilterFormSchema
>;

export type QuizSchemaType = z.infer<typeof quizSchema>;
