import { IFilter, SortOrderType } from 'shared/interfaces/misc';
import { ICreatedAt } from 'features/product/interfaces';
import { QuizSortBy } from '../enums';

export interface IAddQuizSchema {
  logoUrl: IFileSchema[];
  prizeImage: IFileSchema[];
  titleOne: string;
  titleTwo: string;
  subTitle: string;
  description: string;
  termsAndConditions: string;
  winnerDate: Date;
  // winnerStartTime: string;
  // winnerEndTime: string;
  prizeDescription: string;
  campaign: { id?: string; name?: string };
  quizzes: {
    question: string;
    startDate: Date;
    endDate: Date;
    options: IQuizOptions[];
    correctOptionNumber: number;
  }[];
}

export interface IQuizOptions {
  name: string;
  order: number;
  id?: string;
}
export interface IQuizTableFilter extends IFilter {
  titleOne?: string;
  titleTwo?: string;
  description?: string;
}
export interface IQuizSort {
  sortBy?: QuizSortBy | null;
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
    imageUrl: IFileSchema[];
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
  winners: Winner[];
  totalResponseCount: number;
  created: ICreatedAt;
  updated: ICreatedAt;
  campaign: ICampaignResponse;
}
export interface IAdoptQuiz
  extends Omit<IQuiz, 'endDate' | 'startDate' | 'campaign'> {
  endDate: string;
  startDate: string;
  winnerFullName: string;
  images: IFileSchema[];
  prizeImage: IFileSchema[];
  campaign: string;
}
export interface Content {
  logoUrl: string;
  subTitle: string;
  title: string;
  description: string;
  upcomingTitle: string;
}
export interface IGameParticipants {
  _id: string;
  userId: string;
  status: string;
  updated: Updated;
  created: Created;
  imageUrl: string;
  hasCompletedProfile: boolean;
  demographic: Demographic;
}

export interface Created {
  date: Date;
  name: string;
}

export interface Demographic {
  email: string;
  firstName: string;
  middleName: null;
  lastName: string;
  mobileNumber: string;
  address: string;
  gender: string;
  dob: Date;
}

export interface Updated {
  date: Date;
  name: string;
  id: string;
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
  imageUrl?: string;
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
  fullName: string;
}
export interface IWinnerDefaultValue {
  applyToAllQuizInCampaign: boolean;
  winners: IWinnerAdd[];
}
