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
export interface IFileSchema {
  id: string;
  name: string;
  contentType: string;
  createdBy: string;
  base64: any;
  size: number;
  error?: boolean;
  file_url?: string;
  isPublic?: boolean;
}
export interface IFormattedQuizFormSchema {
  title: string;
  endDate: string;
  imageUrl: string;
  type: string;
  startDate: string;
  prize: {
    title: string;
    description: string;
  };
  description: string;
  status: string;
  winnerAnnouncementDate: string;
  options: {
    name: string;
    order: number;
  }[];

  content: {
    title: string;
    subTitle: string;
    description: string;
    upcomingTitle: string;
  };
  correctOptionNumber: number;
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
