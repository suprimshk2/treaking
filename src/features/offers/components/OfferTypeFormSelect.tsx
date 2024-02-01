import { MenuItem } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import Select, { ISelectProps } from 'shared/theme/components/Select';

import { useEffect } from 'react';
import { OfferBodyType, OfferContentLayoutType } from '../enums';

const OPTIONS = [
  {
    id: 1,
    name: OfferBodyType.PERCENTAGE,
    code: OfferContentLayoutType.PERCENT_OFF,
  },
  {
    id: 2,
    name: OfferBodyType.RUPEES,
    code: OfferContentLayoutType.AMOUNT_OFF,
  },
  {
    id: 3,
    name: OfferBodyType.FREE,
    code: OfferContentLayoutType.DEFAULT,
  },
];

export function OfferTypeFormSelect({
  name,
  placeholder,
  clearable,
  ...others
}: Omit<ISelectProps, 'children'>) {
  const {
    control,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useFormContext();

  const type = watch('type');

  useEffect(() => {
    setValue('type', OPTIONS[0].code);
    const values = getValues('template');
    setValue('template', { ...values, layoutType: OPTIONS[0].code });
  }, [type, setValue, getValues]);

  const handleClear = () => {
    setValue(name, '');
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          {...field}
          {...others}
          fullWidth={false}
          placeholder={placeholder}
          color={errors[name] ? 'error' : undefined}
          hint={(errors[name]?.message as string) ?? ''}
          clearable={clearable}
          handleClear={handleClear}
        >
          {OPTIONS?.map?.((role) => (
            <MenuItem value={role.code} key={role.name}>
              {role.name}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
}
