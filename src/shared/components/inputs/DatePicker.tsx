import {
  DateValidationError,
  DatePicker as MuiDatePicker,
  PickerChangeHandlerContext,
} from '@mui/x-date-pickers';

interface IProps {
  label?: string;
  disablePast?: boolean;
  disabled?: boolean;
  handleChange?: (data: unknown) => void;
  value: Date | undefined;
  maxDate?: Date;
  minDate?: Date;
}

function DatePicker({
  disablePast,
  disabled,
  label,
  handleChange,
  value,
  maxDate,
  minDate,
}: IProps) {
  const onChange = (
    date: unknown,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => {
    if (context?.validationError) return;
    if (handleChange) {
      handleChange(date);
    }
  };

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
      value={value ? new Date(value) : null}
    />
  );
}

DatePicker.defaultProps = {
  disabled: false,
  disablePast: false,
  label: undefined,
  handleChange: undefined,
  maxDate: undefined,
  minDate: undefined,
};

export default DatePicker;
