import {
  imageSchema,
  optionalImageSchema,
  optionalStringSchema,
  requiredDateSchema,
  requiredNumberSchema,
  requiredStringSchema,
} from 'shared/schemas';
import { z } from 'zod';

const optionSchema = z.object({
  name: requiredStringSchema,
  order: z.number(),
});

const quizSchema = z.object({
  question: requiredStringSchema,
  startDate: requiredDateSchema,
  endDate: requiredDateSchema,
  logoUrl: optionalStringSchema,
  options: z.array(optionSchema),
  correctOptionNumber: requiredNumberSchema,
});
const prizeSchema = z.object({
  title: optionalStringSchema,
  description: requiredStringSchema,
});

export const addQuizFormSchema = z.object({
  logoUrl: optionalImageSchema,
  titleOne: requiredStringSchema,
  titleTwo: requiredStringSchema,
  subTitle: optionalStringSchema,
  description: requiredStringSchema,
  termsAndConditions: optionalStringSchema,
  winnerDate: requiredDateSchema,
  prizeDescription: requiredStringSchema,
  // startDate: dobSchema,
  // endDate: dobSchema,
  campaign: optionalStringSchema,
  // prize: z.array(prizeSchema),

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
