import { IFilter, SortOrderType } from 'shared/interfaces/misc';
import { ICreatedAt } from 'features/product/interfaces';
import { QuizSortBy } from '../enums';

export interface IAddQuizSchema {
  logoUrl: IFileSchema[];
  titleOne: string;
  titleTwo: string;
  subTitle: string;
  description: string;
  termsAndConditions: string;
  winnerDate: string | Date;
  // winnerStartTime: string;
  // winnerEndTime: string;
  prizeDescription: string;
  campaign: string;

  quizzes: {
    question: string;
    startDate: string | Date;
    endDate: string | Date;
    options: Option[];
    correctOptionNumber: number;
  }[];
}
export interface IQuizTableFilter extends IFilter {
  titleOne?: string;
  titleTwo?: string;
  description?: string;
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
  url?: string;
  order?: number;
  isLoading?: boolean;
}
export interface IFormattedQuizFormSchema {
  images?: IFileSchema[];
  title: string;
  endDate: Date;
  imageUrl: string;
  type: string;
  startDate: Date;
  prize: {
    title: string;
    description: string;
  };
  campaignId: string;
  description: string;
  termsAndConditions: string;
  status: string;
  winnerAnnouncementDate: Date;
  options: {
    name: string;
    order: number;
  }[];

  content: {
    logoUrl: string;
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
export interface IQuiz {
  _id: string;
  title: string;
  endDate: Date;
  imageUrl: string;
  type: string;
  startDate: Date;
  prize: Prize;
  description: string;
  status: string;
  winnerAnnouncementDate: Date;
  gameId: string;
  options: Option[];
  correctOptionId: string;
  content: Content;
  winner: Winner;
  totalResponseCount: number;
  created: ICreatedAt;
  updated: ICreatedAt;
}
export interface IAdoptQuiz extends Omit<IQuiz, 'endDate' | 'startDate'> {
  endDate: string;
  startDate: string;
  winnerFullName: string;
  images: IFileSchema[];
}
export interface Content {
  logoUrl: string;
  subTitle: string;
  title: string;
  description: string;
  upcomingTitle: string;
}

export interface Option {
  name: string;
  order: number;
  id: string;
}

export interface Prize {
  title?: string | undefined;
  description?: string;
}

export interface Winner {
  email: string;
  lastName: string;
  firstName: string;
  middleName: string;
}
