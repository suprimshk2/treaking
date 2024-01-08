import React, { ReactNode } from 'react';
import {
  FormControl,
  InputBase,
  InputLabel,
  FormHelperText,
  Select as MuiSelect,
  SelectChangeEvent,
} from '@mui/material';

export interface IMultiSelectProps {
  id: string;
  name: string;
  label?: string;
  color?: 'error' | 'success' | 'warning';
  hint?: string;
  disabled?: boolean;
  value?: string[];
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChange?: (event: SelectChangeEvent<string[]>, child: ReactNode) => void;
  children: ReactNode;
  fullWidth?: boolean;
}

const Select = React.forwardRef((props: IMultiSelectProps, ref) => {
  const {
    id,
    name,
    label,
    color,
    hint,
    disabled,
    value,
    onBlur,
    onChange,
    children,
    fullWidth,
  } = props;

  return (
    <FormControl color={color} disabled={disabled} fullWidth>
      {label && (
        <InputLabel htmlFor={id} shrink>
          {label}
        </InputLabel>
      )}
      <MuiSelect
        id={id}
        name={name}
        multiple
        sx={{ width: !fullWidth ? '150px' : 'auto' }}
        input={<InputBase />}
        inputRef={ref}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
        fullWidth={fullWidth}
        renderValue={(selected) => selected.join(', ')}
      >
        {children}
      </MuiSelect>
      {hint && <FormHelperText className={color}>{hint}</FormHelperText>}
    </FormControl>
  );
});

Select.displayName = 'Select';

Select.defaultProps = {
  label: '',
  color: undefined,
  hint: undefined,
  disabled: false,
  onBlur: undefined,
  onChange: undefined,
  fullWidth: true,
  value: [],
};

export default Select;
