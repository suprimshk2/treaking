import React, { ReactNode, useState } from 'react';
import {
  FormControl,
  InputBase,
  InputLabel,
  FormHelperText,
  Select as MuiSelect,
  SelectChangeEvent,
  Box,
  useTheme,
  Typography,
  IconButton,
} from '@mui/material';
import { LoadingIndicator } from 'shared/components/display/LoadingIndicator';
import { BsX } from 'react-icons/bs';

export interface ISelectProps {
  id: string;
  name: string;
  label?: string;
  color?: 'error' | 'success' | 'warning' | 'info';
  hint?: string;
  disabled?: boolean;
  value?: string | number | undefined;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChange?: (event: SelectChangeEvent<string | number>) => void;
  children: ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  placeholder?: string;
  handleClear?: () => void;
  clearable?: boolean;
  width?: string;
}

const Select = React.forwardRef((props: ISelectProps, ref) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
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
    loading,
    placeholder,
    handleClear,
    clearable,
    width,
  } = props;

  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    handleClear?.();
  };

  // const colors = {
  //   info: {
  //     backgroundColor: theme.palette.info.main,
  //     color: `${theme.palette.common.white} !important`,
  //   },
  //   default: {
  //     backgroundColor: 'inherit',
  //     color: 'inherit',
  //   },
  // } as const;

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <FormControl
      color={color}
      disabled={disabled}
      fullWidth
      onClick={toggleOpen}
      sx={{
        position: 'relative !important',
      }}
    >
      {label && (
        <InputLabel htmlFor={id} shrink>
          {label}
        </InputLabel>
      )}

      <MuiSelect
        endAdornment={
          clearable &&
          value && (
            <IconButton
              size="small"
              title="Clear"
              disableRipple
              onClick={onClear}
              sx={{
                cursor: 'pointer',
                mr: 6,
                mt: 0.3,
                transition: '0.1s linear',
                '&:hover': {
                  color: theme.palette.gray.darker,
                },
              }}
            >
              <BsX size={18} />
            </IconButton>
          )
        }
        open={open}
        title={value as string}
        id={id}
        name={name}
        sx={{
          width: !fullWidth ? width : 'auto',
          opacity: loading ? 0.31 : 1,
          '& .MuiInputBase-input': {
            pr: clearable && value ? '0px !important' : undefined,
          },
        }}
        input={<InputBase color={color} />}
        inputRef={ref}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
        fullWidth={fullWidth}
        onClick={(e) => {
          e.stopPropagation();
          toggleOpen();
        }}
      >
        {children}
      </MuiSelect>

      {hint && <FormHelperText className={color}>{hint}</FormHelperText>}
      <Typography
        component="div"
        color="gray.main"
        variant="bodyTextMedium"
        sx={{
          display: placeholder && value ? 'none' : 'inherit',
          zIndex: 1,
          maxWidth: '65%',
          position: 'absolute !important',
          top: label ? '34px' : '10px',
          left: '8px',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          cursor: 'pointer',
        }}
      >
        {placeholder}
      </Typography>
      {loading && (
        <Box
          position="absolute"
          onClick={(e) => {
            e.stopPropagation();
          }}
          sx={{
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <LoadingIndicator containerHeight="100%" size="1rem" />
        </Box>
      )}
    </FormControl>
  );
});

Select.displayName = 'Select';

Select.defaultProps = {
  label: '',
  color: undefined,
  hint: undefined,
  disabled: false,
  value: '',
  onBlur: undefined,
  onChange: undefined,
  fullWidth: true,
  loading: false,
  placeholder: undefined,
  clearable: false,
  handleClear: undefined,
  width: '150px',
};

export default Select;
