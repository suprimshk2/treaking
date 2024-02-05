import { isEmpty, pickBy } from 'shared/utils/lodash';
import { mapKeys } from 'shared/utils/misc';
import { IListResponse } from 'shared/interfaces/http';
import { formatFullName } from 'shared/utils/common';
import { formatDateTimeToView } from 'shared/utils/date';
import { InfiniteData } from '@tanstack/react-query';
import {
  IAdoptQuiz,
  IFormattedQuizFormSchema,
  IQuiz,
  IQuizTableFilter,
} from '../interfaces';
import { AddQuizFormSchemaType } from '../schemas';
import { quizConfig } from '../constant/config';
import { QuizStatus } from '../enums';

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
): InfiniteData<IListResponse<IAdoptQuiz>> => {
  return {
    ...res,
    pages: res?.pages?.map((group) => {
      return {
        rows: group.rows.map((item: IQuiz) => {
          return {
            ...item,
            status: formatQuizStatus(item?.startDate, item?.endDate),
            startDate: formatDateTimeToView(item?.startDate?.toString()),
            endDate: formatDateTimeToView(item?.endDate?.toString()),
            winnerFullName:
              formatFullName(item?.winner?.firstName, item?.winner?.lastName) ||
              'N/A',
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
    options: res?.data?.options.map((option) => option.name),
    images: [{ url: res.data.content.logoUrl }],
    correctOptionNumber: correctOptionIndex + 1,
  };
};

export const formatQuizAddPayloadData = (data): IFormattedQuizFormSchema => {
  return data?.quizzes?.map((item) => ({
    title: data.subTitle,
    endDate: new Date(item.startDate),
    imageUrl: '',
    type: 'QUIZ',
    startDate: new Date(item.startDate),
    prize: {
      title: data?.prizeDescription,
      description: data?.prizeDescription,
    },
    campaign: {
      id: 'aa800201-817c-4619-8a32-f3e9a4b6a102', // TODO change this
      name: data.campaign,
    },
    description: item?.question,
    termsAndConditions: '',
    status: 'ACTIVE',
    winnerAnnouncementDate: new Date(data?.winnerDate),
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
    title: data.subTitle,
    endDate: new Date(data?.quizzes?.[0]?.endDate),
    imageUrl: '',
    type: 'QUIZ',
    startDate: new Date(data?.quizzes?.[0]?.startDate),
    campaignId: 'aa800201-817c-4619-8a32-f3e9a4b6a102',

    prize: {
      title: '',
      description: data?.prizeDescription,
    },
    description: data?.quizzes?.[0]?.question,
    termsAndConditions: '',
    status: 'ACTIVE',
    winnerAnnouncementDate: new Date(data?.winnerDate),
    options: data?.quizzes?.[0]?.options?.map((option, index) => ({
      name: option,
      order: index + 1,
    })),
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
