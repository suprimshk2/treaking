import { Controller, useFormContext } from 'react-hook-form';

import Switch from 'shared/theme/components/Switch';

type Props = {
  disabled?: boolean;
  name: string;
};

export function FormSwitch({ disabled, name }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Switch
          {...field}
          // {...others}
          disabled={disabled}
        />
      )}
    />
  );
}

FormSwitch.defaultProps = {
  disabled: false,
};
