import React from 'react';
import { Switch as MuiSwitch } from '@mui/material';

interface IProps {
  disabled?: boolean;
  checked?: boolean;
  value?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
}

const Switch = React.forwardRef((props: IProps, ref) => {
  const { disabled, checked, onChange, value } = props;
  return (
    <MuiSwitch
      inputRef={ref}
      checked={checked ?? value}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
});

Switch.displayName = 'Switch';

Switch.defaultProps = {
  disabled: false,
  onChange: undefined,
  checked: undefined,
  value: undefined,
};

export default Switch;
