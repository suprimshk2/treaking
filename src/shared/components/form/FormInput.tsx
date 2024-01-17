import { Controller, FieldError, useFormContext } from 'react-hook-form';

import Input from 'shared/theme/components/Input';

interface IProps {
  autoFocus?: boolean;
  label?: string;
  name: string;
  id: string;
  placeholder?: string;
  disabled?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  fullWidth?: boolean;
  multiline?: boolean;
  type?: 'text' | 'password' | 'number' | 'email';
  fieldError?: FieldError;
}

function FormInput({
  autoFocus,
  name,
  label,
  placeholder,
  id,
  disabled,
  prefix,
  suffix,
  fullWidth,
  type,
  multiline = false,
  fieldError,
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
          id={id}
          label={label}
          placeholder={placeholder}
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
};

export default FormInput;
