import { IAddQuizSchema } from '../interfaces';
import { AddQuizFormSchemaType } from '../schemas';

export const formatUserEditPayload = (
  data: AddQuizFormSchemaType
): IAddQuizSchema => {
  return {
    title: 'Makaii Monday',
    endDate: '2024-01-15T18:14:00.000',
    imageUrl: '',
    type: 'QUIZ',
    startDate: '2024-01-14T18:15:00.000',
    prize: {
      title: 'Get a chance to win 3 Chaichai Confectionery Chocolates',
      description: '',
    },
    description: 'What is the meaning of Chai Chai of Chaichai Confectionery?',
    status: 'ACTIVE',
    winnerAnnouncementDate: '2024-01-21T06:15:00.000',
    options: [
      {
        name: 'Chocolate',
        order: 1,
      },
      {
        name: 'Candy',
        order: 2,
      },
      {
        name: 'Jelly',
        order: 3,
      },
      {
        name: 'Gummy',
        order: 4,
      },
    ],
    content: {
      title: 'MAKAII',
      subTitle: 'MONDAY',
      description:
        'Monday isn’t your favorite day. Join "Makaii Monday" and see the magic!',
      upcomingTitle: 'Next quiz will be available in',
    },
    correctOptionNumber: 1,
  };
};
export const formatQuizAddPayload = (
  data: AddQuizFormSchemaType
): IAddQuizSchema => {
  return formatUserEditPayload(data);
};
