import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { convertNumberToString } from 'shared/utils/common';
import { IProductTableRow } from '../interfaces';

const useResetProductField = (data: IProductTableRow) => {
  const { reset } = useFormContext();

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        point: convertNumberToString(data.point.originalValue),
        price: convertNumberToString(data.price.originalValue),
        quantityInStock: convertNumberToString(data.quantityInStock),
        retailPrice: convertNumberToString(data.retailPrice),
        costPrice: convertNumberToString(data.costPrice),
        vendor: { name: data.vendor.businessName, id: data.vendor.vendorId },
      });
    }
  }, [data, reset]);
};

export default useResetProductField;
