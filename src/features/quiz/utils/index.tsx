import { isEmpty, pickBy } from 'shared/utils/lodash';
import { mapKeys } from 'shared/utils/misc';
import { IListResponse } from 'shared/interfaces/http';
import { concatString, formatFullName } from 'shared/utils/common';
import { formatDateTimeToView, formatDateToView } from 'shared/utils/date';
import { InfiniteData } from '@tanstack/react-query';
import {
  IAdoptQuiz,
  IAdoptWinnerResponse,
  IFormattedQuizFormSchema,
  IQuiz,
  IQuizTableFilter,
  IWinnerAdd,
  IWinnerDefaultValue,
} from '../interfaces';
import { AddQuizFormSchemaType, WinnerAddFormSchemaType } from '../schemas';
import { quizConfig } from '../constant/config';
import { QuizStatus } from '../enums';
import { a1 } from 'vitest/dist/reporters-qc5Smpt5';

const { QUIZ_TABLE_FILTER_MAP } = quizConfig;
export const formatQuizStatus = (startDate: Date, endDate: Date) => {
  const todayDate = new Date();

  if (todayDate >= new Date(startDate) && todayDate <= new Date(endDate)) {
    return QuizStatus.RUNNING;
  }
  if (new Date(startDate) < todayDate) {
    return QuizStatus.COMPLETED;
  }
  return QuizStatus.UPCOMING;
};

export const formatQuizList = (
  res: InfiniteData<IListResponse<IQuiz>>
): InfiniteData<IListResponse<IAdoptQuiz>> | any => {
  return {
    ...res,
    pages: res?.pages?.map((group) => {
      return {
        rows: group.rows.map((item: IQuiz) => {
          return {
            ...item,
            title: concatString(item?.content.title, item?.content.subTitle),
            campaign: item?.campaign?.name || 'N/A',
            campaignCode: item?.campaign?.code || 'N/A',
            status: formatQuizStatus(item?.startDate, item?.endDate),
            startDate: formatDateTimeToView(item?.startDate?.toString()),
            endDate: formatDateTimeToView(item?.endDate?.toString()),
            updated: {
              name: item?.updated?.name,
              date: formatDateToView(item?.updated?.date),
            },
            // TODO:specify interface
            winners: item?.winners?.map((winner: any) => {
              return {
                ...winner,
                fullName:
                  formatFullName(
                    winner?.firstName || winner?.demographic?.firstName,
                    winner?.lastName || winner?.demographic?.lastName
                  ) || 'N/A',
              };
            }),
          };
        }),
      };
    }),
  };
};

export const formatQuizDetail = (res) => {
  const options = res?.data?.options;
  const correctOptionId = res?.data?.correctOptionId;

  const correctOptionIndex = res?.data?.options.indexOf(
    options.find((item) => item?.id === correctOptionId)
  );

  return {
    ...res.data,
    images: res?.data?.content?.logoUrl
      ? [{ url: res?.data?.content?.logoUrl }]
      : null,
    prizeImage: res?.data?.prize?.imageUrl
      ? [{ url: res?.data?.prize?.imageUrl }]
      : null,
    correctOptionNumber: correctOptionIndex,
    campaign: {
      ...res?.data?.campaign,
      id: res?.data?.campaign?.campaignId,
    },
  };
};

export const formatQuizAddPayloadData = (data): IFormattedQuizFormSchema => {
  return data?.quizzes?.map((item) => ({
    title: data.subTitle,
    endDate: new Date(item.endDate).toISOString(),
    imageUrl: '',
    type: 'QUIZ',
    startDate: new Date(item.startDate).toISOString(),
    prize: {
      title: data?.prizeDescription,
      description: data?.prizeDescription,
      imageUrl: data?.prizeImage?.[0]?.url || '',
    },
    campaign: {
      id: data?.campaign?.id,
      name: data?.campaign?.name,
    },
    campaignId: data?.campaign ?? '',
    description: item?.question,
    termsAndConditions: data?.termsAndConditions,
    status: 'ACTIVE',
    winnerAnnouncementDate: new Date(data?.winnerDate).toISOString(),
    options: item?.options,
    content: {
      logoUrl: data?.images?.[0]?.url || '',
      title: data?.titleOne,
      subTitle: data?.titleTwo,
      description: data?.description,
      upcomingTitle: '',
    },
    correctOptionNumber: item?.correctOptionNumber,
  }));
};

export const formatQuizEditPayloadData = (data): IFormattedQuizFormSchema => {
  return {
    title: data?.subTitle,
    endDate: new Date(data?.quizzes?.[0]?.endDate).toISOString(),
    imageUrl: '',
    type: 'QUIZ',
    startDate: new Date(data?.quizzes?.[0]?.startDate).toISOString(),
    campaignId: data?.campaign ?? '',

    prize: {
      title: '',
      description: data?.prizeDescription,
      imageUrl: data?.prizeImage?.[0]?.url || '',
    },
    description: data?.quizzes?.[0]?.question,
    termsAndConditions: data?.termsAndConditions,
    status: 'ACTIVE',
    winnerAnnouncementDate: new Date(data?.winnerDate).toISOString(),
    options: data?.quizzes?.[0]?.options,
    content: {
      logoUrl: data?.images?.[0]?.url || '',
      title: data?.titleOne,
      subTitle: data?.titleTwo,
      description: data?.description,
      upcomingTitle: '',
    },
    correctOptionNumber: data?.quizzes?.[0]?.correctOptionNumber,
  };
};
export const formatAddWinner = (
  data: IWinnerDefaultValue
): WinnerAddFormSchemaType => {
  return {
    ...data,
    winners: data?.winners?.map((item: IWinnerAdd) => {
      return { ...item, rank: +item.rank, name: item?.name ?? '' };
    }),
  };
};
export const formatWinnerData = (data): IListResponse<IAdoptWinnerResponse> => {
  return {
    ...data[0],
    rows: data?.[0]?.rows?.map((winner) => {
      return {
        ...winner,
        id: winner?.userId,
      };
    }),
  };
};

export const formatQuizAddPayload = (
  data: AddQuizFormSchemaType
): IFormattedQuizFormSchema => {
  return formatQuizAddPayloadData(data);
};

export const formatQuizEditPayload = (
  data: AddQuizFormSchemaType
): IFormattedQuizFormSchema => {
  return formatQuizEditPayloadData(data);
};

export const formatQuizFilterParams = (filters: IQuizTableFilter) => {
  const params = pickBy(filters, (value: string | number) => value !== '');
  if (isEmpty(params)) {
    return params;
  }

  // Type assertion needed to escape type for empty object (i.e. {})
  return mapKeys(params as Record<string, unknown>, QUIZ_TABLE_FILTER_MAP);
};
