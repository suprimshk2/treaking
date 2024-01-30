import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { IProductTableRow } from '../interfaces';

const useResetProductField = (data: IProductTableRow) => {
  const { reset } = useFormContext();

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        point: data.point.originalValue,
        price: data.price.originalValue,
        vendor: { name: data.vendor.businessName, id: data.vendor.vendorId },
      });
    }
  }, [data, reset]);
};

export default useResetProductField;
