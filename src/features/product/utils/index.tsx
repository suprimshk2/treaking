import { IListResponse, IResponse } from 'shared/interfaces/http';
import {
  convertNumberToString,
  convertStringToNumber,
  formatCurrency,
} from 'shared/utils/common';
import { formatDateToView } from 'shared/utils/date';
import {
  IAdaptedProductTableRow,
  IAdaptedproductSchema,
  IProductSchema,
  IProductTableRow,
} from '../interfaces';
import { ProductDiscountType } from '../enums';

export const adaptProduct = (
  item: IProductTableRow
): IAdaptedProductTableRow => {
  return {
    id: item._id,
    name: item.title,
    point: item.point.originalValue?.toLocaleString() || 'N/A',
    price: formatCurrency(item.price?.originalValue ?? 0) || 'N/A',
    status: item.quantityInStock === 0 ? 'Out of stock' : 'Available',
    createdBy: item?.created?.name,
    createdAt: formatDateToView(item.created.date),
    isInStock: item.quantityInStock > 0,
    quantityInStock: item.quantityInStock,
    image_url: item.images?.[0]?.url ?? '',
    productId: item.productId,
  };
};

export const adaptProductList = (
  res: IResponse<IListResponse<IProductTableRow>> | any
): IResponse<IListResponse<IAdaptedProductTableRow>> => {
  const allRows = res?.pages?.map((item) => item.data.rows).flat();

  return {
    ...res,
    data: {
      ...res.data,
      rows: allRows.map((item: IProductTableRow) => adaptProduct(item)),
    },
  };
};

const calculatePercentageDifference = (sPrice: number, dPrice: number) => {
  const price = dPrice / sPrice;
  return price * 100;
};

export const formatProductAddPayload = (
  data: IProductSchema
): IAdaptedproductSchema => {
  const payload: any = {
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
    costPrice: convertStringToNumber(data?.costPrice || '') * 100,
    retailPrice: convertStringToNumber(data?.retailPrice || '') * 100,
    images: data.images.map((item, index) => {
      return { ...item, order: index };
    }),
  };

  const discountPrice = convertStringToNumber(data.discount) * 100;
  const sellingPrice = payload.price[0].value;
  if (discountPrice > 0 && discountPrice < sellingPrice) {
    const percentage = calculatePercentageDifference(
      sellingPrice,
      discountPrice
    );

    payload.price[0].discount = {
      type: ProductDiscountType.PERCENTAGE,
      value: percentage,
    };
  }

  return payload;
};

export const calculateDiscount = (sPrice?: number, dPrice?: number) => {
  if (sPrice && dPrice) {
    return sPrice - dPrice;
  }
  return 0;
};
