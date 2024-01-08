import { MenuItem } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import Select, { ISelectProps } from 'shared/theme/components/Select';
import { config } from 'shared/constants/config';

const { GENDER_OPTIONS } = config;

export function FormGenderSelect({
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

  const handleClear = () => {
    setValue(name, null);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          {...field}
          {...others}
          clearable={clearable}
          handleClear={handleClear}
          placeholder={placeholder || 'Select gender'}
          color={errors[name] ? 'error' : undefined}
          hint={(errors[name]?.message as string) ?? ''}
        >
          {GENDER_OPTIONS.map((gender) => (
            <MenuItem value={gender.value} key={gender.id}>
              {gender.text}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
}
