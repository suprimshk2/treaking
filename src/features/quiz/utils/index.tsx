import { isEmpty, pickBy } from 'shared/utils/lodash';
import { mapKeys } from 'shared/utils/misc';
import { IFormattedQuizFormSchema, IQuizTableFilter } from '../interfaces';
import { AddQuizFormSchemaType } from '../schemas';
import { quizConfig } from '../constant/config';

const { QUIZ_TABLE_FILTER_MAP } = quizConfig;

export const formatQuizAddPayloadData = (data): IFormattedQuizFormSchema => {
  return data?.quizzes?.map((item) => ({
    title: data.subTitle,
    endDate: '2024-01-15T18:14:00.000',

    // endDate: unformatDate(item.endDate.toString()),
    imageUrl: '',
    type: 'QUIZ',
    startDate: '2024-01-14T18:15:00.000',
    // startDate: unformatDate(item.startDate.toString()),
    prize: {
      title: '',
      description: data?.prizeDescription,
    },
    description: item.question,
    termsAndConditions: '',
    status: 'ACTIVE',
    winnerAnnouncementDate: '2024-01-21T06:15:00.000',
    options: item?.options.map((option, index) => ({
      name: option,
      order: index + 1,
    })),
    content: {
      title: data?.titleOne,
      subTitle: data?.titleTwo,
      description: data?.description,
      upcomingTitle: '',
    },
    correctOptionNumber: 1,
  }));
};

export const formatQuizEditPayloadData = (data): IFormattedQuizFormSchema => {
  return {
    title: data.subTitle,
    endDate: '2024-01-15T18:14:00.000',

    // endDate: unformatDate(item.endDate.toString()),
    imageUrl: '',
    type: 'QUIZ',
    startDate: '2024-01-14T18:15:00.000',
    // startDate: unformatDate(item.startDate.toString()),
    prize: {
      title: '',
      description: data?.prizeDescription,
    },
    description: data?.quizzes?.[0]?.question,
    termsAndConditions: '',
    status: 'ACTIVE',
    winnerAnnouncementDate: '2024-01-21T06:15:00.000',
    options: data?.quizzes?.[0]?.options?.map((option, index) => ({
      name: option,
      order: index + 1,
    })),
    content: {
      logoUrl: data?.logoUrl,
      title: data?.titleOne,
      subTitle: data?.titleTwo,
      description: data?.description,
      upcomingTitle: '',
    },
    correctOptionNumber: 1,
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
