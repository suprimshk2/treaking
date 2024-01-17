import {
  dobSchema,
  optionalStringSchema,
  requiredStringSchema,
} from 'shared/schemas';
import { z } from 'zod';

const quizSchema = z.object({
  question: requiredStringSchema,
});

export const addQuizFormSchema = z.object({
  titleOne: requiredStringSchema,
  titleTwo: requiredStringSchema,
  body: requiredStringSchema,
  winnerDate: dobSchema,
  startDate: dobSchema,
  endDate: dobSchema,
  campaign: requiredStringSchema,
  prize: requiredStringSchema,
  terms: requiredStringSchema,

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
