import { Controller, useFormContext } from 'react-hook-form';

import DatePicker, { IDatePickerProps } from '../inputs/DatePicker';

type Props = {
  disabled?: boolean;
  name: string;
} & IDatePickerProps;

export function FormDatePicker({ disabled, name, label, ...others }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <DatePicker {...field} {...others} disabled={disabled} label={label} />
      )}
    />
  );
}

FormDatePicker.defaultProps = {
  disabled: false,
};
