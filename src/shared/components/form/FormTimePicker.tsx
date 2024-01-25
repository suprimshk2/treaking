import { Controller, useFormContext } from 'react-hook-form';

import TimePicker, { ITimePickerProps } from '../inputs/TimePicker';

type Props = {
  disabled?: boolean;
  name: string;
} & ITimePickerProps;

export function FormTimePicker({ disabled, name, label, ...others }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TimePicker {...field} {...others} disabled={disabled} label={label} />
      )}
    />
  );
}

FormTimePicker.defaultProps = {
  disabled: false,
};
