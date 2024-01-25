import React from 'react';
import {
  TimeValidationError,
  TimePicker as MuiTimePicker,
  PickerChangeHandlerContext,
} from '@mui/x-date-pickers';

export interface ITimePickerProps {
  label?: string;
  disablePast?: boolean;
  disabled?: boolean;
  onChange?:
    | ((
        value: any,
        context: PickerChangeHandlerContext<TimeValidationError>
      ) => void)
    | undefined;
  value?: string | undefined;
  maxTime?: string;
  minTime?: string;
}

const TimePicker = React.forwardRef((props: ITimePickerProps, ref) => {
  const { disablePast, disabled, label, onChange, value, maxTime, minTime } =
    props;

  // const onChange = (
  //   date: unknown,
  //   context: PickerChangeHandlerContext<TimeValidationError>
  // ) => {
  //   if (context?.validationError) return;
  //   if (handleChange) {
  //     handleChange(date);
  //   }
  // };

  return (
    <MuiTimePicker
      maxTime={maxTime}
      minTime={minTime}
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
        },
      }}
      sx={{
        '& .MuiInputBase-root.MuiInput-root': {
          marginTop: label ? '24px' : 'inherit',
        },
      }}
      // viewRenderers={{
      //   hours: renderTimeViewClock,
      //   minutes: renderTimeViewClock,
      //   seconds: renderTimeViewClock,
      // }}
      value={value || null}
    />
  );
});

TimePicker.displayName = 'TimePicker';

TimePicker.defaultProps = {
  disabled: false,
  disablePast: false,
  label: undefined,
  onChange: undefined,
  maxTime: undefined,
  minTime: undefined,
  value: undefined,
};

export default TimePicker;
