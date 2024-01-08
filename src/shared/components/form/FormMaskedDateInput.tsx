import { forwardRef, ForwardedRef } from 'react';
import { InputBaseComponentProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import Input, { IInputProps } from 'shared/theme/components/Input';
import { config } from 'shared/constants/config';

import { PatternFormat as ReactPatternFormat } from 'react-number-format';

interface IPatternFormatProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

function PatternFormat(
  props: IPatternFormatProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { onChange, name, ...other } = props;

  return (
    <ReactPatternFormat
      {...other}
      valueIsNumericString
      format={config.INPUT_MASKING.date}
      mask={['m', 'm', 'd', 'd', 'y', 'y', 'y', 'y']}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name,
            value: values.value,
          },
        });
      }}
    />
  );
}

const PatternFormatInput = forwardRef(PatternFormat);

export function FormMaskedDateInput({ name, label, ...others }: IInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Input
          {...others}
          {...field}
          placeholder="MM/DD/YYYY"
          label={label}
          color={errors[name] ? 'error' : undefined}
          hint={(errors[name]?.message as string) ?? ''}
          inputComponent={
            PatternFormatInput as unknown as React.ElementType<InputBaseComponentProps>
          }
        />
      )}
    />
  );
}
