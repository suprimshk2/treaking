import { MenuItem } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import Select, { ISelectProps } from 'shared/theme/components/Select';

import { OfferBodyType } from '../enums';

const OPTIONS = [
  {
    id: 1,
    name: OfferBodyType.PERCENTAGE,
    code: OfferBodyType.PERCENTAGE,
  },
  {
    id: 2,
    name: OfferBodyType.RUPEES,
    code: OfferBodyType.RUPEES,
  },
  {
    id: 3,
    name: OfferBodyType.FREE,
    code: OfferBodyType.FREE,
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
    formState: { errors },
  } = useFormContext();
  //   const filters = useBoundStore.use.roleTableFilters();
  //   const { data } = useRolesQuery(filters, {
  //     enabled: true,
  //   });

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
