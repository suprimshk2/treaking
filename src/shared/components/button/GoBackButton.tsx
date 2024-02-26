import { useTheme } from '@mui/material';
import { BsArrowLeft } from 'react-icons/bs';
import {
  ButtonVariant,
  ButtonSize,
  Button,
} from 'shared/theme/components/Button';

interface IProps {
  onBackClick(): void;
}

export function GoBackButton({ onBackClick }: IProps) {
  const theme = useTheme();
  return (
    <Button
      sx={{ color: theme.palette.gray.dark }}
      variant={ButtonVariant.TEXT}
      size={ButtonSize.SMALL}
      prefix={<BsArrowLeft />}
      onClick={onBackClick}
      fullWidth={false}
    >
      Back
    </Button>
  );
}
