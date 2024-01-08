import React from 'react';
import {
  FormControl,
  InputBase,
  InputLabel,
  FormHelperText,
  InputAdornment,
  InputBaseComponentProps,
} from '@mui/material';

export interface IInputProps {
  id: string;
  name: string;
  autoComplete?: string;
  placeholder?: string;
  label?: string;
  type?: 'text' | 'password' | 'number' | 'email';
  color?: 'error' | 'success' | 'warning';
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  hint?: string;
  disabled?: boolean;
  value?: string;
  width?: string | number;
  fullWidth?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  inputComponent?: React.ElementType<InputBaseComponentProps>;
  inputProps?: InputBaseComponentProps;
  autoFocus?: boolean;
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
}

const Input = React.forwardRef((props: IInputProps, ref) => {
  const {
    autoFocus,
    id,
    name,
    placeholder,
    label,
    type,
    color,
    prefix,
    suffix,
    hint,
    disabled,
    value,
    autoComplete,
    width,
    fullWidth = true,
    onBlur,
    onChange,
    inputComponent,
    inputProps,
    multiline,
    rows,
    maxRows,
  } = props;
  return (
    <FormControl
      color={color}
      fullWidth={fullWidth}
      title={value || placeholder}
    >
      {label && (
        <InputLabel htmlFor={id} shrink>
          {label}
        </InputLabel>
      )}
      <InputBase
        rows={rows}
        maxRows={maxRows}
        multiline={multiline}
        inputRef={ref}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        id={id}
        name={name}
        sx={{ width }}
        type={type}
        aria-label={name}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        fullWidth={fullWidth}
        disabled={disabled}
        startAdornment={
          prefix ? (
            <InputAdornment position="start">{prefix}</InputAdornment>
          ) : undefined
        }
        endAdornment={
          suffix ? (
            <InputAdornment position="end">{suffix}</InputAdornment>
          ) : undefined
        }
        inputComponent={inputComponent}
        inputProps={inputProps}
      />
      {hint && <FormHelperText className={color}>{hint}</FormHelperText>}
    </FormControl>
  );
});

Input.displayName = 'Input';

Input.defaultProps = {
  autoFocus: false,
  placeholder: '',
  label: '',
  autoComplete: '',
  type: 'text',
  color: undefined,
  prefix: undefined,
  suffix: undefined,
  hint: undefined,
  disabled: false,
  value: '',
  width: undefined,
  onBlur: undefined,
  onChange: undefined,
  fullWidth: true,
  inputComponent: undefined,
  inputProps: undefined,
  multiline: undefined,
  rows: undefined,
  maxRows: undefined,
};

export default Input;
