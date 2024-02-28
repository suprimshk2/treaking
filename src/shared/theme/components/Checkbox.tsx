import React from 'react';
import {
  Checkbox as MuiCheckbox,
  FormControlLabel,
  useTheme,
} from '@mui/material';
import { BsCheckSquareFill, BsSquare } from 'react-icons/bs';
import typography from '../typography';

interface IProps {
  label?: string;
  disabled?: boolean;
  checked?: boolean;
  value?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  sizeSmall?: boolean;
}

const Checkbox = React.forwardRef((props: IProps, ref) => {
  const theme = useTheme();
  const { label, disabled, checked, onChange, sizeSmall, value } = props;
  return (
    <FormControlLabel
      inputRef={ref}
      control={
        <MuiCheckbox
          checkedIcon={
            <BsCheckSquareFill color={theme.palette.secondary.main} />
          }
          icon={<BsSquare />}
          checked={checked ?? value}
          value={value}
          onChange={onChange}
        />
      }
      label={label}
      disabled={disabled}
      sx={{
        ml: 0,
        '& .MuiTypography-root': {
          // TODO: In Future we need to refactor this hardcoded value for fontSize
          fontSize: sizeSmall
            ? typography.bodyTextMedium.fontSize
            : typography.bodyTextLarge.fontSize,
        },
      }}
    />
  );
});

Checkbox.displayName = 'Checkbox';

Checkbox.defaultProps = {
  label: '',
  disabled: false,
  onChange: undefined,
  checked: undefined,
  value: undefined,
  sizeSmall: false,
};

export default Checkbox;
