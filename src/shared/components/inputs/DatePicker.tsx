import React from 'react';
import {
  DateValidationError,
  DatePicker as MuiDatePicker,
  PickerChangeHandlerContext,
} from '@mui/x-date-pickers';

export interface IDatePickerProps {
  label?: string;
  disablePast?: boolean;
  disabled?: boolean;
  onChange?:
    | ((
        value: Date | null,
        context: PickerChangeHandlerContext<DateValidationError>
      ) => void)
    | undefined;
  value?: Date | undefined;
  maxDate?: Date;
  minDate?: Date;
}

const DatePicker = React.forwardRef((props: IDatePickerProps, ref) => {
  const { disablePast, disabled, label, onChange, value, maxDate, minDate } =
    props;

  // const onChange = (
  //   date: unknown,
  //   context: PickerChangeHandlerContext<DateValidationError>
  // ) => {
  //   if (context?.validationError) return;
  //   if (handleChange) {
  //     handleChange(date);
  //   }
  // };

  return (
    <MuiDatePicker
      maxDate={maxDate}
      minDate={minDate}
      disabled={disabled}
      onChange={onChange}
      disablePast={disablePast}
      slotProps={{
        textField: {
          fullWidth: true,
          variant: 'standard',
          size: 'medium',
          label,
          InputProps: {
            disableUnderline: true,
          },
          // error: !!errorText,
          // helperText: errorText,
        },
      }}
      sx={{
        '& .MuiInputBase-root.MuiInput-root': {
          marginTop: label ? '24px' : 'inherit',
        },
      }}
      value={value ? new Date(value) : null}
    />
  );
});

DatePicker.displayName = 'DatePicker';

DatePicker.defaultProps = {
  disabled: false,
  disablePast: false,
  label: undefined,
  onChange: undefined,
  maxDate: undefined,
  minDate: undefined,
  value: undefined,
};

export default DatePicker;
