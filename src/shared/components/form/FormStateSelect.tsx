import { MenuItem } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import Select, { ISelectProps } from 'shared/theme/components/Select';
import US_STATES from 'shared/assets/data/US_state.json';

export function FormStateSelect({
  name,
  ...others
}: Omit<ISelectProps, 'children'>) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          {...field}
          {...others}
          color={errors[name] ? 'error' : undefined}
          hint={(errors[name]?.message as string) ?? ''}
        >
          {US_STATES.map((state) => (
            <MenuItem value={state.abbreviation} key={state.abbreviation}>
              {state.abbreviation}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
}
