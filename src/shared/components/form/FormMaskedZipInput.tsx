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

// TODO: Need to reuse this component by all masked input components
// Issue seen previously, the props for this component are not accessible by the parent component (i.e. masked input components)
function PatternFormat(
  props: IPatternFormatProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { onChange, name, ...other } = props;

  return (
    <ReactPatternFormat
      {...other}
      valueIsNumericString
      format={config.INPUT_MASKING.zip}
      mask="_"
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

export function FormMaskedZipInput({ name, label, ...others }: IInputProps) {
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
