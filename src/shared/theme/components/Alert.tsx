import { Alert as MuiAlert, AlertTitle as MuiAlertTitle } from '@mui/material';
import {
  BsCheckCircleFill,
  BsInfoCircleFill,
  BsFillExclamationCircleFill,
} from 'react-icons/bs';

interface IProps {
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  description: string;
}

function Alert({ type, title, description }: IProps) {
  return (
    <MuiAlert
      severity={type}
      iconMapping={{
        success: <BsCheckCircleFill />,
        info: <BsInfoCircleFill />,
        error: <BsFillExclamationCircleFill />,
        warning: <BsFillExclamationCircleFill />,
      }}
    >
      <MuiAlertTitle>{title}</MuiAlertTitle>
      {description}
    </MuiAlert>
  );
}

export default Alert;
