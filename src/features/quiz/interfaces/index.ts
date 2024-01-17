import { IFilter, SortOrderType } from 'shared/interfaces/misc';
import { QuizSortBy } from '../enums';

export interface IAddQuizSchema {
  titleOne: string;
  titleTwo: string;
  body: string;
  winnerDate: string;
  startDate: string;
  endDate: string;
  campaign: string;
  prize: any;
  terms: string;
}
export interface IQuizTableFilter extends IFilter {
  titleOne?: string;
  titleTwo?: string;
  body?: string;
}
export interface IQuizSort {
  sortBy: QuizSortBy | null;
  sortOrder: SortOrderType | null;
}

export interface IQuizSlice {
  quizSort: IQuizSort;
  quizTableFilters: IQuizTableFilter;
  // totalQuiz: number;
  changeQuizSortByAndOrder: (newOrder: Partial<IQuizSort>) => void;
  setQuizTableFilters: (newFilters: Partial<IQuizTableFilter>) => void;
  resetQuizTableFilters: VoidFunction;
  // setTotalQuiz: (total: number) => void;
}
