import {
  IconButton,
  DialogTitle as MuiDialogTitle,
  DialogTitleProps,
} from '@mui/material';
import { BsXLg } from 'react-icons/bs';

interface IProps extends DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose?: (event: React.MouseEvent<HTMLElement>) => void;
}

export function DialogTitle(props: IProps) {
  const { children, onClose, ...other } = props;

  return (
    <MuiDialogTitle {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.shade.dark,
          }}
        >
          <BsXLg />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
}

DialogTitle.defaultProps = {
  children: null,
  onClose: undefined,
};
