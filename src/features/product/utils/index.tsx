import { IFormattedProductFormSchema } from '../interfaces';

const formatProductAddPayload = (data: any): IFormattedProductFormSchema => {
  console.log('nonformat data==>', data);

  return {
    title: data.title,
    description: data.description,
    tags: [],
    vendor: {
      id: '',
      name: data.vendor,
    },
    point: [
      {
        value: data.point,
        effEndDate: '2023-12-31T00:00:00.000Z',
        effStartDate: '2023-01-01T00:00:00.000Z',
      },
    ],
    price: [
      {
        value: data.price,
        effEndDate: '2023-12-31T00:00:00.000Z',
        effStartDate: '2023-01-01T00:00:00.000Z',
        discount: {
          value: data.discount,
          type: 'PERCENTAGE',
        },
      },
    ],
    quantityInStock: data.quantity,
    images: [
      {
        url: data.images,
        order: 0,
      },
    ],
    category: {
      id: '8910992e-6613-468e-8fb7-e58dd0f6fbf8',
      name: 'Electronics',
    },
    updated: {
      date: '2024-01-19T10:09:31.708Z',
      name: 'Pragyan Shrestha',
      id: '1c3296af-bc1d-4298-8546-3b82bb887cef',
    },
    created: {
      date: ' 2024-01-19T10:09:31.708Z',
      name: 'Pragyan Shrestha',
      id: '1c3296af-bc1d-4298-8546-3b82bb887cef',
    },
    productId: '05aa12b5-61ab-4179-b3c1-8791b3482ae5',
  };
};
export const formaProductAddPayload = (data): IFormattedProductFormSchema => {
  return formatProductAddPayload(data);
};
