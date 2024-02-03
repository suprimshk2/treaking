import { IFilter, SortOrderType } from 'shared/interfaces/misc';
import { ICreatedAt } from 'features/product/interfaces';
import { QuizSortBy } from '../enums';

export interface IAddQuizSchema {
  imageUrl: string;
  titleOne: string;
  titleTwo: string;
  subTitle: string;
  description: string;
  termsAndConditions: string;
  winnerDate: string;
  winnerStartTime: string;
  winnerEndTime: string;
  prizeDescription: '';
  campaign: string;

  quizzes: {
    question: string;
    startDate: string;
    endDate: string;
    options: Option[];
  }[];
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
  isLoading?: boolean;
}
export interface IFormattedQuizFormSchema {
  title: string;
  endDate: Date;
  imageUrl: string;
  type: string;
  startDate: Date;
  prize: {
    title: string;
    description: string;
  };
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
}
export interface Content {
  logoUrl: string;
  subTitle: string;
  title: string;
  description: string;
  upcomingTitle: string;
}
export interface ICampaignResponse {
  _id: string;
  name: string;
  code: string;
  updated: ICreatedAt;
  created: ICreatedAt;
  campaignId: string;
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
export interface IWinnerAdd {
  id: string;
  name: string;
  rank: number;
  rankLabel: string;
}
export interface Winner {
  email: string;
  lastName: string;
  firstName: string;
  middleName: string;
}
export interface IWinnerDefaultValue {
  winners: IWinnerAdd[];
}
