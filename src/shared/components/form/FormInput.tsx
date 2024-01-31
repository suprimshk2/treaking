import { InputBaseComponentProps } from '@mui/material';
import { Controller, FieldError, useFormContext } from 'react-hook-form';

import Input from 'shared/theme/components/Input';

interface IProps {
  autoFocus?: boolean;
  label?: string;
  name: string;
  // value?: string;
  id: string;
  placeholder?: string;
  disabled?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  type?: 'text' | 'password' | 'number' | 'email';
  fieldError?: FieldError;
  inputProps?: InputBaseComponentProps;
}

function FormInput({
  autoFocus,
  name,
  // value,
  label,
  placeholder,
  id,
  disabled,
  prefix,
  suffix,
  fullWidth,
  type,
  multiline = false,
  rows = 0,
  fieldError,
  inputProps,
}: IProps) {
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
          {...field}
          // value={value}
          id={id}
          label={label}
          placeholder={placeholder}
          inputProps={inputProps}
          disabled={disabled}
          color={fieldError || errors[name] ? 'error' : undefined}
          hint={
            (fieldError?.message || (errors[name]?.message as string)) ?? ''
          }
          prefix={prefix}
          suffix={suffix}
          type={type}
          fullWidth={fullWidth}
          autoFocus={autoFocus}
          multiline={multiline}
          rows={rows}
        />
      )}
    />
  );
}

FormInput.defaultProps = {
  autoFocus: false,
  label: '',
  placeholder: '',
  disabled: false,
  prefix: undefined,
  suffix: undefined,
  fullWidth: true,
  type: 'text',
  multiline: false,
  fieldError: undefined,
  rows: 1,
  inputProps: undefined,
};

export default FormInput;
