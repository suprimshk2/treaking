import { config } from 'shared/constants/config';
import { QuizAdvancedFilterFormSchemaType } from '../schemas';

export const QUIZ_ADVANCED_FILTER_DEFAULT_VALUES: QuizAdvancedFilterFormSchemaType =
  {
    titleOne: '',
    titleTwo: '',
  };

export const quizConfig = {
  QUIZ_TABLE_DEFAULT_FILTER: {
    ...config.TABLE_DEFAULT_FILTER,
    ...QUIZ_ADVANCED_FILTER_DEFAULT_VALUES,
  },
  QUIZ_TABLE_FILTER_MAP: {
    description: 'description',
  },
};
