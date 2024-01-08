import { Controller, useFormContext } from 'react-hook-form';

import Checkbox from 'shared/theme/components/Checkbox';

type Props = {
  disabled?: boolean;
  name: string;
  label: string;
  sizeSmall?: boolean;
};

export function FormCheckbox({
  disabled,
  name,
  label,
  sizeSmall,
  ...others
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Checkbox
          {...field}
          // {...others}
          disabled={disabled}
          label={label}
          sizeSmall={sizeSmall}
        />
      )}
    />
  );
}

FormCheckbox.defaultProps = {
  disabled: false,
  sizeSmall: false,
};
