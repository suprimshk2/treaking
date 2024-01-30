import { IListResponse, IResponse } from 'shared/interfaces/http';
import { convertStringToNumber, formatCurrency } from 'shared/utils/common';
import { formatDateToView } from 'shared/utils/date';
import {
  IAdaptedProductTableRow,
  IAdaptedproductSchema,
  IProductSchema,
  IProductTableRow,
} from '../interfaces';

export const adaptProductList = (
  res: IResponse<IListResponse<IProductTableRow>>
): IResponse<IListResponse<IAdaptedProductTableRow>> => {
  return {
    ...res,
    data: {
      ...res.data,
      rows: res.data.rows.map((item: IProductTableRow) => {
        return {
          id: item._id,
          name: item.title,
          point: item.point.originalValue?.toLocaleString() || 'N/A',
          price: formatCurrency(item.price?.originalValue ?? 0) || 'N/A',
          status: item.quantityInStock === 0 ? 'Out of stock' : 'Available',
          createdBy: item.created.name,
          createdAt: formatDateToView(item.created.date),
          isInStock: item.quantityInStock > 0,
          quantityInStock: item.quantityInStock,
          image_url: item.images?.[0].url ?? '',
          productId: item.productId,
        };
      }),
    },
  };
};

export const formatProductAddPayload = (
  data: IProductSchema
): IAdaptedproductSchema => {
  return {
    ...data,
    point: [
      {
        value: convertStringToNumber(data.point),
      },
    ],
    price: [
      {
        value: convertStringToNumber(data.price) * 100,
      },
    ],
    quantityInStock: convertStringToNumber(data?.quantityInStock || ''),
    costPrice: convertStringToNumber(data?.costPrice || ''),
    retailPrice: convertStringToNumber(data?.retailPrice || ''),
    images: data.images.map((item, index) => {
      return { ...item, order: index };
    }),
  };
};
