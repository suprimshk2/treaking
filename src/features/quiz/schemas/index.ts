import {
  optionalCheckboxSchema,
  optionalImageSchema,
  optionalStringSchema,
  requiredDateSchema,
  requiredNumberSchema,
  requiredObjectSchema,
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
  options: z.array(z.string()).nonempty('At least two option is required'),
  correctOptionNumber: requiredNumberSchema,
});
const prizeSchema = z.object({
  title: optionalStringSchema,
  description: requiredStringSchema,
});
const winnersSchema = z.object({
  id: optionalStringSchema,
  rank: requiredNumberSchema,
  rankLabel: requiredStringSchema,
  name: requiredStringSchema,
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
  prizeImage: optionalImageSchema,
  // startDate: dobSchema,
  // endDate: dobSchema,
  campaign: requiredObjectSchema,
  // prize: z.array(prizeSchema),

  quizzes: z.array(quizSchema),
});
export const winnerPayloadSchema = z.object({
  applyToAllQuizInCampaign: optionalCheckboxSchema,
  winners: z.array(winnersSchema),
});
export const addWinnerFormSchema = winnerPayloadSchema;

export type AddQuizFormSchemaType = z.infer<typeof addQuizFormSchema>;
export type WinnerAddFormSchemaType = z.infer<typeof addWinnerFormSchema>;
export const quizAdvancedFilterFormSchema = z.object({
  titleOne: optionalStringSchema,
  titleTwo: optionalStringSchema,
});

export type QuizAdvancedFilterFormSchemaType = z.infer<
  typeof quizAdvancedFilterFormSchema
>;

export type QuizSchemaType = z.infer<typeof quizSchema>;
