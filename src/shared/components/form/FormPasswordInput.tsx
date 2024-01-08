import { IconButton } from '@mui/material';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

import Input from 'shared/theme/components/Input';

interface IProps {
  label?: string;
  name: string;
  id: string;
  placeholder?: string;
  disabled?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  autoFocus?: boolean;
}

function FormPasswordInput({
  name,
  label,
  id,
  placeholder,
  disabled,
  prefix,
  suffix,
  autoFocus,
}: IProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [showPassword, setPassword] = useState(false);

  const toggleShowPassword = () => {
    setPassword((prevState) => !prevState);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Input
          {...field}
          id={id}
          autoFocus={autoFocus}
          label={label}
          placeholder={placeholder}
          disabled={disabled}
          type={showPassword ? 'text' : 'password'}
          color={errors[name] ? 'error' : undefined}
          hint={(errors[name]?.message as string) ?? ''}
          prefix={prefix}
          suffix={
            suffix || (
              <IconButton
                aria-label="toggle password visibility"
                onClick={toggleShowPassword}
                onMouseDown={toggleShowPassword}
                edge="end"
                disableRipple
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </IconButton>
            )
          }
          autoComplete="current-password"
        />
      )}
    />
  );
}

FormPasswordInput.defaultProps = {
  label: '',
  placeholder: '',
  disabled: false,
  prefix: undefined,
  suffix: undefined,
  autoFocus: false,
};

export default FormPasswordInput;
