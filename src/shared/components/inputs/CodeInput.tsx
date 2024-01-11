import { useTheme } from '@mui/material';
import { useState } from 'react';
import OtpInput from 'react-otp-input';

export enum CodeInputType {
  NUMBER = 'number',
  TEL = 'tel',
  TEXT = 'text',
  PASSWORD = 'password',
}

interface ICodeInputProps {
  name?: string;
  type?: CodeInputType;
  fields: number; // no. of input fields to show
  isValid: boolean;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export function CodeInput({
  name = 'verificationCode',
  fields,
  type,
  isValid,
  disabled,
  onChange,
}: ICodeInputProps) {
  const theme = useTheme();

  const [value, setValue] = useState('');

  const inputStyle = {
    margin: `0 ${theme.spacing(2)}`,
    MozAppearance: 'textfield',
    width: theme.spacing(10.5),
    height: theme.spacing(10),
    borderRadius: '4px',
    ...theme.typography.bodyTextLargeMd,
    backgroundColor: isValid
      ? theme.palette.primary.lighter
      : theme.palette.error.lighter,
    color: isValid ? theme.palette.primary.main : theme.palette.error.main,
    border: isValid
      ? `1px solid ${theme.palette.primary.lighter}`
      : `1px solid ${theme.palette.error.lighter}`,
    textAlign: 'center',
  } as const;

  const handlePaste: React.ClipboardEventHandler = (event) => {
    const data = event.clipboardData.getData('text');
    setValue(data);
  };

  return (
    <OtpInput
      onPaste={handlePaste}
      containerStyle="react-otp-input"
      value={value}
      onChange={(v) => {
        setValue(v);
        onChange(v);
      }}
      numInputs={fields}
      renderInput={(props) => (
        <input name={name} disabled={disabled} {...props} />
      )}
      inputStyle={inputStyle}
      inputType={type}
      shouldAutoFocus
    />
  );
}

CodeInput.defaultProps = {
  name: 'verificationCode',
  type: CodeInputType.NUMBER,
  disabled: false,
};
